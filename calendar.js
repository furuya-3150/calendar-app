import { program } from "commander";

program.option("-m", "カレンダ-の月を指定する");
program.parse(process.argv);

const date = new Date();
const thisYear = date.getFullYear();

let inputMonth = program.args[0];
if (!inputMonth) {
    inputMonth = String(date.getMonth() + 1);
}

if (isNaN(inputMonth)) {
    console.error("月は数値で指定してください");
    process.exit(1)
}

if (inputMonth < 1 || inputMonth > 12) {
    console.error("-mの値が不正です");
    process.exit(1);
}

const inLocal = new Date(`${thisYear}-${inputMonth.padStart(2, "0")}-01T09:00:00.000`);
let dayOfWeek = inLocal.getDay();

const numberOfDays = new Date(thisYear, inputMonth.padStart(2, "0"), 0).getDate();

let days = `      ${inputMonth}月 ${thisYear}年
 日 月 火 水 木 金 土
`;
for (let index = 0; index < dayOfWeek; index++) {
    days += "   ";
}

for (let index = 1; index <= numberOfDays; index++) {
    days += String(index).padStart(2, " ") + " ";
    if ((dayOfWeek + 1) % 7 === 0) {
        days += "\n";
    }
    dayOfWeek++;
}
console.log(days);