import MMU from './paging_controller/MMU';
import {arch, PtMem} from './arch/arch';

export default function main() {
  let mmu = new MMU(arch, PtMem);

  console.log(mmu.resolve('00004200123'));
  console.log(mmu.resolve('00015300123'));
  console.log(mmu.resolve('00026000123'));
  console.log(mmu.resolve('00034200123'));
}

main();
