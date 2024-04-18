import MMU from './MMU';

export default function main() {
  let mmu = new MMU();

  console.log(mmu.resolve('00004200123'));
  console.log(mmu.resolve('00015300123'));
  console.log(mmu.resolve('00026000123'));
  console.log(mmu.resolve('00034200123'));
}

main();
