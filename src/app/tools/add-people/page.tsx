import PeopleTable from "@/components/PeopleTable";
import { getPeopleTableItems } from "@/db/queries";
import AddPeopleForm from "@/forms/AddPeopleForm";

export default async function AddPeople() {
  const people = await getPeopleTableItems();
  return (
    <div className="m-20">
      <AddPeopleForm />
      <PeopleTable people={people} />
    </div>
  );
}
