"use strict"


const content = document.getElementById("content")

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", showAlert);

const modalElement = document.getElementById("buy-modal");
const buyModal = new bootstrap.Modal(modalElement);

const alertSearch = document.getElementById("alert-search")

const categorie = document.querySelectorAll(".dropdown-item");

categorie.forEach(categoria => {
    categoria.addEventListener("click", function () {
        console.log(this.textContent);
        creaProdotti(this.textContent)
    });
});

creaProdotti()
function showAlert(){
    alertSearch.classList.remove("d-none")
    setInterval(function() {
        alertSearch.classList.add("d-none")
    }, 3000);
}


function creaProdotti(show = "All"){

    content.innerHTML = ""

    let numeroDiProdotti = 0;
    const h3 = document.createElement("h3")
    content.append(h3)

    const row = document.createElement("div")
    content.append(row)
    row.classList.add("row")
    console.log(show)

    switch (show) {
        case "PC":
            generale(pc,pc_header,"pc", row)
            numeroDiProdotti += pc.length
            break;
        case "Tv":
            generale(tv,tv_header,"tv", row)
            numeroDiProdotti += tv.length
            break;
        case "Telefoni":
            generale(telefoni,telefoni_header,"telefoni", row)
            numeroDiProdotti += telefoni.length
            break;
        case "Audio Player":
            generale(player,player_header,"player", row)
            numeroDiProdotti += player.length
            break;
        case "All":
            generale(pc,pc_header,"pc", row)
            generale(telefoni,telefoni_header,"telefoni", row)
            generale(tv,tv_header,"tv", row)
            generale(player,player_header,"player", row)
            numeroDiProdotti = pc.length + telefoni.length + tv.length + player.length;
            break;
        default:
            break;
    }
    h3.textContent = `Numero di Prodotti: ${numeroDiProdotti}`
}


function generale(pc, pc_header, path, row){
    let i = 0;
    for (const pcs of pc) {
        i++
        const col = document.createElement("div")
        col.classList.add("col-md-4")
        row.append(col)

        const card = document.createElement("div")
        card.classList.add("card", "shadow-lg", "border-0", "rounded-3")
        col.append(card)

        const img = document.createElement("img")
        img.src = `./img/${path}/img${i}.jpg`
        img.classList.add("card-img-top")
        card.append(img)

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        card.append(cardBody)

        const cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title")
        cardTitle.textContent = pcs[1]
        cardBody.append(cardTitle)

        const cardText = document.createElement("p")
        cardText.classList.add("card-text")
        let x = 2
        for (const headers of pc_header.slice(2,pc_header.length)) {
            cardText.innerHTML += `${headers}: ${pcs[x]}<br>`
            x++
        }
        cardBody.append(cardText)

        const buyButton = document.createElement("a")
        buyButton.classList.add("btn", "btn-secondary")
        buyButton.textContent = "Compra"
        buyButton.addEventListener("click", compra)
        cardBody.append(buyButton)
        
        
        function compra(){
            buyModal.show()
        }
    }
}