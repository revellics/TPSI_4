"use strict"

const navbarContent = document.getElementById("navbarContent");
const tbody = document.getElementsByTagName("tbody")[0];

const btnLogin = document.getElementById("btnLogin");
const alertLogin = document.getElementById("alert-login");
const btnCloseLogin = alertLogin.getElementsByTagName("button")[0];

btnLogin.addEventListener("click", showAlert);
btnCloseLogin.addEventListener("click", hideAlert);

const genreElements = document.querySelectorAll(".dropdown-menu li");
for (let genreElement of genreElements) {
    genreElement.addEventListener("click", genreClick)
}


const modalDettagli = new bootstrap.Modal("#modal-details")
const modalDettagliPointer = document.getElementById("modal-details")
const modalDettagliBody = modalDettagliPointer.querySelector(".card");

const modalNew = new bootstrap.Modal("#modal-add-newbook")
const modalNewPointer = document.getElementById("modal-add-newbook")
const modalNewBody = modalNewPointer.querySelector(".card");

visualizzaLibri("All")

function visualizzaLibri(genere) {
    tbody.innerHTML = "";
    biblioteca.forEach((libro, i) => {
        if (genere == "All" || libro[4] == genere) {
            const tr = document.createElement("tr");
            tbody.append(tr)

            const tdId = document.createElement("td")
            tdId.textContent = libro[0];
            const tdTitolo = document.createElement("td")
            tdTitolo.textContent = libro[1];
            const tdAutore = document.createElement("td")
            tdAutore.textContent = libro[2];
            const tdGenere = document.createElement("td")
            tdGenere.textContent = libro[4];
            const tdCopieVendute = document.createElement("td")
            tdCopieVendute.textContent = libro[6];
            if (libro[6] >= 100_000_000) {
                tdCopieVendute.textContent = "★★★★★";
            }
            else if (libro[6] >= 60_000_000) {
                tdCopieVendute.textContent = "★★★★☆";
            }
            else if (libro[6] >= 30_000_000) {
                tdCopieVendute.textContent = "★★★☆☆";
            }
            else if (libro[6] >= 1_000_000) {
                tdCopieVendute.textContent = "★★☆☆☆";
            }
            else {
                tdCopieVendute.textContent = "★☆☆☆☆";
            }

            const tdSerch = document.createElement("td")
            let i = document.createElement("i")
            i.classList.add("bi", "bi-search")
            i.addEventListener("click", function () {
                showModalDettagli(libro);
            })
            tdSerch.append(i)

            const tdTrash = document.createElement("td")
            i = document.createElement("i")
            i.classList.add("bi", "bi-trash")
            i.addEventListener("click", deleteBook)
            tdTrash.append(i)

            tr.append(tdId, tdAutore, tdTitolo, tdGenere, tdCopieVendute, tdSerch, tdTrash)
        }
    })
}

function showAlert() {
    alertLogin.classList.remove("d-none");
}

function hideAlert() {
    alertLogin.classList.add("d-none");
}

function genreClick() {
    const as = document.getElementsByClassName("dropdown-item")
    for (let a of as)
        a.classList.remove("active")

    this.children[0].classList.add("active");
    visualizzaLibri(this.textContent.trim())
}

function showModalDettagli(libro) {
    modalDettagliBody.innerHTML = "";

    const h2 = document.createElement("h2")
    h2.classList.add("text-center", "mb-3", "card-title")
    h2.textContent = libro[1];
    modalDettagliBody.append(h2);
    const img = document.createElement("img")
    img.src = "img/" + libro[7];
    img.alt = libro[1];
    img.classList.add("mx-auto", "mb-3", "d-block", "w-50")
    modalDettagliBody.append(img);
    const divBase = document.createElement("div")
    modalDettagliBody.append(divBase);

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
        input.value = libro[i]
        input.readOnly = true
        divCol2.append(input)
    }

    modalDettagli.show();
}



function showModalNew() {
    modalNew.show();
}

function saveBook() {
    const div = modalNewBody.children[0]
    const libri = []

    for (let i = 0; i < headers.length; i++) {
        libri.push(div.children[i].children[1].children[0].value)
    }

    biblioteca.push(libri)

    const as = document.getElementsByClassName("dropdown-item")
    for (let a of as)
        a.classList.remove("active")
    genreElements[0].children[0].classList.add("active");

    modalNew.hide();
    visualizzaLibri("All")
}

function deleteBook() {
    let index=this.parentElement.parentElement.children[0].textContent;
    biblioteca.forEach((libro, i) => {
        if(libro[0]==index){
            biblioteca.splice(i,1);
        }
    })

    this.parentElement.parentElement.remove();

}  