class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;
    while (true) {
      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined;

    let currentNode = this.root;
    while (currentNode) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if (!currentNode) return undefined;

    if (val < currentNode.val) {
      return this.findRecursively(val, currentNode.left);
    } else if (val > currentNode.val) {
      return this.findRecursively(val, currentNode.right);
    } else {
      return currentNode;
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];

    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }

    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let visited = [];
    let queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length) {
      let currentNode = queue.shift();
      visited.push(currentNode.val);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) return undefined;

    const findMin = node => {
      while (node.left) {
        node = node.left;
      }
      return node;
    };

    const removeNode = (node, val) => {
      if (!node) return null;
      if (val < node.val) {
        node.left = removeNode(node.left, val);
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
      } else {
        // Node with no child
        if (!node.left && !node.right) return null;
        // Node with one child
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // Node with two children
        let minRight = findMin(node.right);
        node.val = minRight.val;
        node.right = removeNode(node.right, minRight.val);
      }
      return node;
    };

    this.root = removeNode(this.root, val);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalanced = node => {
      if (!node) return { height: 0, balanced: true };

      let left = checkBalanced(node.left);
      let right = checkBalanced(node.right);

      let height = Math.max(left.height, right.height) + 1;
      let balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;

      return { height, balanced };
    };

    return checkBalanced(this.root).balanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let currentNode = this.root;
    let parent;

    while (currentNode.right) {
      parent = currentNode;
      currentNode = currentNode.right;
    }

    if (currentNode.left) {
      currentNode = currentNode.left;
      while (currentNode.right) {
        currentNode = currentNode.right;
      }
      return currentNode.val;
    } else {
      return parent.val;
    }
  }
}

module.exports = BinarySearchTree;
