import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';

class Arch {
  offsetSize: number;
  idxSize: number;
  mem_offset: number;
  level: number;

  constructor(
    idxSize: number,
    offsetSize: number,
    mem_offset: number,
    level: number
  ) {
    this.offsetSize = offsetSize;
    this.idxSize = idxSize;
    this.mem_offset = mem_offset;
    this.level = level;
  }

  validUserInput(vaddr: string) {
    vaddr.trim();
    if (vaddr.length < this.offsetSize + this.idxSize * this.level) {
      return false;
    }
    if (vaddr.length > this.offsetSize + this.idxSize * this.level) {
      return false;
    }
    return true;
  }
}

let arch = new Arch(
  4, // idx size (bits)
  3, // offsetsize (bits)
  0x0000, // memoffset
  2 // page-levels
);

let ptEntries = [];
ptEntries[0x0000] = new PageTableEntry(0x4000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x0001] = new PageTableEntry(0x5100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x0002] = new PageTableEntry(0x6200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
const PageDirectory = new PageTable(ptEntries);

ptEntries = [];
ptEntries[0x4000] = new PageTableEntry(0x4000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x4200] = new PageTableEntry(0x4100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x4300] = new PageTableEntry(0x4200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
const ptTable_1 = new PageTable(ptEntries);

ptEntries = [];
ptEntries[0x5000] = new PageTableEntry(0x5000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x5200] = new PageTableEntry(0x5100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x5300] = new PageTableEntry(0x5200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
const ptTable_2 = new PageTable(ptEntries);

ptEntries = [];
ptEntries[0x6000] = new PageTableEntry(0x6000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x6200] = new PageTableEntry(0x6100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x6300] = new PageTableEntry(0x6200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
const ptTable_3 = new PageTable(ptEntries);

export {PageDirectory, ptTable_1, ptTable_2, ptTable_3};
export {arch};
export default Arch;
