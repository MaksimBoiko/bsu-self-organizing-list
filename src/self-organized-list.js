class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = null;
    }

    insert(data) {
      let node = new Node(data);
      if (this.length) {
          this.tail.next = node;
          node.prev = this.tail;
          this.tail = node;
      } else {
          this.head = node;
          this.tail = node;
      }
      this.length++;
      return this;
    }

    size() {
      return this.length;
    }

    at(index) {
      if (!this.head) return null;
        let node = this.head;
        let count = 0;
        while (count < index) {
          if (!node.next && count < index) {
            return null;
          }
            node = node.next;
            count++;
        }
        return node.data;
    }

    findNode(data) {
      let node = this.head;
      while (node != null) {
          if (node.data == data) return node;
          node = node.next;
        }
      if (node == this.length || !node) return null;
    }

    toArray() {
      let array = [];
      let node = this.head;
      while (node != null) {
        array.push(node.data);
        node = node.next;
      }
      return array;
    }

    removeAt(index) {
      let node = this.head;
      let count = 0;
      if (this.length == 1) {
          this.head = null;
          this.tail = null;
      } else {
        if (!index) {
        this.head = this.head.next;
        this.head.prev = null;
        } else {
          if (this.length - 1 == index) {
            this.tail = this.tail.prev;
            this.tail.next = null;
          } else {
            while (count < index){
                node = node.next;
                count++;
            }
            node.next.prev = node.prev;
            node.prev.next = node.next;
          }
        }
      }
      this.length--;
      return this;
    }

    moveToFront(node) {
      if (this.head) {
        if (node != this.head) {
          let oldNode = this.head;
          let newNode = node.data;
          if (node != this.tail) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node = null;
          } else {
            node.prev.next = null;
            this.tail = node.prev;
            node = null;
          }
          this.head = new Node(newNode);
          this.head.next = oldNode;
          oldNode.prev = this.head;
        }
      }
    }

    reorganize(data) {
      let node = this.findNode(data);
      if (node === this.head) return true;
      if (node != null) {
        this.moveToFront(node);
        return true;
      } else return false;
      if (this.length === 0) return false;
      if (node == null) return false;
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};

