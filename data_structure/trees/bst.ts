import Stack from "../stack/stack.ts";
import Queue from "../queue/queue.ts";

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

    public insert_recursive(data: number): TreeNode {
        this.root = this._insert_recursive(data, this.root); 
        return this.root; 
    }

    private _insert_recursive(data: number, node: TreeNode): TreeNode {
        if (!node) {
            return new TreeNode(data); 
        }

        if (node.key > data) {
            node.left = this._insert_recursive(data, node.left); 
        } else if (node.key < data) {
            node.right = this._insert_recursive(data, node.right); 
        }
        
        return node; 
    }


    public insert(data: number): TreeNode {
        let curr: TreeNode = this.root;

        while (curr) {
            if (curr.key > data) {
                if (!curr.left) {
                    curr.left = new TreeNode(data);
                } else {
                    curr = curr.left;
                }
            }

            else if (curr.key < data) {
                if (!curr.right) {
                    curr.right = new TreeNode(data);
                } else {
                    curr = curr.right;
                }
            }

            else {
                break;
            }
        }

        return this.root;
    }


    private _getHeight(node: TreeNode): number { //
        if (!node) {
            return 0; 
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


    public contains_recursive(data: number, node: TreeNode): boolean {
        if (!node) {
            return false;
        }

        if (node.key == data) {
            return true;
        } 
        else if (node.key > data) {
            return this.contains_recursive(data, node.left);
        }
        else {
            return this.contains_recursive(data, node.right);
        }
    };


    public contains(data: number): boolean {
        let curr: TreeNode = this.root;

        while (curr) {

            if (curr.key == data) {
                return true;
            } 

            else if (curr.key > data) {
                curr = curr.left;
            }

            else if (curr.key < data) {
                curr = curr.right;
            }
        }
        return false;
    }


    public clear_recursive(node: TreeNode): null {
        if (!node) {
            return null;
        }

        node.left = this.clear_recursive(node.left);
        node.right = this.clear_recursive(node.right);
        return null;
    };


    public inorderTraverse_recursive(node: TreeNode): void {
        if (node) {
            this.inorderTraverse_recursive(node.left);
            console.log(node.key);
            this.inorderTraverse_recursive(node.right);
        }
    };


    public inorderTraverse(): void {
        const size: number = this.getNumberOfNodes();
        const stack: Stack<TreeNode> = new Stack<TreeNode>(size);
        let curr: TreeNode = this.root;

        while (curr || stack.getSize() > 0) {

            while (curr) {
                stack.push(curr);
                curr = curr.left
            }

            const parentNode: TreeNode = stack.getTop();
            stack.pop();
            console.log(parentNode.key);
            curr = parentNode.right;
        }
    }


    public preorderTraverse_recursive(node: TreeNode): void {
        if (node) {
            console.log(node.key);
            this.preorderTraverse_recursive(node.left);
            this.preorderTraverse_recursive(node.right);
        }
    };


    public preorderTraverse(): void {
        const size: number = this.getNumberOfNodes();
        const stack: Stack<TreeNode> = new Stack<TreeNode>(size);
        let curr: TreeNode = this.root;

        while (curr || stack.getSize() > 0) {

            while (curr) {
                console.log(curr.key);
                stack.push(curr);
                curr = curr.left
            }

            const parentNode: TreeNode = stack.getTop();
            stack.pop();
            curr = parentNode.right;
        }
    }


    public postorderTraverse_recursive(node: TreeNode): void {
        if (node) {
            this.postorderTraverse_recursive(node.left);
            this.postorderTraverse_recursive(node.right);
            console.log(node.key);
        }
    }


    public postorderTraverse(): void {
        const size: number = this.getNumberOfNodes();
        const stack: Stack<TreeNode> = new Stack<TreeNode>(size);
        const resStack: Stack<TreeNode> = new Stack<TreeNode>(size);
        
        stack.push(this.root);

        while (stack.getSize() > 0) {
            const curr = stack.getTop();
            stack.pop();
            resStack.push(curr);

            if (curr.left) {
                stack.push(curr.left);
            }

            if (curr.right) {
                stack.push(curr.right);
            }
        }

        while (!resStack.isEmpty()) {
            const node: TreeNode = resStack.getTop();
            resStack.pop();
            console.log(node.key);
        }
    }


    public bfsTraverse(visitorFunc: (value: number) => void) {
        const size: number = this.getNumberOfNodes();
        const queue: Queue<TreeNode> = new Queue<TreeNode>(size);
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
            
            visitorFunc(node.key);
        }
    }


    public static isSameTree(tree1: TreeNode, tree2: TreeNode): boolean {
        const stack1: TreeNode[] = [];
        const stack2: TreeNode[] = [];
        
        stack1.push(tree1);
        stack2.push(tree2);
        
        while (stack1.length > 0 && stack2.length > 0) {
            let node1 = stack1.pop();
            let node2 = stack2.pop();
            
            if (!node1 && !node2) {
                continue;
            }
            
            if (!node1 || !node2) {
                return false;
            }
            
            if (node1.key !== node2.key) {
                return false;
            }
            
            stack1.push(node1.left);
            stack2.push(node2.left);
            
            stack1.push(node1.right);
            stack2.push(node2.right);
        }
        
        return stack1.length === 0 && stack2.length === 0;
    }
   
}






const bst: BST = new BST(8);
bst.insert(5);
bst.insert(10);
bst.insert(3);
bst.insert(6);
bst.insert(15);
bst.insert(9);
// console.log(bst.contains(15));
bst.postorderTraverse();

// const bst2: BST = new BST(8);
// bst2.insert_recursive(5);
// bst2.insert_recursive(10);
// bst2.insert_recursive(3);
// bst2.insert_recursive(6);
// bst.inorderTraverse(bst.getRootData());

// let isEqual: boolean = BST.isSameTree(bst.getRootData(), bst2.getRootData());
// console.log(isEqual);

// bst.bfsTraverse((value: number) => console.log(value));
// const targetNode = bst.getRootData().right;
// console.log(bst.getEntry(targetNode));
// console.log(bst.getEntry_recursive(targetNode, bst.getRootData()));
// console.log(bst.contains(18, bst.getRootData()));
// bst.inorderTraverse(bst.getRootData());
// bst.preorderTraverse(bst.getRootData());