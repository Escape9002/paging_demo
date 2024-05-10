import PageTable from '../paging_modell/PageTable';
import PageTableEntry from '../paging_modell/PageTableEntry';

let ptEntries = [];
ptEntries[0x0000] = new PageTableEntry(0x4000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x0001] = new PageTableEntry(0x5100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
ptEntries[0x0002] = new PageTableEntry(0x6200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
export const PageDirectory = new PageTable(ptEntries);
