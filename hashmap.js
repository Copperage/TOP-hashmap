class HashMap {
	constructor() {
		this.arrSize = 20;
		this.arr = new Array(this.arrSize).fill(null);
		this.loadFactor = 0.75;
	}

	load() {
		let length = this.length;

		// Check if the load factor has exceeded the threshold
		if (length / this.arr.length >= this.loadFactor) {
			// If it has, resize the array to double its size
			this.arrSize *= 2;
			this.arr = new Array(this.arrSize).fill(null);

			// Reset the length of the HashMap to 0
			this.length = 0;
		}

		return length;
	}

	check(index) {
		// Check if the index is out of bounds if it is smaller than 0 or more than the length of the array
		if (index < 0 || index >= this.arr.length) {
			throw new Error(`Trying to access ${index}, index is out of bounds`);
		}
	}

	hash(key) {
		// Hash key creation

		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		hashCode = hashCode % this.arr.length;
		return hashCode;
	}

	set(key, value) {
		const hashedKey = this.hash(key);

		this.arr[hashedKey] = { key, value };
		this.load();
	}

	get(key) {
		const hashedKey = this.hash(key);
		this.check(hashedKey);

		if (!this.arr[hashedKey]) return null;

		return this.arr[hashedKey];
	}

	has(key) {
		const hashedKey = this.hash(key);
		this.check(hashedKey);

		if (!this.arr[hashedKey]) return false;

		return true;
	}

	remove(key) {
		const hashedKey = this.hash(key);
		this.check(hashedKey);

		if (!this.arr[hashedKey]) return false;

		this.arr.splice(key, 1);
		return true;
	}

	length() {
		let counter = 0;

		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i] !== null) counter++;
		}

		return counter;
	}

	clear() {
		this.arr.fill(null);
	}

	keys() {
		let keys = [];

		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i] && this.arr[i].key && this.arr[i] !== null) {
				keys.push(this.arr[i].key);
			}
		}

		return keys;
	}

	values() {
		let values = [];

		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i] && this.arr[i].value && this.arr[i] !== null) {
				values.push(this.arr[i].value);
			}
		}

		return values;
	}

	entries() {
		let entries = [];

		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i] !== null) {
				entries.push(this.arr[i]);
			}
		}
		return entries;
	}
}

const hashMap = new HashMap();

hashMap.set('name', 'John');
hashMap.set('city', 'London');
hashMap.set('country', 'UK');
hashMap.set('job', 'Developer');
hashMap.set('gender', 'male');
hashMap.set('age', 28);
hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');

hashMap.set('moon', 'silver');

console.log(hashMap.get('country'));
console.log(hashMap.has('pizza'));
console.log(hashMap.has('name'));
console.log(hashMap.get('job'));
// hashMap.clear();
console.log(hashMap.get('gender'));
console.log(hashMap.get('age'));
console.log(hashMap.get('name'));
// console.log(hashMap.length());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.entries());
