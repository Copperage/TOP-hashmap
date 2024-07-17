class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(arr) {
		this.root = this.buildTree(arr);
	}

	buildTree(arr) {
		arr = arr.sort((a, b) => a - b);
		arr = arr.filter((item, index) => arr.indexOf(item) === index);

		if (arr.length === 0) return null;

		// middle index of the array.
		const middle = Math.floor(arr.length / 2);
		const root = new Node(arr[middle]);

		root.left = this.buildTree(arr.slice(0, middle));
		root.right = this.buildTree(arr.slice(middle + 1));

		return root;
	}

	insert(value) {
		// o(logn)
		let current = this.root;

		// loop through tree until null found for new node
		while (true) {
			// if the value is less than the current node's data add it to the left
			if (value < current.data) {
				if (!current.left) {
					current.left = new Node(value);
					return;
				}
				// if the left child exists, continue the traversal to the left child
				current = current.left;
			} else {
				// if the value is less than the current node's data add it to the right
				if (!current.right) {
					current.right = new Node(value);
					return;
				}
				current = current.right;
			}
		}
	}

	deleteItem(value) {
		// loop through the tree
		// if value is null then return
		// if value is found then replace the value with the smallest value in the right subtree
		// delete that value
		// o(n)

		if (!this.root) return null;

		let current = this.root;

		if (value < current.data) {
			current.left = this.deleteItem(value);
		} else if (value > current.data) {
			current.right = this.deleteItem(value);
		} else {
			if (current.left === null) {
				return current.right;
			} else if (current.right === null) {
				return current.left;
			}
		}

		return current;
	}

	find(value) {
		let current = this.root;

		while (current !== null) {
			if (current.data === value) {
				return current;
			} else if (current.data < value) {
				current = current.right;
			} else {
				current = current.data;
			}
		}
		return null;
	}

	levelOrder(callback) {
		// Level order traversal is the order in which each level is visited from left to right.
		// Start from root node and visit and display each node on a level before moving onto the next level
		// breadth first search, o(n)

		let result = [];
		let queue = [this.root];

		while (queue.length !== 0) {
			let level = [];
			let levelLength = queue.length;

			for (let i = 0; i < levelLength; i++) {
				let node = queue.shift();
				level.push(node.data);

				if (node.left) queue.push(node.left);
				if (node.right) queue.push(node.right);
				if (callback) callback(node);
			}

			if (result.length % 2 !== 0) {
				level.reverse();
			}

			result.push(level);
		}

		if (!callback) return result;
	}

	inOrder(callback) {
		let result = [];
		let stack = [];
		let current = this.root;

		while (current || stack.length > 0) {
			while (current) {
				stack.push(current);
				current = current.left;
			}
			current = stack.pop();
			result.push(current.data);
			current = current.right;
			if (callback) callback(current);
		}

		if (!callback) return result;
	}

	preOrder(callback) {
		// Initialize the stack with the root node, then process down left subtree until the stack is empty
		// then process the right subtree until the stack is empty and all nodes are processed

		let result = [];
		let stack = [];
		let current = this.root;

		if (current) stack.push(current);

		while (stack.length > 0) {
			current = stack.pop();
			result.push(current.data);

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
			if (callback) callback(current);
		}

		if (!callback) return result;
	}

	postOrder(callback) {
		// Start from the left subtree first and then the right subtree and then the root node

		let result = [];
		let stack = [];
		let current = [];

		stack.push(this.root);

		while (stack.length > 0) {
			let node = stack.pop();
			current.push(node);

			if (node.left) stack.push(node.left);
			if (node.right) stack.push(node.right);
			if (callback) callback(node);
		}

		while (current.length > 0) {
			let node = current.pop();
			result.push(node.data);
		}

		if (!callback) return result;
	}

	height(node = this.root) {
		if (node === null) {
			return -1;
		}

		// Calculate the height of the left and right subtrees.
		let left = this.height(node.left);
		let right = this.height(node.right);

		// The height of the current node is the maximum height of its left and right subtrees
		// plus 1 for the current node.
		return Math.max(left, right) + 1;
	}

	depth(node = this.root) {
		if (node === null) {
			return -1;
		}

		// Calculate the depth of the left and right subtrees
		let leftDepth = this.depth(node.left);
		let rightDepth = this.depth(node.right);

		// The depth of the current node is the maximum depth of its left and right subtrees
		// plus 1 for the current node
		return Math.max(leftDepth, rightDepth) + 1;
	}

	isBalanced(node = this.root) {
		if (node === null) {
			return [true, 0]; // Return a tuple indicating that the tree is balanced and its height is 0
		}

		// Recursively check if the left and right subtrees are balanced
		const left = this.isBalanced(node.left);
		const right = this.isBalanced(node.right);

		// The tree is balanced if both the left and right subtrees are balanced
		// and the difference in height between the left and right subtrees is at most 1
		const balance = left[0] && right[0] && Math.abs(left[1] - right[1]) <= 1;

		// Return a tuple indicating if the tree is balanced and its height
		return [balance, Math.max(left[1], right[1]) + 1];
	}

	rebalance() {
		// Get the in-order traversal of the tree and store it in the 'arr' variable
		const arr = this.inOrder();

		// Build a new tree using the in-order traversal array and assign it to the 'root' variable
		this.root = this.buildTree(arr);
	}
}

module.exports = Tree;
