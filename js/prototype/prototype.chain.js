/*
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

When it comes to inheritance, JavaScript only has one construct: objects. 
Each object has a private property which holds a link to another object called its prototype 


Nearly all objects in JavaScript are instances of Object which sits just below null on the top of a prototype chain.

JavaScript objects are dynamic "bags" of properties 


 JavaScript objects have a link to a prototype object. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype,
  and so on until either a property with a matching name is found or the end of the prototype chain is reached.


  the [[Prototype]] is accessed using the accessors Object.getPrototypeOf() and Object.setPrototypeOf(). 
  This is equivalent to the JavaScript property __proto__ which is non-standard but de-facto implemented by many browsers.
*/


/*
  --------------> Inheritance with the prototype chain <--------------------
   1. Inheriting properties
*/
function myFunct(){
    this.a = 1
    this.b = 2
}

//this will break the prototype chain 
// myFunct.prototype = {b:5, c:3}

//setting prototype of myFunc
myFunct.prototype.b = 5
myFunct.prototype.c = 3
myFunct.prototype.d = 4

//setting prototype of myFunc
let
prototypeOfMyFunc = Object.getPrototypeOf(myFunct),
prototypeOfPrototypeOfMyFunc = Object.getPrototypeOf(prototypeOfMyFunc)

prototypeOfPrototypeOfMyFunc.e = 5
prototypeOfPrototypeOfMyFunc.f = 6

let myObj = new myFunct()

do{
    console.table(myObj)
    myObj = Object.getPrototypeOf(myObj)
}while(myObj)



console.log('------------------------------------------------------------')

/*
myFunc
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│    a    │   1    │
│    b    │   2    │
└─────────┴────────┘

prototypeOfMyFunc
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│    b    │   5    │
│    c    │   3    │
│    d    │   4    │
└─────────┴────────┘
prototypeOfPrototypeOfMyFunc
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│    e    │   5    │
│    f    │   6    │
└─────────┴────────┘
*/


/*
 2. Inheriting methods
    
 Javascript doesnot have methods in the form class based languages define them
 Any function can be added to an object in the form of a property    

 method overriding is done through property shadowing


 When an inherited function is executed, the value of 'this' points to the current inherting object, not to the prototype object where the function is an own property.
*/

const myFunc2  = {
    a:1,
    sum: function(){
        return this.a + 1
    },
    developerName:'test'
}
// myObj2 inherits from myFunc2
let myObj2 = Object.create(myFunc2)
myObj2.a = 2
console.log(myFunc2.sum())
console.log(myObj2.sum())

//same thing can be written as
// without using Object.create()

let myObj3 = function(){
}
myObj3.prototype = myFunc2
myObj3.prototype.developerName = 'basnet'

myObj3 = new myObj3()
myObj3.a = 4

console.log(myObj3.developerName,myObj3.sum())
/*
searches myObj3 for developerName, can't find it there, so checks at the prototype
searches developerName at prototype of myObj3, finds it there value: 'basnet'    
prints basnet 5, as it is defined in myObj3.prototype   

*/

