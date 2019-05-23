document.addEventListener("DOMContentLoaded",function() {

	"use strict";

	let msg = "An event was called!";
	let displayAlert = () => alert(msg);
	let displayUpperCaseAlert = () => alert(msg.toUpperCase());

	class EventEmitter {
		listeners = {};
		addListener(eventName, callback) {
			//if the event exists, returns the array. if not, an empty one.
			this.listeners[eventName] = this.listeners[eventName] || [];
			this.listeners[eventName].push(callback);
			return this;
		}

		removeListener(eventName, callback) {
			//getting the callbacks for that event.
		    let callbacks = this.listeners[eventName];

		    //if not exist, returns the obj.
		    if (!callbacks) return this; 

		    //else, for each callback check if equals to the callback parameter.
		    for(let i = 0; i < callbacks.length; i++) {
		      	if (callbacks[i] === callback) {

		      		//if equals, delete it once.
		        	callbacks.splice(i,1); 

		        	//and stop the loop.
		        	break;
		      	}
		    }
		    return this;
		}
		on(eventName, callback) {
			return this.addListener(eventName, callback);
		}
		emit(eventName) {
			//getting the callbacks for that event.
		    let callbacks = this.listeners[eventName];

		    //if not exist, return false.
		    if (!callbacks) return false; 

		    	//else, each callback is called.
		    	callbacks.forEach((cb) => { 
		    	cb();
		    });
		    return true;
		}
		off(eventName, callback) {
			return this.removeListener(eventName, callback);
		}
	}

	class Movie extends EventEmitter {
		constructor(name, year, duration, listeners) {
			super(listeners);
			this.name = name;
			this.year = year;
			this.duration = duration;
		}
		play = () => alert("The movie "+this.name+" has started");
		pause = () => alert("The movie "+this.name+" has stopped");
		resume = () => alert("The movie "+this.name+" has restarted");
	}

	class Actor {
		constructor(name, age){
			this.name = name;
			this.age = age;
		}
	}

	let matilda = new Movie("Matilda", "1996", "1h42m");
	let titanic = new Movie("Titanic", "1997", "3h15m");
	let ironman = new Movie("Iron-Man", "2008", "2h6m");
	let eventemitter1 = new EventEmitter();

	eventemitter1.on("click", displayAlert);
	eventemitter1.on("click", displayUpperCaseAlert);
	eventemitter1.emit("click");

	//calling inherited function on, using play as the callback.
	document.querySelector("div").addEventListener("click", () => matilda.on("click", matilda.play()));
});