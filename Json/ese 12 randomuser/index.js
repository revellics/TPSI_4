"use strict"
// table
const opts = document.querySelectorAll("#optWrapper input")
const table = document.querySelector(".list")
const tbody = table.querySelector("tbody")
// details
const detailsContainer = document.getElementById("detailsContainer")
const details = document.getElementById("details")
const navBtns = document.querySelectorAll("#navButtons input")
const navLabel = document.getElementById("navLabel")
// utility buttons
const utilityBtns = document.querySelectorAll("#utilityButtons input")
// addNew
const modal = document.getElementById("addNewModal")
const btnAnnulla = document.getElementById("btnAnnulla")
const btnSalva = document.getElementById("btnSalva")

// Events
opts[0].addEventListener("click", displayData)
opts[1].addEventListener("click", displayData)
navBtns.forEach(function (btn) {
    btn.addEventListener("click", naviga)
})

utilityBtns[0].addEventListener("click", eliminaPerNazione)
utilityBtns[1].addEventListener("click", ordina)
utilityBtns[2].addEventListener("click", salva)
utilityBtns[3].addEventListener("click", function () {
    modal.showModal()
})
btnAnnulla.addEventListener("click", function () {
    modal.close()
})
btnSalva.addEventListener("click", addNew)

//dati filtrati
let filteredData = []
let currentIndex = 0

// Avvio
let people = loadData() // people è un vettore di oggetti (JSON.parse della stringa)
displayData()

function loadData() {
    let peopleString = localStorage.getItem("people")
    if (!peopleString)
        peopleString = datiIniziali // variabile definita in data/people.js
    return JSON.parse(peopleString)
}

function displayData() {
    tbody.innerHTML = ""

    const gender = document.querySelector('input[name="gender"]:checked').value
    getFilteredData(gender)
    filteredData.forEach(function (person, i) {
        let tr = document.createElement("tr")
        tbody.append(tr)

        let td = document.createElement("td") //NOME
        td.textContent = getName(person.name)
        tr.append(td)

        td = document.createElement("td") //CITTA
        td.textContent = person.location.city
        tr.append(td)

        td = document.createElement("td") //STATO
        td.textContent = person.location.state
        tr.append(td)

        td = document.createElement("td") //NAZIONALITA'
        td.textContent = person.nat
        tr.append(td)

        td = document.createElement("td")
        td.classList.add("icon", "lens")
        td.addEventListener("click", function () {
            currentIndex = i
            showDetails()
        })
        tr.append(td)

        td = document.createElement("td")
        td.classList.add("icon", "trash")
        td.addEventListener("click", function () {
            deletePerson(person)
        })
        tr.append(td)
    })

    detailsContainer.style.display = "none"
}

function getName(personName) {
    return personName.first + " " + personName.last
}

function getNameSort(personName) {
    return personName.last + " " + personName.first
}

// mostra i dettagli della persona filtrata in posizione currentIndex
function showDetails() {
    const person = filteredData[currentIndex]
    if (!person)
        return

    detailsContainer.style.display = ""
    details.innerHTML = ""

    let p = document.createElement("p")
    p.textContent = person.email
    details.append(p)

    let img = document.createElement("img")
    img.src = person.picture.large
    img.style.maxWidth = "150px"
    details.append(img)

    p = document.createElement("p")
    p.textContent = person.phone
    details.append(p)

    navLabel.textContent = `${currentIndex + 1}/${filteredData.length}`
}

function getFilteredData(gender) {
    filteredData = people.filter(function (person) {
        return person.gender == gender
    })
}

function naviga() {
    if (filteredData.length == 0)
        return
    switch (this.value) {
        case "Primo":
            currentIndex = 0
            break
        case "Indietro":
            if (currentIndex > 0)
                currentIndex--
            break
        case "Avanti":
            if (currentIndex < filteredData.length - 1)
                currentIndex++
            break
        case "Ultimo":
            currentIndex = filteredData.length - 1
            break
    }
    showDetails()
}

function deletePerson(person) {
    let index = people.indexOf(person)
    people.splice(index, 1)
    alert(getName(person.name) + " rimosso correttamente")
    displayData()
}

function eliminaPerNazione() {
    const risposta = prompt("Inserire una nazione:")
    if (risposta === null || risposta.trim() == "")
        return // prompt annullato o vuoto
    const nazione = risposta.trim().toUpperCase()

    let l1 = people.length
    people = people.filter(function (item) {
        return item.nat.toUpperCase() != nazione
    })
    let l2 = people.length

    if (l1 == l2)
        alert("Non ci sono persone appartenenti a " + nazione)
    else {
        alert(`Eliminate correttamente ${l1 - l2} persone`)
        displayData()
    }
}

function addNew() {
    const txtFirst = document.getElementById("txtFirst")
    const txtLast = document.getElementById("txtLast")
    const txtCity = document.getElementById("txtCity")
    const txtState = document.getElementById("txtState")
    const txtNat = document.getElementById("txtNat")
    const txtGender = document.getElementById("txtGender")
    const txtEmail = document.getElementById("txtEmail")
    const txtPhone = document.getElementById("txtPhone")

    let inputData = Array.from(modal.getElementsByTagName("input"))
    for (const input of inputData) {
        if (input.value.trim() == "") {
            alert("Dati incompleti")
            return
        }
    }
    //controllo correttezza male/female
    const gender = txtGender.value.trim().toLowerCase()
    if (gender != "male" && gender != "female") {
        alert("Controllare il gender (male / female)")
        return
    }
    //salvataggio
    let person = {
        "gender": gender,
        "name": {
            "title": gender == "male" ? "mr" : "miss",
            "first": txtFirst.value.trim().toLowerCase(),
            "last": txtLast.value.trim().toLowerCase()
        },
        "location": {
            "street": "",
            "city": txtCity.value.trim().toLowerCase(),
            "state": txtState.value.trim().toLowerCase(),
            "postcode": 0
        },
        "email": txtEmail.value.trim(),
        "login": {
            "username": "",
            "password": "",
            "salt": "",
            "md5": "",
            "sha1": "",
            "sha256": ""
        },
        "dob": "",
        "registered": "",
        "phone": txtPhone.value.trim(),
        "cell": txtPhone.value.trim(),
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png",
            "medium": "https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png",
            "thumbnail": "https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png"
        },
        "nat": txtNat.value.trim().toUpperCase()
    }
    people.push(person)
    salva()
    displayData()
    for (const input of inputData) {
        input.value = ""
    }
    modal.close()
}

function salva() {
    localStorage.setItem("people", JSON.stringify(people))
    alert("Dati salvati correttamente")
}

let aZ = true
function ordina() {
    people.sort((item1, item2) => {
        let n1 = getNameSort(item1.name)
        let n2 = getNameSort(item2.name)
        return aZ ? n1.localeCompare(n2) : n2.localeCompare(n1)
    })
    displayData()
    aZ = !aZ
}
