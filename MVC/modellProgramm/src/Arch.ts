export default class Arch {
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
    if (vaddr.length < this.offsetSize + this.idxSize) {
      return false;
    }
    if (vaddr.length > this.offsetSize + this.idxSize) {
      return false;
    }
    return true;
  }
}
