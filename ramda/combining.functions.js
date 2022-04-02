/*
Once you’ve gotten used to the idea of passing functions to other functions, 
you might start to find situations where you want to combine several functions together.


both takes two other functions and returns a new function that returns true,
if both functions return a truthy value when applied to the arguments and false otherwise.


either takes two other functions and returns a new function that returns true,
if either function returns a truthy value when applied to the arguments and false otherwise.


*/
const
{both, complement,compose, either, find, pipe} = require('ramda'),
isEven = x => x % 2 === 0,
isOdd = complement(isEven),
myArray = [1, 2, 3, 4],
result = find(isOdd, myArray),
result2 = both(isEven, isOdd)(myArray),
result3 = either(isEven,isOdd)(myArray)
console.log(result, result2, result3)

/*
Pipelines:

Sometimes we want to apply several functions to some data in a pipeline fashion. 
For example, we might want to take two numbers, multiply them together, add one, and square the result. We could write it like this:
*/
console.log('---------------------#2-----------------------')
const
    multiply = (x, y) => x * y,
    addOne = x => x + 1,
    square = x => x * x,
    result4 = (x,y) => {
        return pipe(
            multiply,
            addOne,
            square
        )(x,y)
    }
/*
Ramda provides the pipe function, which takes a list of one or more functions and returns a new function.

The new function takes the same number of arguments as the first function it is given.
It then “pipes” those arguments through each function in the list. It applies the first function to the arguments,
passes its result to the second function and so on. The result of the last function is the result of the pipe call.
*/
console.log(result4(1,1))    

console.log('---------------------#3-----------------------')
const operate = (x,y) => {
    return compose(
        square,
        addOne,
        multiply
      )(x,y)
}
console.log(operate(1,1))
/*
compose works exactly the same way as pipe, except that it applies the functions in right-to-left order instead of left-to-right

I always think of compose this way: compose(f, g)(value) is equivalent to f(g(value)).

i.e square(addOne(multiple(x,y)))

By combining several functions in specific ways, we can start to write more powerful functions.


*/