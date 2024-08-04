import Stack from "../stack/stack.js";
import Queue from "../queue/queue.js";

class TreeNode {
    public left: TreeNode;
    public right: TreeNode;
    public key: number;

    constructor(key: number) {
        this.key = key;
    }
}



class BST {
    private root: TreeNode;

    constructor(initValue: number) {
        this.root = new TreeNode(initValue);
    };

    public isEmpty(): boolean {
        return this.root? false : true;
    }

    public insert(data: number): TreeNode {
        this.root = this._insert(data, this.root); 
        return this.root; 
    }

    private _insert(data: number, node: TreeNode): TreeNode {
        if (!node) {
            return new TreeNode(data); 
        }

        if (node.key > data) {
            node.left = this._insert(data, node.left); 
        } else if (node.key < data) {
            node.right = this._insert(data, node.right); 
        }
        
        return node; 
    }


    private _getHeight(node: TreeNode): number {
        if (!node) {
            return -1; 
        }

        let leftHeight = this._getHeight(node.left);
        let rightHeight = this._getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    public getHeight(): number {
        return this._getHeight(this.root);
    }


    public getNumberOfNodes_recursive(node: TreeNode): number {
        if (!node) {
            return 0;
        }

        let count: number = 1;
        count += this.getNumberOfNodes_recursive(node.left);
        count += this.getNumberOfNodes_recursive(node.right);
        return count;
    }

    public getNumberOfNodes(): number {
        const stack: Stack<TreeNode> = new Stack<TreeNode>(100);
        let count: number = 0;
        stack.push(this.root);

        while (stack.getSize() > 0) {
            let topNode: TreeNode = stack.getTop();
            stack.pop();
            ++count;

            if (topNode.right) {
                stack.push(topNode.right);
            }

            if (topNode.left) {
                stack.push(topNode.left);
            }
        }
        return count;    
    }


    public getEntry(targetNode: TreeNode): TreeNode {
        let curr: TreeNode = this.root;

        while (curr) {

            if (targetNode.key < curr.key) {
                curr = curr.left;
            }

            else if(targetNode.key > curr.key) {
                curr = curr.right;
            }
            else {
                return curr;
            }
        }
        return null;
    };


    public getEntry_recursive(targetNode: TreeNode, root: TreeNode):  TreeNode {
        if (!root) {
            return null;
        }

        if (root.key > targetNode.key) {
            return this.getEntry_recursive(targetNode, root.left);
        }
        else if (root.key < targetNode.key) {
            return this.getEntry_recursive(targetNode, root.right);
        }
        else {
            return root;
        }
    }



    public getRootData(): TreeNode {
        return this.root;
    }; 

    public setRootData(data: number): void {
        this.root.key = data;
    };


    public contains(data: number, node: TreeNode): boolean {
        if (!node) {
            return false;
        }

        if (node.key == data) {
            return true;
        } 
        else if (node.key > data) {
            return this.contains(data, node.left);
        }
        else {
            return this.contains(data, node.right);
        }
    };


    public clear(node: TreeNode): null {
        if (!node) {
            return null;
        }

        node.left = this.clear(node.left);
        node.right = this.clear(node.right);
        return null;
    };


    public inorderTraverse(node: TreeNode): void {
        if (node) {
            this.inorderTraverse(node.left);
            console.log(node.key);
            this.inorderTraverse(node.right);
        }
    };

    public preorderTraverse(node: TreeNode): void {
        if (node) {
            console.log(node.key);
            this.preorderTraverse(node.left);
            this.preorderTraverse(node.right);
        }
    };


    public postorderTraverse(node: TreeNode): void {
        this.postorderTraverse(node.left);
        this.postorderTraverse(node.right);
        console.log(node.key);
    }


    public bfsTraverse(visitorFunc: (value: number) => void) {
        const size: number = this.getNumberOfNodes();
        const queue: Queue<TreeNode> = new Queue<TreeNode>(size);
        const stack: Stack<number> = new Stack<number>(size);
        queue.enqueue(this.root);


        while (!queue.isEmpty()) {
            const node: TreeNode = queue.peek();
            queue.dequeue();

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }
            stack.push(node.key);
        }


        while (!stack.isEmpty()) {
            let val: number = stack.getTop();
            stack.pop();
            visitorFunc(val);
        }
    }
}


const bst: BST = new BST(8);
bst.insert(5);
bst.insert(10);
bst.insert(3);
bst.insert(6);
// bst.bfsTraverse((value: number) => console.log(value));
// const targetNode = bst.getRootData().right;
// console.log(bst.getEntry(targetNode));
// console.log(bst.getEntry_recursive(targetNode, bst.getRootData()));
// console.log(bst.contains(18, bst.getRootData()));
// bst.inorderTraverse(bst.getRootData());
// bst.preorderTraverse(bst.getRootData());