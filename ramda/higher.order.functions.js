/*
Functions that take or return other functions are known as “higher-order functions”.

*/

const
    {filter, map} = require('ramda')
    books = [{ title: 'Hary Porter', year: 2002 }, { title: 'Lean Startup', year: 2012 }, { title: 'js mdn', year: 2022 }],
    publishedInYear = (book, year) => book.year === year,
    operate = (books, year) => {
        const selected = filter(book => publishedInYear(book, year), books)
        return map(book => book.title, selected)
    },
    result = operate(books, 2002)

console.log(result)

console.log('----------------------#2------------------------------')
//can be re-written in :

function publishedInYear2(year){
    return function(book){
        return book.year === year
    }
}

const
publishedInYear3 = year => book => book.year === year,
operate2 = (books, year) => {
    const
    selected2 =  filter(publishedInYear3(year), books)
    //  const selected = filter(partialRight(publishedInYear, [year]), books)

    return map(book => book.title, selected2)
}
console.log(operate2(books, 2012))



console.log('----------------------#3------------------------------')
 
const titlesForYear = (books, year) => {
  const
  selectedData = filter(publishedInYear2(year), books)
  return map(book => book.title, selectedData)
}
console.log(titlesForYear(books, 2022))

/*
if we had some other code that just wanted to check if a book was published in a given year, 
we’d like to say publishedInYear(book, 2012), but we can’t do that any more. 
Instead, we have to say publishedInYear(2012)(book). That’s less readable and more annoying.

Fortunately, Ramda provides two functions to help us out: partial, and partialRight.


*/