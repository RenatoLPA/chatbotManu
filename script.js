// Função para formatar a hora
function formatarHora(data) {
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

//  VERSÃO ANTERIOR - Função para alternar a exibição do chat
// function toggleChat() {
//     const chatContainer = document.getElementById('chatContainer');
//     const toggleButton = document.getElementById('toggleButton');

//      Verifica se o chat está visível e alterna sua exibição
//     if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
//         chatContainer.style.display = 'block';  Exibe o chat
//         toggleButton.innerHTML = '<i class="fas fa-times"></i>';  Muda para o ícone de fechar
//     } else {
//         chatContainer.style.display = 'none';  Oculta o chat
//         toggleButton.innerHTML = '<i class="fas fa-comments"></i>';  Muda para o ícone de abrir
//     }
// }

// Função para alternar a exibição do chat
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const toggleButton = document.getElementById('toggleButton');
    const chatTitle = document.getElementById('chat-title'); // Seleciona o título do chat

    // Verifica se o chat está visível e alterna sua exibição
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block'; // Exibe o chat
        toggleButton.innerHTML = '<i class="fas fa-times" style="font-size: 24px;"></i>'; // Muda para o ícone de fechar
        chatTitle.innerHTML = '<img src="./AvatarManu.PNG" alt="Chat Bot" style="width: 40px; height: 40px; border-radius: 50%;">'; // Altera o título para a imagem
    } else {
        chatContainer.style.display = 'none'; // Oculta o chat
        toggleButton.innerHTML = '<img src="./AvatarManu.PNG" alt="Abrir Chat" style="width: 40px; height: 40px; border-radius: 50%;">'; // Muda para a imagem de abrir
        chatTitle.innerHTML = 'Chat Bot'; // Restaura o título original
    }
}

