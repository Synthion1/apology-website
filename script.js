document.addEventListener('DOMContentLoaded', function() {
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
