// "use client";
import React from "react";

interface table {
  tableName: number | string;
  table: number[][];
  markedId: number;
}

function TableRenderer(table: table) {
  const tableName: number | string = table.tableName;
  const pagetable: number[][] = table.table;
  const markedId: number = table.markedId;

  return (
    <>
      <h1>{tableName}</h1>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th>addr</th>
            <th>user</th>
            <th>read</th>
            <th>write</th>
            <th>persistentant</th>
          </tr>
        </thead>
        <tbody>
          {pagetable.map((entry, index) => (
            <tr key={index}>
              {entry.map((value, subIndex) => (
                <td
                  key={subIndex}
                  className={markedId === entry[0] ? "bg-red-400" : ""}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableRenderer;
