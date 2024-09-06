import { TreeNode } from "./bst.ts";





export class AVL  {
    private root: TreeNode;

    constructor(initValue: number) {
        this.root = new TreeNode(initValue)
    }


    public getRoot() {
        return this.root;
    }

    public insert(value: number, root: TreeNode): TreeNode {
        if (!root) {
            return new TreeNode(value);
        }

        if (value < root.key) {
            root.left = this.insert(value, root.left);
        }
        else if(value > root.key) {
            root.right = this.insert(value, root.right);
        }

        if (root === this.root) {
            this.root = this.balanceTree(root, value);
            return this.root;
        }
        return this.balanceTree(root, value);
    }



    public delete(value: number, root: TreeNode): TreeNode {
        if (!root) {
            return null;
        }

        if (value < root.key) {
            root.left = this.delete(value, root.left);
        } 
        else if (value > root.key) {
            root.right = this.delete(value, root.right);
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
            root.right = this.delete(tmp.key, root.right);
        }
        return this.balanceTree(root, value);
    }


    private getMinValueNode(node: TreeNode): TreeNode {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }


    public search(value: number): TreeNode {
        let curr: TreeNode = this.root;

        while (curr) {
            if (curr.key == value) {
                return curr;
            }

            else if (curr.key < value) {
                curr = curr.left;
            }

            else if (curr.key > value) {
                curr = curr.right;
            }
            else {
                return curr;
            }
        }
        return null;
    }



    private balanceTree(root: TreeNode, value: number): TreeNode {
        const balance = this.getBalance(root);

        if (balance > 1) {
            if (value > root.left.key) {
                return this.rightLeftRotate(root);
            }
            return this.rightRotate(root);
        }

        if (balance < -1) {
            console.log('balance < -1!!')
            if (value < root.right.key) {
                return this.leftRightRotate(root);
            }
            return this.leftRotate(root);
        }
        return root;
    }


    private leftRotate(root: TreeNode): TreeNode {
        const tmp: TreeNode = root.right;
        root.right = tmp.left;
        tmp.left = root;
        return tmp;
    }


    private rightRotate(root: TreeNode) {
        const tmp: TreeNode = root.left;
        root.left = tmp.right;
        tmp.right = root;
        return tmp;
    }


    private leftRightRotate(root: TreeNode): TreeNode {
        root.left = this.leftRotate(root.left);
        return this.rightRotate(root);
    }
    
    private rightLeftRotate(root: TreeNode): TreeNode {
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
    }
    

    private getHeight(node: TreeNode): number { //
        if (!node) {
            return 0; 
        }

        let leftHeight = this.getHeight(node.left);
        let rightHeight = this.getHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }


    private getBalance(root: TreeNode): number {
        const balance: number = this.getHeight(root.left) - this.getHeight(root.right);
        return balance;
    }

    public isBalanced(root: TreeNode): boolean {
        if (!root) {
            return true;
        }
        const res = this.getHeight(root.left) - this.getHeight(root.right);
        return Math.abs(res) <= 1;
    }

    
    public inorder(root: TreeNode): void {
        if (!root) {
            return;
        }

        this.inorder(root.left);
        console.log(root.key);
        this.inorder(root.right);
    }
}


// const avl: AVL = new AVL(10);
// avl.insert(8, avl.getRoot());
// avl.insert(11, avl.getRoot());
// avl.insert(7, avl.getRoot());
// avl.insert(6, avl.getRoot());
// console.log(avl.getRoot());
// avl.insert(4, avl.getRoot());
// console.log("is balanced -->", avl.isBalanced(avl.getRoot()))
// avl.inorder(avl.getRoot());