import { useUsers } from "../contexts/UserContext";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];

export default function Users() {
  const { users, isLoadingUsers, usersError } = useUsers();
  if(isLoadingUsers) return <p>Loading users....</p>
  if(usersError) return <p>There was an error </p>
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-white">Users</h1>
          <p className="mt-2 text-sm text-gray-300">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
         
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-white/15">
              <thead className='text-[#fcae1e]'>
                <tr className="divide-x divide-white/10">
                  <th
                    scope="col"
                    className="py-3.5 text-[#fcae1e] pr-4 pl-4 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                   First Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm text-[#fcae1e] font-semibold text-white"
                  >
                    Second Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm text-[#fcae1e] font-semibold text-white"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pr-4 pl-4 text-left text-sm  text-[#fcae1e] font-semibold text-white sm:pr-0"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-gray-900">
                {users.map((person) => (
                  <tr key={person._id} className="divide-x divide-white/10  ">
                    <td className="py-4 pr-4 pl-4  text-sm font-medium whitespace-nowrap text-white sm:pl-4">
                      {person.firstName}
                    </td>
                    <td className="p-4 text-sm whitespace-nowrap text-gray-300">
                      {person.secondName}
                    </td>
                    <td className="p-4 text-sm whitespace-nowrap text-gray-300">
                      {person.email}
                    </td>
                    {
                      person?.role === 'admin' ? <td className="py-4 pr-4 pl-4 text-sm whitespace-nowrap text-green-400 sm:pr-0">
                      {person.role}
                    </td> : <td className="py-4 pr-4 pl-4 text-sm whitespace-nowrap text-gray-300 sm:pr-0">
                      {person.role}
                    </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
