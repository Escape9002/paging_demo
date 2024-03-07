import React from "react";
import PageTablesRender from "./PageTables";
import PageTable from "./Tables";

const UsersPage = () => {
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
    <div>
      <PageTablesRender table={pageDirectory.table} markedId={2} />
    </div>
  );
};

export default UsersPage;
