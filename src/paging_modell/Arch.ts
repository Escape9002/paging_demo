import {MMUError} from '../state_controller/commands';

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
    let vAddrCheck = undefined;
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
