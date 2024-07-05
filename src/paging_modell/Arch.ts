import {MMUError} from '../state_controller/commands';

interface BitsArchType {
  [key: number]: { offsetSize: number; idxSize: number };
}
const BitsArch: BitsArchType = {
  11: {offsetSize: 3, idxSize: 4},
  32: {offsetSize: 12, idxSize: 10},
  64: {offsetSize: 20, idxSize: 22},
};

class Arch {
  bits: number;
  offsetSize: number;
  idxSize: number;
  mem_offset: number;
  level: number;

  constructor(bits: number,  mem_offset: number, level: number) {
    this.bits = bits;
    this.mem_offset = mem_offset;
    this.level = level;

  

    const config = BitsArch[bits];
    if (!config) {
      throw new Error(`Unsupported architecture: ${bits}`);
    }

    this.offsetSize = config.offsetSize;
    this.idxSize = config.idxSize;
  }

  getPageLevel(): number {
    if ((this, this.level != undefined)) {
      return this.level;
    }
    throw new MMUError({
      name: 'NO_PAGETABLE_DEPTH',
      message: 'could not load pagetable depth from Arch',
    });
  }
  getBits(): number {
    if (this.bits != undefined) {
      return this.bits;
    }

    throw new MMUError({
      name: 'NO_BITS_CONFIG',
      message: 'could not load arch-bits from Arch',
    });
  }

  getMemOffset(): number {
    if (this.mem_offset != undefined) {
      return this.mem_offset;
    }

    throw new MMUError({
      name: 'NO_MEM_OFFSET',
      message: 'There is no MemOffset defined to find the first PageTable',
    });
  }

  validUserInput(vaddr: string) {
    vaddr.trim();
    // let vAddrCheck = undefined;
    if (vaddr.length < this.offsetSize + this.idxSize * this.level) {
      throw new MMUError({
        name: 'WRONG_VADDR',
        message: 'vAddr too small',
      });
    }
    if (vaddr.length > this.offsetSize + this.idxSize * this.level) {
      throw new MMUError({
        name: 'WRONG_VADDR',
        message: 'vAddr too big',
      });
    }
  }
}

export default Arch;
