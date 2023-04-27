import { AVLTree } from "@foxglove/avl";

const tree = new AVLTree();
tree.set(1, "1");
tree.set(1, "one");
tree.set(3, "three");
tree.set(2, "two");
tree.delete(0);
console.log(tree.has(0)); // false
console.log(tree.get(1)); // "one"
console.log(tree.size); // 3