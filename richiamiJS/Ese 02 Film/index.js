"use strict"

const tbody = document.getElementsByTagName("tbody")[0]
const btnAdd = document.getElementById("btn-add")
const btnClear = document.getElementById("btn-clear")
const btnReload = document.getElementById("btn-reload")
const btnCount = document.getElementById("btn-count")
const spanFilm=document.getElementById("span-n-films")
const btnLogin=document.getElementById("btn-login")
const alertLogin=document.getElementById("alert-login")
const btnClose=alertLogin.getElementsByClassName("btn-close")[0]

const modal=new bootstrap.Modal("#modal-count-films")

btnAdd.addEventListener("click", addFilm)
btnClear.addEventListener("click", clearFilm)
btnReload.addEventListener("click", function(){
    window.location.reload()
})
btnCount.addEventListener("click", countFilm)
btnLogin.addEventListener("click", login)
btnClose.addEventListener("click", closeLogin)

let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];


popolaTbody()

function popolaTbody() {
    tbody.innerHTML = ""
    for (const film of films) {
        const tr = document.createElement("tr")
        tbody.append(tr)
        for (let i = 0; i < film.length; i++) {
            let cell = document.createElement("th")
            tr.append(cell)
            cell.innerHTML = film[i]
            if (i == 2) {
                cell.innerHTML = ""
                let chk = document.createElement("input")
                chk.type = "checkbox"
                chk.checked = film[i]
                chk.disabled = true
                cell.append(chk)
            }
            if (i == 4) {
                cell.innerHTML = ""
                for (let j = 0; j < 5; j++) {
                    let star = document.createElement("i")
                    if (j < film[4]) {
                        star.classList.add("bi", "bi-star-fill")
                    }
                    else {
                        star.classList.add("bi", "bi-star")
                    }
                    cell.append(star)
                }
            }
        }
    }
}

function addFilm() {
    let id = films.length + 1
    let title = prompt("Inserire il titolo del nuovo film ")
    let aus = random(0, 2)
    let favorite = Boolean(aus)
    let today = (new Date()).toLocaleDateString().replaceAll("/", "-")
    let rating = random(1, 6)

    let film = []
    film.push(id)
    film.push(title)
    film.push(favorite)
    film.push(today)
    film.push(rating)
    console.log(film)

    films.push(film)
    popolaTbody()
}

function clearFilm() {
    films = []
    popolaTbody()
}

function countFilm(){
    spanFilm.textContent=films.length
    modal.show()
}

function login(){
    // alertLogin.classList.remove("fade")
    alertLogin.classList.add("show")
    setTimeout(closeLogin, 3000);
}

function closeLogin(){
    // alertLogin.classList.add("fade")
    alertLogin.classList.remove("show")
}

function random(min, max){
    return (Math.floor((max-min)*Math.random())) + min
}