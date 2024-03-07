import React from "react";
interface table {
  table: number[][];
  markedId: number;
}

function PageTablesRender(table: table) {
  const pagetable: number[][] = table.table;
  const markedId: number = table.markedId;

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
          {table.table.map((entry) =>
            markedId === entry[0] ? (
              <tr className="bg-red-400">
                {" "}
                {entry.map((values) => (
                  <td> {values}</td>
                ))}
              </tr>
            ) : (
              <tr>
                {" "}
                {entry.map((values) => (
                  <td> {values}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default PageTablesRender;
