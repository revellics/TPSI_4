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
navBtns.forEach(function (btn) {
    btn.addEventListener("click", naviga)
})

utilityBtns[0].addEventListener("click", eliminaPerNazione)
utilityBtns[1].addEventListener("click", ordina)
utilityBtns[2].addEventListener("click", salva)
utilityBtns[3].addEventListener("click", addNew)


//dati filtrati
let filteredData
let currentIndex = 0

// Avvio
let people = loadData(); //people è un vettore enumerativo di JSON (si usa JSON.parse perchè è un elemento valido)
displayData()

function loadData() {
    let peopleString = localStorage.getItem("people");
    if (!peopleString)
        peopleString = peopleStorage
    return JSON.parse(peopleString)
}


function displayData() {
    tbody.innerHTML = ""

    // const gender = opts.querySelector(":checked").value - NOK
    const gender = document.querySelector(":checked").value
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
            showDetails(person, currentIndex)
        })
        tr.append(td)

        td = document.createElement("td")
        td.classList.add("icon", "trash")
        td.addEventListener("click", function () {
            deletePerson(person)
        })
        tr.append(td)

    });

    detailsContainer.style.display = "none"
}

function getName(personName) {
    return personName.first + " " + personName.last
}
function getNameSort(personName) {
    return personName.Last + " " + personName.First
}

function showDetails(person, currentIndex) {
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
    p.textContent = person.cell
    details.append(p)

    navLabel.textContent = `${currentIndex + 1}/${filteredData.length}`
}

function getFilteredData(gender) {
    filteredData = []
    people.forEach(function (person) {
        if (person.gender == gender)
            filteredData.push(person)
    });
}

function naviga() {
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
    showDetails(filteredData[currentIndex])
}

function deletePerson(person) {
    let index = people.indexOf(person)
    people.splice(index, 1)
    alert(getName(person.name) + " rimosso correttamente")
    displayData()
}


function eliminaPerNazione(e) {
    const nazione = prompt("inserire una nazione:").toUpperCase()
    let l1 = people.length;
    people = people.filter(function (item) {
        return item.nat != nazione;
    })
    let l2 = people.length;
    if (l1 == l2)
        alert("non ci sono nazioni appartenenzi a " + nazione)
    else {
        alert(`eliminate correttamente ${l1 - l2} persone`);
        displayData()
    }
    if (people.length == 0){
        utilityBtns[0].disabled = true
    }
}

function addNew() {
    let inputData = Array.from(modal.getElementsByTagName("input"))
    for (const input of inputData) {
        if(input.value.trim() == "")
            alert("Dati incompleti"); return
    }
    //controllo correttezza male/female
    if(txtGender.value != "male" && txtGender.value != "female")
        alert("Controllare il gender"); return
    //salvataggio
    let person = {
        "gender": txtGender.value,
         "name":{
            "title": txtGender.value == "male" ? "mr" : "miss",
            "first": txtFirst.value,
            "last": txtLast.value
         },
         "location":{
            "street":"",
            "city": txtCity,
            "state": txtState,
            "postcode": 0
         },
         "email": txtEmail.value,
         "login":{
            "username":"",
            "password":"",
            "salt":"",
            "md5":"",
            "sha1":"",
            "sha256":""
         },
         "dob":"",
         "registered":"",
         "phone": txtPhone.value,
         "cell":txtPhone.value,
         "id":{
            "name":"",
            "value":null
         },
         "picture":{
            "large":"https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png",
            "medium":"https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png",
            "thumbnail":"https://11.buytourismonline.com/wp-content/uploads/2019/02/speaker_1057517-230x230.png"
         },
         "nat": txtNat.value
    }
    people.push(person)
    salva()
    displayData()
    for (const input of inputData) {
        input.value == ""
    }
}

function salva() {
    let data = JSON.stringify(people)
    localStorage.people = data
    alert("Dati salvati correttamente")
}
let aZ = true
function ordina() {
    people.sort((item1, item2) =>{
        let n1 = getNameSort(item1.name)
        let n2 = getNameSort(item2.name)
        return aZ ? n1.localeCompare(n2) : n2.localeCompare(n1)
    })
    displayData()
    aZ = !aZ
}
