import React from "react";
import PageTable from "./Tables";

interface User {
  id: number;
  name: string;
  username: string;
  address: any;
  email: string;
  phone: any;
  website: any;
  company: any;
}

const UsersPage = async () => {
  let pageDirectory = new PageTable([
    [0x0, 1, 0, 1, 1],
    [0x1, 0, 1, 0, 1],
    [0x2, 1, 0, 1, 0],
  ]);

  let pageTables = [
    new PageTable([
      [0x3, 1, 1, 1, 1],
      [0x4, 1, 1, 1, 1],
      [0x5, 1, 1, 1, 1],
    ]),
    new PageTable([
      [0x6, 1, 1, 1, 1],
      [0x7, 1, 1, 1, 1],
      [0x8, 1, 1, 1, 1],
    ]),
    new PageTable([
      [0x9, 1, 1, 1, 1],
      [0xa, 1, 1, 1, 1],
      [0xb, 1, 1, 1, 1],
    ]),
  ];

  return (
    <>
      <h1>Page Directory</h1>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th>addr</th>
            <th>user</th>
            <th>read</th>
            <th>write</th>
            <th>persistent</th>
          </tr>
        </thead>
        <tbody>
          {pageDirectory.table.map((entry) => (
            <tr>
              {" "}
              {entry.map((values) => (
                <td> {values}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
