"use client";
import React from "react";
import TableRenderer from "./TableRenderer";
import PageTable from "./PageTable";

interface props {
  pageDirectory: PageTable;
  pageTables: PageTable[];
  accessBits: {
    addr: number[];
    mode: number;
    r: number;
    w: number;
  };
}

function PageTableView(props: props) {
  const pageDirectory = props.pageDirectory;
  const pageTables = props.pageTables;

  const addr: number[] = props.accessBits.addr;
  const mode: number = props.accessBits.mode;
  const r: number = props.accessBits.r;
  const w: number = props.accessBits.w;

  const pageDirHit = pageDirectory.getAddr(addr[0], mode, r, w);
  const pageTableHit = pageTables[pageDirHit].getAddr(addr[1], mode, r, w);
  const pageShift = addr[2];

  return (
    <div className=" p-2 flex flex-col">
      <div className="p-2 border border-spacing-4 border-4 border-red-900">
        <TableRenderer
          tableName="Page Directory"
          table={pageDirectory.table}
          markedId={pageDirHit}
        />
      </div>

      <div className="pl-10 flex flex-row border border-spacing-4 border-4 border-sky-800">
        <div>
            <p>PageTables</p>
          <div>
            {pageTables.map((table, index) => (
              <div key={index} className="flex flex-col">
                <TableRenderer
                  tableName={index + 1}
                  table={table.table}
                  markedId={pageTableHit}
                />
              </div>
            ))}
          </div>  
        </div>
      </div>

      <div>
        <p>
          {" "}
          You found: {pageDirHit}
          {pageTableHit}
          {pageShift}
        </p>
      </div>
    </div>
  );
}

export default PageTableView;
