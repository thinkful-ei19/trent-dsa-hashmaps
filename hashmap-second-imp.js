'use strict';

class _Node {
  constructor(value, next) {
    this.value=value;
    this.next=next;
  }
}
  
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else { 
      let tempNode = this.head;
      while(tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  
  find(item) {
    let currentNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currentNode.next !== null) {
      if (currentNode.value === item) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  // their implementation of find :
  //   find(item) { 
  //     //start at the head
  //     let currNode = this.head;
  //     //if the list is empty
  //     if (!this.head){
  //       return null;
  //     }
  //     //Check for the item 
  //     while(currNode.value !== item) {
  //       //return null if end of the list 
  //       // and the item is not on the list
  //       if (currNode.next === null) {
  //         return null;
  //       }
  //       else {
  //         //otherwise keep looking 
  //         currNode = currNode.next;
  //       }
  //     }
  //     //found it
  //     return currNode;
  //   }
  
  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currentNode = this.head;
    let previousNode = this.head;
    while ((currentNode !== null) && (currentNode.value !== item)) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if(currentNode === null){
      console.log('Item not found');
      return;
    }
    previousNode.next = currentNode.next;
  }
  
  
  insertBefore(item, before) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === before) {
      this.insertFirst(item);
      return;
    } else {
      let currentNode = this.head;
      let previousNode = this.head;
      while ((currentNode !== null) && (currentNode.value !== before)) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if (currentNode === null) {
        console.log('Item you are trying to insert before is not found');
        return;
      }
      previousNode.next = new _Node(item, currentNode);
    }
  }
  
  insertAfter(item, after) {
    if (!this.head) {
      return null;
    }
    let currentNode = this.find(after);
    if (currentNode) {
      let nextNode = currentNode.next;
      currentNode.next = new _Node(item, nextNode);
      return;
    }
    console.log('Item you are trying to insert after is not found');
  }
  
  insertAt(item, position) {
    if (!this.head) {
      return null;
    }
    if (position === 1) {
      this.insertFirst(item);
      return;
    }
    let i = 0;
    let currentNode = this.head;
    let previousNode = this.head;
    while ((i < (position - 1)) && (currentNode !== null)) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      i++;
    }
    if (currentNode === null) {
      console.log('Position exceeds the length of the list');
      return;
    }
    previousNode.next = new _Node(item, currentNode);
  }
}

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    const list = new LinkedList();
    list.insertLast(value);
    value = list;
    this.length++;
    
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const index = hash % this._capacity;
    return index;

  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main() {
  const lor = new HashMap();
    
  lor.set('Hobbit','Bilbo'); 
  lor.set('Hobbit','Frodo');
  lor.set('Wizard','Gandolf');
  lor.set('Human','Aragon');
  lor.set('Elf','Legolas');
  lor.set('Maiar','The Necromancer');
  lor.set('Maiar','Sauron');
  lor.set('RingBearer','Gollum');
  lor.set('LadyOfLight','Galadriel');
  lor.set('HalfElven','Arwen');
  lor.set('Ent','Treebeard');
  
  //   console.log(lor.get('Maiar'));
  console.log(lor);
  
  
}
  
main();