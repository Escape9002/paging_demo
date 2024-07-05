import {MMUError} from '../state_controller/commands';
import {flags} from './flags';
import MMU from './MMU';

export default class PageTableEntry {
  flags: flags;
  addr: number;
  constructor(addr: number, flags: flags) {
    this.flags = flags;
    this.addr = addr;
  }

  resolve(flags: flags): number {
    if(flags['present'] != this.flags['present']){

      throw new MMUError({
        name: 'PRESENT_BIT',
        message: 'This address doesnt exist....lol'
      });
    }

    if(flags['write'] != this.flags['write']){

      throw new MMUError({
        name: 'READ_WRITE',
        message: 'You dont have permission to write to this address. If you do this again, I am going to report you to an unknown being (root-user)',
      });
    }

    if(flags['read'] != this.flags['read']){

      throw new MMUError({
        name: 'READ_WRITE',
        message: 'You dont have permission to read from this address. If you do this again, I am going to report you to an unknown being (root-user)',
      });
    }

    if(flags['user'] != this.flags['user']){

      throw new MMUError({
        name: 'USER_MODE',
        message: 'You lack the permission to read/write to this address. '
        });
    }

      return this.addr;
    }

}
