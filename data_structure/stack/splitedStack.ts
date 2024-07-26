
/**\
 * implementing two stacks in one array in
 * such a way that none of the stacks overflows until
 * the number of elements in the stacks is equal to the length of the array
 */




class SplitedStack<T> {
    readonly arr: Array<T>;
    public leftCapacity: number;
    public leftTop: number;
    public stackBorder: number;
    public rightCapacity: number;
    public rightTop: number;

    constructor(size: number) {
        this.arr = new Array<T>(size);

        this.stackBorder = Math.floor((size / 2));
        this.leftCapacity = this.stackBorder - 1;
        this.leftTop = 0;
        this.rightCapacity = size -1;
        this.rightTop = this.stackBorder;
    }


    public pushLeft(value: T): void {
        if (this.leftTop <= this.leftCapacity) {
            this.arr[this.leftTop] = value;
            ++this.leftTop;
            return;
        }
        
        if (this.rightCapacity > this.rightTop) {
            for (let i = this.rightCapacity; i >= this.stackBorder ; --i) {
                this.arr[i] = this.arr[i - 1];
            }
            this.leftCapacity = this.stackBorder;
            ++this.stackBorder;
            return;
        }

        throw new Error("cannot upgrade left stack size");
    }


    public pushRight(value: T): void {
        if (this.rightTop <= this.rightCapacity) {
            this.arr[this.rightTop] = value;
            ++this.rightTop;
            return;
        }

        if (this.leftCapacity > this.leftTop) {
            let j: number = this.stackBorder;
            while (j < this.rightTop) {
                this.arr[j - 1] = this.arr[j];
                ++j
            }
            this.arr[this.rightTop -1] = value;
            --this.stackBorder;
            --this.leftCapacity;
            return;
        }

        throw new Error("cannot upgrade right stack size");
    }


    public popLeft(): void {
        if (this.leftTop == 0) {
            throw new Error("left stack underflow");
        }

        --this.leftTop;
    }

    public popRight(): void {
        if (this.rightTop == this.stackBorder) {
            throw new Error("right stack underflow");
        }
        --this.rightTop;
    }


    public printLeftStack(): void {
        let str: string = ""
        for (let i = 0; i < this.leftTop; ++i) {
            str += this.arr[i] + " ";
        }
        console.log(str);
    }

    public printRightStack(): void {
        let str: string = ""
        for (let i = this.stackBorder; i < this.rightTop; ++i) {
            str += this.arr[i] + " ";
        }
        console.log(str);
    }
}

let stack: SplitedStack<number> = new SplitedStack<number>(10);
// stack.pushLeft(10);
// stack.pushLeft(20);
// stack.pushLeft(30);
// stack.pushRight(40);
// stack.pushRight(50);
// stack.pushRight(60);
// stack.pushRight(70);
// stack.pushRight(80);
// stack.pushRight(90);
// stack.popLeft();
// stack.popRight();
// stack.pushRight(100);
// console.log(stack.arr);
// stack.printLeftStack();
// stack.printRightStack();

