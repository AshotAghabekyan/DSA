


export class Heap {
    private arr: number[];
    private currentSize: number = 0;

    constructor(size: number) {
        this.arr = new Array<number>(size);
    }
    
    public heapify(i: number = 0) {
        let largest: number = i;
        let leftChildIndex = (2 * i) + 1;
        let rightChildIndex = (2 * i) + 2;

        if (leftChildIndex < this.currentSize  && this.arr[leftChildIndex] > this.arr[largest]) {
            largest = leftChildIndex;
        }

        if (rightChildIndex < this.currentSize && this.arr[rightChildIndex] > this.arr[largest]) {
            largest = rightChildIndex;
        }


        if (largest != i) {
            [this.arr[largest], this.arr[i]] = [this.arr[i], this.arr[largest]];
            this.heapify(largest);
        }
    }


    public getParent(index: number) {
        return Math.floor((index -1) / 2);
    }

    public leftChild(index: number) {
        return (index * 2) + 1;
    } 

    public rightChild(index: number) {
        return (index * 2) + 2;
    }


    public insert(value: number): void {
        if (this.arr.length == this.currentSize) {
            throw new Error("Heap overflow!");
        }

        let position: number = this.currentSize;
        let i = this.currentSize;
        this.arr[position] = value;
        ++this.currentSize;
        

        while (i != 0) {
            let parentIndex: number = this.getParent(i);
            if (this.arr[parentIndex] < this.arr[i]) {
                [this.arr[parentIndex], this.arr[i]] = [this.arr[i], this.arr[parentIndex]];
                i = parentIndex;
            }
            else {
                break;
            }
        }
    }


    public delete(index: number): void {
        if (this.currentSize <= 0) {
            throw new Error("Heap underflow!");
        }

        let leafNodeIndex = this.currentSize - 1;
        [this.arr[index], this.arr[leafNodeIndex]] = [this.arr[leafNodeIndex], this.arr[index]];
        --this.currentSize;
        this.heapify(index);
    }


    public extractRoot() {
        const root: number = this.arr[0];
        this.delete(0);
        return root;
    }

    public extractLeaf() {
        const leaf: number = this.arr[this.currentSize -1];
        this.delete(this.currentSize -1);
        return leaf;
    }


    public print(): void {
        for (let i = 0; i < this.currentSize; ++i) {
            console.log(this.arr[i]);
        }
    }

    public isEmpty() {
        return this.currentSize == 0;
    }


    public getRoot() {
        return this.arr[0];
    }
}



let heap: Heap = new Heap(15);
heap.insert(3); 
heap.insert(10); 
heap.insert(12); 
heap.insert(8); 
heap.insert(2); 
heap.insert(14); 
