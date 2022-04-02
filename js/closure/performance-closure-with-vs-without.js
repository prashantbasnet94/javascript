// Consider the following case:


function MyObject(name, message) {
  this.name = name
  this.message = message;
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  }
  this.meta = function(){
      return this.name + ' '+ this.message
  }
}
let myObj = new MyObject('prashant', 'test')
console.log(myObj.meta())

//Because the previous code does not take advantage of the benefits of using closures in this particular instance, we could instead rewrite it to avoid using closures as follows:

function MyObject2 (name, message){
    this.name = name
    this.message = message
}
MyObject2.prototype.getName = function(){
    return this.name
}
MyObject2.prototype.getMessage = function(){
    return this.message
}
MyObject2.prototype.meta = function(){
    return this.name + ' '+ this.message
}
let myObj2 = new MyObject2('prashant2', 'test2')
console.log(myObj2.meta())

//same can be written in another way:

function MyObject3 (name, message){
    this.name = name
    this.message = message
}

MyObject3.prototype = { 
    getName: function(){
        return this.name
    },
    getMessage: function(){
        return this.message
    },
    meta: function(){
        return this.name + ' '+ this.message
    }
}

let myObj3 = new MyObject3('prashant3', 'test3')
console.log(myObj3.meta())