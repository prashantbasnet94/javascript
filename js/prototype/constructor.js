/*
    A constructor in JavaScript is just a function that happens to be called with the new operator.
*/

function Graph() {
    this.vertices = [];
    this.edges = [];
}

const
g = new Graph(),
prototypeOfg = Object.getPrototypeOf(g)


// defining prototype

Graph.prototype.addVertex = function(v) {
    this.vertices.push(v);
}

prototypeOfg.addEdge = function(v) {
    this.edges.push(v);
}



g.addVertex(5)
g.addEdge(15)
// addVertex is not defined in 'g', but is defined in it's prototype

console.table(g)
console.table(prototypeOfg)

/*
g:
┌──────────┬────┐
│ (index)  │ 0  │
├──────────┼────┤
│ vertices │ 5  │
│  edges   │ 15 │
└──────────┴────┘
prototypeOfg: 
┌───────────┐
│  (index)  │
├───────────┤
│ addVertex │
│  addEdge  │
└───────────┘
*/
