import MMU from './paging_modell/MMU';
import {arch, PtMem} from './arch/arch';

export default function main() {
  let mmu = new MMU(arch, PtMem);
    //TODO this is not how flags work, please implement them in the actual page-entries. change this input to only contain: read/write and usermode
    
   console.log(mmu.resolve('00004200123', {write: true, read:true, present:true, user:2})); // all good
  console.log(mmu.resolve('00015300123', {write: true, read:false, present:true, user:2})); // no read perm.
  console.log(mmu.resolve('00026000123', {write: false, read:true, present:true, user:2})); // no write perm.
  console.log(mmu.resolve('00026000123', {write: true, read:true, present:false, user:2})); // not present
  console.log(mmu.resolve('00034200123', {write: true, read:true, present:true, user:2})); // wrong vaddr
}

main();
