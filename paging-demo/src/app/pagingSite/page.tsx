"use client";

import React, { useContext, useState } from "react";
import AddrInput from "./AddrInput";
import PageTableView from "./PageTableView";
import { pageDirectory, pageTables } from "./tables";

function page() {
  const [virtAddrBits, setvirtAddrBits] = useState([1, 1, 0]);
  const [virtMode, setvirtMode] = useState(1);

  return (
    <div>
      <div className=" border border-spacing-4 border-4 border-yellow-500">
        <AddrInput />
      </div>

      <div className="border border-spacing-4 border-4 border-green-500">
        <PageTableView
          pageDirectory={pageDirectory}
          pageTables={pageTables}
          accessBits={{ addr: virtAddrBits, mode: virtMode, r: 1, w: 1 }}
        />
      </div>
    </div>
  );

  function AddrInput() {
    let addr = "";
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitInput(addr);
        }}
        className="flex flex-row"
      >
        <p>
          0x
          <input
            name="addrField"
            type="virtual Address"
            placeholder="000"
            className="input input-bordered w-full max-w-xs"
            required
            defaultValue={virtAddrBits.toString().replaceAll(",", "")}
            onChange={(e) => {
              addr = e.target.value;
            }}
          />
        </p>

        <button>Send</button>
      </form>
    );

    function submitInput(input: string) {
      const userInput = input.split("");

      let addrBits: number[] = [];
      let mode: number = 1;
      let r: number = 1;
      let w: number = 1;

      addrBits = [];

      for (let i = 0; i < 3; i++) {
        addrBits.push(userInput[i] as unknown as number);
      }
      mode = userInput[3] as unknown as number;
      r = userInput[4] as unknown as number;
      w = userInput[5] as unknown as number;

      setvirtAddrBits(addrBits);
      setvirtMode(mode);
      console.log(virtAddrBits, "mode: ", virtMode, " | ", r, w);
      console.log(addrBits, "mode: ", mode, " || ", r, w);
      return userInput;
    }
  }
}

export default page;
