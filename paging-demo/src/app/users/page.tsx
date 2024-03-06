import React from "react";
import { pageTable } from "./Tables";

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
  let pageDirectory = new pageTable([
    [0x0, 1, 1, 1, 1],
    [0x1, 1, 1, 1, 1],
    [0x2, 1, 1, 1, 1],
  ]);

  let pageTables = [
    new pageTable([
      [0x3, 1, 1, 1, 1],
      [0x4, 1, 1, 1, 1],
      [0x5, 1, 1, 1, 1],
    ]),
    new pageTable([
      [0x6, 1, 1, 1, 1],
      [0x7, 1, 1, 1, 1],
      [0x8, 1, 1, 1, 1],
    ]),
    new pageTable([
      [0x9, 1, 1, 1, 1],
      [0xa, 1, 1, 1, 1],
      [0xb, 1, 1, 1, 1],
    ]),
  ];

  const pageEntries = [];
  const FlagSize = pageDirectory.entries[0].length;
  for (let i = 0; i < pageDirectory.entries.length; i++) {
    pageEntries.push(
      <tr>
        <td>{pageDirectory.entries[i][0]}</td>
        <td>{pageDirectory.entries[i][1]}</td>
        <td>{pageDirectory.entries[i][2]}</td>
        <td>{pageDirectory.entries[i][3]}</td>
        <td>{pageDirectory.entries[i][4]}</td>
        <td>{pageDirectory.entries[i][5]}</td>
      </tr>
    );
  }
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
        <tbody>{pageEntries}</tbody>
      </table>
    </>
  );
};

export default UsersPage;
