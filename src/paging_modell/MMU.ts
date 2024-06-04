import States, {MMUError} from '../state_controller/commands';
import StateMachine from '../state_controller/StateMachine';
import Arch from './Arch';
import {flags} from './flags';
import PageTable from './PageTable';
import PageTableEntry from './PageTableEntry';
import PageTableMem from './PageTableMem';
import Vaddr from './Vaddr';

class MMU {
  ptMemHandler: PageTableMem;
  arch: Arch;
  vaddrHandler: Vaddr;
  stateMachine: StateMachine;
  evilPageTable: PageTable;

  constructor(arch: Arch, ptMem: PageTableMem) {
    this.ptMemHandler = ptMem;
    this.arch = arch;
    this.vaddrHandler = new Vaddr(this.arch, this.ptMemHandler);
    this.stateMachine = new StateMachine();

    //this is a dummy pagetable to init default values
    this.evilPageTable = new PageTable([
      new PageTableEntry(0x666, {
        present: false,
        read: false,
        user: 2,
        write: false,
      }),
    ]);
  }

  resolve(vaddr: string): States[] {
    this.stateMachine = new StateMachine();
    let PageLevel: number = 0;
    let ArchBits: number = 0;
    let memOffset: number = 0;
    try {
      PageLevel = this.arch.getPageLevel();
      ArchBits = this.arch.getBits();
      memOffset = this.arch.getMemOffset();

      this.stateMachine.logState({
        kind: 'GETARCH',
        context: {
          bits: ArchBits,
          lvl: PageLevel,
          memOffset: memOffset,
        },
      });
    } catch (error) {
      if (error instanceof MMUError) {
        this.stateMachine.logState({
          kind: 'GETARCH',
          context: {
            bits: ArchBits,
            lvl: PageLevel,
            memOffset: memOffset,
          },
        });
      }
      return this.stateMachine.stateMachine;
    }

    let parsedVaddr: number[] = [6, 6, 6];
    try {
      this.arch.validUserInput(vaddr);
      parsedVaddr = this.vaddrHandler.parseUserInput(vaddr);
      this.stateMachine.logState({
        kind: 'GETVADDR',
        context: {
          vAddr: vaddr,
          parsedVaddr: parsedVaddr,
        },
      });
    } catch (error) {
      if (error instanceof MMUError) {
        this.stateMachine.logState({
          kind: 'GETVADDR',
          context: {
            vAddr: error,
            parsedVaddr: error,
          },
        });
      }
      return this.stateMachine.stateMachine;
    }

    try {
      this.stateMachine.logState({
        kind: 'GETPAGEMEM',
        context: {pageMem: this.ptMemHandler.getMem()},
      });
    } catch (error) {
      if (error instanceof MMUError) {
        this.stateMachine.logState({
          kind: 'GETPAGEMEM',
          context: {pageMem: this.ptMemHandler.getMem()},
        });
      }
    }

    let Pt: PageTable = this.evilPageTable;
    try {
      Pt = this.ptMemHandler.getAddr(memOffset); //TODO possible double decleration of memOffset + getAddr for memoffset?
      this.stateMachine.logState({
        kind: 'GETIDX',
        context: {
          PtAddr: memOffset,
          value: Pt,
        },
      });
    } catch (error) {
      if (error instanceof MMUError) {
        this.stateMachine.logState({
          kind: 'GETIDX',
          context: {
            PtAddr: memOffset,
            value: error,
          },
        });
        return this.stateMachine.stateMachine;
      }
    }

    let lvl = 0;
    let addr: number = 0;
    while (lvl < this.arch.level) {
      // dummy ptEntry for variale init
      let ptEntry: PageTableEntry = new PageTableEntry(0x666, {
        present: false,
        read: false,
        write: false,
        user: 1,
      });

      try {
        ptEntry = Pt.resolve(parsedVaddr[lvl]);
        this.stateMachine.logState({
          kind: 'RESOLVEADDR',
          context: {
            vAddr: parsedVaddr[lvl],
            value: ptEntry,
          },
        });
      } catch (error) {
        if (error instanceof MMUError)
          this.stateMachine.logState({
            kind: 'RESOLVEADDR',
            context: {
              vAddr: parsedVaddr[lvl],
              value: error,
            },
          });
        return this.stateMachine.stateMachine;
      }

      const static_flags: flags = {
        write: true,
        read: true,
        present: true,
        user: 2,
      };

      try {
        addr = ptEntry.resolve(static_flags);
        this.stateMachine.logState({
          kind: 'RESOLVEFLAGS',
          context: {
            flags: static_flags,
            value: addr,
          },
        });
      } catch (error) {
        if (error instanceof MMUError) {
          this.stateMachine.logState({
            kind: 'RESOLVEFLAGS',
            context: {
              flags: static_flags,
              value: error,
            },
          });
          return this.stateMachine.stateMachine;
        }
      }

      if (lvl < this.arch.level - 1) {
        try {
          Pt = this.ptMemHandler.getAddr(addr);
          this.stateMachine.logState({
            kind: 'GETIDX',
            context: {
              PtAddr: addr,
              value: Pt,
            },
          });
        } catch (error) {
          if (error instanceof MMUError) {
            this.stateMachine.logState({
              kind: 'GETIDX',
              context: {
                PtAddr: addr,
                value: error,
              },
            });
            return this.stateMachine.stateMachine;
          }
        }
      }

      lvl++;
    }
    return this.stateMachine.stateMachine;
    // return addr.toString(16) + '|' + parsedVaddr[this.arch.level].toString(16);
  }
}

export default MMU;
