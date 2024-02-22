page_directory = {
    0:[0x0, "u", "ro", "p"],
    1:[0x1, "u", "rw", "p"],
    2:[0x2, "s", "rw", "p"]
}

page_tables = [
    {
        0:[0x3, "u", "ro", "p"],
        1:[0x4, "u", "rw", "p"],
        2:[0x5, "s", "rw", "p"]
    },
    {
        0:[0x6, "u", "ro", "p"],
        1:[0x7, "u", "rw", "p"],
        2:[0x8, "s", "rw", "p"]
    },
    {
        0:[0x9, "u", "ro", "p"],
        1:[0xa, "u", "rw", "p"],
        2:[0xb, "s", "rw", "p"]
    }
]


def get_page_content(table : dict,  addr : int):
    return table[addr][0]

def val_presence(table : dict, addr : int):
    return table[int(addr)][3] == "p"

def val_permission(table : dict, addr : int, usr : str):
    return table[int(addr)][1] == usr

def val_rw(table : int, addr : int , rw : str):
    rw_states = list(table[int(addr)][2])
    return rw in rw_states


def get_addr(table: dict, addr: int, user : str, rw : str):
    if not val_presence(table, addr):
        print("present bit not set")
        return

    if not val_permission(table, addr, user):
        print("not enough elevation")
        return

    if not val_rw(table, addr, rw):
        print("not the correct rw state")
        return

    return get_page_content(table, addr)


while (True):

    print("//////////////////// NEW QUERY")
    rw_state = input("r(ead) || w(rite): ")
    user = input("user (s || u): ")
    address = input("enter your adress: 0x")
    address_bits = [int(element) for element in list(address)]
    print("----------- RESULT")

    print(f'virtAdr: {address}')
    
    addr_1, addr_2, addr_3 = "", "",""

    try:
        addr_1 = get_addr(page_directory, address_bits[0], user, rw_state)
        addr_2 = get_addr(page_tables[addr_1], address_bits[1], user, rw_state)
        addr_3 = address_bits[2]
    except:
        print(f'page fault')
    
    print(f'real addr: {addr_1}{addr_2}{addr_3}\n')
    