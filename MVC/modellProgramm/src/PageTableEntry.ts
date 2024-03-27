import {flags} from './flags';
export default class PageTableEntry {
  flags: flags;
  addr: number;
  constructor(addr: number, flags: flags) {
    this.flags = flags;
    this.addr = addr;
  }

  resolve(flags: flags) {
    if ((flags = flags)) {
      return this.addr;
    }
    return null;
  }
}
