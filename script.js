document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });

    const anoAtual = new Date().getFullYear();
    const elementoCopyright = document.querySelector('.copyright');

    if (elementoCopyright) {

        let textoOriginal = elementoCopyright.textContent;

        // Expressão regular que encontra e substitui o ano (por exemplo, '2025')
        const novoTexto = textoOriginal.replace(/\d{4}/, anoAtual);

        elementoCopyright.textContent = novoTexto;
    }

    window.onscroll = function () {
        scrollProgress();
    };

    function scrollProgress() {
        // Posição vertical atual de rolagem da janela
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        // Altura total da página subtraída da altura visível da janela
        // Isso nos dá a altura máxima de rolagem possível
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Calcula a porcentagem de rolagem: (posição_atual / altura_maxima) * 100
        var scrolled = (winScroll / height) * 100;

        // Atualiza o estilo de largura da barra
        document.getElementById("progressBar").style.width = scrolled + "%";
    }
});