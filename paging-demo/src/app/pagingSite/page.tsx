"use client";

import React, { useState } from "react";
import AddrInput from "./AddrInput";
import PageTableView from "./PageTableView";
import { pageDirectory, pageTables } from "./tables";

function page() {
  return (
    <div>
      <div className=" border border-spacing-4 border-4 border-yellow-500">
        <AddrInput />
      </div>
      <div className="border border-spacing-4 border-4 border-green-500">
        <PageTableView
          pageDirectory={pageDirectory}
          pageTables={pageTables}
          accessBits={{ addr: [0, 0, 0], mode: 1, r: 1, w: 1 }}
        />
      </div>
    </div>
  );
}

export default page;
