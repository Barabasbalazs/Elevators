export class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item) {
      this.items.push(item);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    peek() {
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }

    asList() {
      // filter out all duplicates added from useState
      const unique = [...new Set(this.items)];
      return unique;
    }

    reprioritize(item) {
      return this.items.unshift(item);
    }
}
