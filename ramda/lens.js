/*
 https://randycoulman.com/blog/2016/07/12/thinking-in-ramda-lenses/

A lens combines a “getter” function and a “setter” function into a single unit.
We can think of a lens as something that focuses on a specific part of a larger data structure.

The most generic way to create a lens in Ramda is with the lens function. lens takes a getter function and a setter function and returns the new lens.


*/
const 
{lens, prop, assoc, path, assocPath, lensProp, lensPath, view, set, toUpper, over, indexOf, lensIndex} = require('ramda'),
person = {
    name: 'prashant',
    socialMedia: {
        github: 'prashantbasnet94'
    },
    favouriteNum: [1,2,3,4,5]
},
nameLens = lens(prop('name'), assoc('name')),
githubLens = lens(path(['socialMedia', 'github']), assocPath(['socialMedia', 'github'])),

/*
note that we had to duplicate  prop name and path args
Fortunately, Ramda provides nice shortcuts for the most common uses of lenses: lensProp, lensPath, and lensIndex
*/

nameLens2 = lensProp('name'),
githubLens2 = lensPath(['socialMedia', 'github'])
favNum2 = lensIndex(0)

/*
That’s a lot simpler and gets rid of the duplication. 
In practice, I find that I almost never need to use the generic lens function.

What Can I Do With It?

OK, great, we’ve created some lenses. What can we do with them?

Ramda provides three functions for working with lenses.

View: reads the value of the lens. (1st parram: lensProp, 2nd: object)
Set: updates the value of the lens. (1st param: lensProp || lensPath, 2nd: Value, 3rd: Object)
Over: applies a transformation function to the lens. (1st: LensPath || lensProp , 2nd: transformation func, 3rd object)
*/

const 
result1 = view(nameLens, person),
result2 = view(nameLens2, person),
result3 = view(githubLens, person),
result4 = view(githubLens2, person),
resultIndex = view(favNum2, person.favouriteNum),
result5 = set(githubLens, 'myNewAccount2', person),
result6 = set(githubLens2, 'myNewAccount', person),
result7 = over(githubLens2, toUpper, person)
// console.log(result1, result2)
console.log(result3, result4)
console.log(result5)
console.log(result6)
console.log(result7)

console.log('---------lens index -----------')
console.log(resultIndex)
//Notice that set and over return the entire object with the lens’ focused property modified as specified.

