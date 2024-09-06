


//Double Ended Queue;
export class Deque<T> {
    readonly arr: T[];
    private ptr: number;

    constructor(dequeueSize: number) {
        this.arr = new Array<T>(dequeueSize);
        this.ptr = 0;
    }

    public push_front(value: T): void {
        if (this.ptr == this.arr.length) {
            throw new Error("deque overflow!");
        }

        if (this.ptr > 0) {
            for (let i = this.ptr + 1; i >= 0; --i) {
                this.arr[i] = this.arr[i - 1];
            }

        }
        this.arr[0] = value;
        ++this.ptr;
    }


    public pop_front(): void {
        if (this.ptr <= 0) {
            throw new Error("deque underflow");
        } 

        for (let i = 0; i < this.ptr; ++i) {
            this.arr[i] = this.arr[i + 1];
        }

        --this.ptr;
    }


    public push_end(value: T): void {
        if (this.ptr == this.arr.length) {
            throw new Error("deque overflow");
        }

        this.arr[this.ptr++] = value;
    }


    public pop_end(): void {
        if (this.ptr <= 0) {
            throw new Error("deque underflow");
        }

        --this.ptr;
    }


    public insert(value: T, position: number): void {
        if (position >= this.arr.length) {
            throw new Error("invalid insert position");
        }

        if (position > this.ptr) {
            return this.push_end(value);
        }

        if (position == 0) {
            return this.push_front(value);
        }

        for (let i = this.ptr; i >= position; --i) {
            this.arr[i] = this.arr[i - 1];
        }

        this.arr[position] = value;
        ++this.ptr;
    }


    public erase(position: number): void {
        if (position >= this.arr.length) {
            throw new Error("invalid remove position");
        }

        if (position > this.ptr) {
            return this.pop_end();
        }

        if (position == 0) {
            return this.pop_front();
        }

        for (let i = position; i <= this.ptr; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        --this.ptr;
    }


    public front(): T {
        return this.arr[0] || null;
    }

    public back(): T {
        return this.arr[this.ptr] || null;
    }

    public empty(): boolean {
        return this.ptr <= 0;
    }

    public clear(): void {
        this.ptr = 0;
    }

    public size(): number {
        return this.ptr;
    }

}


const deque = new Deque(10);
console.log(deque.size());
