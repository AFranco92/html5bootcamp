document.addEventListener("DOMContentLoaded",function() {

	"use strict";

	let msg = "An event was called!";
	let displayAlert = () => alert(msg);
	let displayUpperCaseAlert = () => alert(msg.toUpperCase());

	let social = {
		share(friendName) { 
			alert(friendName+" share "+this.name); 
		},
		like(friendName) { 
			alert(friendName+" like "+this.name); 
		}
	};

	//copying the methods of social to Movie class.
	Object.assign(Movie.prototype, social);

	let logger1 = new Logger("logger1");
	let matilda = new Movie("Matilda", "1996", "1h42m");
	let titanic = new Movie("Titanic", "1997", "3h15m");
	let ironman = new Movie("Iron-Man", "2008", "2h6m");
	matilda.like("Franco");
	let eventemitter1 = new EventEmitter();
	matilda.addObserver(logger1);
	//matilda.removeObserver(logger1);

	//adding two actors to the movie.
	matilda.addCast([new Actor("Danny DeVito", 74), new Actor("Mara Wilson", 31)]);

	eventemitter1.on("click", displayAlert);
	eventemitter1.on("click", displayUpperCaseAlert);
	//eventemitter1.emit("click");

	//calling inherited function on, using play as the callback.
	document.querySelector("div").addEventListener("click", () => matilda.on("click", matilda.play()));
});