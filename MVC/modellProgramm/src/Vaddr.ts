import Arch from './arch/Arch';
import PageTableMem from './PageTableMem';
import {flags} from './flags';
export default class Vaddr {
  arch: Arch;
  ptMem: PageTableMem;
  constructor(arch: Arch, ptMem: PageTableMem) {
    this.arch = arch;
    this.ptMem = ptMem;
  }

  getOffset() {
    return this.arch.mem_offset;
  }

  getIdx(mem_offset: number, vaddr: number, flags: flags) {
    // return this.ptMem.getAddr(mem_offset, vaddr, flags);
  }

  parseUserInput(vaddr: string): number[] {
    let splitVAddr: Array<number> = [];

    for (let i = 0; i < this.arch.level + 1; i++) {
      let vaddrStr: string = vaddr.substring(
        i * this.arch.idxSize,
        i * this.arch.idxSize + this.arch.idxSize
      );

      let vaddrNumber: number = parseInt(vaddrStr, 16);

      splitVAddr.push(vaddrNumber);
    }
    return splitVAddr;
  }
}
