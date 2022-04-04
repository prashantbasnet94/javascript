/*
https://randycoulman.com/blog/2016/06/14/thinking-in-ramda-declarative-programming/

Imperative vs Declarative:

There are many different ways to divide up the programming language/style landscape. 
There’s static typing vs dynamic typing, interpreted languages vs compiled languages, low-level vs high-level, etc.

Another such division is imperative programming vs declarative programming.

Imperative programming is a style of programming where the programmers tell the computer what to do by telling it how to do it

imperative programming gives rise to a lot of the constructs we use every day: control flow (if-then-else statements and loops),
arithmetic operators (+, -, *, /), comparison operators (===, >, <, etc.), and logical operators (&&, ||, !).


Declarative programming is a style of programming where the programmers tell the computer what to do by telling it what they want. 

One of the classic declarative languages is Prolog. In Prolog, a program consists of a set of facts and a set of inference rules.
You kick off the program by asking a question, and Prolog’s inference engine uses the facts and rules to answer your question.

Functional programming is considered a subset of declarative programming

Even in declarative programs, it is necessary to do similar tasks to those we do in imperative programs.
 Control flow, arithmetic, comparison, and logic are still the basic building blocks we have to work with.
 But we need to find a way to express these constructs in a declarative way.
*/

const
{inc,multiply,pipe,either, both, equals, gte, defaultTo} = require('ramda'),
myMultiply = (a, b) => a * b,
addOne = x => x + 1,
square = x => x * x
 
const operate = (x,y) => {
   return  pipe(
        myMultiply,
        addOne,
        square
      )(x,y)
}
console.log(operate(1,1))
console.log('-------------------------------#2--------------------------------------')
 /*
Notice how we had to write functions for all of these basic building blocks that we wanted to use.

Ramda provides add, subtract, multiply, and divide functions to use in place of the standard arithmetic operators. 
So we can use Ramda’s multiply in place of the one we wrote ourselves, 
we can take advantage of Ramda’s curried add function to replace our addOne, and we can write square in terms of multiply as well:
 */
const
operate2 = (x,y)  => {
    return pipe(
        multiply,       
        inc,
        (x => multiply(x,x))
    )(x,y)
}
console.log(operate2(1,1))

console.log('-------------------------------#3--------------------------------------')
const
OUR_COUNTRY = 'Nepal',
person = {age: 19, birthCountry: 'Nepal', naturalizationDate: true}

const
wasBornInCountry = person => person.birthCountry === OUR_COUNTRY,
wasNaturalized = person => Boolean(person.naturalizationDate),
isOver18 = person => person.age >= 18,
isCitizen = either(wasBornInCountry, wasNaturalized),
isEligibleToVote = both(isOver18, isCitizen)

console.log(isEligibleToVote(person))
console.log(isCitizen(person))

/*
Notice that some of our functions are using standard comparison operators (=== and >= in this case). 
As you might suspect by now, Ramda also provides replacements for these.

Let’s modify our code to use equals in place of === and gte in place of >=.

In addition to equals, there is identical for determining if two values reference the same memory.


There are a couple of common uses of ===: checking if a string or array is empty (str === '' or arr.length === 0),
 and checking if a variable is null or undefined. Ramda provides handy functions for both cases: isEmpty and isNil.


 and, or, and not work with values, while both, either, and complement work with functions.
*/
console.log('-------------------------------#4--------------------------------------')

const
wasBornInCountry2 = person =>equals( person.birthCountry === OUR_COUNTRY),
wasNaturalized2 = person => Boolean(person.naturalizationDate),
isOver182 = person => gte(person.age, 18),
isCitizen2 = either(wasBornInCountry2, wasNaturalized2),
isEligibleToVote2 = both(isOver182, isCitizen2)

console.log(isEligibleToVote2(person))
console.log(isCitizen2(person))

//A common use of || is for providing default values. For example, we might write something like this:
console.log('-------------------------------#5--------------------------------------')

const
settings ={lineWidth: 0}
lineWidth = settings.lineWidth || 80
/* 
This is a common idiom, and mostly works, but relies on JavaScript’s definition of “falsy”.
 What if 0 is a valid setting? Since 0 is falsy, we’ll end up with a line width of 80.
 */

 console.log(lineWidth) // prints 80

 // so can be written in 
console.log( defaultTo(80, settings.lineWidth)) //pints 0

settings.lineWidth = undefined 
console.log( defaultTo(80, settings.lineWidth)) //pints 80
