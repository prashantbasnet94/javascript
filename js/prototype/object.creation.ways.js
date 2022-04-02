/*
ECMAScript 5 introduced a new method: Object.create(). 
Calling this method creates a new object. The prototype of this object is the first argument of the function:
*/


const o = { a: 1 };

console.log(o)
console.log(o.hasOwnProperty('a'))
/*
  checks hasOwnProperty in the current 'o' object , finds none so checks it's prototype that is Object.prototype
  checks hasOwnProperty in Object.prototype, finds there and executes it

  prototype of o is give by 

  {
      standard_way: Object.getPrototypeOf(o),
      browser: o.__proto__
  }
*/


const b = ['yo', 'whadup', '?'];
b.forEach(o => o)
/*
  Arrays inherit from Array.prototype
 
  checks forEach in the current 'b' object, finds none, so it checks the prototype of b
  checks prototype of b, given by Object.getPrototypeOf(o), finds forEach there and executes it
*/

function f() {
   console.log(this.name)
}
function g(){
    this.name = 'prashant'
}
const myReturnedBinedFunc = f.bind(g())
myReturnedBinedFunc()
// Functions inherit from Function.prototype
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null