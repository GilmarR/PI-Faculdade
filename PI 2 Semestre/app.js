class Compra {
	constructor(nomeProduto, precoProduto, tamanhoP, tamanhoM, tamanhoG, tamanhoGG) {
		this.nomeProduto = nomeProduto
		this.precoProduto = precoProduto
		this.tamanhoP = tamanhoP
		this.tamanhoM = tamanhoM
		this.tamanhoG = tamanhoG
		this.tamanhoGG = tamanhoGG
	}
}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0 )
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(c) {
	let id = this.getProximoId()

	localStorage.setItem(id, JSON.stringify(c))

	localStorage.setItem('id', id)
	}

	recuperarListaCompra() {

		let compras = Array()

		let id = localStorage.getItem('id')

		for(let i = 1; i <= id; i++) {

			let compra = JSON.parse(localStorage.getItem(i))

			if(compra === null) {
				continue
			}

			compra.id = i
			compras.push(compra)
		}

		return compras
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastraCompra() {
	window.location.href = 'carrinho.html'

	let nomeProduto = document.getElementById('nomeProduto')
	let precoProduto = document.getElementById('precoProduto')
	let tamanhoP = document.getElementById('tamanhoP')
	let tamanhoM = document.getElementById('tamanhoM')
	let tamanhoG = document.getElementById('tamanhoG')
	let tamanhoGG = document.getElementById('tamanhoGG')

	let compra = new Compra(	
		nomeProduto.innerHTML,
		precoProduto.innerHTML,
		tamanhoP.value,
		tamanhoM.value,
		tamanhoG.value,
		tamanhoGG.value,
	)

	bd.gravar(compra)
}

function carregarListaCompra() {
	let compras = Array()

	compras = bd.recuperarListaCompra()

	let listaCompra = document.getElementById('listaCompra')

	compras.forEach(function(c) {

		let linha = listaCompra.insertRow()

		linha.insertCell(0).innerHTML = c.nomeProduto
		linha.insertCell(1).innerHTML = c.precoProduto
		linha.insertCell(2).innerHTML = c.tamanhoP
		linha.insertCell(3).innerHTML = c.tamanhoM
		linha.insertCell(4).innerHTML = c.tamanhoG
		linha.insertCell(5).innerHTML = c.tamanhoGG

		let valorTotal = (Number(c.tamanhoP) + Number(c.tamanhoM) + Number(c.tamanhoG) + Number(c.tamanhoGG)) * Number(c.precoProduto);
		let vTotal = valorTotal.toFixed(2);	

		linha.insertCell(6).innerHTML = vTotal

		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${c.id}`
		btn.onclick = function() {
			let id = this.id.replace('id_despesa_', '')

			bd.remover(id)

			window.location.reload()
		}
		linha.insertCell(7).append(btn)

		console.log(c)

		 $(function(){

	    var total = 0;

	    $('table tbody tr td:nth-child(7)').each(function() {
	      total += parseFloat($( this ).text());
	    });
	     document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);
	    
	  })
	})
}


/*-----------------------------------------------------------------
						  Validar login
-----------------------------------------------------------------*/


var usuarios = [
    {"login": "admin", "senha": "admin"},
    {"login": "mamae", "senha": "abacaxi"},
    {"login": "papai", "senha": "melancia"},
];

function Login() {
    var usuario = document.getElementsByName('usuario')[0].value.toLowerCase();
    var senha = document.getElementsByName('senha')[0].value;

    	document.getElementById('checkLogin1').className = ''
        document.getElementById('usuarioIncorreto').className = ''
        document.getElementById('usuarioIncorreto').innerHTML = ''
        document.getElementById('checkLogin2').className = ''
        document.getElementById('senhaIncorreta').className = ''
        document.getElementById('senhaIncorreta').innerHTML = ''

    for (var u in usuarios) {
        var us = usuarios[u];
        if (us.login === usuario && us.senha === senha) {
            window.location.href = 'Index.html'
        } else if ( us.login != usuario && us.senha === senha) {
        	document.getElementById('checkLogin1').className = 'border-bottom border-danger'
        	document.getElementById('usuarioIncorreto').className = 'text-danger ml-4'
        	document.getElementById('usuarioIncorreto').innerHTML = 'Login Incorreto'
        	document.getElementById('checkLogin2').className = 'border-bottom border-success'
        } else if ( us.login === usuario && us.senha != senha) {
        	document.getElementById('checkLogin1').className = 'border-bottom border-success'
        	document.getElementById('checkLogin2').className = 'border-bottom border-danger'
        	document.getElementById('senhaIncorreta').className = 'text-danger ml-4'
        	document.getElementById('senhaIncorreta').innerHTML = 'Senha Incorreta'
        } 
    }
    return false
}






