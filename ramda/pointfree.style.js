/*
https://randycoulman.com/blog/2016/06/14/thinking-in-ramda-declarative-programming/

following func checks age , returns 21 if gte 21 else return increment of age passed
*/
const
{gte, inc, ifElse, __,lt, always, identity, when, unless, cond, equals, filter, pipe,curry, map} = require('ramda'),
forever21 = age => age >= 21 ? 21 : age + 1
console.log(forever21(19), forever21(29))


/*
same can be written in declarative way i.e telling computer what to do instead of how to do it, by telling it what they want.

ifElse takes all three func, one to check condition, 2nd if the condition is true, 3rd if the condition is false
*/
const 
anotherForever21 = age => ifElse(gte(__,21), () => 21, inc)(age)
console.log(anotherForever21(19), anotherForever21(29))



console.log('-------------------------#2---------------------------------')
const
alwaysDrivingAge = age => ifElse(lt(__, 16), always(16), a => a)(age),
alwaysDrivingAge2 = age => ifElse(gte(__, 16), a => a, always(16))(age),
/*
The second branch of the conditional (a => a) is another common pattern in functional programming. 
It is known as the identity function. That is, a function that returns whatever argument it is given.
*/
alwaysDrivingAge3 = age => ifElse(gte(__, 16), identity, always(16))(age)

console.log(alwaysDrivingAge(21), alwaysDrivingAge(14))
console.log(alwaysDrivingAge2(21), alwaysDrivingAge2(14))
console.log(alwaysDrivingAge3(21), alwaysDrivingAge3(14))
console.log('-------------------------#3---------------------------------')

/*
Having an ifElse statement where one of the conditional branches is identity is also quite common, so Ramda provides more shortcuts for us.

If, as in our case, the second branch is identity, we can use when instead of ifElse:
*/
const
alwaysDrivingAge4 = age => when(lt(__, 16), always(16))(age),
alwaysDrivingAge5 = age => unless(gte(__,16), always(16))(age),
alwaysDrivingAge6  = age => unless(gte(__, 16), always(16))(age)

console.log(alwaysDrivingAge4(21), alwaysDrivingAge4(14))
console.log(alwaysDrivingAge5(21), alwaysDrivingAge5(14))
console.log(alwaysDrivingAge6(21), alwaysDrivingAge6(14))


const water = temperature => cond([
    [equals(0),   always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    // [T,           temp => `nothing special happens at ${temp}°C`]
  ])(temperature)

  console.log(water(0), water(100), water(51), water(85))

/*
There are two main guiding principles of Ramda that we talked about in Part 3:

Put the data last
Curry all the things
These two principles lead to a style that functional programmers call “pointfree”

all the above code can be written in point free style

*/
console.log('-------------------------#4---------point free style------------------------')
  
  //same can be wrriten in pointfree style as
const
another2Forever21 = ifElse(gte(__,21), () => 21, inc),
anotherAlwaysDrivingAge4 = when(lt(__, 16), always(16)),
water2 = cond([
    [equals(0),   always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    // [T,           temp => `nothing special happens at ${temp}°C`]
  ])

  console.log(water(0), water(100), water(51), water(85))

console.log(another2Forever21(19), another2Forever21(29))
console.log(anotherAlwaysDrivingAge4(21), anotherAlwaysDrivingAge4(14))
console.log(water2(0), water2(100))


console.log('-------------------------#4---------another conversion eg------------------------')
const
books = [{ title: 'first book', year: 2000 }, { title: 'Hary Porter', year: 2002 }, { title: 'Lean Startup', year: 2012 }, { title: 'js mdn', year: 2022 }],
publishedInYear = curry((year, book) => book.year === year),
//    publishedInYearWithCurry = curry((year, book) => book.year === year),

titlesForYear = curry((year, books) =>
  pipe(
    filter(publishedInYear(year)),
    map(book => book.title)
  )(books)
)
console.log(titlesForYear(2002,books))

//can be written in 
const
titlesForYear2 = year =>
  pipe(
    filter(publishedInYear(year)),
    map(book => book.title)
  )

console.log(titlesForYear2(2002,books))