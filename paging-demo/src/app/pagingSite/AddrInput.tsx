"use client";

import React, { useState } from "react";

interface props {
  bitAddr: number[];
  mode: number;
}

function AddrInput(props: props) {
  const [bitAddr, setBitAddr] = useState(props.bitAddr);
  const [mode, setMode] = useState(props.mode);

  const [addr, setAddr] = useState("000");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deStringInput(addr);
      }}
    >
      <p>
        0x
        <input
          name="addrField"
          type="virtual Address"
          placeholder="000"
          className="input input-bordered w-full max-w-xs"
          required
          defaultValue={"000"}
          onChange={(e) => setAddr(e.target.value)}
        />
      </p>
      <select className="select select-bordered w-full max-w-xs">
        <option>User</option>
        <option>Kernel</option>
      </select>
      <button>Send</button>
    </form>
  );

  function deStringInput(input: string) {
    const userInput = input.split("");

    if (userInput.length > 3) {
      console.log("These where too many values");
      return;
    }

    console.log(userInput);
    setBitAddr(userInput as unknown as number[]);

    return userInput;
  }
}

export default AddrInput;
