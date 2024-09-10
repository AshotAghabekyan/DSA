



export class Stack<T> {
    private arr: T[];
    private capacity: number;
    private top: number = -1;

    constructor(capacity: number) {
        this.arr = new Array(capacity);
        this.capacity = capacity;
    }


    public push(value: T): void {
        if (this.top >= this.capacity) {
            throw new Error("stack overflow!");
        }
        this.arr[++this.top] = value;
    }

    public pop(): void  {
        if (this.isEmpty()) {
            throw new Error("stack underflow!");
        }

        --this.top;
    }

    public isEmpty(): boolean {
        return this.top < 0 ? true : false;
    }

    public getTop(): T  {
        if (this.isEmpty()) {
            throw new Error("stack is empty!");
        }
        return this.arr[this.top];
    }

    public getSize(): number {
        return this.top + 1;
    }

    public print(): void {
        for (let i = 0; i <= this.top; ++i) {
            console.log(this.arr[i] + " ");
        }
    }
}


