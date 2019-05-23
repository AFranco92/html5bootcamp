class EventEmitter {
	constructor() {
		listeners = {};
		observers = [];
	}
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
	    if (!callbacks) { return false }; 

	    	//else, each callback is called.
	    	callbacks.forEach((cb) => { 
	    	cb();
	    	this.notify();
	    });
	    return true;
	}
	off(eventName, callback) {
		return this.removeListener(eventName, callback);
	}
	addObserver(observer) {
		this.observers.push(observer);
		}
		removeObserver(observer) {
			//if the observers array is empty, returns false.
		if(!this.observers) { return false; }

		//else, for each observer asks if the name equals to the parameter observer's name.
		for(let i = 0; i < this.observers.length; i++) {
			if(this.observers[i].name === observer.name) {

				//if equals, the observer is deleted from the array.
				this.observers.splice(observer, 1);
				return true;
			}
		}
		}
	notify(eventName) {

		//if the array of observers is not empty, it call the log function of them.
		if(this.observers.length > 0) {
			this.observers.forEach(observer => observer.log(eventName));
		}
	}
}