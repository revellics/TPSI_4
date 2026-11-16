"use strict";

const tbody = document.getElementsByTagName("tbody")[0]
const btnTutti = divPiloti.querySelector("button")

let scuderie

loadData()
caricaListBox()
caricaNazioni()
caricaPiloti()

function loadData() {
    let aus = localStorage.getItem("F1")
    if (!aus) {
        aus = data
    }
    scuderie = JSON.parse(aus)
    console.log(scuderie)
}

function caricaListBox() {
    const keys = Object.keys(scuderie).sort()
    for (const key of keys) {
        let opt = document.createElement("option")
        opt.textContent = key
        lstScuderie.append(opt)
    }
    lstScuderie.selectedIndex = -1
    lstScuderie.addEventListener("change", function () {
        for (const chk of divNazioni.querySelectorAll("input[type=checkbox]")) {
            chk.checked = false
        }
        caricaPiloti()
    })
}

function caricaNazioni() {
    const nazioni = new Set()
    for (const key in scuderie) {
        const team = scuderie[key];
        for (const pilota of team.piloti) {
            nazioni.add(pilota.nazione)
        }
    }
    const nazioniSorted = Array.from(nazioni).sort()
    nazioniSorted.forEach((nazione, i) => {
        let inp = document.createElement("input")
        inp.type = "checkbox"
        inp.value = nazione
        inp.addEventListener("change", function () {
            lstScuderie.selectedIndex = -1
            caricaPiloti()
        })
        let span = document.createElement("span")
        span.textContent = nazione
        divNazioni.append(inp, span, document.createElement("br"))
    });
}

function caricaPiloti() {
    tbody.innerHTML = ""
    let scuderia = lstScuderie.value
    let nazionichk = Array.from(divNazioni.querySelectorAll("input[type=checkbox]:checked"))
    let nazione = nazionichk.map(function(chk){return chk.value})
    for (const key in scuderie) {
        if (!scuderia || scuderia == key) {
            const team = scuderie[key];
            for (const pilota of team.piloti) {
                creaTabella(pilota.numero, pilota.nome, pilota.nazione, key)
            }
        }
    }
}

function creaTabella(...params) {
    let tr = document.createElement("tr")
    tbody.append(tr)
    params.forEach((item, i) => {
        let td = document.createElement("td")
        if (i == 1) {
            let span = document.createElement("span")
            span.textContent = item
            td.append(span)
            span.addEventListener("click", function(){
                visualizzaDettagli(params[1], params[3])
            })
        } else {
            td.textContent = item
        }
        tr.append(td)
    })
}

btnTutti.addEventListener("click", function(){
    lstScuderie.selectedIndex = -1
    const chks = nazioni.querySelectorAll("input[type=checkbox]:checked")
    for (const chk of chks) {
        chk.checked = false
    }
    caricaPiloti()
})

function visualizzaDettagli(nomePilota, nomeScuderia){
    const scuderia = scuderie[nomeScuderia]
    const pilota = scuderia.piloti.find(function(pilota){
        return pilota.nome==nomePilota
    })
    divDettagli.innerHTML = ""

    const img = document.createElement("img")
    divDettagli.append(img)
    img.src=`./img/${pilota.nome}.jpg`
    img.onerror = img.src = "./img/user.png"
    
    const div = document.createElement("div")
    divDettagli.append(div)
    
    const p = document.createElement("p")
    div.append(p)
    p.innerHTML = `<b>${pilota.numero} - ${pilota.nome}</b>`
}