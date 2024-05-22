import {MMUError} from '../state_controller/commands';
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

  constructor(arch: Arch, ptMem: PageTableMem) {
    this.ptMemHandler = ptMem;
    this.arch = arch;
    this.vaddrHandler = new Vaddr(this.arch, this.ptMemHandler);
    this.stateMachine = new StateMachine();
  }

  resolve(vaddr: string) {
    this.stateMachine = new StateMachine();
    
    let userVaddrError: MMUError | undefined = this.arch.validUserInput(vaddr);
    this.stateMachine.logState({
      kind: 'GETVADDR',
      context: {
        vAddr: vaddr,
        value: userVaddrError,
      },
    });

    let parsedVaddr: number[] | MMUError =
      this.vaddrHandler.parseUserInput(vaddr);
    this.stateMachine.logState({
      kind: 'PARSEVADDR',
      context: {
        vAddr: vaddr,
        value: parsedVaddr,
      },
    });

    let memOffset = this.vaddrHandler.getOffset(); //TODO show where the offset is grabbed from (statemachine log) use the IDX command

    let Pt: PageTable | MMUError = this.ptMemHandler.getAddr(memOffset);
    this.stateMachine.logState({
      kind: 'GETIDX',
      context: {
        memOffset: memOffset,
        value: Pt,
      },
    });

    let lvl = 0;
    let addr: number | MMUError = 0;
    while (lvl < this.arch.level && Pt instanceof PageTable) {
      let ptEntry: PageTableEntry | MMUError = Pt.resolve(parsedVaddr[lvl]);
      this.stateMachine.logState({
        kind: 'RESOLVEADDR',
        context: {
          vAddr: parsedVaddr[lvl],
          value: ptEntry,
        },
      });

      if (ptEntry instanceof PageTableEntry) {
        const static_flags: flags = {
          write: true,
          read: true,
          present: true,
          user: 2,
        };
        addr = ptEntry.resolve(static_flags);
        this.stateMachine.logState({
          kind: 'RESOLVEFLAGS',
          context: {
            flags: static_flags,
            value: addr,
          },
        });

        if (typeof addr == 'number' && lvl < this.arch.level - 1) {
          Pt = this.ptMemHandler.getAddr(addr);
          this.stateMachine.logState({
            kind: 'GETIDX',
            context: {
              memOffset: memOffset,
              value: Pt,
            },
          });
        } else {
          console.log(this.stateMachine.stateMachine);
        }
      }

      lvl++;
    }
    return addr.toString(16) + '|' + parsedVaddr[this.arch.level].toString(16);
  }
}

export default MMU;
