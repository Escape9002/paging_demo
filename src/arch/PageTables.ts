import PageTable from '../paging_modell/PageTable';
import PageTableEntry from '../paging_modell/PageTableEntry';

const pt1Entries: PageTableEntry[] = [];
pt1Entries[0x4000] = new PageTableEntry(0x4000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt1Entries[0x4200] = new PageTableEntry(0x4100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt1Entries[0x4300] = new PageTableEntry(0x4200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
export const ptTable_1 = new PageTable(pt1Entries);

const pt2Entries: PageTableEntry[] = [];
pt2Entries[0x5000] = new PageTableEntry(0x5000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt2Entries[0x5200] = new PageTableEntry(0x5100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt2Entries[0x5300] = new PageTableEntry(0x5200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
export const ptTable_2 = new PageTable(pt2Entries);

const pt3Entries: PageTableEntry[] = [];
pt3Entries[0x6000] = new PageTableEntry(0x6000, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt3Entries[0x6200] = new PageTableEntry(0x6100, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
pt3Entries[0x6300] = new PageTableEntry(0x6200, {
  write: true,
  read: true,
  present: true,
  user: 2,
});
export const ptTable_3 = new PageTable(pt3Entries);
