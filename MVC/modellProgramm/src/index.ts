import MMU from './MMU';

export default function main() {
  let mmu = new MMU();

  console.log(mmu.resolve('00'));
}

main();
