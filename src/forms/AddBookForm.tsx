import { addBookQuery } from "@/db/queries";

export default function AddBookForm() {
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
    <form
      action={addBook}
      className="space-y-4 p-6 bg-white shadow-md rounded-lg "
    >
      <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Title</span>
          <input
            type="text"
            name="title"
            className="border p-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Description</span>
          <input
            type="text"
            name="description"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book description"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Page Count</span>
          <input
            type="number"
            name="pageCount"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter page count"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Published</span>
          <input
            type="text"
            name="published"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter publication date"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Latest Republished</span>
          <input
            type="text"
            name="latestRepublished"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter latest republished date"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">ISBN</span>
          <input
            type="text"
            name="isbn"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ISBN"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Authors</span>
          <input
            type="text"
            name="authors"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter authors (separated by semicolons)"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Illustrators</span>
          <input
            type="text"
            name="illustrators"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter illustrators (separated by semicolons)"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Collects</span>
          <input
            type="text"
            name="collects"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter collects (title,issues)"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Book
        </button>
      </div>
    </form>
  );
}
