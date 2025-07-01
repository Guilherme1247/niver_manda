    class MagicalParticles {
            constructor() {
                this.canvas = document.getElementById('particleCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.phase = 'forming'; // 'forming', 'heart', 'transitioning', 'name'
                this.animationTime = 0;
                
                this.resize();
                this.createParticles();
                this.animate();
                
                window.addEventListener('resize', () => this.resize());
                
                // Sequência de animações
                setTimeout(() => this.startHeartPhase(), 2000);
                setTimeout(() => this.startNamePhase(), 5000);
                setTimeout(() => this.showBirthdayScreen(), 8000);
            }
            
            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
            
            createParticles() {
                this.particles = [];
                const numParticles = 200;
                
                for (let i = 0; i < numParticles; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        targetX: Math.random() * this.canvas.width,
                        targetY: Math.random() * this.canvas.height,
                        size: Math.random() * 3 + 1,
                        opacity: Math.random() * 0.8 + 0.2,
                        color: this.getRandomColor(),
                        speed: 0.02,
                        pulse: Math.random() * Math.PI * 2,
                        pulseSpeed: Math.random() * 0.05 + 0.02
                    });
                }
            }
            
            getRandomColor() {
                const colors = [
                    { r: 255, g: 107, b: 157 }, // Rosa
                    { r: 255, g: 182, b: 193 }, // Rosa claro
                    { r: 255, g: 160, b: 160 }, // Rosa salmão
                    { r: 255, g: 255, b: 255 }, // Branco
                    { r: 255, g: 192, b: 203 }  // Rosa bebê
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            getHeartPoints() {
                const points = [];
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2 - 50;
                const scale = 8;
                
                for (let t = 0; t < Math.PI * 2; t += 0.15) {
                    const x = scale * (16 * Math.sin(t) ** 3);
                    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                    
                    points.push({
                        x: centerX + x + (Math.random() - 0.5) * 15,
                        y: centerY + y + (Math.random() - 0.5) * 15
                    });
                }
                
                return points;
            }
            
            getNamePoints() {
                const points = [];
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const letterSpacing = 80;
                const startX = centerX - (5 * letterSpacing) / 2; // Para "AMANDA" (6 letras)
                
                // Definir pontos para cada letra de "AMANDA"
                const letters = {
                    A: [
                        [0, 40], [10, 20], [20, 0], [30, 20], [40, 40], // Linha diagonal esquerda e direita
                        [15, 25], [25, 25] // Linha horizontal
                    ],
                    M: [
                        [0, 40], [0, 0], [20, 20], [40, 0], [40, 40], // Formato M
                        [10, 10], [30, 10]
                    ],
                    A2: [
                        [0, 40], [10, 20], [20, 0], [30, 20], [40, 40],
                        [15, 25], [25, 25]
                    ],
                    N: [
                        [0, 40], [0, 0], [40, 40], [40, 0], // Formato N
                        [10, 10], [20, 20], [30, 30]
                    ],
                    D: [
                        [0, 0], [0, 40], [30, 35], [35, 20], [30, 5], // Formato D
                        [0, 20], [20, 15], [20, 25]
                    ],
                    A3: [
                        [0, 40], [10, 20], [20, 0], [30, 20], [40, 40],
                        [15, 25], [25, 25]
                    ]
                };
                
                const letterArray = ['A', 'M', 'A2', 'N', 'D', 'A3'];
                
                letterArray.forEach((letter, letterIndex) => {
                    const letterPoints = letters[letter];
                    const letterX = startX + letterIndex * letterSpacing;
                    
                    letterPoints.forEach(point => {
                        points.push({
                            x: letterX + point[0] + (Math.random() - 0.5) * 8,
                            y: centerY + point[1] - 20 + (Math.random() - 0.5) * 8
                        });
                    });
                });
                
                return points;
            }
            
            startHeartPhase() {
                this.phase = 'heart';
                const heartPoints = this.getHeartPoints();
                
                this.particles.forEach((particle, index) => {
                    const targetPoint = heartPoints[index % heartPoints.length];
                    particle.targetX = targetPoint.x;
                    particle.targetY = targetPoint.y;
                    particle.speed = 0.03;
                });
            }
            
            startNamePhase() {
                this.phase = 'transitioning';
                const namePoints = this.getNamePoints();
                
                // Primeiro espalhar as partículas
                this.particles.forEach(particle => {
                    particle.targetX = Math.random() * this.canvas.width;
                    particle.targetY = Math.random() * this.canvas.height;
                    particle.speed = 0.05;
                });
                
                // Depois formar o nome
                setTimeout(() => {
                    this.phase = 'name';
                    this.particles.forEach((particle, index) => {
                        const targetPoint = namePoints[index % namePoints.length];
                        particle.targetX = targetPoint.x;
                        particle.targetY = targetPoint.y;
                        particle.speed = 0.04;
                    });
                }, 1000);
            }
            
            showBirthdayScreen() {
                // Fazer as partículas desaparecerem gradualmente
                this.particles.forEach(particle => {
                    particle.opacity *= 0.95;
                });
                
                setTimeout(() => {
                    document.getElementById('birthdayScreen').classList.add('show');
                    this.createSparkles();
                }, 500);
            }
            
            createSparkles() {
                const sparklesContainer = document.getElementById('sparkles');
                
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('div');
                        sparkle.className = 'sparkle';
                        sparkle.style.left = Math.random() * 100 + '%';
                        sparkle.style.top = Math.random() * 100 + '%';
                        sparkle.style.animationDelay = Math.random() * 2 + 's';
                        sparklesContainer.appendChild(sparkle);
                        
                        setTimeout(() => {
                            sparkle.remove();
                        }, 4000);
                    }, i * 200);
                }
            }
            
            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.animationTime += 0.016;
                
                this.particles.forEach(particle => {
                    // Mover partícula em direção ao alvo
                    const dx = particle.targetX - particle.x;
                    const dy = particle.targetY - particle.y;
                    
                    particle.x += dx * particle.speed;
                    particle.y += dy * particle.speed;
                    
                    // Efeito de pulsação
                    particle.pulse += particle.pulseSpeed;
                    const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
                    const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;
                    
                    // Desenhar partícula
                    this.ctx.save();
                    this.ctx.globalAlpha = Math.max(0, pulseOpacity);
                    this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${pulseOpacity})`;
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.8)`;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Inicializar quando a página carregar
        window.addEventListener('load', () => {
            new MagicalParticles();
        });

        // Redirecionar após 10 segundos (10000 milissegundos)
        setTimeout(function() {
            window.location.href = "final.html";
        }, 15000);