import {MMUError} from '../state_controller/commands';
import {flags} from './flags';

export default class PageTableEntry {
  flags: flags;
  addr: number;
  constructor(addr: number, flags: flags) {
    this.flags = flags;
    this.addr = addr;
  }

  resolve(flags: flags): number | MMUError {
    if ((flags = flags)) {
      return this.addr;
    }

    return new MMUError({
      name: 'FALSE_FLAGS',
      message: 'You lack permission to acces this.',
    });
  }
}
