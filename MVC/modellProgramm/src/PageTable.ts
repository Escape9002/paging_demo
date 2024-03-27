import PageTableEntry from './PageTableEntry';

export default class PageTable {
  entries: PageTableEntry[];

  constructor(ptEntries: PageTableEntry[]) {
    this.entries = ptEntries;
  }

  resolve(vaddr: number): PageTableEntry {
    try {
      let entry = this.entries[vaddr];

      return entry;
    } catch (e) {
      console.log(e);
      return new PageTableEntry(0x000, {
        write: false,
        read: false,
        present: false,
        user: 0,
      });
    }
  }
}
