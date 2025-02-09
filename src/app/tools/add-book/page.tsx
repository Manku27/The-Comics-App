import AddBookForm from "@/forms/AddBookForm";
import { getBooksTableItems } from "@/db/queries";
import BookTable from "@/components/BookTable";

export default async function AddBook() {
  const books = await getBooksTableItems();
  return (
    <div className="m-20">
      <AddBookForm />
      <BookTable books={books} />
    </div>
  );
}
