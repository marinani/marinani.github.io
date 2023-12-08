
window.addEventListener('DOMContentLoaded', function () {
   
  // Esconde o preloader
document.getElementById('preloader').style.display = 'none';

  
  const elementos = document.querySelectorAll('.flutuar');

 
  elementos.forEach(teste => {
    teste.addEventListener('mouseover', () => {
        teste.style.transform = 'translateX(50px)'; /* Move o elemento para a direita */
    });
  
    teste.addEventListener('mouseout', () => {
        teste.style.transform = 'translateX(0)'; /* Retorna o elemento à posição original */
    });
  });

   /* Fim Itens sobre */


 /* Inicio rotacao imagem preta e branca */

  // const blackwhiteImg = document.querySelector('.black-and-white');

  // blackwhiteImg.addEventListener('mouseenter', () => {
  //   blackwhiteImg.classList.add('rotacionado');
  // });
  
  // blackwhiteImg.addEventListener('mouseleave', () => {
  //   blackwhiteImg.classList.remove('rotacionado');
  // });

 /* Fim rotacao imagem preta e branca */


 const titulo = document.querySelector('h1');

/* Inicio Itens sobre */
const elemento = document.getElementById('elemento');

  function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
      setTimeout(() => elemento.innerHTML += letra, 75 * i);
    });
    
  }

  typeWriter(titulo);
  
  const menu=document.querySelector(".menu");
  const toggle=document.querySelector(".toggle");
  toggle.addEventListener("click",()=>{
    menu.classList.toggle("active");
  })

  

  
  });
