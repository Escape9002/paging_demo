// https://blog.logrocket.com/put-the-typescript-enums-and-booleans-away/

import {ErrorBase} from './ErrorBase';
import {flags} from '../paging_modell/flags';
import PageTable from '../paging_modell/PageTable';
import PageTableEntry from '../paging_modell/PageTableEntry';

type States =
  | {
      kind: 'GETVADDR';
      context: {
        vAddr: string;
        desc?: 'Validates if the users entry fits the given arch. (vaddr-bit length check)';
        value?: MMUError<'WRONG_VADDR'>;
      };
    }
  | {
      kind: 'PARSEVADDR';
      context: {
        vAddr: string;
        desc?: 'Passes the numeric, split Vaddr to the frontend.';
        value?: number[] | MMUError<'WRONG_VADDR'>;
      };
    }
  | {
      kind: 'GETIDX';
      context: {
        PtAddr: number;
        desc?: 'Gets new Pt with the given (v)addr.';
        value: PageTable | MMUError<'NO_PAGE_TABLE'>;
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
      kind: 'RESOLVEFLAGS';
      context: {
        flags: flags;
        desc?: 'checks the permission flags.';
        value?: number | MMUError<'FALSE_FLAGS'>;
      };
    };
// | {
//     kind: 'VALID';
//     context: {
//       flags: flags;
//       desc?: 'checks the perstist flag';
//       value?: boolean | MMUError;
//     };
//   }
// | {
//     kind: 'READWRITE';
//     context: {
//       flags: flags;
//       desc?: 'checks the read/write flag';
//       value?: boolean | MMUError;
//     };
//   }
// | {
//     kind: 'USERMODE';
//     context: {
//       flags: flags;
//       desc?: 'checks the usermode flag';
//       value?: number | MMUError;
//     };
//   };

export default States;

type ErrorName =
  | 'WRONG_VADDR'
  | 'NO_TABLE_ENTRY'
  | 'NO_PAGE_TABLE'
  | 'FALSE_FLAGS';

export class MMUError<T extends ErrorName> extends ErrorBase<T> {
  constructor({name, message, cause}: {name: T; message: string; cause?: any}) {
    super({name, message, cause});
    Object.setPrototypeOf(this, MMUError.prototype);
    // Set the prototype explicitly.
    // This has to be directly under super.
    // This ensures that MMUError Objects are recognised as such by "instanceof"
  }
}
