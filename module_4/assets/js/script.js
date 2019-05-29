document.addEventListener("DOMContentLoaded",function() {

	"use strict";

	//------------------Storages--------------------------------------------

	let textarea = document.querySelector("textarea");

	//Using localStorage (uncomment to test)
	
	/*let myLocalStorage = window.localStorage;

	//Using localStorage, the value of the top textarea is saved and shown
	//in the another one.
	document.getElementById("savebutton").addEventListener("click", function(e) {
		e.preventDefault();
		myLocalStorage.setItem("textareavalue", textarea.value);

		//Getting the value saved previously and assigned to a var.
		let valuesaved = myLocalStorage.getItem("textareavalue");

		//Then, this value is shown in the result textarea.
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
	// const DB_NAME = 'textarea';
 //  	const DB_VERSION = 3;
 //  	const DB_STORE_NAME = 'textareacontents';
	// let db;
	// function openDb() {
 //    	console.log("Opening database...");
 //    	let req = indexedDB.open(DB_NAME, DB_VERSION);
 //    	req.onsuccess = function (evt) {
 //      		db = this.result;
 //    	};
 //    	req.onerror = function (evt) {
 //      		console.error("openDb:", evt.target.errorCode);
 //    	};
 //        req.onupgradeneeded = function (evt) {
 //      		let store = evt.currentTarget.result.createObjectStore(
 //        	DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

 //      		store.createIndex('id', 'id', { unique: true });
 //      		store.createIndex('content', 'content', { unique: false });
 //    	};
 //  	}
 //  	openDb();
 //  	document.getElementById("savebutton").addEventListener("click", function(e) {
 //  		e.preventDefault();
 //  		let data = textarea.value;
 //  		let tx = db.transaction("textareacontents", "readwrite");
 //  		let store = tx.objectStore("textareacontents");
 //  		store.put({'id' : 1, 'content': data});
	// 	document.getElementById("textsaved").innerHTML = data;
 //  	});
 //  	document.getElementById("clearbutton").addEventListener("click", function(e) {
	// 	e.preventDefault();
	// 	let tx = db.transaction("textareacontents", "readwrite");
 //  		let store = tx.objectStore("textareacontents");
 //  		store.delete(1);
 //  		document.getElementById("textsaved").innerHTML = "";
	// });

 //  	//------------------Drag and drop support-------------------------------

	// //Defining the holder element that will contains the dragged text.
	// let holder = document.getElementById("textsaved");

	// //A <p> element is selected to show the state of the file reader API.
 //    let state = document.getElementById("status");

 //    //Printing in the DOM if the browser support the file reader API or not.
	// if (typeof window.FileReader === "undefined") {
	//     state.className = "fail";
	// } else {
	//     state.className = "success";
	//     state.innerHTML = "File API & FileReader available";
	// }

	// //These events don't work in IE
	// holder.ondragover = function() {
	//     this.className = "hover";
	//     return false;
	// };
	// holder.ondragend = function() {
	//     this.className = "";
	//     return false;
	// };
	// holder.ondrop = function(e) {
	//     this.className = "";
	//     e.preventDefault();

	//     //Taking the first element of the files contained in data transfer of the event.
	//     let file = e.dataTransfer.files[0];

	//     //A new object of FileReader is created to control when a file is loaded in the textarea.
	//     let reader = new FileReader();
	//     reader.onload = function(event) {

	//     	//The content of the file is shown in the textarea.
	//         holder.innerText = event.target.result;
	//     };
	//     reader.readAsText(file);
	//     return false;
	// }

	//------------------Web Sockets-----------------------------------------

	//Creating an WebSocket object.
	let connection = new WebSocket("ws://echo.websocket.org");

	//Sending data to the server when the connection is open.
	connection.onopen = function () {
	  connection.send("Bla");
	};

	//Logging errors.
	connection.onerror = function (error) {
	  console.log("WebSocket Error" + error);
	};

	//Loggin messages from the server.
	connection.onmessage = function (e) {
	  console.log("Server: " + e.data);
	};

	//------------------Canvas----------------------------------------------

	let canvas = document.getElementById("mycanvas");
	let context = canvas.getContext("2d");
	let requestAnimationFrame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;

   	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);

	let draw = function() {
		let randomShape = Math.floor((Math.random() * 4) + 1);
		if (randomShape == 1) {

			//Drawing a rectangle.
		    context.beginPath();
		    context.rect(25, 50, 200, 100);
		    context.fillStyle = '#00FF00';
		    context.fill();
		    context.lineWidth = 7;
		    context.strokeStyle = '#000';
		    context.stroke();
		} else if (randomShape == 2) {

			//Drawing a circle.
		    context.beginPath();
		    context.arc(200, 200, 69, 0, 2 * Math.PI, false);
		    context.fillStyle = '#FF0000';
		    context.fill();
		    context.lineWidth = 5;
		    context.strokeStyle = '#000';
		    context.stroke();
		} else if (randomShape == 3) {

			//Drawing a triangle.
			context.beginPath();
			context.moveTo(100, 100);
			context.lineTo(100, 300);
			context.lineTo(300, 300);
			context.closePath();
			context.lineWidth = 10;
			context.strokeStyle = '#666666';
			context.stroke();
			context.fillStyle = "#FFCC00";
			context.fill();
		} else if (randomShape == 4) {

			//Drawing an hexagon.
			context.beginPath();
			context.moveTo(100 + 100 * Math.cos(0), 150 + 100 * Math.sin(0));
			for (let side = 0; side < 7; side++) {
			  context.lineTo(100 + 100 * Math.cos(side * 2 * Math.PI / 6), 150 + 100 * Math.sin(side * 2 * Math.PI / 6));
			}
			context.fillStyle = "#333333";
			context.fill();
		}
	}
	draw();

	//Creating the rectangle as a object with its properties.
	let rectangle = {
	  	width: 180,
	  	height: 90,
	  	x: 0,
	  	y: (canvas.height-90)
	};

	let bounceright = false;

	let animateRect = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	  	context.beginPath();
	  	context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
	  	context.fillStyle = "#536BA5";
	  	context.fill();

	  	//If the x pos of rectangle is lower than the right end of the canvas
	  	//it will increase in 5.
		if (!(rectangle.x > canvas.width-(rectangle.width)) && bounceright == false) {
			rectangle.x += 5.3;
		}

		//If not, it means that a bounce has occured. Then, the x pos is decreasing in 5.
		else {
			bounceright = true;
			rectangle.x -= 5.3;

			//Checking if there is a bounce at the left end of the canvas.
			//If there is, the bounceright boolean is set to false and the x position
			//will increase in 5 again.
			if(rectangle.x < 0) {
				bounceright = false;
				rectangle.x += 5.3;
			}
		}
		window.requestAnimationFrame(animateRect);
	}
	window.requestAnimationFrame(animateRect);
});