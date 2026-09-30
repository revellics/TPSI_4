"use strict"

const content = document.getElementById("content")

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showAlert);

loadData()

function loadData(){
    let products = pc
    content.innerHTML=""
    const h3 = document.createElement("h3")
    h3.textContent = "Numero di prodotti: "+products.length
    content.append(h3)

    const row = document.createElement("div")
    row.classList.add("clo-mid-4")
    content.append(row)

    for (let product of products) {
        const divWrapper = document.createElement("div")
        divWrapper.classList.add("col-mid-4", )
    }

    const card = document.createElement("img")
    card.
}

function showAlert(){

}