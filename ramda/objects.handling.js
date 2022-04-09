/*
https://randycoulman.com/blog/2016/06/28/thinking-in-ramda-immutability-and-objects/
*/
const
{equals, gte, prop, compose, pick, has, path, propOr, pathOr, keys, values, assoc, assocPath, dissoc, dissocPath, omit, inc, curry, __, evolve, merge, mergeAll} = require('ramda'),
OUR_COUNTRY = 'Nepal',
person = {age: 19, birthCountry: 'Nepal', naturalizationDate: true},
wasBornInCountry = person => equals(person.birthCountry, OUR_COUNTRY)
console.log(wasBornInCountry(person))

/*
In order to make these functions pointfree, we need a way to build up a function that we can then apply to the person at the end.
The problem is that we need to access properties on the person and the only way we know how to do that is imperatively.

prop:
Using prop, we can turn person.birthCountry into prop('birthCountry', person). Let’s start with that.

*/
console.log('-----------------------#2-----------------------')
const
wasBornInCountry2 = person => equals(OUR_COUNTRY, prop(['birthCountry'], person)),
wasNaturalized2 = person => Boolean(prop('naturalizationDate', person))
console.log(wasBornInCountry2(person), wasNaturalized2(person))


//same can be written in:
const
wasBornInCountry3 = compose(equals(OUR_COUNTRY), prop('birthCountry')),
wasNaturalized3 = compose(Boolean,prop('naturalizationDate'))

// wasBornInCountry = compose(equals(OUR_COUNTRY), prop('birthCountry'))
console.log(wasBornInCountry3(person), wasNaturalized3(person))

console.log('-----------------------#3-----------------------')

/*
Where prop reads a single property from an object and returns the value,

Pick:
reads multiple properties from an object and returns a new object with just those properties.
*/
const
myPick = pick(['age', 'birthCountry'], person)
console.log(myPick)

// Has: if an object has property without reading the value
console.log(has('age', person))

//path: it dives into nested objected 
const myObject = {
    info:{
        address:{
            zipcode:70000
        }
    }
}
console.log(path(['info', 'address','zipcode'], myObject))

/*
propOr / pathOr:
propOr and pathOr are similar to prop and path combined with defaultTo.
 They let you provide a default value to use if the property or path cannot be found in the target object.

 pathOr or propOr takes default value at first, then takes the prop or path of prop then takes the obj
*/

const
resultWithPropOr  = propOr('Prashant', 'name', person),
resultWithPathOr  = pathOr('no phone number', ['info', 'phonebook', 'phone_number'], person)
console.log(resultWithPropOr, resultWithPathOr)


//keys : keys returns an array containing the names of all of the own properties in an object.
console.log(keys(person))

//values: values returns an array containing the values of all those keys own by object
console.log(values(person))

/*
Adding, Updating, and Removing Properties
Since immutability is important, we don’t want to change objects directly. 
Instead, we want to return new objects that have been changed in the way we want.


assoc / assocPath : params in order => ( prop name || path of prop to associate , value to associate, object)
person.name = 'John' => assoc('name' ,'John', person)

*/
const 
newPerson = assoc('name' ,'John', person),
newPerson2 = assocPath(['info', 'firstName'], 'John', person)
console.log(newPerson, newPerson2)

// dissoc / dissocPath / omit
const
newPerson3 = dissoc('name', newPerson)
newPerson4 = dissocPath(['info', 'firstName'], newPerson2)
console.log(newPerson3, newPerson4)

//what if we want to remove multple property at once?
//Omit: can remove several properties at once

const
newPerson5 = omit(['info', 'naturalizationDate', 'birthCountry'], newPerson4)
console.log(newPerson5)


/*
Transforming Properties: 
We now know enough to work with objects in a declarative and immutable fashion.
Let’s write a function, celebrateBirthday, that updates a person’s age on their birthday.
*/
console.log('-----------------------#4-----------------------')

const
nextAge = person => inc(prop('age', person)),
// not writting in f(g(c(d()))) i.e using compose
nextAge2 = compose(inc, prop('age'))
celebrateBirthday = person => assoc('age', nextAge(person), person),
celebrateBirthday2 = person => assoc('age', nextAge2(person), person),
celebrateBirthday3 = curry((person) => assoc('age', nextAge2(person))(person)),

console.log(celebrateBirthday(person), celebrateBirthday2(person), celebrateBirthday3(person))
console.log('-----------------------#5--transforming rahter then updating---------------------')

/*
Rather than updating a property to a known new value, 
we really want to transform the value by applying a function to the old value as we’ve done here.

also using point free style

Evolve:
evolve can transform multiple properties at once and at multiple levels of nesting.

Note that evolve will not add new properties;
if you specify a transformation for a property that doesn’t appear in the target object, evolve will just ignore it.
*/
const celebrateBirthday4 = evolve({age: inc})
console.log(celebrateBirthday4(person))


console.log('-----------------------#6-----------------------')

/*
Merging Objects
{info: 'default'} is only applied when thrid param is not paseed from initiator
Merge all :
Creates one new object with the own properties from a list of objects. 
If a key exists in more than one object, the value from the last object it exists in will be used.
*/
function f(a, b, options = {info: 'default'}) {
    const defaultOptions = { value: 42, local: true, info:'not default' }
    const finalOptions = mergeAll([defaultOptions, options])
    return finalOptions
}
const myMergeAll =  f(null, null)
console.log(myMergeAll)