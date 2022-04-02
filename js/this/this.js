function foo () {
	console.log("Simple function call");
	console.log(this === window); 
}

foo();	//prints true on console
console.log(this) //Prints true on console.


//to handle this apply, bind and call
// https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb

//more 
// https://betterprogramming.pub/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8