"use client";

import React, { useState } from "react";

function AddrInput() {
  const [addr, setAddr] = useState("000");

  return (
    <input
      name=" hello there"
      defaultValue="0x000"
      onChange={(e) => deStringInput(e.target.value)}
    />
  );
}

function deStringInput(input: string) {
  const inputBits = input.split("");
  console.log(inputBits);
  if (inputBits.length > 3) {
    console.log("These where too many values");
    return;
  }
  return inputBits;
}

export default AddrInput;
