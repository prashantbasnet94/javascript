//https://randycoulman.com/blog/2016/06/07/thinking-in-ramda-partial-application/

const
    {curry, filter,flip, map, partial, partialRight, __} = require('ramda'),
    books = [{ title: 'first book', year: 2000 }, { title: 'Hary Porter', year: 2002 }, { title: 'Lean Startup', year: 2012 }, { title: 'js mdn', year: 2022 }],
    publishedInYearMultiFunc = year => book => book.year ===year,
    /*
     above func takes book and return a new func that takes year and then return either true or false by comparing
    
     if we had some other code that just wanted to check if a book was published in a given year, 
     we’d like to say publishedInYear(book, 2012), but we can’t do that any more.
      Instead, we have to say publishedInYear(2012)(book). That’s less readable and more annoying.
      
    */
      publishedInYearWithPartial = (year, book)=> book.year ===year,
      publishedInYearwithParitalRight = (book, year)=> book.year ===year,


    // publishedInYear2 = (book, year) => book.year ===year,
    publishedInYearWithCurry = curry((year, book) => book.year === year),
    operateWithMultiArgumentFunc = (books, year) => {
        // const selected = filter((book => publishedInYear(year)(book)), books)
        // same as 
        const selected = filter(publishedInYearMultiFunc(year), books)
        return map(book => book.title, selected)
    },
    operateWithPartial = (books, year) => {
        const selected = filter(partial(publishedInYearWithPartial,[year]), books)
        return map(book => book.title, selected)
    },
    operateWithPartialRight = (books, year) => {
        const selected = filter(partialRight(publishedInYearwithParitalRight,[year]), books)
        return map(book => book.title, selected)
    },
    operateWithCurry = (books, year) => {
        const
        selected = filter(publishedInYearWithCurry(year), books),
        //can be re-written in 
        selected2 = filter(book => publishedInYearWithCurry(year, book), books),
        //same as
        selected3 = filter(book => publishedInYearWithCurry(year)(book), books)


        return map(book => book.title, selected3)
    },
    result = operateWithMultiArgumentFunc(books, 2000)
    result1 = operateWithPartial(books, 2002),
    result2 = operateWithPartialRight(books,2012)
    result3 = operateWithCurry(books, 2022)


console.log(result, result1, result2, result3)

/*

Having to use partial and partialRight everywhere gets verbose and tedious.
 But having to call multiple-argument functions as a series of single-argument functions is equally bad.

 Currying is another core concept in functional programming

 In Ramda, a curried function can be called with only a subset of its arguments, and it will return a new function that accepts the remaining arguments.
If you call a curried function with all of its arguments, it will call just call the function.

You can think of a curried function as the best of both worlds: you can call it normally with all of its arguments and it will just work.
Or you can call it with a subset of its arguments, and it will act as if you’d used partial.

Note that this flexibility introduces a small performance hit, because curry needs to figure out how the function was called and then determine what to do. In general, I only curry functions when I find I need to use partial in more than one place.
*/
console.log('---------------------------------#2--------------------------------')

/* 

Arguments in the Wrong Order

1.Flip:
if you need to use a function you don’t control, flip is a helpful option.

*/

const publishedInYear = curry((book, year) => book.year === year)
 
const titlesForYearWithFlip = (books, year) => {
  const selected = filter(flip(publishedInYear)(year), books)
 
  return map(book => book.title, selected)
}
console.log(titlesForYearWithFlip(books, 2002))

//2.Placeholder: __
//if you need to use a function you don’t control, flip is a helpful option.
console.log('---------------------------------#3--------------------------------')

 
const titlesForYearWithPlaceholder = (books, year) => {
  const selected = filter(publishedInYear(__, year), books)
  return map(book => book.title, selected)
}

console.log(titlesForYearWithPlaceholder(books, 2022))