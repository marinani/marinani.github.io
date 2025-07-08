// === Custom JS migrado de index.html ===

document.addEventListener('DOMContentLoaded', function () {

  // Animação de entrada dos cards de valores (se a biblioteca anime.js estiver disponível)
  if (typeof anime !== "undefined") {
    // Existing animation for .valor-card
    anime({
      targets: '.valor-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [50, 0],
      delay: anime.stagger(100), // 100ms de atraso entre cada card
      duration: 800, // 800ms de duração para cada card
      easing: 'easeOutElastic(1, .8)'
    });

    // New animation for other card types
    anime({
      targets: [
        '.principle-card',
        '.exp-card',
        '.skill-category-card',
        '.service-card',
        '.portfolio-card',
        '.clientes-card'
      ],
      opacity: [0, 1], // Começa invisível e termina visível
      scale: [0.95, 1], // Inicia ligeiramente menor e volta ao tamanho normal
      translateY: [20, 0], // Desliza de 20px abaixo para a posição final
      delay: anime.stagger(150), // Ajuste no atraso para uma animação mais ágil
      duration: 1200, // Duração da
      easing: 'easeOutQuad'
    });
  }

  // Lógica para o formulário de contato e modal
  const contactFormModal = document.getElementById('contactForm');
  const sendWhatsappModalBtn = document.getElementById('sendWhatsappModalBtn');
  const sendEmailModalBtn = document.getElementById('sendEmailModalBtn');
  const modalFormMessage = document.getElementById('modalFormMessage');

  // Função para coletar dados do formulário
  function getFormData() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    return { nome, email, telefone, mensagem };
  }

  // Função para exibir mensagens na modal
  function displayMessage(message, isSuccess) {
    modalFormMessage.textContent = message;
    modalFormMessage.className = isSuccess ? 'mt-3 text-center text-success' : 'mt-3 text-center text-danger';
    modalFormMessage.style.display = 'block';
  }

  // Event listener para o envio do formulário principal
  if (contactFormModal) {
    contactFormModal.addEventListener('submit', function (e) {
      e.preventDefault(); // Previne o envio padrão do formulário

      // Exibe a modal de opções de contato
      const contactOptionsModal = new bootstrap.Modal(document.getElementById('contactOptionsModal'));
      contactOptionsModal.show();
      modalFormMessage.style.display = 'none'; // Limpa mensagens anteriores ao abrir a modal
    });
  }

  // Lógica para enviar por WhatsApp
  if (sendWhatsappModalBtn) {
    sendWhatsappModalBtn.addEventListener('click', () => {
      const data = getFormData();
      const whatsappMessage = encodeURIComponent(`Olá Mariane,\n\nMeu nome é ${data.nome}.\nMeu e-mail é ${data.email}.\n${data.telefone ? `Meu telefone é ${data.telefone}.\n` : ''}\n${data.mensagem}\n\nAtenciosamente,\n${data.nome}`);
      const whatsappUrl = `https://wa.me/5541997649731?text=${whatsappMessage}`;
      window.open(whatsappUrl, '_blank'); // Abre em nova aba
      displayMessage('Mensagem para WhatsApp gerada! Por favor, envie-a.', true);
      contactFormModal.reset(); // Limpa o formulário

      // Fecha a modal após o envio
      const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactOptionsModal')); // Corrigido o ID
      if (contactModal) contactModal.hide();
    });
  }

  // Lógica para enviar por Email
  if (sendEmailModalBtn) {
    sendEmailModalBtn.addEventListener('click', () => {
      const data = getFormData();
      const subject = encodeURIComponent('Solicitação de Orçamento - Portfólio');
      const body = encodeURIComponent(`Olá Mariane,\n\nMeu nome é ${data.nome}.\nMeu e-mail é ${data.email}.\n${data.telefone ? `Meu telefone é ${data.telefone}.\n` : ''}\n${data.mensagem}\n\nAtenciosamente,\n${data.nome}`);
      const mailtoUrl = `mailto:marinanideveloper@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl; // Redireciona para o cliente de e-mail
      displayMessage('E-mail gerado! Por favor, envie-o pelo seu cliente de e-mail.', true);
      contactFormModal.reset(); // Limpa o formulário

      // Fecha a modal após o envio
      const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactOptionsModal')); // Corrigido o ID
      if (contactModal) contactModal.hide();
    });
  }

  // Removida toda a lógica do carrossel manual para a seção de clientes,
  // pois agora ela usa um layout de grade estático.

  // === Lógica para o efeito de cascata binária no canvas ===
  function initBinaryWaterfall() {
    const canvas = document.querySelector('.jarvis-matrix-canvas');
    if (!canvas) return; // Sai se o canvas não for encontrado

    const ctx = canvas.getContext('2d');

    // Função para redimensionar o canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Redimensiona o canvas inicialmente e em cada redimensionamento da janela
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250)); // Usando debounce da utilities.js

    const characters = '01'; // Caracteres binários
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array para armazenar a posição Y de cada coluna
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1; // Começa cada coluna no topo
    }

    // Função principal de desenho
    function draw() {
      // Fundo semi-transparente para o efeito de "rastro"
      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Cor primária com transparência
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Estilo do texto
      ctx.fillStyle = '#00e6e6'; // Cor neon (var(--destaque))
      ctx.font = `${fontSize}px monospace`;

      // Desenha cada "gota" (coluna de caracteres)
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a "gota" no topo se ela cair abaixo da tela
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0; // Volta para o topo
        }

        // Incrementa a posição Y da gota
        drops[i]++;
      }
    }

    // Inicia a animação
    setInterval(draw, 53); // Aproximadamente 30 FPS
  }

  // Chama a função para iniciar o efeito de cascata binária
  initBinaryWaterfall();

});

// Função debounce para otimizar o evento de redimensionamento
// (Esta função já existe em utilities.js, mas é mantida aqui para garantir
// que custom.js seja autocontido se utilities.js for carregado depois,
// embora o ideal seja usar a de utilities.js se ela for carregada primeiro.
// Para este caso, vamos assumir que utilities.js é carregado primeiro ou que
// a função debounce é definida globalmente ou em um escopo acessível.)
// Se você já tem debounce em utilities.js e ele é carregado antes, pode remover esta.
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
