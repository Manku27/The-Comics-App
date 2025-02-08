import pool from "@/db";
import { IRun } from "@/models/books";

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
        'image', b.image,
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
