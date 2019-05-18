document.addEventListener("DOMContentLoaded",function() {

	let greetssection = document.getElementsByClassName("content")[0];
	greetssection.classList.replace("hide", "show");

	//Arrow function that showcases an alert message when called.
	let showMessage = () => alert("You pressed me!");

	//An object created with its URL.
	let configobj = {
		"url" : "http://api.icndb.com/jokes/random"
	};

	//Reusable ajax method that takes the URL of the object created above.
	let getAJAXCall = async function() {
		let url = configobj.url;

		//Could not find another way to show the spinner while loading the content (to avoid mixing of HTML and JS)
		greetssection.innerHTML = "<img class='spinner' src='assets/images/spinner.gif'></img>";
		const response = await fetch(url);
		const json = await response.json();
		greetssection.innerHTML = json.value.joke; //To fix -> This line of code is not reusable.
	}
	getAJAXCall()
	.catch(error => {
		console.error(error);
		greetssection.classList.add("error"); //If an error occurs the error class is added to change the background-color to red.
	});
	
	let callbutton = document.getElementsByClassName("button")[0];
	callbutton.addEventListener("click", getAJAXCall);
});