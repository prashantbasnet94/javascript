const
    {curry, filter, map, partial, partialRight} = require('ramda'),
    books = [{ title: 'first book', year: 2000 }, { title: 'Hary Porter', year: 2002 }, { title: 'Lean Startup', year: 2012 }, { title: 'js mdn', year: 2022 }],
    publishedInYear = year => book => book.year ===year,
    /*
     above func takes book and return a new func that takes year and then return either true or false by comparing
    
     if we had some other code that just wanted to check if a book was published in a given year, 
     we’d like to say publishedInYear(book, 2012), but we can’t do that any more.
      Instead, we have to say publishedInYear(2012)(book). That’s less readable and more annoying.
      
    */
      publishedInYear2 = (year, book)=> book.year ===year,
      publishedInYear3 = (book, year)=> book.year ===year,


    // publishedInYear2 = (book, year) => book.year ===year,
    publishedInYear4 = curry((year, book) => book.year === year),
    operateWithMultiArgumentFunc = (books, year) => {
        // const selected = filter((book => publishedInYear(year)(book)), books)
        // same as 
        const selected = filter((publishedInYear(year)), books)
        return map(book => book.title, selected)
    },
    operateWithPartial = (books, year) => {
        const selected = filter(partial(publishedInYear2,[year]), books)
        return map(book => book.title, selected)
    },
    operateWithPartialRight = (books, year) => {
        const selected = filter(partialRight(publishedInYear3,[year]), books)
        return map(book => book.title, selected)
    },
    operateWithCurry = (books, year) => {
        const
        selected = filter(publishedInYear4(year), books),
        //can be re-written in 
        selected2 = filter(book => publishedInYear4(year, book), books),
        //same as
        selected3 = filter(book => publishedInYear4(year)(book), books)


        return map(book => book.title, selected3)
    },
    result = operateWithMultiArgumentFunc(books, 2000)
    result1 = operateWithPartial(books, 2002),
    result2 = operateWithPartialRight(books,2012)
    result3 = operateWithCurry(books, 2022)


console.log(result, result1, result2, result3)

