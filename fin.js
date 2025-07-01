// Controle de navegação das brincadeiras
let currentGame = 1;
const totalGames = 6;

function showGame(gameNumber) {
    // Esconde todas as brincadeiras
    for (let i = 1; i <= totalGames; i++) {
        document.getElementById(`game-${i}`).classList.remove('active');
    }
    
    // Mostra a brincadeira atual
    document.getElementById(`game-${gameNumber}`).classList.add('active');
    
    // Atualiza o contador
    if (gameNumber === 6) {
        document.getElementById('game-counter').textContent = `Ritual Final! 🕯️`;
    } else {
        document.getElementById('game-counter').textContent = `Brincadeira ${gameNumber} de 5`;
    }
    
    // Controla botões de navegação
    document.getElementById('prev-btn').style.display = gameNumber === 1 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = gameNumber === totalGames ? 'none' : 'inline-block';
}

function nextGame() {
    if (currentGame < totalGames) {
        currentGame++;
        showGame(currentGame);
    }
}

function previousGame() {
    if (currentGame > 1) {
        currentGame--;
        showGame(currentGame);
    }
}

// Brincadeira 1: Botão Teletransporte
let teleportAttempts = 0;
const maxTeleportAttempts = 8;

function catchTeleportButton() {
    const button = document.getElementById('teleport-btn');
    const area = document.getElementById('teleport-area');
    const result = document.getElementById('teleport-result');
    
    teleportAttempts++;
    
    if (teleportAttempts < maxTeleportAttempts) {
        button.classList.add('teleporting');
        
        setTimeout(() => {
            // Posição aleatória dentro da área
            const maxX = area.offsetWidth - button.offsetWidth;
            const maxY = area.offsetHeight - button.offsetHeight;
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            
            button.style.left = newX + 'px';
            button.style.top = newY + 'px';
            button.style.transform = 'none';
            
            button.classList.remove('teleporting');
            
            const messages = [
                `Tentativa ${teleportAttempts}: O botão fugiu! Seu brilho é tão forte que até os objetos se encantam! ✨`,
                `Tentativa ${teleportAttempts}: Ele se teletransportou! Sua magia pessoal é contagiante! 🌈`,
                `Tentativa ${teleportAttempts}: Quase pegou! Sua energia positiva está animando tudo ao redor! 🌟`,
                `Tentativa ${teleportAttempts}: Ele fugiu de novo! Você tem um carisma que cativa todos! 💖`,
                `Tentativa ${teleportAttempts}: Mais uma escapada! Seu sorriso ilumina até os lugares mais escuros! ☀️`,
                `Tentativa ${teleportAttempts}: Escapou novamente! Você é mais encantadora que um arco-íris! 🎀`,
                `Tentativa ${teleportAttempts}: Última chance! O botão está se rendendo ao seu charme! 🥰`
            ];
            
            result.textContent = messages[teleportAttempts - 1];
        }, 400);
    } else {
        // Sucesso final
        button.textContent = '👑 Capturada!';
        button.style.background = 'linear-gradient(45deg, #ff6b9d, #8a2be2)';
        button.style.position = 'static';
        button.style.transform = 'none';
        
        result.innerHTML = `
            🎉 INCRÍVEL! Você dominou o fantasma teletransportador! 👻<br>
            Sua persistência e poder são admiráveis! 💪<br>
            Nem os espíritos mais poderosos conseguem escapar do seu charme! ✨<br>
            <strong>Você é oficialmente uma Caçadora de Fantasmas Master! 👑</strong>
        `;
        result.classList.add('bounce');
        
        // Reset após 5 segundos
        setTimeout(() => {
            teleportAttempts = 0;
            button.textContent = '👻 Me Pegue!';
            button.style.background = 'linear-gradient(45deg, #8a2be2, #4b0082)';
            button.style.position = 'absolute';
            button.style.top = '50%';
            button.style.left = '50%';
            button.style.transform = 'translate(-50%, -50%)';
            result.textContent = '';
            result.classList.remove('bounce');
        }, 5000);
    }
}

// Brincadeira 2: Caça aos Fantasmas
let ghostsFound = 0;
let totalGhosts = 5;
let huntActive = false;

function startGhostHunt() {
    if (huntActive) return;
    
    huntActive = true;
    ghostsFound = 0;
    
    const huntArea = document.getElementById('ghost-hunt-area');
    huntArea.innerHTML = '';
    
    // Cria fantasmas escondidos
    for (let i = 0; i < totalGhosts; i++) {
        const ghost = document.createElement('div');
        ghost.className = 'hidden-ghost';
        ghost.textContent = '👻';
        ghost.style.left = Math.random() * 80 + '%';
        ghost.style.top = Math.random() * 80 + '%';
        ghost.onclick = () => catchGhost(ghost);
        
        huntArea.appendChild(ghost);
    }
    
    updateGhostStats();
    document.getElementById('ghost-hunt-result').textContent = 'Os fantasmas estão se escondendo da sua beleza! Encontre todos eles! 🔍';
}

