
function enviar(){
	
	if (document.getElementById('rbTipoPessoaPF').checked === false && document.getElementById('rbTipoPessoaPJ').checked === false){

		alert("Verifique o tipo de documento");
		erro();
	
	}else{

		if ($.isNumeric($("#txtTelefone").val().replace(/[^\d]+/g,'')) === false){
			alert("Telefone Invalido");
			$("#txtTelefone").focus();
			return false;
		}

		if (document.getElementById('rbTipoPessoaPF').checked === true){

			if (validarCPF(txtCPF_CNPJ.value) === false){
				alert ("CPF Invalido");
				erro();			
			}else{			
				printaConsole();			
			}		 

		}else{
			
			if (validarCNPJ(txtCPF_CNPJ.value) === false){
				alert ("CNPJ Invalido");
				erro();			
			}else{
				printaConsole();				
			}
		}
	}
}

function erro(){

	$('Form').submit(function(e) {e.preventDefault();});
	$("#txtCPF_CNPJ").val('');

}

function printaConsole(){

	var txtNome = document.getElementById('txtNome').value;
	var txtCPF_CNPJ = document.getElementById('txtCPF_CNPJ').value;
	var txtTelefone = document.getElementById('txtTelefone').value;
	var arquivos = document.querySelectorAll('.thumb');
	var strArquivos = "";

	for (var i = 0; i < arquivos.length; i++) {
		strArquivos = strArquivos + arquivos[i].title + " | ";
	}

	console.log('Nome: ' + txtNome + '\n');
	console.log('Doc: '+ txtCPF_CNPJ +'\n');
	console.log('Telefone: '+ txtTelefone + '\n');
	console.log('Imagens: ' + strArquivos + '\n')

	alert ("Cliente cadastrado com sucesso!!!");
	
	window.location.reload(true);
}

function verificaDocumento(){

	var elemento = document.getElementById('txtCPF_CNPJ');

	$("#txtCPF_CNPJ").val('');
	$("#txtCPF_CNPJ").focus();

	if (document.getElementById('rbTipoPessoaPF').checked === true){

		elemento.placeholder = "Digite o CPF";
		$("#txtCPF_CNPJ").mask("999.999.999-99");

	}else{

		elemento.placeholder = "Digite o CNPJ";
		$("#txtCPF_CNPJ").mask("99.999.999/9999-99");

	}

}

//Mascaras
function formataFone(){	

	var VerificaFixoCelular = document.getElementById('txtTelefone').value.substring(2,3);
	var V = document.getElementById('txtTelefone').value.length

	if (VerificaFixoCelular === "" || V <= 3){

		if ($.isNumeric($("#txtTelefone").val().replace(/[^\d]+/g,'')) === false){

			//document.getElementById('txtTelefone').value ='';			
			//$("#btnEnviar").focus();
			$("#txtTelefone").focus();

		}

		return false;
	}
	else{

		if ($.isNumeric($("#txtTelefone").val().replace(/[^\d]+/g,'')) === false) {
			
			//document.getElementById('txtTelefone').value ='';
			//$("#btnEnviar").focus();
			$("#txtTelefone").focus();

		}else{

			if (VerificaFixoCelular === "9") {				

				$("#txtTelefone").mask("(99)99999-9999");				
				
			}else{			

				$("#txtTelefone").mask("(99)9999-9999");
				
			}
		}		            
	}
}
	

function validarCPF(inputCPF){
    var soma = 0;
    var resto;
    inputCPF = inputCPF.replace(/[^\d]+/g,'');


    if(inputCPF == '00000000000') return false;
    for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function handleFileSelect(evt) {
    
    var files = evt.target.files; 

    for (var i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

        reader.onload = (function(theFile) {
        return function(e) {  
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      reader.readAsDataURL(f);
    }
 }

document.addEventListener("DOMContentLoaded", function(event) { 
  	document.getElementById('files').addEventListener('change', handleFileSelect, false);
});
 
//alert ("Olá!!!" + '\n' + "Fique a vontade para selecionar multiplas imagens");

$(document).ready(function() {
	bootbox.alert({
    message: "Ola...." + '\n' + "Fique a vontade para selecionar multiplas imagens",
    className: 'bb-alternate-modal'
	});
});


