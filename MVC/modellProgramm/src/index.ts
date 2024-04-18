import {arch, PtMem} from '../src/arch/arch';
import MMU from '../src/paging_controller/MMU';

export default function main() {
  let mmu = new MMU(arch, PtMem);

  console.log(mmu.resolve('00004200123'));
  console.log(mmu.resolve('00015300123'));
  console.log(mmu.resolve('00026000123'));
  console.log(mmu.resolve('00034200123'));
}

main();
