

//Queue data structure FIFO
export class Queue<T>  {
    private arr: T[];
    private tail: number;
    private capacity: number;

    constructor(size: number) {
        this.capacity = size;
        this.tail = -1;
        this.arr = new Array<T>(size);
    }

    public enqueue(value: T): void {
        if (this.tail >= this.capacity) {
            throw new Error("queue overflow!");
        }

        this.arr[++this.tail] = value;
    }

    public dequeue(): void {
        if (this.tail < 0) {
            throw new Error("queue underflow");
        }

        for (let i = 0; i < this.tail; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        --this.tail;
    }

    public isEmpty(): boolean {
        return this.tail < 0 ? true : false;
    }

    public peek(): T {
        if (this.tail < 0) {
            throw new Error("queue is empty");
        }
        return this.arr[0];
    }

    public include(val: T): boolean {
        for (let i = 0; i < this.tail + 1; ++i) {
            if (this.arr[i] == val) {
                return true;
            }
        }
        return false;
    }
    
    public length(): number {
        return this.tail + 1;
    }

    public print(): void {
        for (let i = 0; i <= this.tail; ++i) {
            console.log(this.arr[i]);
        }
    }

    
}



// const queue: Queue<number> = new Queue<number>(10);
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);
// queue.enqueue(40);
// queue.enqueue(50);
// queue.enqueue(60);
// queue.print();