function catchGhost(ghostElement) {
    ghostElement.classList.add('found');
    ghostsFound++;
    
    setTimeout(() => {
        ghostElement.remove();
    }, 500);
    
    updateGhostStats();
    
    if (ghostsFound === totalGhosts) {
        huntActive = false;
        document.getElementById('ghost-hunt-result').innerHTML = `
            🎉 PARABÉNS! Você encontrou todos os fantasmas! 👻<br>
            Sua intuição sobrenatural é impressionante! 🔮<br>
            Você tem o dom de enxergar além do véu! ✨<br>
            <strong>Você é uma verdadeira Médium Master! 🌟</strong>
        `;
    } else {
        const encouragements = [
            'Ótimo! Continue procurando! 🔍',
            'Você está indo bem! 👻',
            'Sua percepção é incrível! ✨',
            'Quase lá! Continue! 🌟'
        ];
        document.getElementById('ghost-hunt-result').textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
    }
}

function updateGhostStats() {
    document.getElementById('ghosts-found').textContent = `Fantasmas encontrados: ${ghostsFound}/${totalGhosts}`;
}

// Brincadeira 3: Ritual de Invocação
let ritualSequence = [];
let playerSequence = [];
let ritualActive = false;

function startRitual() {
    if (ritualActive) return;
    
    ritualActive = true;
    ritualSequence = [];
    playerSequence = [];
    
    // Gera sequência aleatória
    for (let i = 0; i < 5; i++) {
        ritualSequence.push(Math.floor(Math.random() * 5) + 1);
    }
    
    // Mostra a sequência
    document.getElementById('ritual-sequence').textContent = ritualSequence.join(' ');
    document.getElementById('ritual-result').textContent = 'Memorize a sequência e clique nas velas na ordem correta! 🕯️';
    
    // Esconde a sequência após 3 segundos
    setTimeout(() => {
        document.getElementById('ritual-sequence').textContent = '? ? ? ? ?';
        document.getElementById('ritual-result').textContent = 'Agora clique nas velas na ordem que viu! 🔮';
    }, 3000);
}

function lightCandle(candleNumber) {
    if (!ritualActive) return;
    
    const candle = document.getElementById(`candle-${candleNumber}`);
    candle.classList.add('lit');
    
    setTimeout(() => {
        candle.classList.remove('lit');
    }, 1000);
    
    playerSequence.push(candleNumber);
    
    // Verifica se está correto
    if (playerSequence[playerSequence.length - 1] !== ritualSequence[playerSequence.length - 1]) {
        document.getElementById('ritual-result').innerHTML = `
            ❌ Sequência incorreta! Mas não desista! 💪<br>
            Sua determinação é mais forte que qualquer magia! ✨
        `;
        resetRitual();
        return;
    }
    
    // Verifica se completou
    if (playerSequence.length === ritualSequence.length) {
        ritualActive = false;
        document.getElementById('ritual-result').innerHTML = `
            🎉 RITUAL COMPLETO! Você invocou o poder da celebração! 🕯️<br>
            Sua concentração e memória são sobrenaturais! 🧙‍♀️<br>
            Os espíritos estão impressionados com sua habilidade! 👻<br>
            <strong>Você é uma Bruxa Master do Aniversário! 🌟</strong>
        `;
        
        // Acende todas as velas
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`candle-${i}`).classList.add('lit');
        }
    }
}

function resetRitual() {
    ritualActive = false;
    playerSequence = [];
    ritualSequence = [];
    
    // Apaga todas as velas
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`candle-${i}`).classList.remove('lit');
    }
}

// Brincadeira 4: Portal Dimensional
let portalCount = 0;
const maxPortals = 7;

function enterPortal() {
    const portal = document.getElementById('portal');
    const area = document.getElementById('portal-area');
    const result = document.getElementById('portal-result');
    
    portalCount++;
    
    portal.classList.add('teleporting');
    
    setTimeout(() => {
        // Nova posição aleatória
        const maxX = area.offsetWidth - 100;
        const maxY = area.offsetHeight - 100;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        portal.style.left = newX + 'px';
        portal.style.top = newY + 'px';
        portal.style.transform = 'none';
        
        portal.classList.remove('teleporting');
        
        document.getElementById('portal-count').textContent = `Portais atravessados: ${portalCount}/${maxPortals}`;
        
        if (portalCount < maxPortals) {
            const messages = [
                'Portal 1: Você entrou na dimensão da coragem! 💪',
                'Portal 2: Dimensão da beleza infinita! ✨',
                'Portal 3: Reino da inteligência suprema! 🧠',
                'Portal 4: Mundo da personalidade incrível! 🌟',
                'Portal 5: Universo do charme irresistível! 💫',
                'Portal 6: Dimensão final se aproxima! 🌀'
            ];
            result.textContent = messages[portalCount - 1];
        } else {
            // Completou todos os portais
            portal.style.position = 'static';
            portal.style.transform = 'none';
            portal.textContent = '🌟';
            
            result.innerHTML = `
                🎉 JORNADA DIMENSIONAL COMPLETA! 🌀<br>
                Você atravessou todas as dimensões com sucesso! 🚀<br>
                Sua coragem interdimensional é lendária! 👑<br>
                <strong>Você é oficialmente uma Viajante Dimensional Master! ✨</strong>
            `;
            result.classList.add('bounce');
            
            // Reset após 5 segundos
            setTimeout(() => {
                portalCount = 0;
                portal.textContent = '🌀';
                portal.style.position = 'absolute';
                portal.style.top = '50%';
                portal.style.left = '50%';
                portal.style.transform = 'translate(-50%, -50%)';
                document.getElementById('portal-count').textContent = `Portais atravessados: 0/${maxPortals}`;
                result.textContent = '';
                result.classList.remove('bounce');
            }, 5000);
        }
    }, 500);
}

