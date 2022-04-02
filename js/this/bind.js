
/*

The bind() method creates a new function that, when called, has its this keyword set to the provided value,
 with a given sequence of arguments preceding any provided when the new function is called.

*/

function f() {
    return this.name
}
function g() {
   this.name = 'prashant'
}

const result = f.bind(g())
console.log( result() )


const test = {
    x: 42,
    getX: function() {
      return this.x;
    }
},
unboundedFunc = test.getX,
returnedBoundedFuncFromBind = unboundedFunc.bind(test)
console.log(returnedBoundedFuncFromBind())