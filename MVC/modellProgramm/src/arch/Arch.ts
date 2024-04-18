import PageTable from '../PageTable';
import PageTableEntry from '../PageTableEntry';
import {PageDirectory} from './PageDirectory';
import {ptTable_1, ptTable_2, ptTable_3} from './PageTables';

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

export {PageDirectory, ptTable_1, ptTable_2, ptTable_3};
export {arch};
export default Arch;
