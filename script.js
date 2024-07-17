const BinaryTree = require('./binary-search-tree');

// Randomized assortment of numbers in the array based on the size parameter
const randomArr = (size) => {
	return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new BinaryTree(randomArr(5));

console.log(tree.isBalanced()); // true, 3

console.log(tree.levelOrder()); // [ [ 63 ], [ 89, 34 ], [ 31 ] ]
console.log(tree.inOrder()); // [ 31, 34, 63, 89 ]
console.log(tree.preOrder()); // [ 63, 34, 31, 89 ]
console.log(tree.postOrder()); // [ 31, 34, 89, 63 ]

tree.insert(100);
tree.insert(200);
tree.insert(300);

console.log(tree.isBalanced()); // false, 5
tree.rebalance();
console.log(tree.isBalanced()); // true, 4

console.log(tree.levelOrder()); // [ [ 91 ], [ 200, 61 ], [ 47, 86, 100, 300 ], [ 10 ] ]
console.log(tree.inOrder()); // [ 10,  47,  61,  86, 91, 100, 200, 300 ]
console.log(tree.preOrder()); // [ 91,  61,  47,  10, 86, 200, 100, 300 ]
console.log(tree.postOrder()); // [ 10,  47,  86, 61, 100, 300, 200, 91 ]
