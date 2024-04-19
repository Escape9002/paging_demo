import PageTable from '../paging_controller/PageTable';
import PageTableMem from '../paging_controller/PageTableMem';
import Arch from '../paging_controller/Arch';
import {PageDirectory} from './PageDirectory';
import {ptTable_1, ptTable_2, ptTable_3} from './PageTables';

let arch = new Arch(
  4, // idx size (bits)
  3, // offsetsize (bits)
  0x0000, // memoffset
  2 // page-levels
);

const PtMemArray: PageTable[] = [];
PtMemArray[0x0000] = PageDirectory;
PtMemArray[PageDirectory.entries[0].addr] = ptTable_1;
PtMemArray[PageDirectory.entries[1].addr] = ptTable_2;
PtMemArray[PageDirectory.entries[2].addr] = ptTable_3;
const PtMem = new PageTableMem(PtMemArray);

export {PtMem};
export {arch};