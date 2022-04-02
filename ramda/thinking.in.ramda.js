/*
https://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/

Library that provides a lot of tools for doing functional programming in JavaScript in a clean, elegant way.

As the name might suggest, functional programming has a lot to do with functions.



Js support functions as first-class constructs. Functions can be used in the same way as other kinds of values. 

You can:
 => refer to them from constants and variables
 => pass them as parameters to other functions
 => return them as results from other functions



 Pure Functions:
 When writing functional programs, it eventually becomes important to work mostly with so-called “pure” functions.

 Pure functions are functions that have no side-effects.
 They don’t assign to any outside variables, they don’t consume input, they don’t produce output,
they don’t read from or write to a database, they don’t modify the parameters they’re passed, etc.


Another important concept in functional programming is that of “immutability”. 

Immutable fashion, once initialized a value or an object never change it again.

That means no changing elements of an array or properties of an object.

If need to change it then instead return a new copy of it with the changed value.

Start replacing loops with collection-iteration functions.



*/

const
{forEach, map} = require('ramda'),
myArray = [1,2,3,4,5]

// Replace this:
for (const value of myArray) {
  console.log(value)
}
 
// with:
forEach(value => console.log(value), myArray)
/* 
It is used the least of any of them when doing functional programming.
It doesn’t return a value, so is really only used for calling functions that have side-effects
 */

console.log('---------------------------------#2----------------------------')
map(x => x*2, myArray)
//This is using an anonymous function, but we can just as easily use a named function here:

const
double = x => x * 2,
mappped = map(double, [1, 2, 3])
console.log(mappped)
