

class NodeDLL<T> {
    val: T;
    next: NodeDLL<T>;
    prev: NodeDLL<T>;

    constructor(val: T) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

export class DLL<T> {
    private head: NodeDLL<T> = new NodeDLL(null);
    private tail: NodeDLL<T> = new NodeDLL(null);

    constructor() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }


    public insertFront(val: T): void {
        const node = new NodeDLL(val);
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node
    }


    public popFront(): void {
        if (this.head.next == this.tail) {
            throw new Error("list is empty");
        }

        const tmp = this.head.next.next;
        this.head.next = null;
        tmp.prev = this.head;
        this.head.next = tmp;
        
    };

    public insertTail(val: T): void {
        const node = new NodeDLL(val);
        const rearNode = this.tail.prev;
        rearNode.next = node;
        node.prev = rearNode;
        node.next = this.tail;
    };


    public popTail(): void {
        if (this.head.next == this.tail) {
            throw new Error("list is empty");
        }

        const rearNode = this.tail.prev?.prev;
        this.tail.prev = null;
        rearNode.next = this.tail;

    }


    public print(): void {    
        let curr = this.head.next;
        while (curr.next) {
            console.log(curr.val);
            curr = curr.next;
        }
    };
}



// const dll: DLL<number> = new DLL<number>();
// console.log(dll);
// dll.insertFront(10);
// dll.insertFront(20);
// dll.insertTail(30);
// dll.popTail()
// dll.popTail()
// dll.popTail()
// dll.popTail()

// 
// dll.print();