"use strict";
	
let txtData1 = document.getElementById("txtData1");
let txtData2 = document.getElementById("txtData2");
let button = document.getElementsByTagName("button")[0];
let log = document.getElementById("log");

assegnaDataAlTagInput()
button.addEventListener("click", leggiDataDalTagInput)



function assegnaDataAlTagInput(){
	let dataCorrente = new Date()
    //1 soluzione, si asseggna direttamente l'oggetto
    //  uso valueAsDate che vale solo per le date (e non datetime)
    //txtData1.valueAsDate = dataCorrente

    //2 soluzione, converti l'oggetto date in stringa con .value
    let aus = dataCorrente.toISOString().substring(0,10)
    console.log(aus)
    txtData1.value = aus

    dataCorrente.setMinutes(dataCorrente.getMinutes() - dataCorrente.getTimezoneOffset())
    txtData2.value = dataCorrente.toISOString().substring(0,16)
}


function leggiDataDalTagInput(){
    log.innerHTML = ""

    log.innerHTML += txtData1.value + "<br>"
    log.innerHTML += txtData2.value + "<br><br>"

    let data1 = new Date(txtData1.value)
    let data2 = new Date(txtData2.value)

    log.innerHTML += data1 + "<br>"
    log.innerHTML += data2 + "<br><br>"

    //kobe's ISO
    
}
