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
opts[0].addEventListener("click", displayData)
opts[1].addEventListener("click", displayData)

navBtns.forEach

let filteredData;

// Avvio
let currentIndex = 0
let people = loadData();
displayData()


function loadData(){
	let peopleString = localStorage.getItem("people");
	if (!peopleString) 
		peopleString = datiIniziali
	return JSON.parse(peopleString)
}


function displayData() {
	tbody.innerHTML=""
	const gender = optWrapper.querySelector(":checked").value
	console.log(gender)

	filteredData = getFilteredData(gender)

	filteredData.forEach((e, i) => {
		if(e.gender == gender){
			let tr = document.createElement("tr")
			tbody.append(tr)

			let td = document.createElement("td")
			td.textContent = getName(e.name);
			tr.append(td);

			td = document.createElement("td")
			td.textContent = e.location.city
			tr.append(td);

			td = document.createElement("td")
			td.textContent = e.location.state
			tr.append(td);

			td = document.createElement("td")
			td.textContent = e.nat
			tr.append(td);

			td = document.createElement("td")
			td.classList.add("icon", "lens")
			td.addEventListener("click", function(){
				showDetails(e, i)
			})
			tr.append(td);
			
			td = document.createElement("td")
			td.classList.add("icon", "trash")
			tr.append(td);
		}
	});
}


function getName(name){
	return `${name.first} ${name.last}`
}

function showDetails(person, i){
	detailsContainer.style.display = ""
	details.innerHTML = ""
	let p = document.createElement("p")
	p.textContent = person.email
	details.append(p)
	let img = document.createElement("img")
	img.src = person.picture.large
	details.append(img)
	p = document.createElement("p")
	p.textContent = person.phone
	details.append(p)

	currentIndex = i+1
	navLabel.textConent = `${currentIndex}/${filteredData.length}`
}

function getFilteredData(gender){
	let f = []
	people.forEach((e,i) => {
		if(e.gender == gender)
			f.push(e)
	});
	return f
}