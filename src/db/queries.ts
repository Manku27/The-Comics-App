import pool from "@/db";
import { IRun } from "@/models/books";
import { IBookInput } from "@/models/input";

export const runQuery = async (runId: number) => {
  const runInfo = await pool.query(
    `
       SELECT 
            r.name,
            json_agg(json_build_object('title', rc.title, 'issues', rc.issues)) AS collects
        FROM 
            books.runs r 
        LEFT JOIN 
            books.run_collections rc ON rc.run_id = r.id
        WHERE 
            r.id = $1
        GROUP BY 
            r.id;
        `,
    [runId],
  );

  const runEditions = await pool.query(
    `
    SELECT 
    e.type,
    e.cover_type as coverType,
    json_agg(
      json_build_object(
        'id', b.id,
        'title', b.title,
        'description', b.description,
        'pageCount', b.page_count,
        'published', b.published_date,
        'latestRepublished', b.latest_republish_date,
        'isbn', b.isbn13,
       'authors', (
          SELECT json_agg(json_build_object('id', p.id, 'name', p.name))
          FROM books.book_authors ba
          JOIN books.people p ON ba.author_id = p.id
          WHERE ba.book_id = b.id
        ),
        'illustrators', (
          SELECT json_agg(json_build_object('id', p.id, 'name', p.name))
          FROM books.book_illustrators bi
          JOIN books.people p ON bi.illustrator_id = p.id
          WHERE bi.book_id = b.id
        ),
        'rating', bs.rating,
        'noOfRatings', bs.no_of_ratings,
        'medianPrice', bs.median_price,
        'collects', (
          SELECT json_agg(json_build_object('title', bc.title, 'issues', bc.issues))
          FROM books.book_collections bc
          WHERE bc.book_id = b.id
        )
      )
    ) AS list
  FROM books.run_editions re
  JOIN books.editions e ON e.id = re.edition_id
  JOIN books.list_books lb ON lb.list_id = e.list_id
  JOIN books.books b ON b.id = lb.book_id
  LEFT JOIN books.book_stats bs ON bs.book_id = b.id
  WHERE re.run_id = $1
  GROUP BY e.id, e.type;
        `,
    [runId],
  );

  const response: IRun = {
    ...runInfo.rows[0],
    editions: runEditions.rows,
  };

  return response;
};

export const addBookQuery = async (book: IBookInput) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Insert book and get new book ID
    const bookInsert = await client.query(
      `
        INSERT INTO books.books (title, description, page_count, published_date, latest_republish_date, isbn13)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `,
      [
        book.title,
        book.description,
        book.pageCount,
        book.published,
        book.latestRepublished,
        book.isbn,
      ],
    );
    const newBookId = bookInsert.rows[0].id;

    // Authors insertion
    if (book.authors.length > 0) {
      const authorsValues = book.authors
        .map((authorId) => `(${newBookId}, ${authorId})`)
        .join(", ");
      const authorsQueryText = `
        INSERT INTO books.book_authors (book_id, author_id)
        VALUES ${authorsValues};
      `;
      await client.query(authorsQueryText);
    }

    // Illustrators insertion
    if (book.illustrators.length > 0) {
      const illustratorsValues = book.illustrators
        .map((illustratorId) => `(${newBookId}, ${illustratorId})`)
        .join(", ");
      const illustratorsQueryText = `
        INSERT INTO books.book_illustrators (book_id, illustrator_id)
        VALUES ${illustratorsValues};
      `;
      await client.query(illustratorsQueryText);
    }

    // Stats insertion
    await client.query(
      `
        INSERT INTO books.book_stats (book_id)
        VALUES ($1)
      `,
      [newBookId],
    );

    // Collections insertion
    if (book.collects.length > 0) {
      const collectionsValues = book.collects
        .map(({ title, issues }) => `(${newBookId}, '${title}', '${issues}')`)
        .join(", ");
      const collectionsQueryText = `
        INSERT INTO books.book_collections (book_id, title, issues)
        VALUES ${collectionsValues};
      `;
      await client.query(collectionsQueryText);
    }

    await client.query("COMMIT");
    console.log("Transaction completed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction failed, rolling back:", error);
  } finally {
    client.release();
  }
};

export const addPeopleQuery = async (people: string) => {
  const peopleInsert = await pool.query(
    `
    INSERT INTO books.people (name)
    VALUES ($1)
    RETURNING id;
    `,
    [people],
  );

  return peopleInsert.rows[0].id;
};

export const getBooksTableItems = async () => {
  const books = await pool.query(
    `
    SELECT id, title FROM books.books
    ORDER BY id DESC
    LIMIT 20;
    `,
  );

  return books.rows;
};

export const getPeopleTableItems = async () => {
  const people = await pool.query(
    `
    SELECT id, name FROM books.people
    ORDER BY id DESC
    LIMIT 20;
  `,
  );

  return people.rows;
};
