document.addEventListener("DOMContentLoaded",function() {

	let greetssection = document.getElementsByClassName("content")[0];
	greetssection.classList.replace("hide", "show");

	let showMessage = () => {alert("You pressed me!");}

	let callbutton = document.getElementsByClassName("button")[0];
	callbutton.addEventListener("click", showMessage);

});