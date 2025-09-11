import React from "react";
import PropTypes from "prop-types";

const users = [
  { id: 1, name: "Ravi Kumar", email: "ravi.kumar@example.com", joiningDate: "2023-10-10" },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@example.com", joiningDate: "2023-09-15" },
  { id: 3, name: "Amit Verma", email: "amit.verma@example.com", joiningDate: "2023-08-21" },
  { id: 4, name: "Neha Gupta", email: "neha.gupta@example.com", joiningDate: "2023-07-30" },
  { id: 5, name: "Rajesh Singh", email: "rajesh.singh@example.com", joiningDate: "2023-11-02" },
  { id: 6, name: "Simran Kaur", email: "simran.kaur@example.com", joiningDate: "2023-06-12" },
  { id: 7, name: "Ankit Yadav", email: "ankit.yadav@example.com", joiningDate: "2023-05-25" },
  { id: 8, name: "Kiran Patel", email: "kiran.patel@example.com", joiningDate: "2023-04-18" },
  { id: 9, name: "Deepak Joshi", email: "deepak.joshi@example.com", joiningDate: "2023-03-27" },
  { id: 10, name: "Sneha Nair", email: "sneha.nair@example.com", joiningDate: "2023-02-10" },
  { id: 11, name: "Mohit Mehra", email: "mohit.mehra@example.com", joiningDate: "2023-01-29" },
  { id: 12, name: "Pooja Reddy", email: "pooja.reddy@example.com", joiningDate: "2022-12-14" },
  { id: 13, name: "Vikas Dubey", email: "vikas.dubey@example.com", joiningDate: "2022-11-08" },
  { id: 14, name: "Shreya Roy", email: "shreya.roy@example.com", joiningDate: "2022-10-05" },
  { id: 15, name: "Aditya Jain", email: "aditya.jain@example.com", joiningDate: "2022-09-01" },
  { id: 16, name: "Meena Das", email: "meena.das@example.com", joiningDate: "2022-08-20" },
  { id: 17, name: "Arjun Malhotra", email: "arjun.malhotra@example.com", joiningDate: "2022-07-11" },
  { id: 18, name: "Sunita Mishra", email: "sunita.mishra@example.com", joiningDate: "2022-06-03" },
  { id: 19, name: "Harsh Agarwal", email: "harsh.agarwal@example.com", joiningDate: "2022-05-17" },
  { id: 20, name: "Nisha Khan", email: "nisha.khan@example.com", joiningDate: "2022-04-22" },
];

const Users = (props) => {
  return (
    <div className="flex flex-1 flex-col p-6">
      {/* Scroll container */}
      <div className="overflow-y-auto max-h-[85vh] border rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left">No.</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Joining Date</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.joiningDate}</td>
                <td className="px-6 py-3 text-red-500 cursor-pointer">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Users.propTypes = {};

export default Users;
