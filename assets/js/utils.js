window.addEventListener('DOMContentLoaded', function () {
   

  
    const elemento = document.getElementById('elemento');
    const elementos = document.querySelectorAll('.flutuar');
  
  elemento.addEventListener('mouseover', () => {
    elemento.style.transform = 'translateX(50px)'; /* Move o elemento para a direita */
  });
  
  elemento.addEventListener('mouseout', () => {
    elemento.style.transform = 'translateX(0)'; /* Retorna o elemento à posição original */
  });

 
  elementos.forEach(teste => {
    teste.addEventListener('mouseover', () => {
        teste.style.transform = 'translateX(50px)'; /* Move o elemento para a direita */
    });
  
    teste.addEventListener('mouseout', () => {
        teste.style.transform = 'translateX(0)'; /* Retorna o elemento à posição original */
    });
  });


  const imagem = document.querySelector('.black-and-white');

  imagem.addEventListener('mouseenter', () => {
    imagem.classList.add('rotacionado');
  });
  
  imagem.addEventListener('mouseleave', () => {
    imagem.classList.remove('rotacionado');
  });


  function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
      setTimeout(() => elemento.innerHTML += letra, 75 * i);
    });
    
  }


  const titulo = document.querySelector('h1');
 // const welcome = document.getElementById('boas-vindas');
  typeWriter(titulo);

  
//   typeWriter(welcome);

//  const inicio = document.getElementById('inicio');

//   setTimeout(function() {
   
//     inicio.classList.remove('hidden');

//     if (!welcome.classList.contains('hidden')) {
//       welcome.classList.add('hidden');
//     }

//   }, 3000);

  
  const menu=document.querySelector(".menu");
  const toggle=document.querySelector(".toggle");
  toggle.addEventListener("click",()=>{
    menu.classList.toggle("active");
  })
  
  });

  // Quando a janela estiver completamente carregada
window.addEventListener('load', function() {
    // Esconde o preloader
    document.getElementById('preloader').style.display = 'none';
    
});