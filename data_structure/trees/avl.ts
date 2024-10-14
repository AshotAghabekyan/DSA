import { TreeNode } from "./bst.ts";


class AvlTreeNode extends TreeNode {
    public height: number = 1;
    public left: AvlTreeNode = null;
    public right: AvlTreeNode = null; 

    constructor(key: number) {
        super(key);
    }
}



export class AVL {
    private root: AvlTreeNode;

    constructor(initValue: number) {
        this.root = new AvlTreeNode(initValue)
    }


    public getRoot() {
        return this.root;
    }


    public insert(value: number) {
        this.root = this._insert(value, this.root);
    }

    private _insert(value: number, root: AvlTreeNode): AvlTreeNode {
        if (!root) {
            return new AvlTreeNode(value);
        }

        if (value < root.key) {
            root.left = this._insert(value, root.left);
        }
        else if(value > root.key) {
            root.right = this._insert(value, root.right);
        }

        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        const balance = this.getBalance(root);

        if (balance > 1) {
            if (value > root.left.key) {
                root.left = this.leftRotate(root.left);
            }
            return this.rightRotate(root);
        }

        if (balance < -1) {
            if (value < root.right.key) {
                root.right = this.rightRotate(root.right)
            }
            return this.leftRotate(root);
        }

        return root;
    }


    public delete(value: number) {
        this.root = this._delete(value, this.root);
    }

    private _delete(value: number, root: AvlTreeNode): AvlTreeNode {
        if (!root) {
            return null;
        }

        if (value < root.key) {
            root.left = this._delete(value, root.left);
        } 
        else if (value > root.key) {
            root.right = this._delete(value, root.right);
        } 
        else {
            if (!root.left) {
                return root.right;
            }
            else if (!root.right) {
                return root.left;
            }

            const tmp = this.getMinValueNode(root.right);
            root.key = tmp.key;
            root.right = this._delete(tmp.key, root.right);
        }
        
        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        const balance = this.getBalance(root);

        if (balance > 1) {
            if (value > root.left.key) {
                root.left = this.leftRotate(root.left);
            }
            return this.rightRotate(root);
        }

        if (balance < -1) {
            if (value < root.right.key) {
                return this.rightRotate(root.right)
            }
            return this.leftRotate(root);
        }

        return root;
    }


    private getMinValueNode(node: AvlTreeNode): AvlTreeNode {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }


    public search(value: number): AvlTreeNode {
        let curr: AvlTreeNode = this.root;

        while (curr) {
            if (curr.key == value) {
                return curr;
            }

            else if (curr.key > value) {
                curr = curr.left;
            }

            else if (curr.key < value) {
                curr = curr.right;
            }
            else {
                return curr;
            }
        }
        return null;
    }


    private leftRotate(root: AvlTreeNode): AvlTreeNode { 
        const tmp: AvlTreeNode = root.right;
        root.right = tmp.left;
        tmp.left = root;
        tmp.height = Math.max(this.getHeight(tmp.left), this.getHeight(tmp.right)) + 1;
        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        return tmp;
    }


    private rightRotate(root: AvlTreeNode) {
        const tmp: AvlTreeNode = root.left;
        root.left = tmp.right;
        tmp.right = root;
        tmp.height = Math.max(this.getHeight(tmp.left), this.getHeight(tmp.right)) + 1;
        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
        return tmp;
    }

    

    private getHeight(node: AvlTreeNode): number { //
        if (!node) {
            return 0; 
        }
        return node.height;
    }


    private getBalance(root: AvlTreeNode): number {
        const balance: number = this.getHeight(root.left) - this.getHeight(root.right);
        return balance;
    }


    public isBalanced(root: AvlTreeNode): boolean {
        if (!root) {
            return true;
        }
        const res = this.getHeight(root.left) - this.getHeight(root.right);
        return Math.abs(res) <= 1;
    }

    
    
    public inorder(root: AvlTreeNode): void {
        if (!root) {
            return;
        }

        this.inorder(root.left);
        console.log(root.key);
        this.inorder(root.right);
    }
}


// const avl: AVL = new AVL(10);


// avl.insert(8);
// avl.insert(11)
// avl.insert(7);
// avl.insert(6);
// avl.insert(4);
// console.log(avl.getRoot());
// console.log("is balanced -->", avl.isBalanced(avl.getRoot()))
// // avl.inorder(avl.getRoot());