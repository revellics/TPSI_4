"use strict"

// DOM Elements
const optWrapper = document.getElementById("optWrapper")
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector(".list")
const tbody = table.querySelector("tbody")

// details
const detailsContainer = document.getElementById("detailsContainer") || details // Gestione fallback
const details = document.getElementById("details")
const navBtns = document.querySelectorAll("#navButtons input")
const navLabel = document.getElementById("navLabel")

// utility buttons
const utilityBtns = document.querySelectorAll("#utilityButtons input")

// addNew
const modal = document.getElementById('addNewModal')

// Avvio
let currentIndex = 0
let filteredData = []
const people = loadData()

displayData()

// Event Listeners principali
opts[0].addEventListener("click", displayData)
opts[1].addEventListener("click", displayData)

utilityBtns[0].addEventListener("click", EliminaPerNazione)
utilityBtns[1].addEventListener("click", ordina)

navBtns.forEach(btn => {
    btn.addEventListener("click", naviga)
})


// Functions
function loadData() {
    let peopleString = localStorage.getItem("people")
}

function displayData() {
    tbody.innerHTML = ""
   
    // Recupera l'elemento selezionato ed aggiorna i dati filtrati
    const selectedOpt = optWrapper.querySelector("input:checked")
    const gender = selectedOpt ? selectedOpt.value : ""
   
    // Aggiorna l'array globale dei dati filtrati
    filteredData = getFilteredData(gender)

    filteredData.forEach(function (person, index) {
        let tr = document.createElement("tr")
        tbody.append(tr)

        let td = document.createElement("td")
        td.textContent = getName(person.name)
        tr.append(td)

        td = document.createElement("td")
        td.textContent = person.location.city
        tr.append(td)

        td = document.createElement("td")
        td.textContent = person.nat
        tr.append(td)

        // Icona Lente (Dettagli)
        td = document.createElement("td")
        td.classList.add("icon", "lente")
        td.addEventListener("click", function () {
            currentIndex = index
            showDetailsPerson(person, currentIndex)
        })
        tr.append(td)

        // Icona Cestino (Elimina)
        td = document.createElement("td")
        td.classList.add("icon", "cestino")
        td.addEventListener("click", function () {
            removePerson(person)
        })
        tr.append(td)
    })

    if (detailsContainer) {
        detailsContainer.style.display = "none"
    }
}

function getName(personName) {
    return `${personName.first} ${personName.last}`
}

function showDetailsPerson(personDetails, index) {
    if (typeof index !== "undefined") {
        currentIndex = index
    }
   
    if (detailsContainer) {
        detailsContainer.style.display = ""
    }
   
    details.innerHTML = ""

    let p = document.createElement("p")
    p.textContent = personDetails.email
    details.append(p)

    let img = document.createElement("img")
    img.src = personDetails.picture.large
    details.append(img)

    p = document.createElement("p")
    p.textContent = personDetails.cell
    details.append(p)

    if (navLabel) {
        navLabel.textContent = `${currentIndex + 1}/${filteredData.length}`
    }
}

function getFilteredData(gender) {
    return people.filter(function (person) {
        return person.gender === gender
    })
}

function naviga() {
    if (filteredData.length === 0) return

    switch (this.value) {
        case "Primo":
            currentIndex = 0
            break
        case "Indietro":
            if (currentIndex > 0) {
                currentIndex--
            }
            break
        case "Avanti":
            if (currentIndex < filteredData.length - 1) {
                currentIndex++
            }
            break
        case "Ultimo":
            currentIndex = filteredData.length - 1
            break
        default:
            break
    }
   
    showDetailsPerson(filteredData[currentIndex], currentIndex)
}

function removePerson(person) {
    let index = people.indexOf(person)
    if (index !== -1) {
        people.splice(index, 1)
        alert(getName(person.name) + " rimosso correttamente")
        displayData()
    }
}


function EliminaPerNazione(){
	const nazione = prompt ("Insrerisci un nazione: ")
	let lun1 = people.length
	const people = people.filter(function(person){
		return person.nat != nazione
	})
	let len2 = people.length
	if(len1==len2)
		alert("Non ci sono persone appartenenti alla nazione "+nazione)
	else if(nazione == "FR"){
		alert("Godo francesi di merda")
		displayData();
	}else{
		alert(`Eliminate correttamente ${len1-len2} persone`)
		displayData();
		if(len2==0){
			utilityBtns[0].disabled = true
		}
	}
}
