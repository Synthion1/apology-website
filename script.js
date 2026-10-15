document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    setTimeout(function() {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                if (loader) {
                    loader.style.display = 'none';
                }
                if (content) {
                    content.classList.remove('content-hidden');
                    content.classList.add('content-visible');
                }
            }, 500);
        }
    }, 1500);

    const heartBackground = document.querySelector('.heart-background');
    const heartColors = ['#ff6b8b', '#ff8fa3', '#a1c4fd', '#ffb3ba', '#baffc9', '#bae1ff'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.width = heart.style.height = Math.random() * 20 + 15 + 'px';
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.background = color;
        heart.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heartBackground.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }

    setInterval(createHeart, 300);

    const apologyItems = document.querySelectorAll('.apology-item');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    apologyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);

        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 107, 139, 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 107, 139, 0.1)';
        });
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
        "Your forgiveness means everything to me. I'll spend every day proving I'm worthy of your love. Forever yours.",
        "You're amazing. I promise to never let something like this happen again. I love you more than anything."
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
    memoryCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    const letters = document.querySelectorAll('.letter-content p');
    let currentLetter = 0;

    function typeLetter() {
        if (currentLetter < letters.length) {
            const letter = letters[currentLetter];
            const text = letter.textContent.trim();
            letter.textContent = '';
            letter.style.opacity = '1';
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    letter.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    currentLetter++;
                    setTimeout(typeLetter, 1000);
                }
            }, 30);
        }
    }

    function initTyping() {
        letters.forEach(letter => {
            letter.style.opacity = '0';
            letter.textContent = '';
        });
        const letterSection = document.querySelector('.letter-section');
        const letterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeLetter();
                    letterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        letterObserver.observe(letterSection);
    }

    initTyping();

    const apologyList = document.querySelector('.apology-list');
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    apologyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        listObserver.observe(item);
    });

    function createConfettiHearts() {
        const heartEmojis = ['💖', '💕', '💞', '💝', '💘', '💗', '💓', '💌', '🌹', '🌸'];
        const totalHearts = 100;

        for (let i = 0; i < totalHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('confetti-heart');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        });
    }
});

window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
