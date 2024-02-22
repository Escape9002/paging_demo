"use strict";
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
let userInput = "000";
let handInAdresses = userInput.split("");
let addressBits = [0, 0, 0];
for (let i = 0; i < handInAdresses.length; i++) {
    addressBits[i] = handInAdresses[i];
}
let firstHit = pageDirectory[addressBits[0]][0];
let secondHit = pageTables[addressBits[firstHit]][addressBits[1]][0];
let thirdHit = addressBits[2];
console.log(firstHit, secondHit, thirdHit);
//# sourceMappingURL=paging-demo.js.map