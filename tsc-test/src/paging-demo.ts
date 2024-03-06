import * as readline from "readline";
import { pageTable } from "./Tables";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let pageDirectory = new pageTable([
  [0x0, 1, 1, 1, 1],
  [0x1, 1, 1, 1, 1],
  [0x2, 1, 1, 1, 1],
]);

let pageTables = [
  new pageTable([
    [0x3, 1, 1, 1, 1],
    [0x4, 1, 1, 1, 1],
    [0x5, 1, 1, 1, 1],
  ]),
  new pageTable([
    [0x6, 1, 1, 1, 1],
    [0x7, 1, 1, 1, 1],
    [0x8, 1, 1, 1, 1],
  ]),
  new pageTable([
    [0x9, 1, 1, 1, 1],
    [0xa, 1, 1, 1, 1],
    [0xb, 1, 1, 1, 1],
  ]),
];

let input: number[] = [0, 1, 0, 1, 1, 1, 1];

console.log("input: ", input);

let firstHit: number = pageDirectory.getAddr(
  input[0],
  input[4],
  input[5],
  input[6]
);
console.log(firstHit);

let secondHit: number = pageTables[firstHit as number].getAddr(
  input[1],
  input[4],
  input[5],
  input[6]
);
console.log(secondHit);
let thirdHit: number = input[2];

console.log(firstHit, secondHit, thirdHit);
rl.close();
