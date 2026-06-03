

    /* CORE ORB SCROLL ENGINE */
    document.addEventListener('DOMContentLoaded', () => {
        const orb = document.getElementById('scrollCore');
        const hero = document.getElementById('home');
        const arsenal = document.getElementById('arsenal');
        
        if(!orb || !hero || !arsenal) return;
        let ticking = false; orb.classList.add('active');

        function updateOrb() {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const arsenalTop = arsenal.offsetTop;
            const arsenalHeight = arsenal.offsetHeight;
            const winHeight = window.innerHeight;
            
            if (scrollY < heroHeight * 0.5) {
                orb.style.position = 'absolute';
                orb.style.top = (hero.offsetTop + 200) + 'px';
                orb.style.left = '85%';
                orb.style.transform = 'translate(-50%, -50%) scale(1)';
            } else if (scrollY >= heroHeight * 0.5 && scrollY < (arsenalTop - winHeight/2)) {
                orb.style.position = 'fixed';
                orb.style.top = '50%';
                orb.style.left = '85%';
                const rot = scrollY * 0.1;
                orb.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0.8)`;
            } else if (scrollY >= (arsenalTop - winHeight/2) && scrollY < (arsenalTop + arsenalHeight)) {
                const p = Math.min(1, (scrollY - (arsenalTop - winHeight/2)) / (winHeight/2));
                orb.style.position = 'absolute';
                const startY = arsenalTop - (winHeight/2) + (winHeight/2);
                const endY = arsenalTop + 150;
                const currentY = startY + ((endY - startY) * p);
                const startX = window.innerWidth * 0.85;
                const endX = window.innerWidth * 0.5;
                const currentX = startX + ((endX - startX) * p);
                orb.style.top = currentY + 'px';
                orb.style.left = currentX + 'px';
                const currentScale = 0.8 + (p * 0.5); 
                const rot = scrollY * 0.1;
                orb.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${currentScale})`;
                orb.style.opacity = 1 - (p * 0.3); 
            } else {
                orb.style.position = 'absolute';
                orb.style.top = (arsenalTop + 150) + 'px';
                orb.style.left = '50%';
                orb.style.transform = 'translate(-50%, -50%) scale(1.3)';
                orb.style.opacity = 0.7;
            }
            ticking = false;
        }
        window.addEventListener('scroll', () => {
            if (!ticking) { window.requestAnimationFrame(updateOrb); ticking = true; }
        }, {passive: true});
        updateOrb();
    });

