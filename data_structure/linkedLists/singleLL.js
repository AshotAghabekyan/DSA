


class Node {
    next;
    value;

    constructor(value) {
        this.value = value;
        this.next = null;
    }
}



export class SLL {
    head;

    constructor() {
        this.head = null;
    }

    push_front(value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    pop_front() {
        let tmpNode = this.head.next;
        this.head = null;
        this.head = tmpNode;
    }

    print() {
        let tmpNode = this.head;
        let res = "";
        while (tmpNode != null) {
            res += ` ${tmpNode.value} --> `
            tmpNode = tmpNode.next;
        }
        res += "null";
        console.log(res);
    }


    insert_after(prev_node, value) {
        let node = new Node(value);
        node.next = prev_node.next;
        prev_node.next = node;
    }

    erase_after(prev_node) {
        let tmp = prev_node.next;
        prev_node.next = tmp.next;
        tmp = null;
    }

    clear() {
        while (this.head != null) {
            let tmp = this.head.next;
            this.head = null;
            this.head = tmp;
        }
    }

    isEmpty() {
        return this.head?.next? false : true;
    }

    reverse() {
        let dummyNode = new Node();
        let curr = this.head;

        while (curr != null) {
            let nextTmp = curr.next;
            curr.next = dummyNode.next;
            dummyNode.next = curr;
            curr = nextTmp;
        }
        this.head = dummyNode.next;
    }

    merge(other_list) {
        let currNode = this.head;
        while (currNode.next != null) {
            currNode = currNode.next;
        }

        currNode.next = other_list;
    }

    front() {
        return this.head;
    }
    
    sort() { //selection sort logic
        let iNode = this.head;

        while (iNode != null) {
            let min = iNode;
            let jNode = iNode.next;

            while (jNode != null) {
                if (jNode.value < min.value) {
                    min = jNode;
                }
                jNode = jNode.next;
            }
            
            [iNode.value, min.value] = [min.value, iNode.value];
            iNode = iNode.next;
        }
    };
}


let singleLL1 = new SLL();
singleLL1.push_front(3);
singleLL1.push_front(4);
singleLL1.push_front(2);

let singleLL2 = new SLL();
singleLL2.push_front(4);
singleLL2.push_front(6);
singleLL2.push_front(5);
// singleLL.print()
// singleLL.reverse()
// singleLL.print()
