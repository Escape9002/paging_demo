import React from "react";
import PageTableView from "./PageTableView";
import { pageDirectory, pageTables } from "./tables";

function page() {
  return (
    <div>
      <PageTableView pageDirectory={pageDirectory} pageTables={pageTables} />
    </div>
  );
}

export default page;
