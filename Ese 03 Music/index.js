"use strict"

const content = document.getElementById("content")
const genderElements = document.querySelectorAll(".dropdown-menu li");
for (let genderElement of genderElements){
	genderElement.addEventListener("click", genderClick)
}		
	
const playModal = document.getElementById("play-modal")
const songTitleModal = document.getElementById("song-title-modal")

const iFriends = document.getElementById("i-friends");
iFriends.addEventListener("click", showAlert);
const alertFriends = document.getElementById("alert-friends");

const iSearch = document.getElementById("i-search");
iSearch.addEventListener("click", toggleSearch);
const txtSearch = document.getElementById("txt-search");
	
loadSongs();

function loadSongs(genre){
	content.innerHTML=""
	const h3 = document.createElement("h3")
	content.appendChild(h3)
	let cont=0
	for (const song of songs) {
		if(genre == undefined || genre == "All" || song[5] == genre){
			cont++
			const row = document.createElement("div")
			row.classList.add("row", "border", "rounded", "p-2", "m-2")
			content.append(row)
			const col1 = document.createElement("div")
			col1.classList.add("col-mid-4", "col-xl-3")
			const col2 = document.createElement("div")
			col2.classList.add("col-mid-8", "col-xl-9")
			row.append(col1, col2)
			const img = document.createElement("img")
			img.classList.add("w-100", "rounded")
			img.src = "./img/cover"+song[0]+".jpg"
			col1.append(img)
			const h2 = document.createElement("h2")
			h2.textContent = song[0]+" - "+song[1]
			col2.append(h2)
			let h5 = document.createElement("h5")
			h5.textContent = "Artist: "+ song[2]
			col2.append(h5)
			
			h5 = document.createElement("h5")
			h5.textContent = "Album: "+ song[3]
			col2.append(h5)
			
			h5 = document.createElement("h5")
			const min = Math.floor(song[4]/60)
			const sec = song[4]%60
			h5.textContent = "Duration: "+ min+"m "+sec+"s"
			col2.append(h5)
			
			h5 = document.createElement("h5")
			h5.textContent = "Streams: "+ song[6].toLocaleString()
			col2.append(h5)
			
			const btn = document.createElement("button")
			btn.classList.add("btn", "btn-secondary")
			btn.textContent = "Play"
			btn.addEventListener("click", function(){})
			col2.append(btn)
		}
	}
	h3.textContent = "Numero di canzoni: "+ cont
}

function genderClick(){
	for (let genderElement of genderElements) {
		genderElement.firstElementChild.classList.remove("active")
	}
	this.children[0].classList.add("active")
	loadSongs(this.textContent)
}

function showAlert(){
	
}

function toggleSearch(){

}