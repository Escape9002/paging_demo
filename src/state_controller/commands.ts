// https://blog.logrocket.com/put-the-typescript-enums-and-booleans-away/

import {ErrorBase} from './ErrorBase';
import {flags} from '../paging_modell/flags';
import PageTable from '../paging_modell/PageTable';
import PageTableEntry from '../paging_modell/PageTableEntry';
import PageTableMem from '../paging_modell/PageTableMem';

type States =
  | {
      kind: 'GETARCH';
      context: {
        bits: number | MMUError<'NO_BITS_CONFIG'>;
        lvl: number | MMUError<'NO_PAGETABLE_DEPTH'>;
        memOffset: number | MMUError<'NO_MEM_OFFSET'>;
        desc?: 'returns the Arch of the system.';
      };
    }
  | {
      kind: 'GETVADDR';
      context: {
        vAddr: string | MMUError<'WRONG_VADDR'>;
        parsedVaddr: number[] | MMUError<'WRONG_VADDR'>;
        desc?: 'Validates if the users entry fits the given arch. (vaddr-bit length check)';
      };
    }
  | {
      kind: 'GETPAGEMEM';
      context: {
        pageMem: PageTable[] | MMUError<'NO_PAGETABLE_MEM'>;
        desc?: 'Pases the PageTable Mem through to the frontend';
      };
    }
  | {
      kind: 'GETIDX'; //TODO first time, return the pagemem, then return the indexes we use, not the tables
      context: {
        PtAddr: number;
        desc?: 'Gets new Pt with the given (v)addr.';
        value: PageTable | MMUError<'NO_PAGETABLE'>;
      };
    }
  | {
      kind: 'RESOLVEADDR';
      context: {
        vAddr: number;
        desc?: 'Checks wether the addr exists in the Pt and returns the PtE.';
        value: PageTableEntry | MMUError<'NO_TABLE_ENTRY'>;
      };
    }
  | {
      kind: 'RESOLVEFLAGS'; //TODO implement flag resolvers
      context: {
        flags: flags;
        desc?: 'checks the permission flags.';
        value?: number | MMUError<'PRESENT_BIT'> | MMUError<'READ_WRITE'> | MMUError<'USER_MODE'>;
      };
    };
//TODO final state with returned Hardwareaddr, add field for vaddr-offset for final hardware address
// | {
//     kind: 'PRESENT';
//     context: {
//       flags: flags;
//       desc?: 'checks the perstist flag';
//       value?: boolean | MMUError<'PRESENT_BIT'>;
//     };
//   }
// | {
//     kind: 'READWRITE';
//     context: {
//       flags: flags;
//       desc?: 'checks the read/write flag';
//       value?: boolean | MMUError<'READ_WRITE'>;
//     };
//   }
// | {
//     kind: 'USERMODE';
//     context: {
//       flags: flags;
//       desc?: 'checks the usermode flag';
//       value?: number | MMUError<'USER_MODE'>;
//     };
  // };

export default States;

type ErrorName =
  | 'NO_PAGETABLE_DEPTH'
  | 'NO_BITS_CONFIG'
  | 'NO_MEM_OFFSET'
  | 'WRONG_VADDR'
  | 'NO_PAGETABLE_MEM'
  | 'NO_TABLE_ENTRY'
  | 'NO_PAGETABLE'
  // | 'FALSE_FLAGS'
  | 'PRESENT_BIT'
  | 'READ_WRITE'
  | 'USER_MODE';

export class MMUError<T extends ErrorName> extends ErrorBase<T> {
  constructor({name, message, cause}: {name: T; message: string; cause?: any}) {
    super({name, message, cause});
    Object.setPrototypeOf(this, MMUError.prototype);
    // Set the prototype explicitly.
    // This has to be directly under super.
    // This ensures that MMUError Objects are recognised as such by "instanceof"
  }
}
