



class HashNode<T> {
    key: number;
    value: T;
    next: HashNode<T>

    constructor(key: number, value: T) {
        this.key = key;
        this.value = value;
    }
}



export class HashTable<T> {
    private readonly fractionalConst = (Math.sqrt(5) - 1) / 2;  //suggested by Knuth.
    private arr: HashNode<T>[] = new Array<HashNode<T>>;
    private size: number = 0;


    constructor(initSize: number) {
        this.arr = new Array<HashNode<T>>(initSize);
    }

    private genHash(key: number) {
        return Math.floor(this.arr.length * (key % this.fractionalConst));
    }


    private resize() {
        const oldArr = this.arr;
        this.arr = new Array<HashNode<T>>(this.arr.length * 2);
    
        for (const node of oldArr) {
            let curr = node;
            while (curr) {
                this.insert(curr.key, curr.value);  
                curr = curr.next;
            }
        }
    }
    

    public insert(key: number, value: T): void {
        const loadFactor = this.size / this.arr.length;
        if (loadFactor > 0.75) {
            this.resize();
        }

        const index: number = this.genHash(key);
        let curr = this.arr[index];

        if (!curr) {
            this.arr[index] = new HashNode(key, value);
            ++this.size;
            return;
        }

        while (curr.next) {
            curr = curr.next;
        }

        curr.next = new HashNode(key, value);
        ++this.size;
    }


    public getValue(key: number) {
        const index: number = this.genHash(key);
        let curr: HashNode<T> = this.arr[index];

        while (curr) {
            if (curr.key == key) {
                return curr.value
            }

            curr = curr.next;
        }
        return null;
    }


    public delete(key: number): boolean {
        const index: number = this.genHash(key);
        let curr: HashNode<T> = this.arr[index];

        if (!curr) {
            return false;
        }

        while (curr) {
            if (curr.next.key == key) {
                let tmp = curr.next?.next;
                curr.next = null;
                curr.next = tmp;
                return true;
            }
            curr = curr.next;
        }
        return false; 
    }
}


// let a = new HashTable<string>()
// a.insert(125, "hello world");
// a.insert(123, "helo world");
// console.log(a.getValue(123));