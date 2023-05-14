import { Item } from "./item";

export class MinHeap<T> {
  private heap: Item<T>[];
  constructor() {
    this.heap = [];
  }

  insert(item: Item<T>) {
    this.heap.push(item);
    let newIndex = this.heap.length - 1;

    while (newIndex > 0) {
      const parentIndex = this.parentIndex(newIndex);

      if (item.value < this.heap[parentIndex].value) {
        [this.heap[newIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[newIndex],
        ];
        newIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  delete(): Item<T> | undefined {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const item = this.heap[0];
    this.heap[0] = this.heap.pop() as Item<T>;
    let currentIndex = 0;

    while (this.heap[this.leftChildIndex(currentIndex)]) {
      const smallerChildIndex = this.determineSmallerChildIndex(currentIndex);

      if (smallerChildIndex > -1) {
        [this.heap[currentIndex], this.heap[smallerChildIndex]] = [
          this.heap[smallerChildIndex],
          this.heap[currentIndex],
        ];
        currentIndex = smallerChildIndex;
      } else {
        break;
      }
    }

    return item;
  }

  leftChildIndex(index: number) {
    return index * 2 + 1;
  }

  rightChildIndex(index: number) {
    return index * 2 + 2;
  }

  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  determineSmallerChildIndex(index: number): number {
    const currentItem = this.heap[index];
    const leftChild = this.heap[this.leftChildIndex(index)];
    const rightChild = this.heap[this.rightChildIndex(index)];
    let smallerChildIndex = -1;

    if (
      (leftChild && currentItem.value > leftChild.value) ||
      (rightChild && currentItem.value > rightChild.value)
    ) {
      if (!rightChild) {
        smallerChildIndex = this.leftChildIndex(index);
      } else if (leftChild.value < rightChild.value) {
        smallerChildIndex = this.leftChildIndex(index);
      } else {
        smallerChildIndex = this.rightChildIndex(index);
      }
    }

    return smallerChildIndex;
  }

  getItems(): Item<T>[] {
    return this.heap;
  }

  size(): number {
    return this.heap.length;
  }
}
