'use strict'

const listView = document.getElementById("list-view");
const divNbooks = listView.querySelector(".nBooks")
const tBody = listView.querySelector("tbody");

const detailsView = document.getElementById("details-view");
detailsView.style.display="none"
const details = detailsView.querySelector(".details")
const pageLabel = detailsView.querySelector("span")

const addView = document.getElementById("add-view")
const container = document.getElementById("container")
addView.style.display="none"
const newBook = addView.querySelector(".details")


const headerBtns = document.getElementsByClassName("headerBtn")
const listViewBtn = headerBtns[0]
const detailsViewBtn = headerBtns[1]
const addViewBtn = headerBtns[2]
const saveBtn = headerBtns[3]

let id, titolo, categoria, lingua, autori, anno, prezzo
let detailsIndex = 0

//avvio
listViewBtn.classList.add("active")

let bookstore = localStorage.getItem("bookstore")

if(!bookstore)
{
    bookstore = datiIniziali
}

const parser = new DOMParser();

const xmlDoc = parser.parseFromString(bookstore, "text/xml")


const xmlRoot = xmlDoc.firstElementChild
LoadBooks()

detailsViewBtn.addEventListener("click", vistaDettagli)
listViewBtn.addEventListener("click", vistaLista)
addViewBtn.addEventListener("click", vistaAggiungi)


function LoadBooks(){
    tBody.innerHTML = ""
    for (const book of xmlRoot.children) {
        readFields(book)
        let td
        let tr = document.createElement("tr")
        tBody.append(tr)

        td = document.createElement("td")
        td.textContent = id
        tr.append(td)

        td = document.createElement("td")
        td.textContent = titolo
        tr.append(td)

        td = document.createElement("td")
        td.textContent = categoria
        tr.append(td)

        td = document.createElement("td")
        td.textContent = lingua
        tr.append(td)

        td = document.createElement("td")
        td.textContent = autori
        tr.append(td)

        td = document.createElement("td")
        td.textContent = anno
        tr.append(td)

        td = document.createElement("td")
        td.textContent = prezzo
        tr.append(td)

        td = document.createElement("td")
        let btn = document.createElement("button")
        btn.textContent = "Delete"
        td.append(btn)
        tr.append(td)
    }
}

function loadDetails(){
    details.innerHTML = ""
    if(xmlRoot.children.length > 0){
        const book = xmlRoot.children[detailsIndex]
        readFields(book)
        createDetailLine("Id", id)
        createDetailLine("Titolo", titolo)
        createDetailLine("Categoria", categoria)
        createDetailLine("Lingua", lingua)
        createDetailLine("Autori", autori)
        createDetailLine("Anno", anno)
        createDetailLine("Prezzo", prezzo)
    }
}

function createDetailLine(key, value){
    let lbl = document.createElement("label")
    lbl.textContent = key
}

function readFields(book){
    id = book.getElementsByTagName("id")[0].textContent
    titolo = book.querySelector("title").textContent
    categoria = book.getAttribute("category")
    lingua = book.querySelector("title").getAttribute("lang")
    autori = ""
    for (const author of book.getElementsByTagName("author")) {
        autori += author.textContent + "-"
    }
    autori = autori.substring(0, autori.length - 3)
    anno = book.getElementsByTagName("year")[0]?.textContent || ""
    console.log(anno)
    prezzo = book.querySelector("price")?.textContent
}

function vistaDettagli(){
    resetDivs()
    detailsView.style.display = ""
    detailsViewBtn.classList.add("active")
}

function vistaLista(){
    resetDivs()
    listView.style.display = ""
    listViewBtn.classList.add("active")
}

function vistaAggiungi(){
    resetDivs()
    addView.style.display = ""
    addViewBtn.classList.add("active")
}

function resetDivs(){
    for (const div of container.children) {
        div.style.display = "none"
    }
    for (const btn of headerBtns) {
        btn.classList.remove("active")
    }
}