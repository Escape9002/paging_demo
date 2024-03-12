"use client";

import React, { useState } from "react";

function AddrInput() {
  const [addr, setAddr] = useState("000");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deStringInput(addr);
      }}
    >
      <input
        name="addrField"
        type="virtual Address"
        placeholder="0x000"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setAddr(e.target.value)}
      />
      <select className="select select-bordered w-full max-w-xs">
        <option>User</option>
        <option>Kernel</option>
      </select>
      <button>Send</button>
    </form>
  );
}

function deStringInput(input: string) {
  const userInput = input.split("");

  if (userInput.length > 5) {
    console.log("These where too many values");
    return;
  }

  let inputBits: number[] = [];
  for (let i = 2; i < userInput.length; i++) {
    inputBits.push(userInput[i] as unknown as number);
  }

  console.log(inputBits);
  return inputBits;
}

export default AddrInput;
