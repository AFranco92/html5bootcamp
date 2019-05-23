class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}
class EventEmitter {
  constructor(listeners, observers) {
    this.listeners = {};
    this.observers = [];
  }

  addListener(eventName, callback) {
    //if the event exists, returns the array. if not, an empty one.
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(callback);
    return this;
  }

  removeListener(eventName, callback) {
    //getting the callbacks for that event.
    let callbacks = this.listeners[eventName]; //if not exist, returns the obj.

    if (!callbacks) return this; //else, for each callback check if equals to the callback parameter.

    for (let i = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback) {
        //if equals, delete it once.
        callbacks.splice(i, 1); //and stop the loop.

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
    let callbacks = this.listeners[eventName]; //if not exist, return false.

    if (!callbacks) {
      return false;
    }

    ; //else, each callback is called.

    callbacks.forEach(cb => {
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
    if (!this.observers) {
      return false;
    } //else, for each observer asks if the name equals to the parameter observer's name.


    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i].name === observer.name) {
        //if equals, the observer is deleted from the array.
        this.observers.splice(observer, 1);
        return true;
      }
    }
  }

  notify(eventName) {
    //if the array of observers is not empty, it call the log function of them.
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.log(eventName));
    }
  }

}
class Logger {
  constructor(name) {
    this.name = name;
  }

  log(eventName) {
    alert("The " + eventName + " event has been emitted");
  }

}
class Movie extends EventEmitter {
  constructor(name, year, duration, actors, listeners) {
    super(listeners);
    this.name = name;
    this.year = year;
    this.duration = duration;
    this.actors = [];
  } //every function notifies to the observers after its update.


  play() {
    alert("The movie " + this.name + " has started");
    this.notify("play");
  }

  pause() {
    alert("The movie " + this.name + " has stopped");
    this.notify("pause");
  }

  resume() {
    alert("The movie " + this.name + " has restarted");
    this.notify("resume");
  }

  addCast(cast) {
    this.actors.push(cast);
  }

}
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  let msg = "An event was called!";

  let displayAlert = () => alert(msg);

  let displayUpperCaseAlert = () => alert(msg.toUpperCase());

  let social = {
    share(friendName) {
      alert(friendName + " share " + this.name);
    },

    like(friendName) {
      alert(friendName + " like " + this.name);
    }

  }; //copying the methods of social to Movie class.

  Object.assign(Movie.prototype, social);
  let logger1 = new Logger("logger1");
  let matilda = new Movie("Matilda", "1996", "1h42m");
  let titanic = new Movie("Titanic", "1997", "3h15m");
  let ironman = new Movie("Iron-Man", "2008", "2h6m");
  matilda.like("Franco");
  let eventemitter1 = new EventEmitter();
  matilda.addObserver(logger1); //matilda.removeObserver(logger1);
  //adding two actors to the movie.

  matilda.addCast([new Actor("Danny DeVito", 74), new Actor("Mara Wilson", 31)]);
  eventemitter1.on("click", displayAlert);
  eventemitter1.on("click", displayUpperCaseAlert); //eventemitter1.emit("click");
  //calling inherited function on, using play as the callback.

  document.querySelector("div").addEventListener("click", () => matilda.on("click", matilda.play()));
});
