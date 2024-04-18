import Arch from './Arch';
import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';
import PageTableMem from './PageTableMem';
import Vaddr from './Vaddr';

class MMU {
  ptMemHandler: PageTableMem;
  arch: Arch;
  vaddrHandler: Vaddr;

  constructor(arch: Arch, ptMem: PageTableMem) {
    this.ptMemHandler = ptMem;
    this.arch = arch;
    this.vaddrHandler = new Vaddr(this.arch, this.ptMemHandler);
  }

  resolve(vaddr: string) {
    if (this.arch.validUserInput(vaddr)) {
      let parsedVaddr: number[] = this.vaddrHandler.parseUserInput(vaddr);
      let memOffset = this.vaddrHandler.getOffset();

      // let memOffset = this.arch.mem_offset;

      let Pt: PageTable = this.ptMemHandler.getAddr(memOffset);

      let lvl = 0;
      let addr = 0;
      while (lvl < this.arch.level) {
        let ptEntry: PageTableEntry = Pt.resolve(parsedVaddr[lvl]);

        addr = ptEntry.resolve({
          write: true,
          read: true,
          present: true,
          user: 2,
        });

        Pt = this.ptMemHandler.getAddr(addr);

        lvl++;
      }
      return (
        addr.toString(16) + '|' + parsedVaddr[this.arch.level].toString(16)
      );
    }
    return 'wrong arch';
  }
}

export default MMU;
