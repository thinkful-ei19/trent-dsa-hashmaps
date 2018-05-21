'use strict';

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
    if (!this._slots[index]) {
      this.length++;
    }
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

  orginalHashVal(key) {
    const hash = HashMap._hashString(key);
    return hash % this._capacity;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
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
  
//   lor.set('Hobbit','Bilbo'); 
//   lor.set('Hobbit','Frodo');
//   lor.set('Wizard','Gandolf');
//   lor.set('Human','Aragon');
//   lor.set('Elf','Legolas');
//   lor.set('Maiar','The Necromancer');
//   lor.set('Maiar','Sauron');
//   lor.set('RingBearer','Gollum');
//   lor.set('LadyOfLight','Galadriel');
//   lor.set('HalfElven','Arwen');
//   lor.set('Ent','Treebeard');

//   console.log(lor.get('fdf'));


}

main();

function isPalindrome(str) {
  const hashmap = new HashMap();
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    hashmap.set(str[i], 0);
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    let valueToInc = hashmap.get(str[i]);
    hashmap.set(str[i], valueToInc + 1);
  } 
  let numberOfOdd = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      continue;
    }
    let value = hashmap.get(str[i]);
    if (value % 2 !== 0) {
      numberOfOdd++;
    }
  }
  if (numberOfOdd > 1) {
    return false;
  } else {
    return true;
  }
}

// console.log(isPalindrome('never odd or even'));

function groupAnagrams(arr) {
  const hashmap = new HashMap();
  for (let i = 0; i < arr.length; i++) {
    hashmap.set(arr[i], hashmap.orginalHashVal(arr[i]));
  }
  let currentValue = hashmap._slots[0].value;
  let result = [];
  let currentArr = [];
  for (let i = 0; i < hashmap._slots.length; i++) {
    if (hashmap._slots[i]) {
      if (currentValue === hashmap._slots[i].value) {
        currentArr.push(hashmap._slots[i].key); 
      } else {
        result.push(currentArr);
        currentArr = [];
        currentValue = hashmap._slots[i].value;
        currentArr.push(hashmap._slots[i].key);
      }
    }
  }
  result.push(currentArr);
  return result;
}

// console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));



