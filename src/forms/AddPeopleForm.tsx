import { addPeopleQuery } from "@/db/queries";

export default function AddPeopleForm() {
  async function addBook(formData: FormData) {
    "use server";
    addPeopleQuery(formData.get("name") as string);
  }

  return (
    <form
      action={addBook}
      className="space-y-4 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Add a New Person</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Name</span>
          <input
            type="text"
            name="name"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter person's name"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Person
        </button>
      </div>
    </form>
  );
}
