# paging_demo
## avg page walk

The following page-walk is generalised for a 32bit, 2 level pagedirectory config

1. get architecture (11/32/64, amount of page-levels)
2. get page-directory address (here named memoffset)
3. resolve first section of vaddr (10-bits)
4. validate flags, get addr for page-table
5. resolve addr for pagetable
6. resolve second section of vaddr (10-bits)
7. validate flags, get hardware addr
8. add offset (12-bits), finish

## programm build
The programm architecture follows a rough MVC-design. For testing inital values are set in the Arch-Folder.

### Modell
Classes: MMU, PageTableMem, PageTable, PageTableEntry, Vaddr

- Arch: configuration for the MMU (vaddr-size, pagetable depth, eg)
- MMU: calls the function and holds the logic of the pagewalk, submits the current programms state to the StateMachine (Controller)
- PageTableMem: stores all PageTable's
- PageTables: hold the PageTableEntrys, a PageDirectory is also just a PageTable
- PageTableEntry: holds an addr and the permission flags to be validated
- Vaddr: holds the logic to turn the given Vaddr into a format that the MMU can handle.

### Controller
Classes: commands, StateMachine

- ErrorBase: Error template to ensure uniform error-definitions in commands
- commands: holds the possible error and programm states, acts as an interface
- StateMachine: holds the current state of the programm in a stack, states are added by the MMU. If an error is added to the stack, its added to the stack and then thrown.

### Visualiser
In work