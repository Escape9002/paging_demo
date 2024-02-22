let sales : number = 123_456_789
let course = "tzpescript"
let is_published = true;
let lol; 

let numbers: number[] = [1,2,3,4]

let numberos: string[] = [];

let user : [number, string] = [1, 'mosh']

const enum Size { Small = 1, medium, large};
let mySize : Size = Size.medium

console.log(mySize)


// functions my frined

function calcTax(income : number, tax_year : number = 2022) : number{
    if (tax_year < 50_000){
        return income * 1.2;
    }
    return income * 10;
};


type Employee = {
    readonly id:string, 
    name: string,
    retire: (date: Date) => void;

}




let hans: Employee = {
    id:'asdas',
    name: 'mosh',
    retire: (date: Date) => {
        console.log(date);
    }

}
