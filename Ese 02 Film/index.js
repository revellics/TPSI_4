"use strict"

const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];

let tBody = document.getElementsByTagName("tbody")[0];

for (const film of films) {
    let row = document.createElement("tr")
    tBody.appendChild(row)
    for (let i=0; i<film.length; i++) {
        const field = film[i]
        let cell = document.createElement("td")
        row.appendChild(cell)
        if(i==2){
            //è il campo preferito
            createPreferitoInnerHTML(cell, field)
           
        } else if(i==4){
            //altro campo
            createRatingInnerHTML(cell, field)

        } else{
            cell.innerHTML = field
        }
    }
}

function createPreferitoInnerHTML(cell, field){
    let check = document.createElement("input")
    check.type = "checkbox"
    check.disabled = true
    check.checked = field
    cell.appendChild(check)
}

function createRatingInnerHTML(cell, ratingValue){
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i")
        if (i<ratingValue) {
            star.classList.add("bi", "bi-star-fill")
        } else {
            star.classList.add("bi", "bi-star")
        }
        cell.appendChild(star)
    }
}