/*jslint devel: true */

"use strict";

function soNumeros(str) {
    str = str.replace(/\.|\-|\s/g, "");
    return str;
}

function validarTamanho(str, min, max, campo) {
    if ((str.length >= min) && (str.length <= max)) {
        return true;
    } else {
        alert(campo + " " + "invalido");
        return false;
    }
}

function formatoCEP(str) {
    str.value = soNumeros(str.value).substring(0, 5) + "-" + soNumeros(str.value).substring(5, 8);
    return str.value;
}


function TestaCPF(strCPF) {
    var Soma, Resto, i;
    Soma = 0;
    
	if (strCPF == "00000000000") {
        return false;
    }
    
	for (i = 1; i <= 9; i += 1) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

/*
function validarRG(rg){

}*/

function validarCPF(str) {
    if (TestaCPF(str)) {
        return true;
    }
    alert("CPF invalido");
    return false;
}

function validateForm() {
    return validarTamanho(document.getElementById('nome').value, 2, 30, 'Nome') &&
        validarCPF(soNumeros(document.getElementById('cpf').value)) &&
        validarTamanho(soNumeros(document.getElementById('identidade').value), 5, 9, 'Identidade') && validarTamanho(soNumeros(document.getElementById('cep').value), 8, 8, 'CEP') &&
        validarTamanho(soNumeros(document.getElementById('fixo').value), 8, 8, 'Fixo') &&
        validarTamanho(soNumeros(document.getElementById('celular').value), 8, 9, 'Celular') &&
        validarTamanho(soNumeros(document.getElementById('ncartao').value), 16, 16, 'Cartão');
}

function formatoCPF(str) {
    var cpf = [ str.value.substring(0, 3),
                str.value.substring(3, 6),
                str.value.substring(6, 9),
                str.value.substring(9, 11)
              ];
    str.value = cpf[0] + "." + cpf[1] + "." + cpf[2] + "-" + cpf[3];
    return str.value;
}

/*** VALIDADORES DA PEÇA ****/

function ValidarNPeca(str) {
    if((str.length>=3) && (str.length<=30))
        return true;
    else {
        alert("Nome Inválido");
        return false;
    }
}

function ValidarPreco(str) {
    if((str>0) && (str<1000000))
        return true;
    else {
        alert("Preço Inválido");
        return false;
    }
}

function ValidarQtd(str) {
    if(str>-1)
        return true;
    else {
        alert("Quantidade Inválida");
        return false;
    }
}

function validateFormPiece() {
    return ValidarNPeca(document.getElementById('nomep').value) &&
        ValidarPreco(document.getElementById('preco').value) &&
        ValidarQtd(document.getElementById('qtd').value);
}