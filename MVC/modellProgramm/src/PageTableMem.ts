import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';

export default class PageTableMem {
  ptMapping: PageTable[];
  constructor(ptMapping: PageTable[]) {
    this.ptMapping = ptMapping;
  }

  getAddr(mem_offset: number) {
    try {
      let wantedPt = this.ptMapping[mem_offset];
      return wantedPt;
    } catch (e) {
      console.log(e);
      return new PageTable([
        new PageTableEntry(0x000, {
          write: false,
          read: false,
          present: false,
          user: 0,
        }),
      ]);
    }
  }
}
