var heapq = require('heapq');

var heap = [];
var cmp = function(x, y) {return x[0] < y[0];}

heapq.push(heap, [3, 'a'], cmp);
heapq.push(heap, [4, 'b'], cmp);
heapq.push(heap, [2, 'c'], cmp);
heapq.push(heap, [1, 'd'], cmp);

console.log(heap.includes(heap[0]))


heapq.pop(heap, cmp);  // [1, 'd']
heapq.pop(heap, cmp);  // [2, 'c']

