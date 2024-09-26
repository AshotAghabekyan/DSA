


export class CircularQueue<T> {
    private arr: T[];
    private head: number = -1;
    private rear: number = -1;

    constructor(queueSize: number) {
        this.arr = new Array<T>(queueSize);
    }


    public enqueue(val: T): void {
        if (this.head == -1) {
            ++this.head;
        }

        if (this.rear + 1 == this.arr.length) {
            this.rear = (this.rear + 1) % this.arr.length;
        }

        this.arr[this.rear] = val;
        ++this.rear;
    }

    public dequeue(): void {
        if (this.head == -1) {
            throw new Error('queue is empty');
        }

        if (this.head == this.rear) {
            this.clear();
            return;
        }

        ++this.head;
    }


    public peek(): T {
        if (this.head == -1) {
            throw new Error("queue is empty");
        }
        return this.arr[this.head];
    };


    public isEmpty(): boolean {
        return this.head == -1? true : false;
    };


    public clear(): void {
        this.head = -1;
        this.rear = -1;
    };


    public length(): number {
        return this.rear + 1;
    };
}