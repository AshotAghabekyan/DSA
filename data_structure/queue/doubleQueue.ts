



//Double Ended Queue;
class Deque<T> {
    readonly arr: T[];
    private head: number;
    private tail: number;

    constructor(size: number) {
        this.arr = new Array<T>(size);
        this.head = 0;
        this.tail = 0;
    }


    public pushFront(value: T): void {
        if (this.tail == this.arr.length) {
            throw new Error("queue overflow");
        }

        for (let i = this.tail; i >= 0; --i) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[this.head] = value;
        ++this.tail;
    }


    public pushEnd(value: T) {
        if (this.tail == this.arr.length) {
            throw new Error("queue overflow");
        }

        this.arr[this.tail] = value;
        ++this.tail;
    }


    public popFront(): void {
        if (this.tail == 0) {
            throw new Error("queue underflow");
        }

        for (let i = 0; i < this.tail; ++i) {
            this.arr[i] = this.arr[i + 1];
        }

        --this.tail;

    } 


    public popEnd(): void {
        if (this.tail == 0) {
            throw new Error("queue underflow");
        }

        this.arr.splice(this.tail, 1);
        --this.tail;
    }
}


const deque: Deque<number> = new Deque<number>(10);
// deque.pushFront(10);
// deque.pushFront(20);
// deque.pushFront(30);
// deque.pushEnd(40);
// deque.popFront();
// deque.popEnd();
// deque.pushEnd(50);
// deque.pushEnd(60);
// deque.pushEnd(70);
// deque.pushEnd(80);
// deque.pushEnd(35);
// deque.pushEnd(45);
// deque.popFront();
// console.log(deque.arr);