// Brincadeira 5: Espelho Mágico
let mirrorCount = 0;
const mirrorReflections = [
    '👑 Vejo uma rainha!',
    '✨ Vejo uma estrela brilhante!',
    '🌟 Vejo uma pessoa incrível!',
    '💎 Vejo um diamante raro!',
    '🦋 Vejo uma borboleta única!',
    '🌈 Vejo um arco-íris humano!',
    '🔥 Vejo uma chama especial!',
    '🌙 Vejo uma lua encantadora!',
    '⚡ Vejo uma força da natureza!',
    '🎭 Vejo uma artista nata!'
];

function lookInMirror() {
    const reflection = document.getElementById('mirror-reflection');
    const result = document.getElementById('mirror-result');
    
    mirrorCount++;
    
    const randomReflection = mirrorReflections[Math.floor(Math.random() * mirrorReflections.length)];
    reflection.textContent = randomReflection;
    reflection.classList.add('showing');
    
    document.getElementById('mirror-count').textContent = `Reflexões vistas: ${mirrorCount}`;
    
    setTimeout(() => {
        reflection.classList.remove('showing');
    }, 2000);
    
    if (mirrorCount === 1) {
        result.textContent = 'O espelho mágico revelou sua verdadeira essência! Continue olhando! 🪞';
    } else if (mirrorCount === 5) {
        result.innerHTML = `
            🪞 O espelho está impressionado com você! ✨<br>
            Cada reflexão mostra uma qualidade sua incrível! 💖
        `;
    } else if (mirrorCount === 10) {
        result.innerHTML = `
            🎉 ESPELHO MÁGICO COMPLETO! 🪞<br>
            Você quebrou o recorde de beleza do espelho! 👑<br>
            Nem a magia consegue capturar toda sua essência! ✨<br>
            <strong>Você é mais linda que qualquer reflexão! 🌟</strong>
        `;
        result.classList.add('bounce');
        
        setTimeout(() => {
            result.classList.remove('bounce');
        }, 1000);
    }
}

// Ritual Final
function finalRitual() {
    const ritual = document.getElementById('final-ritual');
    const button = document.querySelector('.ritual-btn');
    
    button.style.display = 'none';
    
    // Animação especial sombria
    document.body.style.background = 'linear-gradient(135deg, #8a2be2 0%, #ff6b9d 50%, #4b0082 100%)';
    document.querySelector('.container').classList.add('pulse');
    
    ritual.innerHTML = `
        <div class="final-animation">
            <h2>🎃 RITUAL COMPLETO! PARABÉNS PRIMA! 👻</h2>
            <p>✨ QUE SUA VIDA SEJA UM MAR DE ALEGRIAS! ✨</p>
            <p>🦇 QUE VOCE CONTINUE SENDA ESSA PESSOA INCRIVEL 🦇</p>
            <div class="ritual-symbols">
                🕯️ 🔮 ⚡ 🌙 👻 🦇 🕷️ 🎃 💀 🧙‍♀️
            </div>
        </div>
    `;
    
    ritual.classList.add('bounce');
    
    // Cria efeitos especiais
    createMagicalEffects();
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #2d1b69 0%, #11001c 50%, #0f0f23 100%)';
        document.querySelector('.container').classList.remove('pulse');
    }, 8000);
}

function createMagicalEffects() {
    const magicalItems = ['🕯️', '🔮', '⚡', '🌙', '👻', '🦇', '🕷️', '🎃', '💀', '🧙‍♀️', '✨', '💫'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            item.style.position = 'fixed';
            item.style.left = Math.random() * 100 + 'vw';
            item.style.top = '-10px';
            item.style.fontSize = '2em';
            item.style.zIndex = '9999';
            item.style.pointerEvents = 'none';
            item.textContent = magicalItems[Math.floor(Math.random() * magicalItems.length)];
            item.style.animation = 'magicalFall 6s linear infinite';
            item.style.filter = 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))';
            
            document.body.appendChild(item);
            
            setTimeout(() => {
                item.remove();
            }, 6000);
        }, i * 50);
    }
}

// Adiciona animação para queda mágica
const style = document.createElement('style');
style.textContent = `
    @keyframes magicalFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showGame(1);
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        const result = document.getElementById('teleport-result');
        result.textContent = 'Bem-vinda ao reino sombrio, prima! Prepare-se para desafios sobrenaturais! 👻✨';
    }, 1000);
});