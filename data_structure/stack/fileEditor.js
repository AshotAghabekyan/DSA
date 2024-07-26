import Stack from "./stack";
import fs from "fs";
import tty from "tty";



let redoStack = new Stack(10);
let undoStack = new Stack(10);

console.log("Welcome to File Editor");

let writableStream = fs.createWriteStream("text.txt", "utf8");
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (data) => {
    if (data.toString('utf8') == '\u0003') {
        process.exit();
    }
    else {
        writableStream.write(data);
        process.stdout.write(data);
    }
})


//to be continue......