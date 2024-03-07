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
    <div className=" p-2 flex flex-row">
      <div className="p-2 border border-red-900">
        <TableRenderer
          tableName="Page Dir"
          table={pageDirectory.table}
          markedId={2}
        />
      </div>

      <div className="pl-10 border border-sky-800">
        <table className="table table-auto table-bordered w-auto">
          <thead>
            <tr>
              <th>PageTables</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {pageTables.map((table) => (
                <td>
                  <TableRenderer
                    tableName={table.table[0][0].toString()}
                    table={table.table}
                    markedId={5}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PageTableView;
