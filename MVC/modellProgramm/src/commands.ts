// https://blog.logrocket.com/put-the-typescript-enums-and-booleans-away/

import {flags} from './paging_controller/flags';
import PageTable from './paging_controller/PageTable';
import PageTableMem from './paging_controller/PageTableMem';

export type States =
  | {
      kind: 'GETVADDR';
      context: {
        vAddr: number;
        error?: Error;
      };
    }
  | {
      kind: 'GETIDX';
      context: {
        memOffset: number;
        ptDirectory: PageTableMem;
        error?: Error;
      };
    }
  | {
      kind: 'RESOLVEADDR';
      context: {
        vAddr: number;
        ptTable: PageTable;
        error?: Error;
      };
    }
  | {
      kind: 'RESOLVEFLAGS';
      context: {
        flags: flags;
        error?: Error;
      };
    }
  | {
      kind: 'HARDWAREADDR';
      context: {
        addr: number;
        error?: Error;
      };
    };
