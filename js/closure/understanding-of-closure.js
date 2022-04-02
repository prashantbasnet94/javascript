
// functions are the first-class citizens in JavaScript, therefore, you can return a function from another function.
//more info can be found in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

/*
function test(fname, lname) {
    var firstName = 'prashant'
    this.lastName = 'basnet'

    this.getMyFullName = function () {
        return firstName + ' ' + this.lastName
    }

    return this
}

let a = new test()
console.log(a.getMyFullName())






function test2(fname, lname) {
    var firstName = 'prashant'
    this.lastName = 'basnet'

    function geetMyFullName() {
        return firstName + ' ' + this.lastName
    }
    return geetMyFullName
}

let b = new test2()
console.log(b())

*/


// Closures
// --------------- #1----------------------------
function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
        console.log(name);
    }
    // here this displayName func is a closure
    return displayName;
}

var myFunc = makeFunc();
myFunc();



// --------------- #2----------------------------
function makeAdder(x) {
    return function (y) {
        return x + y
    }
}

let
    add5 = makeAdder(5),
    add10 = makeAdder(10)


console.log(add5(2))
console.log(add10(2))


function divider(divideBy) {
    return function (number) {
        return number / divideBy
    }
}

let divideBy5 = divider(5)
console.log(divideBy5(100))

// --------------- #3----------------------------
// how to use closures to define public functions that can access private functions and variables.
function counter() {
    var counter = 0
    function changeBy(val) {
        counter += val;
    }
    return {
        increment: function () {
            changeBy(1)
        },
        decrement: function () {
            changeBy(-1)
        },
        getCount: function () {
            return counter
        }
    }
}

let newCounter = new counter()
console.log(newCounter.getCount()) // 0
newCounter.increment()// 1
newCounter.increment() // 2
console.log(newCounter.getCount()) // 2
newCounter.decrement()
console.log(newCounter.getCount())

 



// --------------- #3----------------------------Closure scope chain
//anonymously
// global scope
var e = 10;
function sumAnon(a){
  return function(b){
    return function(c){
      // outer functions scope
      return function(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}
console.log(sum(1)(2)(3)(4)); // log 20


// You can also write without anonymous functions:
function sum(firstArg){
    console.log('inside sum ', '1st arg :  ', firstArg)
    return function sumFirstArgWithOther(secondArg){
        console.log('inside sumFirstArgWithOther ','1st arg :  ', firstArg, '2nd arg :  ', secondArg)
        return function sumSecondArgWithOther(thirdArg){
            console.log('inside sumSecondArgWithOther ','1st arg :  ', firstArg, '2nd arg :  ', secondArg, '3rd arg :  ', thirdArg)
            return function sumThirdArgWithOther(fourthArg){
                console.log('inside sumThirdArgWithOther ','1st arg :  ', firstArg, '2nd arg :  ', secondArg, '3rd arg :  ', thirdArg, '4rth arg :  ', fourthArg)
                return firstArg+secondArg+thirdArg+fourthArg
            }
        }
    }
}
console.log(sum(1)(2)(3)(4))

var sum2 = sum(1)
var sum3 = sum2(2)


