/*
[
  addr, 
  user(1)||kernel(0),
  read(1||0),
  write(1||0),
  persistent(1||o)
 ]
*/

class PageTable {
  table: number[][];

  constructor(entries: number[][]) {
    this.table = entries;
  }

  public getTable(): number[][] {
    return this.table;
  }

  public getAddr(addr: number, mode: number, r: number, w: number): number {
    if (!this.checkPersistent(addr)) {
      console.log("failed persitency check");
      return 0xffffff;
    }

    if (!this.checkAccessMode(addr, mode)) {
      console.log("failed User mode check");
      return 0xfffffff;
    }

    if (!this.checkRW(addr, r, w)) {
      console.log("failed RW check");
      return 0xffffff;
    }

    return this.table[addr][0];
  }

  checkPersistent(addr: number): boolean {
    // check peristent byte
    if (this.table[addr][4]) {
      return true;
    }
    return false;
  }

  checkAccessMode(addr: number, mode: number): boolean {
    // check access mode is correct
    if (this.table[addr][1] === mode) {
      return true;
    }
    return false;
  }

  checkRW(addr: number, r: number, w: number): boolean {
    // check read byte
    if (this.table[addr][3] === r) {
      return true;
    }

    // check write byte
    if (this.table[addr][4] === w) {
      return true;
    }
    return false;
  }
}

export default PageTable;
