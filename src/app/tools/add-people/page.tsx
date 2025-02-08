import { addBookQuery, addPeopleQuery } from "@/db/queries";

export default function AddBook() {
  async function addBook(formData: FormData) {
    "use server";
    addPeopleQuery(formData.get("name") as string);
  }

  return (
    <form action={addBook} className="space-y-4">
      <div className="flex flex-col gap-2 m-10">
        <input
          type="text"
          name="name"
          className="border p-2 rounded"
          placeholder="Name"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add People
        </button>
      </div>
    </form>
  );
}
