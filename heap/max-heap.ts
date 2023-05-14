import { Item } from "./item";

export class MaxHeap<T> {
  private heap: Item<T>[];
  constructor() {
    this.heap = [];
  }

  insert(item: Item<T>) {
    this.heap.push(item);

    let newIndex = this.heap.length - 1;

    while (newIndex > 0) {
      const parentIndex = this.parentIndex(newIndex);

      if (item.value > this.heap[parentIndex].value) {
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
    if (this.heap.length > 0) {
      let currentIndex = 0;
      const item = this.heap[currentIndex];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastItem = this.heap.pop();

      if (lastItem) {
        this.heap[currentIndex] = lastItem;
      }

      while (this.heap[this.leftChildIndex(currentIndex)]) {
        const leftChild = this.heap[this.leftChildIndex(currentIndex)];
        const rightChild = this.heap[this.rightChildIndex(currentIndex)];

        let swapIndex = -1;

        const currentItem = this.heap[currentIndex];

        if (
          currentItem.value < leftChild.value ||
          currentItem.value < rightChild.value
        ) {
          if (leftChild.value > rightChild.value) {
            swapIndex = this.leftChildIndex(currentIndex);
          } else {
            swapIndex = this.rightChildIndex(currentIndex);
          }
        }

        if (swapIndex > -1) {
          [this.heap[currentIndex], this.heap[swapIndex]] = [
            this.heap[swapIndex],
            this.heap[currentIndex],
          ];
          currentIndex = swapIndex;
        } else {
          break;
        }
      }

      return item;
    }
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

  getItems(): Item<T>[] {
    return this.heap;
  }
}
