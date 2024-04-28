import {MMUError} from '../state_controller/commands';
import PageTableEntry from './PageTableEntry';

export default class PageTable {
  entries: PageTableEntry[];

  constructor(ptEntries: PageTableEntry[]) {
    this.entries = ptEntries;
  }

  resolve(vaddr: number): PageTableEntry {
    let entry = this.entries[vaddr];
    if (entry != undefined) {
      return entry;
    }

    throw new MMUError({
      name: 'NO_PAGE_TABLE',
      message: 'For the given VADDR, no PageTable was found.',
    });
  }
}
