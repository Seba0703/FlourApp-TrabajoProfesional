function validateChar(e) {
	//console.log("validando= " + e.charCode);
	return ((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 0)
}

function validarCondPago(e) {
	//console.log("validandoC= " + e.charCode);
	//console.log("validandoK= " + e.keyCode);
	return (validateChar(e) || e.charCode == 45)
}