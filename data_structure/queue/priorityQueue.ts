import { Heap } from "../heap/heap.ts";



export class PriorityQueue {
    private readonly heap: Heap;
    
    constructor(size: number) {
        this.heap = new Heap(size);
    }


    public enqueue(value: number): void {
        this.heap.insert(value);
    }

    public dequeue(): number {
        return this.heap.extractRoot()
    }

    public peek(): number {
        return this.heap.getRoot();
    }

    public isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    public clear(): void {
        while (!this.heap.isEmpty()) {
            this.heap.extractRoot();
        }
    }

    public print(): void {
        this.heap.print();
    }
}