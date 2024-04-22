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
        value?: MMUError;
      };
    }
  | {
      kind: 'PARSEVADDR';
      context: {
        vAddr: string;
        value?: number[] | MMUError;
      };
    }
  | {
      kind: 'GETIDX';
      context: {
        memOffset: number;
        value: PageTable | MMUError;
      };
    }
  | {
      kind: 'RESOLVEADDR';
      context: {
        vAddr: number;
        value: PageTableEntry | MMUError;
      };
    }
  | {
      kind: 'RESOLVEFLAGS';
      context: {
        flags: flags;
        value?: number | MMUError;
      };
    }
  | {
      kind: 'HARDWAREADDR';
      context: {
        addr: number;
        value?: MMUError;
      };
    };

export default States;

type ErrorName =
  | 'WRONG_VADDR'
  | 'NO_TABLE_ENTRY'
  | 'NO_PAGE_TABLE'
  | 'FALSE_FLAGS';
export class MMUError extends ErrorBase<ErrorName> {}