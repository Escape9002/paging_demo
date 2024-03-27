import Arch from './Arch';
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
    let splitVAddr: number[] = [];

    for (let i = 0; i < this.arch.level; i++) {
      splitVAddr.push(
        vaddr.substring(
          i * this.arch.idxSize - 1,
          i * this.arch.idxSize + this.arch.idxSize - 1
        ) as unknown as number
      );
    }
    return splitVAddr;
  }
}
