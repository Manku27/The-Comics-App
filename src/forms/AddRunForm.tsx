export default function AddRunForm() {
  async function addRun(formData: FormData) {
    "use server";

    const preparedFormData: any = {
      name: formData.get("name") || null,
      description: formData.get("description") || null,
      year: formData.get("year") || null,
      period: formData.get("period") || null,
      event: formData.get("event") || null,
      editions: [],
      collects: [],
    };

    const editionsInput = formData.get("editions");
    if (editionsInput) {
      (editionsInput as string).split(";").forEach((edition) => {
        const [type, coverType, books] = edition.split(",");
        preparedFormData.editions.push({ type, coverType, books });
      });
    }

    const collectsInput = formData.get("collects");
    if (collectsInput) {
      (collectsInput as string).split(";").forEach((collect) => {
        const [title, issues] = collect.split(",");
        preparedFormData.collects.push({ title, issues });
      });
    }

    console.log("preparedFormData", preparedFormData);

    // addRunQuery(preparedFormData);
  }

  return (
    <form
      action={addRun}
      className="space-y-4 p-6 bg-white shadow-md rounded-lg "
    >
      <h2 className="text-xl font-semibold mb-4">Add a New Run</h2>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Title</span>
          <input
            type="text"
            name="name"
            className="border p-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter run name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Description</span>
          <input
            type="text"
            name="description"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter run description"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Year</span>
          <input
            type="number"
            name="year"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter year"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Period</span>
          <input
            type="text"
            name="period"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter period"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Event</span>
          <input
            type="text"
            name="event"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Run collects</span>
          <textarea
            name="collects"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter collects (separated by semicolons)"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Editions</span>
          <textarea
            name="editions"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter editions (separated by semicolons)"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Run
        </button>
      </div>
    </form>
  );
}
