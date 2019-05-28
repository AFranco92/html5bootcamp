document.addEventListener("DOMContentLoaded",function() {

	"use strict";

	let textarea = document.querySelector("textarea");

	//Using localStorage (uncomment to test)
	
	/*let myLocalStorage = window.localStorage;

	//Using localStorage, the value of the top textarea is saved and showed
	//in the another one.
	document.getElementById("savebutton").addEventListener("click", function(e) {
		e.preventDefault();
		myLocalStorage.setItem("textareavalue", textarea.value);

		//Getting the value saved previously and assigned to a var.
		let valuesaved = myLocalStorage.getItem("textareavalue");

		//Then, this value is showed in the result textarea.
		document.getElementById("textsaved").innerHTML = valuesaved;
	});

	document.getElementById("clearbutton").addEventListener("click", function(e) {
		e.preventDefault();

		//Calling the clear function of the localStorage obj that deletes all values saved.
		myLocalStorage.clear();

		//also, the textarea is setted to empty.
		document.getElementById("textsaved").innerHTML = "";
	});*/


	//Same example but using indexedDB
	const DB_NAME = 'textarea';
  	const DB_VERSION = 3;
  	const DB_STORE_NAME = 'textareacontents';
	let db;
	function openDb() {
    	console.log("Opening database...");
    	let req = indexedDB.open(DB_NAME, DB_VERSION);
    	req.onsuccess = function (evt) {
      		db = this.result;
    	};
    	req.onerror = function (evt) {
      		console.error("openDb:", evt.target.errorCode);
    	};
        req.onupgradeneeded = function (evt) {
      		let store = evt.currentTarget.result.createObjectStore(
        	DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

      		store.createIndex('id', 'id', { unique: true });
      		store.createIndex('content', 'content', { unique: false });
    	};
  	}
  	openDb();
  	document.getElementById("savebutton").addEventListener("click", function(e) {
  		e.preventDefault();
  		let data = textarea.value;
  		let tx = db.transaction("textareacontents", "readwrite");
  		let store = tx.objectStore("textareacontents");
  		store.put({'id' : 1, 'content': data});
		document.getElementById("textsaved").innerHTML = data;
  	});
  	document.getElementById("clearbutton").addEventListener("click", function(e) {
		e.preventDefault();
		let tx = db.transaction("textareacontents", "readwrite");
  		let store = tx.objectStore("textareacontents");
  		store.delete(1);
  		document.getElementById("textsaved").innerHTML = "";
	});
});