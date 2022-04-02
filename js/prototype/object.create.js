const a = { a: 1 };
// a ---> Object.prototype ---> null

Object.getPrototypeOf(a)
/*
{
    constructor: f()
    hasOwnProperty:f()
    ... many more
}
*/

const b = Object.create(a);
Object.getPrototypeOf(b)
/* 
{a: 1}
b ---> a ---> Object.prototype ---> null
 */
console.log(b.a); // 1 (inherited)


const c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

const d = Object.create(null);
// d ---> null


// delete Operator with Object.create and new operator
console.log('-------------------------------------')
const
myObj = { a: 1 },
myObj2 = Object.create(myObj)

console.log(myObj.a, myObj2.a)

myObj2.a = 5
console.log(myObj.a, myObj2.a)

delete myObj2.a
console.log(myObj.a, myObj2.a)
// print 1 (myObj2.a value 5 is deleted but it showing value from its prototype chain)

delete myObj.a
console.log(myObj.a, myObj2.a)


/* 

'new' keyword usage create a new instance of the func that has it's own attributes derived from it's prarent func, 
but does not inherit those attributes from it's parent

*/
console.log('-------------------------------------')

function Graph (){
    this.vertices = 10
}

let g = new Graph()
console.log(Object.getPrototypeOf(g).vertices, g.vertices)
delete g.vertices
console.log(Object.getPrototypeOf(g).vertices, g.vertices)


console.log('--------------#######---1---------Object.prototype--------------')


function foo() {}
foo.prototype.foo_prop = 'foo val';
const proto = new foo();
proto.bar_prop = 'bar val';

function bar() {}
bar.prototype = proto;

const inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop);

console.log('--------------#######----2---------Object.create--------------')
// Technique 2
function foo2() {}
foo2.prototype.foo_prop = "foo val";
function bar2() {}
const proto2 = Object.create(
  foo.prototype,
  { bar_prop: { value: 'bar val' } }
);
bar2.prototype = proto;
const inst2 = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop)


