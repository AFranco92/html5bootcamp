class Movie extends EventEmitter {
	constructor(name, year, duration, actors, listeners) {
		super(listeners);
		this.name = name;
		this.year = year;
		this.duration = duration;
		this.actors = [];
	}

	//every function notifies to the observers after its update.
	play() {
		alert("The movie "+this.name+" has started");
		this.notify("play");
	}
	pause() {
		alert("The movie "+this.name+" has stopped");
		this.notify("pause");
	}
	resume() {
		alert("The movie "+this.name+" has restarted");
		this.notify("resume");
	}
	addCast(cast) {
		this.actors.push(cast);
	}
}