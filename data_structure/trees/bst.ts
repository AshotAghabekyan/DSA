import {Stack} from "../stack/stack";
import {Queue} from "../queue/queue";

export class TreeNode {
    public left: TreeNode;
    public right: TreeNode;
    public key: number;

    constructor(key?: number) {
        this.key = key || null;
        this.left = null;
        this.right = null;
    }
}



export class BST {
    private root: TreeNode;

    constructor(initValue: number) {
        this.root = new TreeNode(initValue);
    };

    public isEmpty(): boolean {
        return Boolean(this.root);
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
                    break;
                } else {
                    curr = curr.left;
                }
            }

            else if (curr.key < data) {
                if (!curr.right) {
                    curr.right = new TreeNode(data);
                    break;
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


    public delete(key: number) {
        let curr: TreeNode = this.root;
        let prev: TreeNode = null;

        while (curr && curr.key != key) {
            prev = curr;

            if (curr.key > key) {
                curr = curr.left;
            }
            else {
                curr = curr.right;
            }
        }

        if (!curr) {
            return curr;
        }

        if (!curr.left || !curr.right) {
            const tmpNode: TreeNode = curr.left == null? curr.right : curr.left;

            if (prev.left == curr) {
                prev.left = tmpNode;
            }
            else {
                prev.right = tmpNode;
            }
        }
        else {
            let successorPrev = null;
            let successor = curr.right;
            while (successor.left) {
                successorPrev = successor;
                successor = successor.left;
            }
 
            if (!successorPrev) {
                curr.right = successor.right;
            }
            else {
                successorPrev.left = null;
            }
            [curr.key, successor.key] = [successor.key, curr.key];
        }
        return this.root;
    }


    public delete_recursive(key: number, root: TreeNode) {
        if (!root) {
            return root;
        }

        if (key < root.key) {
            root.left = this.delete_recursive(key, root.left);
        }
        else if (key > root.key) {
            root.right = this.delete_recursive(key, root.right);
        }

        else {
            if (!root.left) {
                return root.right;
            }

            else if (!root.right) {
                return root.left
            }

            root.key = this.getSuccessor(root.right).key;
            root.right = this.delete_recursive(root.key, root.right);
        }

        return root;
    }


    public getSuccessor(root: TreeNode) {
        let curr = root;
        while (curr.left) {
            curr = curr.left
        }
        return curr;
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


    public getHeight_iterative() {
        const stack: TreeNode[] = [];
        stack.push(this.root);
        let left = 0;
        let rigth = 0;
        let height = 0;
        while (stack.length > 0) {
            const node: TreeNode = stack.pop();
            
            if (node.right) {
                ++left;
                stack.push(node.right);
            }

            if (node.left) {
                ++rigth;
                stack.push(node.left);
            }

            height = Math.max(left + rigth) + 1;
        }
        return height;
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


    public bfsTraverse(visitorFunc: (value: number) => void): void {
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


    public bfsTraverse_recursive(visitorFunc: (value:number) => void, queue: TreeNode[] = [this.root]) {
        if (queue.length == 0) {
            return;
        }

        const node = queue.shift();
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
        visitorFunc(node.key);
        this.bfsTraverse_recursive(visitorFunc, queue);
    }


    public bfsTraverse_modernized(root: TreeNode): number[][] {
        if (!root) {
            return [];
        }
    
        let stack: TreeNode[] = [];
        let result: number[][] = [];
        stack.push(root);
        result.push([root.key])
    
        while (stack.length > 0) {
            let curr: TreeNode = stack.pop();
    
    
            if (curr.right) {
                stack.push(curr.right);
            }
    
            if (curr.left) {
                stack.push(curr.left);
            }
    
            if (curr.left || curr.right) {
                if (!curr.left && curr.right) {
                    result.push([curr.right.key])
                }
    
                else if (!curr.right && curr.left) {
                    result.push([curr.left.key]);
                }
                else {
                    result.push([curr.left.key, curr.right.key])
                }
            }
        }
        return result;
    };



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


    public static recoverTree(root: TreeNode): TreeNode {
        let result: TreeNode[] = [];
        let stack: TreeNode[] = [];
        let curr: TreeNode = root;

        while (curr || stack.length > 0) {

            while (curr) {
                stack.push(curr);
                curr = curr.left;
            }

            let parentNode: TreeNode = stack.pop();
            result.push(parentNode);
            curr = parentNode.right;
        }


        let firstErrorNode: TreeNode | null = null;
        let secondErrorNode: TreeNode | null = null;

        for (let i = 0; i < result.length; ++i) {
            if (result[i + 1].key < result[i].key) {
                firstErrorNode = result[i];
                secondErrorNode = result[i + 1];
                break;
            }
        }


        if (firstErrorNode && secondErrorNode) {
            let temp = firstErrorNode.key;
            firstErrorNode.key = secondErrorNode.key;
            secondErrorNode.key = temp;
        }
    

        return root;
    }


    public static isBST(root: TreeNode): boolean {
        if (!root) {
            return true;
        }

        if (root.left && BST.maxValue(root.left) >= root.key) {
            return false;
        }

        if (root.right && BST.minValue(root.right) <= root.key) {
            return false;
        }

        return BST.isBST(root.left) && BST.isBST(root.right);
    }


    public static isBST_iterative(root: TreeNode): boolean {
        const stack: TreeNode[] = [];
        let curr: TreeNode = root;

        while (stack.length > 0) {
            
            while (curr) {
                if (curr.left && BST.maxValue(curr.left) > curr.key) {
                    return false;
                }

                if (curr.right && BST.minValue(curr.right) < curr.key) {
                    return false;
                }
                stack.push(curr);
                curr = curr.left;
            }

            const parent: TreeNode = stack.pop();
            curr = parent.right;
        }

        return true;
    }


    private static minValue(root: TreeNode) {
        let curr = root;

        while (curr.right) {
            curr = curr.right;
        }
        return curr.key;
    }

    private static maxValue(root: TreeNode) {
        let curr = root;
        
        while (curr.left) {
            curr = curr.left;
        }
        return curr.key;
    }
}


const bst: BST = new BST(10);
bst.insert(8);
bst.insert(6);
bst.insert(12);
bst.insert(15);
bst.insert(11);
bst.insert(16);
// console.log(BST.isBST_iterative(bst.getRootData()));
// console.log(bst.bfsTraverse_modernized(bst.getRootData()))
// bst.delete(12);
// bst.bfsTraverse_recursive((value) => console.log(value));
// bst.delete_recursive(12, bst.getRootData())
// bst.preorderTraverse();