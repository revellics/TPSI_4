"use strict"
  
// table and filters
const tbody = document.querySelector("#main-table tbody")
const txtSearch = document.getElementById("search-input")
const optDisponibili = document.getElementById("filter-available")
const divValoreTotale = document.getElementById("total-value-display")

// details
const modalDetails = new bootstrap.Modal(document.getElementById('modal-details'));
const detailsBody = document.getElementById("modal-details-body")

// add new
const modalAdd = new bootstrap.Modal(document.getElementById('modal-add'));
const btnAdd = document.getElementById("btn-open-add")
const addErrorAlert = document.getElementById("add-error-alert")
const btnSalva = document.getElementById("btn-save-new")

let operaSelezionataCorrente = null;
const Venduta = document.getElementById("btn-mark-sold")

Venduta.addEventListener("click", SegnaVandita)

txtSearch.addEventListener("change", RicercaArtista)
optDisponibili.addEventListener("click", VediDisponibili)

let contaClickDisponibili = 0

visualizzaOpere("All", "All")

function visualizzaOpere(artista, disponibilita){
    tbody.innerHTML = ""
    let index = 0;
    opere.forEach( (e,i) => {
        if((artista == "All" || e[2] == artista) && (disponibilita == "All" || e[5] == disponibilita)){
            const tr = document.createElement("tr");
            tbody.append(tr)

            const tdId = document.createElement("td")
            tdId.textContent = e[0];
            const tdTitolo = document.createElement("td")
            tdTitolo.textContent = e[1];
            const tdArtista = document.createElement("td")
            tdArtista.textContent = e[2];
            const tdAnno = document.createElement("td")
            tdAnno.textContent = e[3];
            const tdValore = document.createElement("td")
            tdValore.textContent = e[4];
            const tdStato = document.createElement("td")
            let h = ""
            if(e[5] == true){
                h = "Venduta"
                tdStato.classList.add("badge", "bg-danger")
            }else{
                h = "Disponibile"
                tdStato.classList.add("badge", "bg-success")
            }
            tdStato.textContent = h;

            const tdSearch = document.createElement("td")
            let i = document.createElement("i")
            i.classList.add("bi", "bi-search")
            i.addEventListener("click", function () {
                showModalDettagli(e);
            })
            tdSearch.append(i)

            const tdTrash = document.createElement("td")
            i = document.createElement("i")
            i.classList.add("bi", "bi-trash")
            i.addEventListener("click", TogliOpera)
            tdTrash.append(i)

            tr.append(tdId, tdTitolo, tdArtista, tdAnno, tdValore, tdStato, tdSearch, tdTrash);

            //calcolo il vaore delle opere visualizzate
            //ValoreVisibileTotale(artista, tdValore);
            index++;
        }
    });
}

function TogliOpera(){

}

function showModalDettagli(opera){
    detailsBody.innerHTML = "";

    const h2 = document.createElement("h2")
    h2.classList.add("text-center", "mb-3", "card-title")
    h2.textContent = opera[1];
    detailsBody.append(h2);
    const img = document.createElement("img")
    img.src = "./img/"+opera[1]
    img.alt = opera[1];
    img.classList.add("mx-auto", "mb-3", "d-block", "w-50")
    detailsBody.append(img);
    const divBase = document.createElement("div")
    detailsBody.append(divBase);

    for (let i = 0; i < headers.length; i++) {
        if (i == 1) i++;
        let divRow = document.createElement("div")
        divRow.classList.add("row", "mb-2")
        divBase.append(divRow);

        let divCol1 = document.createElement("div")
        divRow.append(divCol1);
        divCol1.classList.add("col-4", "text-end", "fw-bold")
        divCol1.textContent = headers[i]

        let divCol2 = document.createElement("div")
        divRow.append(divCol2);

        divCol2.classList.add("col-8")
        let input = document.createElement("input")
        input.type = "text"
        input.classList.add("form-control")
        input.value = opera[i]
        input.readOnly = true
        divCol2.append(input)
    }

    if(opera[5] == true){
        Venduta.disabled = true
    }

    modalDetails.show();
}

function ValoreVisibileTotale(artista, tdValore){
    let costoOpereVisibili
    let num
    opere.forEach( (e,i) => {
        if(artista == "All" || e[3] == artista){
            costoOpereVisibili + e[4].textContent;
        }
    });
    divValoreTotale.textContent = "€ "+costoOpereVisibili
}

function RicercaArtista(){
    tbody.innerHTML = ""
    opere.forEach( (e,i) => {
        if(e[3].Contains(txtSearch.textContent))
        if(optDisponibili == true && e[6] == false){
            visualizzaOpere(e[3].textContent)
        }
    })
}

function VediDisponibili(){
    tbody.innerHTML = ""
    if (contaClickDisponibili%2==0)
        visualizzaOpere("All", false)
    else
        visualizzaOpere("All", "All")
    contaClickDisponibili++
}

function SegnaVandita(){
    
}