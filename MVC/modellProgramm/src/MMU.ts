import Arch from './Arch';
import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';
import PageTableMem from './PageTableMem';
import Vaddr from './Vaddr';

class MMU {
  ptEntries: PageTableEntry[];
  ptTable: PageTable;
  ptMemHandler: PageTableMem;
  arch: Arch;
  vaddrHandler: Vaddr;

  constructor() {
    this.ptEntries = [
      new PageTableEntry(0x4000, {
        write: true,
        read: true,
        present: true,
        user: 2,
      }),
      new PageTableEntry(0x4000, {
        write: true,
        read: true,
        present: true,
        user: 2,
      }),
    ];
    this.ptTable = new PageTable(this.ptEntries);
    this.ptMemHandler = new PageTableMem([this.ptTable]);
    this.arch = new Arch(2, 0, 0x0, 2);
    this.vaddrHandler = new Vaddr(this.arch, this.ptMemHandler);
  }

  resolve(vaddr: string) {
    if (this.arch.validUserInput(vaddr)) {
      let parsedVaddr: number[] = this.vaddrHandler.parseUserInput(vaddr);

      let memOffset = this.vaddrHandler.getOffset();

      // let memOffset = this.arch.mem_offset;

      let Pt: PageTable = this.ptMemHandler.getAddr(memOffset);
      let lvl = 0;
      while (lvl < this.arch.level) {
        let ptEntry: PageTableEntry = Pt.resolve(parsedVaddr[lvl]);

        ptEntry.resolve({
          write: true,
          read: true,
          present: true,
          user: 2,
        });

        lvl++;
      }
      return 'found smth';
    }
    return 'wrong arch';
  }
}

export default MMU;

// | getAddr(Memory, PTInit, addr)
// | {
// |   const levels = addr.length - 1;
// |   let currentPTAddr = PTInit; // page dir
// |   let currentLvl = 0;
// |
// |   do {
// |     const PT = Memory[currentPTAddr];
// |     const IDX = addr[currentLvl];
// |     const PTE = PT.entries[IDX];
// |     // check PTE flags
// |     currentPTAddr = PTE.addr;
// |   while (++currentLvl < levels);
// |
// |   return currentPTAddr + addr[currentLvl];
// | };
