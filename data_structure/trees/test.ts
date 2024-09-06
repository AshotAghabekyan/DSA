import { TreeNode } from "./bst.ts";
import {AVL} from "./avl.ts"  



function leftRotate(root: TreeNode): TreeNode {
    const tmp = root.right!;
    root.right = tmp.left;
    tmp.left = root;
    return tmp;
}

function rightRotate(root: TreeNode): TreeNode {
    const tmp = root.left!;
    root.left = tmp.right;
    tmp.right = root;
    return tmp;
}

function getHeight(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    let left = getHeight(root.left);
    let right = getHeight(root.right);
    return Math.max(left, right) + 1;
}

function getBalanceFactor(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    return getHeight(root.left) - getHeight(root.right);
}

function balance(root: TreeNode): TreeNode {
    const balanceFactor = getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (getBalanceFactor(root.left!) < 0) {
            root.left = leftRotate(root.left!);
        }
        return rightRotate(root);
    }

    if (balanceFactor < -1) {
        if (getBalanceFactor(root.right!) > 0) {
            root.right = rightRotate(root.right!);
        }
        return leftRotate(root);
    }

    return root;
}

var balanceBST = function(root: TreeNode): TreeNode {
    if (!root) return root;

    root.left = balanceBST(root.left);
    root.right = balanceBST(root.right);

    return balance(root);
};



let tree1 = new TreeNode(1);
const tree2 = new TreeNode(2);
const tree3 = new TreeNode(3);
const tree4 = new TreeNode(4);

tree1.right = tree2;
tree2.right = tree3;
tree3.right = tree4;
tree1 = balanceBST(tree1);
console.log(tree1);
// const avl = new AVL(10);
// console.log(avl.isBalanced(tree1));
