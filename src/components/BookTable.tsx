import { IBookTableItem } from "@/models/books";

export default function BookTable({ books }: { books: IBookTableItem[] }) {
  return (
    <div className="my-10">
      <table className="min-w-full border border-white">
        <thead>
          <tr>
            <th className="border border-white p-2">ID</th>
            <th className="border border-white p-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-100">
              <td className="border border-white p-2">{book.id}</td>
              <td className="border border-white p-2">{book.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
