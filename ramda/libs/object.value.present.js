const firstTestCase = {
    anest1: -1,
    bnest1:-1,
    cls:{
      anest2: -1,
      bnest2: -1,
      desk:{
        anest3:-1,
        bnest3: -1
      }
    },
    second:{
      asecondnest2: null,
      bsecondnest2: -1,
      desk:{
        asecondnest3:-1,
        bsecondnest3: -1
      }
    },
     third: {
      athirdnames2: 2,
      bthirdnames2: -1,
      desk:{
        athirdnames3:-1,
        bthirdnames2: -1
      }
    } 
  },
  secondTestCase = {
    first: null,
    second:{
        third: 2
    }
  },
  thirdTestCase = {
    first: null,
    second:{
        third: {
            fourth: null,
            fifth: -1
        }
    }
  }
  getchildObjs = data => data.filter(data => data && data.constructor.name === 'Object'),
  isTruthyValue = x => x && x !== -1 && x !== "" && x.constructor.name !== 'Object',
  {values} = Object,
    objHasAnyValue = datas => {
        const
            currentIteration = values(datas),
            childObjs = getchildObjs(currentIteration)
        if (typeof childObjs === 'undefined') {
            return null
        }
        if (currentIteration.some(isTruthyValue)) {
            return true
        }
        return childObjs.map(o => objHasAnyValue(o)).filter( o => o).length > 0
    }
  
  console.log(objHasAnyValue(firstTestCase))
  console.log(objHasAnyValue(secondTestCase))
  console.log(objHasAnyValue(thirdTestCase))