// Função para alternar entre tela cheia e modo normal
function toggleFullscreen() {
    const chatContainer = document.getElementById('chatContainer');

    if (!document.fullscreenElement) {
        chatContainer.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Função para ajustar o scroll do chat
function adjustScroll() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight; // Rola para o fundo
}

// Adiciona um evento para enviar a mensagem ao pressionar ENTER
document.getElementById('inputMessage').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// Função para enviar a mensagem
function sendMessage() {
    const inputMessage = document.getElementById('inputMessage');
    const chatBody = document.getElementById('chatBody');
    

    // Verifica se a mensagem não está vazia
    if (inputMessage.value.trim() === '') {
        // Mensagem de resposta automática para entrada vazia
        const dataAtual = new Date();
        const horaAtual = formatarHora(dataAtual);
        
        const autoResponseContainer = document.createElement('div');
        autoResponseContainer.className = 'bot-message'; // Adiciona a classe para mensagens do bot
        const autoResponseMessage = document.createElement('p');
        autoResponseMessage.textContent = "Opa! Acredito que você pressinou enter sem ter escrito alguma mensagem. ;)"; // Mensagem de aviso

        const autoResponseTimeStamp = document.createElement('span');
        autoResponseTimeStamp.textContent = `${horaAtual}`;
        autoResponseTimeStamp.style.fontSize = '0.8em';
        autoResponseTimeStamp.style.display = 'block';
        autoResponseTimeStamp.style.marginTop = '2px';

        autoResponseContainer.appendChild(autoResponseMessage);
        autoResponseContainer.appendChild(autoResponseTimeStamp);
        chatBody.appendChild(autoResponseContainer);

        // Ajusta o scroll para a última mensagem
        adjustScroll();
        return; // Sai da função se a mensagem estiver vazia
    }

    const dataAtual = new Date();
    const horaAtual = formatarHora(dataAtual);

    // Mensagem do usuário
    const messageContainer = document.createElement('div');
    messageContainer.className = 'user-message'; // Adiciona a classe para mensagens do usuário
    const newMessage = document.createElement('p');
    newMessage.textContent = inputMessage.value;

    const timeStamp = document.createElement('span');
    timeStamp.textContent = `${horaAtual}`;
    timeStamp.style.fontSize = '0.8em';
    timeStamp.style.display = 'block';
    timeStamp.style.marginTop = '2px';

    messageContainer.appendChild(newMessage);
    messageContainer.appendChild(timeStamp);
    chatBody.appendChild(messageContainer);

    // Limpa o campo de entrada
    inputMessage.value = '';
    inputMessage.style.height = 'auto'; // Reseta a altura do campo de entrada

    // Ajusta o scroll para a última mensagem
    adjustScroll();

    // Animação de digitação
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatBody.appendChild(typingIndicator);
    adjustScroll();

        // Resposta automática após a animação
        setTimeout(() => {
            // Remove o indicador de digitação
            chatBody.removeChild(typingIndicator);

            // Verifica se a mensagem do usuário é uma pergunta predeterminada
        const userMessage = newMessage.textContent.toLowerCase(); // Usa o texto da mensagem do usuário
        const responses = {
           'oi': 'Oi! Sou a Manu e estou ansiosa e adorarei lhe ajudar! Por enquanto não posso falar muito. Mas sobre o que você gostaria de perguntar?',
           'como você está': 'Estou bem, obrigada! E você?',
           'como você está?': 'Estou bem, obrigada! E você?',
           'bem': 'Que ótimo! Sobre o que quer falar?',
           'bem, também!': 'Que ótimo! Sobre o que quer falar?',
           'estou bem': 'Que ótimo! Sobre o que quer falar?',           
           'o que você faz': 'Sou um chatbot, e  estou em desenvolvimento para lhe atender melhor e falar sobre vários tópicos. Prinicplamente sobre dashboards, consumo do chat bot por usuário e o sistema Target!',
           'o que você faz?': 'Sou um chatbot, e  estou em desenvolvimento para lhe atender melhor e falar sobre vários tópicos. Prinicplamente sobre dashboards, consumo do chat bot por usuário e o sistema Target!',
           'qual é o seu nome': 'Eu sou Manu, seu assistente virtual!',
           'qual é o seu nome?': 'Eu sou Manu, seu assistente virtual!',
           'o que você pode me ajudar?': 'Posso ajudar com informações sobre diversos tópicos, como tecnologia, saúde, entretenimento e muito mais.',
           'me fale sobre tecnologia': 'Claro! Tecnologia é um campo em constante evolução que abrange tudo, desde computadores e smartphones até inteligência artificial e biotecnologia.',
           'me fale sobre saúde': 'Saúde é fundamental! É importante ter uma alimentação equilibrada, praticar exercícios e cuidar da saúde mental. Você tem alguma pergunta específica sobre saúde?',
           'me fale sobre entretenimento': 'Entretenimento pode incluir filmes, música, jogos e muito mais. Tem algum tipo específico que você gostaria de discutir?',
           'quais são suas habilidades?': 'Posso responder perguntas, fornecer informações, ajudar com recomendações e muito mais. O que você gostaria de saber?',
           'conta uma piada': 'Claro! Por que o computador foi ao médico?',
           'não sei': 'Porque ele tinha um vírus! 😄',
           'kkk': '😄😄😄😄😄😄😄😄😄',
           'kkkk': '😄😄😄😄😄😄😄😄😄',
           'kkkkk': '😄😄😄😄😄😄😄😄😄',
           'conta uma piada?': 'Claro! Por que o computador foi ao médico? Porque ele tinha um vírus! 😄',
           'tchau': 'Tchau! Foi ótimo ter falado com você, logo em breve falaremos de assuntos mais amplos!',
           'obrigado': 'De nada! Estou aqui para ajudar. Se tiver mais perguntas, é só perguntar!',
           'obrigada': 'De nada! Estou aqui para ajudar. Se tiver mais perguntas, é só perguntar!',
           'relatório': 'Aqui está o relatório que você pediu'

            
        };

        const autoResponseContainer = document.createElement('div');
    autoResponseContainer.className = 'bot-message'; // Adiciona a classe para mensagens do bot
    const autoResponseMessage = document.createElement('p');

    if (userMessage === 'relatório') {
        // Exibe a imagem do gráfico
        const graficoImagem = document.createElement('img');
        graficoImagem.src = './grafico.gif'; // Caminho para o gráfico
        graficoImagem.alt = 'Gráfico do Relatório';
        graficoImagem.style.width = '100%';
        autoResponseContainer.appendChild(graficoImagem);

        // Mensagem de confirmação e botão de exportação
        const confirmacaoMensagem = document.createElement('p');
        confirmacaoMensagem.textContent = 'Deseja salvar o relatório?';
        autoResponseContainer.appendChild(confirmacaoMensagem);

        // Botão de exportação
        const exportarBotao = document.createElement('button');
        exportarBotao.textContent = 'Exportar';
        exportarBotao.style.marginTop = '10px';
        exportarBotao.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = './grafico.gif'; // Caminho para o gráfico
            link.download = 'grafico.gif';
            link.click();
        });
        autoResponseContainer.appendChild(exportarBotao);
    } else if (responses[userMessage]) {
        // Caso padrão para mensagens predefinidas
        const autoResponseMessage = document.createElement('p');
        autoResponseMessage.textContent = responses[userMessage];
        autoResponseContainer.appendChild(autoResponseMessage);
    } else {
        // Resposta genérica para entradas desconhecidas
        const autoResponseMessage = document.createElement('p');
        autoResponseMessage.textContent = 'Eita! No momento ainda estou aprendendo e talvez não consiga falar sobre tudo com você. Posso ajudá-lo com algo mais?';
        autoResponseContainer.appendChild(autoResponseMessage);
    }

    const autoResponseTimeStamp = document.createElement('span');
    autoResponseTimeStamp.textContent = `${horaAtual}`;
    autoResponseTimeStamp.style.fontSize = '0.8em';
    autoResponseTimeStamp.style.display = 'block';
    autoResponseTimeStamp.style.marginTop = '2px';

    autoResponseContainer.appendChild(autoResponseTimeStamp);
    chatBody.appendChild(autoResponseContainer);

    // Ajusta o scroll para a última mensagem
    adjustScroll();
}, 2000); // Tempo da animação de digitação (2 segundos)
}
