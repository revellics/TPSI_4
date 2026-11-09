"use strict";

const table = document.getElementsByTagName("table")[0]	
const tbody = table.querySelector("tbody")

const gender = document.querySelector(".gender")
const lstGender = gender.querySelector("select")

const btnInserisci = document.getElementsByClassName(".inserisci")[0]

let watches = datiIniziali
creaTabella()

function creaTabella(){
    tbody.innerHTML = ""
    for (const item of watches) {
        const gender = item.gender
        const model = item.model
        for (const model of models) {
            
        }

        visualizza(gender, code, price, color, img)
    }
}