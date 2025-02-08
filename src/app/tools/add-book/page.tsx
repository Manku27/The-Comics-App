import { addBookQuery } from "@/db/queries";

export default function AddBook() {
  async function addBook(formData: FormData) {
    "use server";

    const preparedFormData: any = {
      title: formData.get("title") || null,
      description: formData.get("description") || null,
      pageCount: formData.get("pageCount") || null,
      published: formData.get("published") || null,
      latestRepublished: formData.get("latestRepublished") || null,
      isbn: formData.get("isbn") || null,
      authors: formData.get("authors")?.toString().split(";") ?? [],
      illustrators: formData.get("illustrators")?.toString().split(";") || [],
      collects: [],
    };

    const collectsInput = formData.get("collects");
    if (collectsInput) {
      (collectsInput as string).split(";").forEach((collect) => {
        const [title, issues] = collect.split(",");
        preparedFormData.collects.push({ title, issues });
      });
    }

    addBookQuery(preparedFormData);
  }

  return (
    <form action={addBook} className="space-y-4">
      <div className="flex flex-col gap-2 m-10">
        <input
          type="text"
          name="title"
          className="border p-2 rounded"
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          className="border p-2 rounded"
          placeholder="Description"
        />
        <input
          type="number"
          name="pageCount"
          className="border p-2 rounded"
          placeholder="Page Count"
        />
        <input type="text" name="published" className="border p-2 rounded" />
        <input
          type="text"
          name="latestRepublished"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          className="border p-2 rounded"
          placeholder="ISBN"
        />
        <input
          type="text"
          name="authors"
          className="border p-2 rounded"
          placeholder="Authors"
        />
        <input
          type="text"
          name="illustrators"
          className="border p-2 rounded"
          placeholder="Illustrators"
        />
        <input
          type="text"
          name="collects"
          className="border p-2 rounded"
          placeholder="Collects"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Book
        </button>
      </div>
    </form>
  );
}
