import Stack from "./stack";
import fs from "fs";
import tty from "tty";



console.log("Welcome to File Editor");

// let writableStream = fs.createWriteStream("text.txt", "utf8");
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.setEncoding("utf8");

// process.stdin.on("data", (data) => {
//     if (data.toString('utf8') == '\u0003') {
//         process.exit();
//     }
//     else {
//         writableStream.write(data);
//         process.stdout.write(data);
//     }
// })



class TextEditor {
    #undoStack;
    #redoStack;
    #text = "";

    constructor() {
        this.#redoStack = new Stack<string>(10);
        this.#undoStack = new Stack<string>(10);
    }

    type(word) {
        this.#undoStack.push(this.#text);
        this.#text += word;
    }

    undo() {
        let undoWord = this.#undoStack.top();
        this.#redoStack.push(this.#text);
        this.#text = undoWord;
    }

    redo() {
        //...
    }
}


//to be continue......