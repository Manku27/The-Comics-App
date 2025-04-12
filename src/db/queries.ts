import pool from "@/db";
import { IRun } from "@/models/books";
import { IBookInput } from "@/models/input";

export const runQuery = async (runId: number) => {
  const client = await pool.connect();

  try {
    const runInfo = await client.query(
      `
       SELECT 

            r.name,
            json_agg(json_build_object('title', rc.title, 'issues', rc.issues)) AS collects
        FROM 
            runs r 
        LEFT JOIN 
            run_collections rc ON rc.run_id = r.id
        WHERE 
            r.id = $1
        GROUP BY 
            r.id;
        `,
      [runId],
    );

    const runEditions = await client.query(
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
        'coverImage', b.cover_image,
       'authors', (
          SELECT json_agg(json_build_object('id', p.id, 'name', p.name))
          FROM book_authors ba
          JOIN people p ON ba.author_id = p.id
          WHERE ba.book_id = b.id
        ),
        'illustrators', (
          SELECT json_agg(json_build_object('id', p.id, 'name', p.name))
          FROM book_illustrators bi
          JOIN people p ON bi.illustrator_id = p.id
          WHERE bi.book_id = b.id
        ),
        'rating', bs.rating,
        'noOfRatings', bs.no_of_ratings,
        'medianPrice', bs.median_price,
        'collects', (
          SELECT json_agg(json_build_object('title', bc.title, 'issues', bc.issues))
          FROM book_collections bc
          WHERE bc.book_id = b.id
        )
      )
    ) AS list
  FROM run_editions re
  JOIN editions e ON e.id = re.edition_id
  JOIN list_books lb ON lb.list_id = e.list_id
  JOIN books b ON b.id = lb.book_id
  LEFT JOIN book_stats bs ON bs.book_id = b.id
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
  } catch (error) {
    console.error("Error in runQuery:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const addBookQuery = async (book: IBookInput) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Insert book and get new book ID
    const bookInsert = await client.query(
      `
        INSERT INTO books (title, description, page_count, published_date, latest_republish_date, isbn13)
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
        INSERT INTO book_authors (book_id, author_id)
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
        INSERT INTO book_illustrators (book_id, illustrator_id)
        VALUES ${illustratorsValues};
      `;
      await client.query(illustratorsQueryText);
    }

    // Stats insertion
    await client.query(
      `
        INSERT INTO book_stats (book_id)
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
        INSERT INTO book_collections (book_id, title, issues)
        VALUES ${collectionsValues};
      `;
      await client.query(collectionsQueryText);
    }

    await client.query("COMMIT");
  } catch (error) {
    console.error("Error in addBookQuery:", error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const addPeopleQuery = async (people: string) => {
  try {
    const peopleInsert = await pool.query(
      `
    INSERT INTO people (name)
    VALUES ($1)
    RETURNING id;
    `,
      [people],
    );

    return peopleInsert.rows[0].id;
  } catch (error) {
    console.error("Error in addPeopleQuery:", error);
    throw error;
  }
};

export const getBooksTableItems = async () => {
  try {
    const books = await pool.query(
      `
    SELECT id, title FROM books
    ORDER BY id DESC
    LIMIT 20;
    `,
    );

    return books.rows;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getPeopleTableItems = async () => {
  try {
    const people = await pool.query(
      `
    SELECT id, name FROM people
    ORDER BY id DESC
    LIMIT 20;
  `,
    );

    return people.rows;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};

export const addRunQuery = async (run: any) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const editionIds = [];

    for (const edition of run.editions) {
      // create new list
      const newListEntry = await client.query(
        `INSERT INTO lists DEFAULT VALUES
         RETURNING id;`,
      );
      const newListId = newListEntry.rows[0].id;

      // add books to list
      const books = edition.split(",");
      for (const book of books) {
        await client.query(
          `INSERT INTO list_books (list_id, book_id)
           VALUES ($1, $2);`,
          [newListId, book],
        );
      }

      //  create edition
      const newEditionEntry = await client.query(
        `INSERT INTO editions (list_id, type, cover_type)
         VALUES ($1, $2, $3);`,
        [newListId, edition.type, edition.coverType],
      );
      const newEditionId = newEditionEntry.rows[0].id;
      editionIds.push(newEditionId);
    }

    // create run
    const newRunEntry = await client.query(
      `INSERT INTO runs (name, description, year, period, event)
       VALUES ($1, $2, $3, $4, $5);`,
      [run.name, run.description, run.year, run.period, run.event],
    );
    const newRunId = newRunEntry.rows[0].id;

    // add editions to run
    for (const editionId of editionIds) {
      await client.query(
        `INSERT INTO run_editions (run_id, edition_id)
         VALUES ($1, $2);`,
        [newRunId, editionId],
      );
    }

    for (const collect of run.collects) {
      await client.query(
        `INSERT INTO run_collections (run_id, title, issues)
         VALUES ($1, $2, $3);`,
        [newRunId, collect.title, collect.issues],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    console.error("Error in addRunQuery:", error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
