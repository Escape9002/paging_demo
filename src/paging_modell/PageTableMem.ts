import {MMUError} from '../state_controller/commands';
import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';

export default class PageTableMem {
  ptMapping: PageTable[];
  constructor(ptMapping: PageTable[]) {
    this.ptMapping = ptMapping;
  }

  getAddr(mem_offset: number): PageTable | MMUError {
    let wantedPt: PageTable | undefined = this.ptMapping[mem_offset];
    if (wantedPt != undefined) {
      return wantedPt;
    }

    return new MMUError({
      name: 'NO_PAGE_TABLE',
      message: 'For this MEMOFFSET no PageDirectory was found',
    });
  }
}
