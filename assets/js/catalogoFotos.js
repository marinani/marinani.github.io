
let indiceAtual = 0;


// Defina as imagens em um array
const imagens = [
    "assets/img/portfolio/portfolio-0.png",
    "assets/img/portfolio/portfolio-1.png",
    "assets/img/portfolio/portfolio-2.png",
    "assets/img/portfolio/portfolio-3.png",
    "assets/img/portfolio/portfolio-4.png",
    "assets/img/portfolio/portfolio-5.png",
    "assets/img/portfolio/portfolio-6.png",
    "assets/img/portfolio/portfolio-7.png"
      ];
    


function expandirImagem(imagem) {
    const imagemExpandida = document.getElementById('imagem-expandida');
    imagemExpandida.src = imagem.src;
    const altDaImagemExpandida = imagem.getAttribute('alt');

    const numero = parseInt(altDaImagemExpandida);
    indiceAtual = numero;

    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.imagem-expandida').style.display = 'block';
    obterIndiceDaImagemExpandida(imagem);
  }

  function fecharImagem() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.imagem-expandida').style.display = 'none';
  }


// Função para exibir a imagem com base no índice
function exibirImagem(indice) {
    const imagemExpandida = document.getElementById('imagem-expandida');
    imagemExpandida.src = imagens[indice];
  }
  
function fecharImagem() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.imagem-expandida').style.display = 'none';
   }


  // Função para carregar a próxima imagem
function proximaImagem() {
    // Verifica se ainda há imagens para mostrar
    if (indiceAtual < (imagens.length -1)) {
      // Avança para a próxima imagem
      indiceAtual++;
      exibirImagem(indiceAtual);
    }
    else {
       indiceAtual =0;
      //Se for a ultima imagem, volta para a primeira posição (no caso imagem)
      exibirImagem(0);
  
    }
  }
  
  // Função para obter o índice da imagem expandida
  function obterIndiceDaImagemExpandida(imagem) {
  const altDaImagemExpandida = imagem.getAttribute('alt');
  const numero = parseInt(altDaImagemExpandida);
  indiceAtual = numero;
  return numero;
  }
  
  
  function anteriorImagem() {
    if (indiceAtual > 0) {
      // Retrocede para a imagem anterior
      indiceAtual--;
      exibirImagem(indiceAtual);
    }
    else {
      //Se estiver na primeira foto do catalogo, ele volta para a ultima foto
      indiceAtual = imagens.length -1; 
      exibirImagem(indiceAtual);
    }
  }


  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      // A tecla "Right" foi pressionada, você pode adicionar o código de clique aqui
      // Por exemplo, dispare um evento de clique em um elemento específico
      var botaoProximaFoto = document.querySelector('.proximo');
      if (botaoProximaFoto) {
        botaoProximaFoto.click();
      }
    }
    if (event.key === 'ArrowLeft') {
        // A tecla "Left" foi pressionada, você pode adicionar o código de clique aqui
        // Por exemplo, dispare um evento de clique em um elemento específico
        var botaoFotoAnterior = document.querySelector('.anterior');
        if (botaoFotoAnterior) {
            botaoFotoAnterior.click();
        }
      }
  });