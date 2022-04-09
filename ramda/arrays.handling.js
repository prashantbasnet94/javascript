
/*
https://randycoulman.com/blog/2016/07/05/thinking-in-ramda-immutability-and-arrays/

The array equivalent of prop is nth;
 the equivalent of pick is slice,
 and the equivalent of has is includes. Let’s look at those.
*/
const
{nth, slice, includes, tail, head, last, init, take, takeLast, insert, append, prepend, update, concat, remove, without, drop, dropLast, multiply, adjust} = require('ramda'),
numbers = [10,20,30,40,50,60]
// props in obj => nth in array
//Accessing the first (nth(0)) and last (nth(-1)) 
console.log(
    nth(0)(numbers),
    nth(-1)(numbers),
    nth(-2)(numbers)
    )

/*
Slice:
Slice takes two indexes and returns the sub array starting at the first index (0-based)
and including all of the elements up to, but not including the second index.

pick in obj => slice in array
*/
console.log(
    slice(0,2) (numbers),
    slice(2, 4)(numbers),
    // slice(-2, -4)(numbers)
    )

//has in obj => contains in array
console.log(includes(20, numbers))

console.log('------------------head && tail----------------')
/*
Reading Array Elements:
Accessing the first (nth(0)) and last (nth(-1)) elements is quite common,
so Ramda provides shortcuts for those special cases, head and last
*/
console.log(
    head(numbers),
    tail(numbers) //all-but-the-first element
)

console.log('------------------last && init----------------')
console.log(
    last(numbers),
    init(numbers) // all but the last element
)

console.log('------------------take && takeLast----------------')
console.log(
    take(1, numbers),
    take(2, numbers),
    takeLast(1, numbers),
    takeLast(2, numbers)
)

/*
Adding, Updating, and Removing Array Elements:

For objects, we learned about assoc, dissoc, and omit for adding, updating, and removing properties.

Because arrays are an ordered data structure, there are several methods that do the same job 
insert:
append:
prepend:
update:
concat:

 The most general are insert and update
*/
console.log('------------------insert, append, prepend, update, concat----------------')

console.log(
    'insert', // (postion to be inserted, value, array)
    insert(0, 0, numbers), // 0, 10, 20, 30, 40, 50, 60
    insert(1, 15, numbers) //10, 15, 20, 30, 40, 50, 60
)

console.log(
    // add element at end of the array
    'append', // (value to insert, array)
    append(70, numbers), // 10, 20, 30, 40, 50, 60, 70
    append(80, numbers) //10, 15, 20, 30, 40, 50, 60
)
console.log(
     // add element at beginning of the array
    'prepend',
    prepend(0, numbers), // 0, 20, 30, 40, 50, 60,
    prepend(5, numbers) //5, 10, 20, 30, 40, 50, 60
)
console.log(
    // add element at beginning of the array
   'update',
   update(0,1, numbers), // 1, 20, 30, 40, 50, 60
   update(1,5, numbers) //10, 5, 20, 30, 40, 50, 60
)

console.log(
    // add element at beginning of the array
   'concat',
   concat([70], numbers), // 70, 10, 20, 30, 40, 50, 60, 
   concat( numbers, [70]) //10, 20, 20, 30, 40, 50, 60, 70,
)
console.log('------------------removing element----------------')
console.log(
    numbers,
    remove(0,2,numbers), // (from, how many, array),
    without([30, 40, 50], numbers) ,
    drop(2, numbers),
    dropLast(2,numbers)
)

/*
To simplify this common use case, Ramda provides adjust that works much like evolve does for objects.
 Unlike evolve, adjust only works for a single array element.

*/
console.log('------Transforming Elements----------')
const 
trans = update(2, multiply(10, nth(2, numbers)), numbers) // => [10, 20, 300, 40, 50, 60]
trans2 = adjust(2, multiply(10), numbers)

console.log(
    trans,
    trans2
)