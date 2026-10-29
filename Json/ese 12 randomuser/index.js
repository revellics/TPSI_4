"use strict"
// table
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector(".list")
const tbody = table.querySelector("tbody")
// details
const details = document.getElementById("details")
const navBtns = document.querySelectorAll("#navButtons input")
const navLabel = document.getElementById("navLabel")
// utility buttons
const utilityBtns = document.querySelectorAll("#utilityButtons input")
// addNew
const modal = document.getElementById('addNewModal');


// Events


// Avvio
let currentIndex = 0
const people = loadData();
displayData()

function loadData(){
	let peopleString = localStorage.getItem("people");
	if (!peopleString) 
		peopleString = datiIniziali
	return JSON.parse(peopleString)
}


function displayData() {
	tbody.innerHTML=""
	
	// const gender = opts.querySelector(":checked").value - NOK

}
