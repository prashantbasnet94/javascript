//Prototype: mechanism by which js objects inherit features from one another!
//more on https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
const myObject = {
    city: 'Madrid',
    greet() {
      console.log(`Greetings from ${this.city}`);
    }
}
myObject.greet(); // Greetings from Madrid

// toString was not defined in the obj, so it's prototype is called and there it finds toString()
myObject.toString()