 "use strict"

// all'avvio nascondo carrello e detailsContainer assegnado max-height:0
cartContainer.style.maxHeight=0;
detailsContainer.style.maxHeight=0;
const database = JSON.parse(data)
AggiungiArticoli()

/* Per visualizzarli assegnare */
// cartContainer.style.maxHeight = cartContainer.scrollHeight + "px"
// detailsContainer.style.maxHeight = detailsContainer.scrollHeight + "px"
/* da fare SOLO DOPO aver riempito dinamicamente il contenitore */


 /* ***** */


// elenco degli articoli presenti nel carrello
let carrello = []
let contAggiunte = 0
let qta=1
let oggetto = []
let apri = true

const detailsBody = document.getElementsByClassName("details-body")[0]
const detailsClose = document.getElementsByClassName("details-close")[0]
const chiudi = detailsClose.getElementsByTagName("span")[0]
const tabella = document.getElementsByTagName("tbody")[0]

chiudi.addEventListener("click", ChiudiDettagli)

btnCarrello.addEventListener("click", ApriCarrello)

function AggiungiArticoli(){
    database.forEach((prodotto,i) => {
        let articolo = document.createElement("div")
        articolo.id = "article-"+(i+1)
        articolo.classList.add("article")
        elencoArticoli.append(articolo)

        let img = document.createElement("img")
        img.classList.add("articleImage")
        img.src = `./img/${prodotto.src}`
        img.title = "Aggiungi al carrello"
        img.addEventListener("click", function(){
            VisualizzaDettagli(prodotto)
        })
        articolo.append(img)

        let div = document.createElement("div")
        div.classList.add("articleName")
        div.textContent = prodotto.name
        articolo.append(div)
    });
}

function VisualizzaDettagli(prodotto){
    detailsBody.innerHTML = ""
    let img = document.createElement("img")
    img.src = `./img/${prodotto.src}`
    img.classList.add("detail-img")
    detailsBody.append(img)
    
    let div = document.createElement("div")
    div.classList.add("detail-info")
    detailsBody.append(div)

    let p = document.createElement("p")
    p.textContent = prodotto.name
    p.classList.add("item-title")
    div.append(p)
    
    p = document.createElement("p")
    p.textContent = prodotto.description
    div.append(p)

    p = document.createElement("p")
    p.textContent = "$"+prodotto.price
    div.append(p)

    let btn = document.createElement("button")
    btn.id = "btnAdd"
    btn.textContent = "AGGIUNGI AL CARRELLO"
    btn.addEventListener("click", function(){
        AggiungiAlCarrello(prodotto)
    })
    div.append(btn)

    detailsContainer.style.maxHeight = detailsContainer.scrollHeight+"px"
}

function ChiudiDettagli(){
    detailsBody.innerHTML = ""
  detailsContainer.style.maxHeight=0;   
}

function ApriCarrello(){
    if(apri)
        btnCarrello.innerHTML = "&#708 Chiudi Carrello"
    else
        btnCarrello.innerHTML = "&#709 Apri Carrello"
    apri = !apri
    let n = 0

    let tr = document.createElement("tr")
    tabella.append(tr)

    let th = document.createElement("th")
    th.textContent = oggetto[n++][0]  
    th.style.width = 30%
    tr.append(th)
    
    th = document.createElement("th")
    th.textContent = oggetto[n++][1]
    th.style.width = 30%
    tr.append(th)
    
    th = document.createElement("th")
    th.textContent = oggetto[n++][2]
    th.style.width = 30%
    tr.append(th)

    th = document.createElement("th")
    let img = document.createElement("img")
    img.src = "./img/_cestino.png"
    th.append(img)
    tr.append(th)

    cartContainer.style.maxHeight = cartContainer.scrollHeight + "px"
}


function AggiungiAlCarrello(prodotto){
    if(contAggiunte==0){
        oggetto = [prodotto.name, prodotto.price, 1]
        carrello[contAggiunte++] = oggetto
    }else{
        console.log("entra")
        oggetto.forEach((e,i) => {
            if(oggetto[i][0] == prodotto.name){
                oggetto[i].qta++
            }
        })
        console.log("esce")
    }
    console.log(carrello)
}