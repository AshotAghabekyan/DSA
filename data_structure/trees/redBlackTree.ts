import { TreeNode } from "./bst";

enum RbtColor {Red, Black};


class RbtNode extends TreeNode {
    public color: RbtColor;
    public parent: RbtNode = null;
    public left: RbtNode = null;
    public right: RbtNode = null; 

    constructor(key: number) {
        super(key);
        this.color = RbtColor.Red;
    }
}


export class RBT {
    private root: RbtNode;
    private nil: RbtNode = new RbtNode(null);

    constructor() {
        this.nil.color = RbtColor.Black;
        this.root = this.nil;
    }


    private leftRotate(node: RbtNode): void {

    }

    private rightRotate(node: RbtNode): void {

    }

    private insertFixup(node: RbtNode): void {

        while (node.parent.color == RbtColor.Red) {
            if (node.parent == node.parent.parent.left) {
                let uncle = node.parent.parent.right;
                if (uncle.color == RbtColor.Red) {
                    uncle.color = RbtColor.Black;
                    node.parent.color = RbtColor.Black;
                    node.parent.parent.color = RbtColor.Red;
                }

                else {
                    if (node == node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node)
                    }
                    node.parent.color = RbtColor.Black;
                    node.parent.parent.color = RbtColor.Black;
                }
                //......... to be continue
            }
        }
    }

    private deleteFixup(node: RbtNode): void {

    }


    public insert(key: number) {
        const node: RbtNode = new RbtNode(key);
        let parentNode: RbtNode = this.nil;
        let current: RbtNode = this.root;

        while (current != this.nil) {
            parentNode = current;
            if (node.key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }

        }

        if (parentNode == this.nil) {
            this.root = node;
        }

        else if (node.key < parentNode.key) {
             parentNode.left = node;
        }
        else {
            parentNode.right = node;
        }

        node.left = this.nil;
        node.right = this.nil;
        node.color = RbtColor.Red;
        this.insertFixup(node);
    }


    private _clear(root: RbtNode): RbtNode {
        if (root) {
            root.left = this._clear(root.left);
            root.right = this._clear(root.right);
            return null;
        }
        return null;
    }

    public clear() {
        this._clear(this.root);
    }


}