'use strict'

let wrapper = document.querySelector("#wrapper");
let btns = document.querySelectorAll("#buttons input[type=button]");


for (const btn of btns) {
    btn.addEventListener("click", GestioneButton)
}

// funzione di visualizzazione richiamata dall'html
function evidenzia(selector){
	
}



// GESTIONE PULSANTI

function GestioneButton(){
    if(this.matches(":nth-of-typeof(1)")){
        ContaElementi()
    }
    if(this.matches(":nth-of-typeof(2)")){
        VisualizzaTesti()
    }
    if(this.matches(":nth-of-typeof(3)")){
        SfondoGialloEven()
    }
    if(this.matches(":nth-of-typeof(4)")){
        SfondoVerdeOddCrescente()
    }
}


function ContaElementi(){

}

function VisualizzaTesti(){

}

function SfondoGialloEven(){

}

function SfondoVerdeOddCrescente(){
    let vet = Array.from(document.querySelectorAll('#wrapper li'))
    let luminosità = 50
    for (const item of vet) {
        if(item.matches(":nth-of-type(odd)")){
            item.style.backgroundColor = `rgb(0, ${luminosità}, 0)`
            luminosità += 50
        }
    }
}