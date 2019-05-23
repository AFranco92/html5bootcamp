class Logger {
	constructor(name) {
		this.name = name;
	}
	log(eventName) {
		alert("The "+eventName+" event has been emitted");
	}
}