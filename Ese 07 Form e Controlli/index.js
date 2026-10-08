'use strict'
const form1 =  document.getElementById("form1")

const txt1 = form1.querySelector("input[type=text]")
const lst1 = form1.getElementsByTagName("select")[0]
const chks = form1.querySelectorAll("input[type=checkbox]")
const lst2 = form1.getElementsByTagName("select")[1]

// richiamato dall'html
function visualizza(index) {
	let msg = "";
	switch (index) {
      case 1:
		msg = txt1.value
		break;
    case 2:
		msg = lst1.value
		break;
    case 3: 
        for (let chk of chks){
			let value = chk.value
			if (value == "on")
				value = chk.parentElement.textContent.trim()
			msg += chk.name + " : " + value	+ "\n"	
		}
		break;
	case 4:
		// questo DEVE essere fatto qui perchè altrimenti :checked sarebbe vuoto
		const selectedChks = form1.querySelectorAll("input[type=checkbox]:checked")
		//for (let chk of selectedChks)
		//	msg += chk.name + " : " + chk.value	+ "\n"	
		selectedChks.forEach(function(item, i){
			msg += item.name + chk.dataset.index + " : " + item.value + "\n"
		});
		break;
	case 5:
		const notSelectedChks = form1.querySelectorAll("input[type=checkbox]:not(:checked)")
		notSelectedChks.forEach(function(item, i){
			msg += item.name + chk.getAttribute("data-index") + " : " + item.value + "\n"
		})
		break;
	case 6:
		// questo DEVE essere fatto qui perchè altrimenti :checked sarebbe vuoto
		const selectedRadio = form1.querySelector("input[type=radio]:checked")
		if(selectedRadio)
			msg += selectedRadio.name + selectedRadio.dataset.index + " : " + selectedRadio.value + "\n"
		else
			msg ="nessun elemento s4electeds"
		break;
	case 7:
		const notSelectedRadio = form1.querySelectorAll("input[type=checkbox]:not(:checked)")
		for (let opt of notSelectedRadio) {
			msg += opt.name + opt.dataset["data-index"] + " : " + opt.value + "\n"
		}
		break;
	case 8:
		for (const option of lst2.selectedOptions){
			msg += option.value + "\n"
		}
		if(!msg)
			msg = "nessun valore selezionato"
		break;
	}
	alert(msg);
}


function imposta(index){
	let valuta	
	switch(index){
		case 1:
			valuta = prompt("Inserisci un testo")
			txt1.value = valuta
			break;
		case 2:
			valuta = prompt("Inserisci il value della voce da selezionares")
			lst1.value = valuta
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
	}	 
}

