var jogadores = [];

function gerarNumerosAleatorios(quantidade, min, max) {
  if (quantidade > (max - min + 1)) {
    console.log("Intervalo insuficiente...");
    return;
  }

  var numeros = [];

  while (numeros.length < quantidade) {
    var aleatorio = Math.floor(Math.random() * (max - min + 1) + min);

    if (!numeros.includes(aleatorio)) {
      numeros.push(aleatorio);
    }
  }

  return numeros;
}

function gerarCartela() {
  var nomeJogador = prompt('Digite o nome do jogador');

  var cartela = [
    gerarNumerosAleatorios(5, 1, 15),
    gerarNumerosAleatorios(5, 16, 30),
    gerarNumerosAleatorios(5, 31, 45),
    gerarNumerosAleatorios(5, 46, 60),
    gerarNumerosAleatorios(5, 61, 75)
  ];

  jogadores.push({
    nomeJogador: nomeJogador,
    cartela: cartela
  });

  desenharCartela(nomeJogador, cartela);

  console.log(jogadores);
}

function reiniciarJogo() {
  jogadores = [];
  location.reload();
}

function desenharCartela(nome, cartela) {
  var divCartelas = document.getElementsByClassName('cartelas')[0];

  var divJogador = document.createElement('div');
  divJogador.classList.add('cartela');

  var nomeJogadorElement = document.createElement('h4');
  nomeJogadorElement.innerText = nome;

  divJogador.appendChild(nomeJogadorElement);

  var tabela = document.createElement('table');
  tabela.classList.add('tabela-cartela');

  var thead = document.createElement('thead');
  var thB = document.createElement('th');
  thB.innerText = 'B';
  var thI = document.createElement('th');
  thI.innerText = 'I';
  var thN = document.createElement('th');
  thN.innerText = 'N';
  var thG = document.createElement('th');
  thG.innerText = 'G';
  var thO = document.createElement('th');
  thO.innerText = 'O';

  thead.appendChild(thB);
  thead.appendChild(thI);
  thead.appendChild(thN);
  thead.appendChild(thG);
  thead.appendChild(thO);

  tabela.appendChild(thead);

  for (var i = 0; i < 5; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 5; j++) {
      var td = document.createElement('td');
      if (i === 2 && j === 2) {
        td.innerText = 'X';
        td.classList.add('marcado');
      } else {
        td.innerText = cartela[j][i];
      }
      tr.appendChild(td);
    }
    tabela.appendChild(tr);
  }

  divJogador.appendChild(tabela);
  divCartelas.appendChild(divJogador);
}

function jogarBingo() {
    var numerosSorteados = gerarNumerosAleatorios(75, 1, 75);
    var index = 0;
  
    var numerosDiv = document.createElement('div');
    numerosDiv.classList.add('numeros-sorteados');
  
    var body = document.querySelector('body');
    body.appendChild(numerosDiv);
  
    var intervalId = setInterval(function () {
      if (index < numerosSorteados.length) {
        var numeroSorteado = numerosSorteados[index];
        atualizarCartelas(numeroSorteado);
        exibirNumeroSorteado(numeroSorteado, numerosDiv);
        verificarVencedor();
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  }
function atualizarCartelas(numero) {
  var cartelas = document.getElementsByClassName('cartela');

  for (var i = 0; i < cartelas.length; i++) {
    var numeros = cartelas[i].querySelectorAll('td');
    for (var j = 0; j < numeros.length; j++) {
      if (numeros[j].innerText === numero.toString()) {
        numeros[j].classList.add('marcado');
      }
    }
  }
}

function exibirNumeroSorteado(numero, numerosDiv) {
    var numeroSorteadoSpan = document.createElement('span');
    numeroSorteadoSpan.innerText = numero;
    numerosDiv.appendChild(numeroSorteadoSpan);
  }

function verificarVencedor() {
    for (var i = 0; i < jogadores.length; i++) {
      var jogador = jogadores[i];
      var cartela = jogador.cartela;
      var vencedor = true;
  
      for (var coluna = 0; coluna < 5; coluna++) {
        var marcados = 0;
        for (var linha = 0; linha < 5; linha++) {
          if (
            cartela[coluna][linha] !== 'X' &&
            document
              .getElementById('bingo')
              .querySelectorAll('.cartela')[i]
              .querySelectorAll('td')[linha * 5 + coluna]
              .classList.contains('marcado')
          ) {
            marcados++;
          }
        }
  
        if (marcados === 5) {
            jogador.venceu = true; // Marcar o jogador como vencedor
            alert('BINGO! O jogador ' + jogador.nomeJogador + ' venceu!');
            return;
          }
        }
    
        for (var linha = 0; linha < 5; linha++) {
          var marcados = 0;
          for (var coluna = 0; coluna < 5; coluna++) {
            if (
              cartela[coluna][linha] !== 'X' &&
              document
                .getElementById('bingo')
                .querySelectorAll('.cartela')[i]
                .querySelectorAll('td')[linha * 5 + coluna]
                .classList.contains('marcado')
            ) {
              marcados++;
            }
          }
    
          if (marcados === 5) {
            jogador.venceu = true; // Marcar o jogador como vencedor
            alert('BINGO! O jogador ' + jogador.nomeJogador + ' venceu!');
            return;
          }
        }
    
        var marcadosDiagonal1 = 0;
        var marcadosDiagonal2 = 0;
    
        for (var diagonal = 0; diagonal < 5; diagonal++) {
          if (
            cartela[diagonal][diagonal] !== 'X' &&
            document
              .getElementById('bingo')
              .querySelectorAll('.cartela')[i]
              .querySelectorAll('td')[diagonal * 5 + diagonal]
              .classList.contains('marcado')
          ) {
            marcadosDiagonal1++;
          }
    
          if (
            cartela[diagonal][4 - diagonal] !== 'X' &&
            document
              .getElementById('bingo')
              .querySelectorAll('.cartela')[i]
              .querySelectorAll('td')[diagonal * 5 + (4 - diagonal)]
              .classList.contains('marcado')
          ) {
            marcadosDiagonal2++;
          }
        }
    
        if (marcadosDiagonal1 === 5 || marcadosDiagonal2 === 5) {
          jogador.venceu = true; // Marcar o jogador como vencedor
          alert('BINGO! O jogador ' + jogador.nomeJogador + ' venceu!');
          return;
        }
      }
    
      // Verificar se há um vencedor após cada número sorteado
      var todosVencedores = jogadores.every(function (jogador) {
        return jogador.venceu;
      });
    
      if (todosVencedores) {
        alert('O jogo acabou. Todos os jogadores venceram!');
      }
    }