// Efeito Parallax 3D - Seguindo exatamente o vídeo
document.addEventListener('DOMContentLoaded', function() {
    
    // Selecionando todos os elementos com a classe 'parallax'
    const parallaxElements = document.querySelectorAll('.parallax');
    
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
            const moveX = deltaX * speed / 150; // Diminuído de 250 para 150 para mais efeito
            const moveY = deltaY * speed / 150; // Diminuído de 250 para 150 para mais efeito
            
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
    
    // Função para debug (opcional - pode ser removida)
    function debugParallax() {
        console.log('Parallax Debug Info:');
        console.log('Total elements:', parallaxElements.length);
        parallaxElements.forEach((element, index) => {
            const speed = element.getAttribute('data-value');
            console.log(`Element ${index + 1}: ${element.className}, Speed: ${speed}`);
        });
    }
    
    // Chamar debug se necessário (descomente a linha abaixo)
    // debugParallax();
    
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
    
    // Adicionar suporte para touch em dispositivos móveis (caso queira manter o efeito)
    function handleTouch(e) {
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            const fakeEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            optimizedParallaxEffect(fakeEvent);
        }
    }
    
    // Event listeners para touch (comentados por padrão para melhor performance mobile)
    // document.addEventListener('touchmove', handleTouch);
    // document.addEventListener('touchstart', handleTouch);
    
    console.log('🎉 Efeito Parallax 3D carregado com sucesso!');
    console.log('📱 Mobile detected:', isMobile());
    console.log('🖼️ Total parallax elements:', parallaxElements.length);
});

