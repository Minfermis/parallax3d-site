// Efeito Parallax 3D - Seguindo exatamente o arquivo original com transição de entrada sutil
document.addEventListener('DOMContentLoaded', function() {
    
    // Selecionando todos os elementos com a classe 'parallax'
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Transição de entrada sutil - elementos começam com opacidade 0
    parallaxElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, calc(-50% + 20px))'; // Ligeiramente abaixo
        
        // Animação sequencial de entrada
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = getElementOpacity(element);
            element.style.transform = 'translate(-50%, -50%)';
        }, index * 100); // Delay sequencial
    });
    
    // Função para obter a opacidade correta de cada elemento
    function getElementOpacity(element) {
        if (element.classList.contains('bg-img')) return '0.2';
        if (element.classList.contains('fog-7')) return '0.6';
        if (element.classList.contains('fog-6')) return '0.5';
        if (element.classList.contains('fog-5')) return '0.4';
        if (element.classList.contains('fog-4')) return '0.5';
        if (element.classList.contains('fog-3')) return '0.5';
        if (element.classList.contains('fog-2')) return '0.4';
        if (element.classList.contains('fog-1')) return '0.6';
        if (element.classList.contains('sun-rays')) return '0.8';
        return '1'; // Montanhas e outros elementos
    }
    
    // Texto também com entrada suave
    const textElement = document.querySelector('.text');
    if (textElement) {
        textElement.style.opacity = '0';
        textElement.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => {
            textElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            textElement.style.opacity = '1';
            textElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 800); // Texto aparece depois das imagens
    }
    
    // Aguardar a transição de entrada terminar antes de ativar o parallax
    setTimeout(() => {
        initParallaxEffect();
    }, 2000);
    
    function initParallaxEffect() {
        // Função principal do efeito parallax
        function parallaxEffect(e) {
            // Obtendo a posição do mouse
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculando o centro da tela
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Calculando a diferença do mouse em relação ao centro
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            
            // Aplicando o efeito a cada elemento parallax
            parallaxElements.forEach(element => {
                // Obtendo o valor de velocidade do data-value
                const speed = element.getAttribute('data-value');
                
                // Calculando o movimento baseado na velocidade - EFEITO AUMENTADO
                const moveX = -deltaX * speed / 150; // Movimento invertido
                const moveY = -deltaY * speed / 150; // Movimento invertido
                
                // Aplicando a transformação
                element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        }
        
        // Adicionando o event listener para o movimento do mouse
        document.addEventListener('mousemove', parallaxEffect);
        
        // Função para resetar posições quando o mouse sair da tela
        function resetParallax() {
            parallaxElements.forEach(element => {
                element.style.transform = 'translate(-50%, -50%)';
            });
        }
        
        // Event listener para quando o mouse sair da janela
        document.addEventListener('mouseleave', resetParallax);
        
        // Desabilitar parallax em dispositivos móveis para melhor performance
        function isMobile() {
            return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        
        // Se for mobile, desabilitar o efeito parallax
        if (isMobile()) {
            document.removeEventListener('mousemove', parallaxEffect);
            document.removeEventListener('mouseleave', resetParallax);
            
            // Manter apenas a posição centralizada
            parallaxElements.forEach(element => {
                element.style.transform = 'translate(-50%, -50%)';
            });
        }
        
        // Otimização de performance usando requestAnimationFrame
        let ticking = false;
        
        function optimizedParallaxEffect(e) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    parallaxEffect(e);
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Substituir o event listener por uma versão otimizada
        document.removeEventListener('mousemove', parallaxEffect);
        document.addEventListener('mousemove', optimizedParallaxEffect);
    }
    
    // Menu hambúrguer para mobile
    const hamburger = document.querySelector('.hamburguer');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    console.log('🎉 Efeito Parallax 3D carregado com sucesso!');
    console.log('📱 Mobile detected:', window.innerWidth <= 768);
    console.log('🖼️ Total parallax elements:', parallaxElements.length);
});

