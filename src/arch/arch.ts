import PageTable from '../paging_modell/PageTable';
import PageTableMem from '../paging_modell/PageTableMem';
import Arch from '../paging_modell/Arch';
import {PageDirectory} from './PageDirectory';
import {ptTable_1, ptTable_2, ptTable_3} from './PageTables';

let arch = new Arch(
  11, //bit architecture
  0x0000, // memoffset
  2 // page levels
);

const PtMemArray: PageTable[] = [];
PtMemArray[0x0000] = PageDirectory;
//TODO what are we doing here? are we overwriting what is writen in PageDirectory.entries or are we adding them? How does this array actually work?
PtMemArray[PageDirectory.entries[0].addr] = ptTable_1;
PtMemArray[PageDirectory.entries[1].addr] = ptTable_2;
PtMemArray[PageDirectory.entries[2].addr] = ptTable_3;
const PtMem = new PageTableMem(PtMemArray);

export {PtMem};
export {arch};
