function imgSlider(img, nomeproduto, texto){
    const localImg = document.querySelector('.localImg');
    const descricao = document.querySelector('.descricao-produto');
  
    localImg.style.transform = `translateX(${100 * 10}%)`;
    descricao.style.opacity = 0; /* Esconde a descrição */
  
    setTimeout(function() {
      localImg.src = img;
      descricao.innerHTML = nomeproduto;

     if(texto == 'CSharp') {
        texto = 'C# is a strongly typed, multi-paradigm programming language developed by Microsoft as part of the .NET platform. Its object-oriented syntax was based on C++ but includes many influences from other programming languages, such as Object Pascal and, mainly, Java. The source code is compiled to Common Intermediate Language (CIL) which is interpreted by the Common Language Runtime (CLR) virtual machine. C# is one of the languages ​​designed to work on the Common Language Infrastructure of the .NET Framework platform.';
     }
     if(texto == 'Python') {
        texto = 'Python is a high-level, interpreted scripting, imperative, object-oriented, functional, dynamically typed, and strong programming language. It was launched by Guido van Rossum in 1991. It currently has a community development model, open and managed by the non-profit organization Python Software Foundation. Although various parts of the language have formal standards and specifications, the language as a whole is not formally specified. The standard in practice is the CPython implementation.';
     }
     if(texto == 'Javascript') {
        texto = 'JavaScript (often abbreviated as JS) is a structured, high-level scripting, weakly dynamically typed, multi-paradigm (prototyping, object-oriented, imperative, and functional) interpreted programming language. Along with HTML and CSS, JavaScript is one of the three main technologies of the World Wide Web. JavaScript enables interactive web pages and is therefore an essential part of web applications. The vast majority of websites use it, and all major browsers have a dedicated JavaScript engine to run it.';
     }
     if(texto == 'CSS3') {
        texto = 'CSS3 is the third newest version of the famous Cascading Style Sheets (or simply CSS), which allows you to define styles for a web project (internet page). With transition effects, image, background image and others, you can create unique styles for your web projects, changing different design aspects of the page layout.';
     }
     if(texto == 'HTML5') {
        texto = 'HTML5 (Hypertext Markup Language, version 5) is a markup language for the World Wide Web and is a key Internet technology, originally proposed by Opera Software. It is the fifth version of the HTML language. This new version brings with it important changes regarding the role of HTML in the world of the Web, through new features such as semantics and accessibility. It enables the use of new resources that were previously only possible with the application of other technologies. Its essence has been to improve the language with support for the latest multimedia, while keeping it easily readable by humans and consistently understood by computers and other devices (browsers, parsers, etc.). HTML5 will be the new standard for HTML, XHTML, and HTML DOM. Currently,[when?] it is in the draft phase, but several browsers already implement some of its features.'
     }
     if(texto == 'MSSQL') {
        texto = 'Microsoft SQL Server is a relational database management system (DBMS) developed by Sybase in partnership with Microsoft. This partnership lasted until 1994, with the launch of the Windows NT version and since then Microsoft has maintained the product.' +
        'As a Database, it is a software product whose main function is to store and retrieve data requested by other software applications, whether those on the same computer or those running on another computer over a network including the Internet.'
     }

      descricao.innerHTML += texto;
      // Aplica a transição desejada
      localImg.style.transform = 'translateX(0)';
      descricao.style.opacity = 1; /* Mostra a descrição */
      // Rolagem suave para o final da página
  window.scrollBy(0, window.innerHeight);
    }, 300); /* Aguarda 300 milissegundos para aplicar a transição após esconder a descrição */

  }
  
  function catalogoSlider(img,link){
    const foto = document.querySelector('.localFoto');
    var meuLink = document.getElementById("botao-imagem");
    foto.style.transform = `translateX(${100 * 20}%)`;
    meuLink.classList.add('hidden');
    //Altere o valor do atributo href
    meuLink.href = "https://" + link;
  
    setTimeout(function() {
      foto.src = img;
      meuLink.classList.remove('hidden');
      // Aplica a transição desejada
      foto.style.transform = 'translateX(0)';
    }, 200); /* Aguarda 200 milissegundos para aplicar a transição após esconder a descrição */

  }
  