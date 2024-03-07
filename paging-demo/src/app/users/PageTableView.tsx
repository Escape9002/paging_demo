import React from "react";
import TableRenderer from "./TableRenderer";
import PageTable from "./PageTable";
import { pageDirectory } from "./tables";

interface props {
  pageDirectory: PageTable;
  pageTables: PageTable[];
}

function PageTableView(props: props) {
  const pageDirectory = props.pageDirectory;
  const pageTables = props.pageTables;
  return (
    <>
      <div>
        <TableRenderer
          tableName="Page Dir"
          table={pageDirectory.table}
          markedId={2}
        />
      </div>

      <div>
        <div className="table table-bordered w-auto">
          <h1> PageTables</h1>
          {pageTables.map((table) => (
            <TableRenderer tableName="" table={table.table} markedId={5} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PageTableView;
