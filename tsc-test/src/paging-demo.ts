let pageDirectory = [
  [0x0, "u", "rw", "p"],
  [0x1, "u", "rw", "p"],
  [0x2, "u", "rw", "p"],
];

let pageTables = [
  [
    [0x3, "u", "rw", "p"],
    [0x4, "u", "rw", "p"],
    [0x5, "u", "rw", "p"],
  ],
  [
    [0x6, "u", "rw", "p"],
    [0x7, "u", "rw", "p"],
    [0x8, "u", "rw", "p"],
  ],
  [
    [0x9, "u", "rw", "p"],
    [0xa, "u", "rw", "p"],
    [0xb, "u", "rw", "p"],
  ],
];

let userInput: string = "000";
let handInAdresses: string[] = userInput.split("");
let addressBits: number[] = [0, 0, 0];
for (let i = 0; i < handInAdresses.length; i++) {
  addressBits[i] = handInAdresses[i] as unknown as number;
}

let firstHit: number = pageDirectory[addressBits[0]][0] as number;
let secondHit: number = pageTables[addressBits[firstHit]][
  addressBits[1]
][0] as number;
let thirdHit: number = addressBits[2];

console.log(firstHit, secondHit, thirdHit);
