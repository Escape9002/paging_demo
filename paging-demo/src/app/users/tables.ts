import page from "./page";
import PageTable from "./PageTable";

export let pageDirectory = new PageTable([
  [0x0, 1, 0, 1, 1],
  [0x1, 0, 1, 0, 1],
  [0x2, 1, 0, 1, 0],
]);

export let pageTables = [
  new PageTable([
    [0x3, 1, 1, 1, 1],
    [0x4, 1, 1, 1, 1],
    [0x5, 1, 1, 1, 1],
  ]),
  new PageTable([
    [0x6, 1, 1, 1, 1],
    [0x7, 1, 1, 1, 1],
    [0x8, 1, 1, 1, 1],
  ]),
  new PageTable([
    [0x9, 1, 1, 1, 1],
    [0xa, 1, 1, 1, 1],
    [0xb, 1, 1, 1, 1],
  ]),
];
