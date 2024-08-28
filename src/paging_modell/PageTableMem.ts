import {MMUError} from '../state_controller/commands';
import MMU from './MMU';
import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';

export default class PageTableMem {
  ptMapping: PageTable[];
  constructor(ptMapping: PageTable[]) {
    this.ptMapping = ptMapping;
  }

  getAddr(mem_offset: number): PageTable {
    let wantedPt: PageTable | undefined = this.ptMapping[mem_offset];
    if (wantedPt != undefined) {
      return wantedPt;
    }

    throw new MMUError({
      name: 'NO_PAGETABLE',
      message: 'For this MEMOFFSET no PageDirectory was found',
    });
  }

  getMem(): PageTable[] {
    if (this.ptMapping != undefined) {
      return this.ptMapping;
    }

    throw new MMUError({
      name: 'NO_PAGETABLE_MEM',
      message: 'Failed to load PageTableMemory',
    });
  }
}
