import { IPeopleTableItem } from "@/models/books";

export default function PeopleTable({
  people,
}: {
  people: IPeopleTableItem[];
}) {
  return (
    <div className="my-10">
      <table className="min-w-full border border-white">
        <thead>
          <tr>
            <th className="border border-white p-2">ID</th>
            <th className="border border-white p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} className="hover:bg-gray-100">
              <td className="border border-white p-2">{person.id}</td>
              <td className="border border-white p-2">{person.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
