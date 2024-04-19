// https://blog.logrocket.com/put-the-typescript-enums-and-booleans-away/

import {ErrorBase} from './ErrorBase';
import {flags} from './paging_controller/flags';
import PageTable from './paging_controller/PageTable';
import PageTableEntry from './paging_controller/PageTableEntry';
import PageTableMem from './paging_controller/PageTableMem';

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
        vAddr: number[];
        value?: MMUError;
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
