
const obj = {
    a:1,
    m: function(){
        return this.a +1
    }
}
let newObj = Object.create(obj)
newObj.a = 4
console.log(obj.m())
console.log(newObj.m())


// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
const obj1 = {
    a:1,
    m: function(){
        return this.a +1
    }
}

function obj2(){
}

 
obj2.prototype = obj1
// After this code, objects created using obj1() will get obj1 as their prototype.
let test3 = new obj2()
test3.a = 4

console.log(obj1.m())
console.log(test3.m())

