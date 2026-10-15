document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    setTimeout(function() {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease';
            setTimeout(function() {
                if (loader) {
                    loader.style.display = 'none';
                }
                if (content) {
                    content.classList.remove('content-hidden');
                    content.classList.add('content-visible');
                }
                setInterval(createFloatingHeart, 800);
            }, 600);
        }
    }, 1200);

    const heartBackground = document.querySelector('.memories-section') || document.body;
    const heartColors = ['#c0a2a2', '#a68a8a', '#d4b8b8', '#bf9b9b', '#e1c8c8', '#d6c4d6'];

    let floatingHeartsInit = false;
    const initFloatingHearts = function() {
        if (floatingHeartsInit) return;
        floatingHeartsInit = true;

        const bg = document.createElement('div');
        bg.className = 'heart-bg';
        document.body.appendChild(bg);
    };

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '💗';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 12 + 12) + 'px';
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.color = color;
        heart.style.opacity = (Math.random() * 0.3 + 0.2).toString();
        heart.style.animationDuration = (Math.random() * 8 + 5) + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 13000);
    }

    const apologyItems = document.querySelectorAll('.apology-item');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    apologyItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    const giftButton = document.getElementById('openGift');
    const giftModal = document.getElementById('giftModal');
    const closeBtn = document.querySelector('.close');

    if (giftButton && giftModal) {
        giftButton.addEventListener('click', function() {
            giftModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            createConfettiHearts();
        });
    }

    if (closeBtn && giftModal) {
        closeBtn.addEventListener('click', function() {
            giftModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (giftModal) {
        giftModal.addEventListener('click', function(e) {
            if (e.target === giftModal) {
                giftModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && giftModal.style.display === 'flex') {
            giftModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const yesBtn = document.getElementById('yesForgive');
    const noBtn = document.getElementById('noForgive');
    const responseMessage = document.getElementById('responseMessage');

    const yesMessages = [
        "I'm so happy! I promise to make every day worth it from now on. Thank you for forgiving me, my love. I love you forever.",
        "Your forgiveness means everything to me. I'll spend every days proving I'm worthy of your love. Forever yours.",
        "You're incredible. I promise to never let something like this happen again. I love you more than anything."
    ];

    const noMessages = [
        "I understand. I'll keep trying and proving myself until you're ready. I'll always love you.",
        "I know I still have work to do. I'll wait as long as it takes, because you mean everything to me.",
        "That's okay. I'll keep showing you every day how much you mean to me, until you believe it."
    ];

    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            const msg = yesMessages[Math.floor(Math.random() * yesMessages.length)];
            responseMessage.textContent = msg;
            responseMessage.className = 'response-message response-yes';
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
            createConfettiHearts();
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', function() {
            const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
            responseMessage.textContent = msg;
            responseMessage.className = 'response-message response-no';
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
        });
    }

    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const letters = document.querySelectorAll('.letter-content p');
    let currentLetter = 0;

    function typeLetter() {
        if (currentLetter < letters.length) {
            const letter = letters[currentLetter];
            const text = letter.textContent.trim();
            letter.textContent = '';
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    letter.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    currentLetter++;
                    setTimeout(typeLetter, 500);
                }
            }, 20);
        }
    }

    function initTyping() {
        letters.forEach(letter => {
            letter.style.opacity = '0';
            letter.textContent = '';
        });
        const letterSection = document.querySelector('.letter-section');
        if (letterSection) {
            const letterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeLetter, 500);
                        letterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            letterObserver.observe(letterSection);
        }
    }

    initTyping();

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        timelineObserver.observe(item);
    });

    let confettiCreated = false;

    function createConfettiHearts() {
        if (confettiCreated) return;
        confettiCreated = true;

        const heartEmojis = ['💖', '💕', '💞', '💝', '💘', '💗', '💓', '🌹', '🌸'];
        const totalHearts = 80;

        for (let i = 0; i < totalHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('confetti-heart');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 12 + 12) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }
    }

    window.addEventListener('scroll', function() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;
document.head.appendChild(style);
