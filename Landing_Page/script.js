/**
 *  =========================================================================================
 *  🚀 AEROSTREET LANDING PAGE - INTERACTIVE SCRIPT
 *  =========================================================================================

 *  👤 Author       : Winanda Dev
 *  📅 Year         : 2026
 *  📦 Description  : Main script for managing Aerostreet landing page interactions.
 *                    Delivers a dynamic and responsive user experience.

 *  ✨ MAIN FEATURES :
 *  ---------------------------------------------------------------------------------------
 *  1. 📱 Mobile Navigation   : Responsive menu with smooth toggle & dropdown animation.
 *  2. 🏎️ Product Slider     : Swiper.js configuration with autoplay & responsive breakpoints.
 *  3. 🚚 Truck Animation    : 'Add to Cart' button animation (GSAP) & cart counter logic.
 *  4. 📅 Dynamic Utility    : Automatically updates the copyright year in the footer.
 *  5. ⚙️ Global Handlers    : Window resize events & developer credit display control.
 *  6. 🛡️ Content Protection : Blocks right-click & inspect element for security.
 *  7. 🔔 Notification Popup : Visual notification logic when items are added.
 *  8. 💾 Scroll Restoration : Restores scroll position & animation state.
 *  9. 🎭 Scroll Animation   : Initializes AOS (Animate On Scroll) with adaptive offset.

 *  🛠️ Library :
 *     - Swiper.js (Slider)
 *     - AOS (Animate On Scroll)
 *     - GSAP (GreenSock Animation Platform)

 *  =========================================================================================
 */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileDropdown = document.getElementById("mobileDropdown");

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const phone = document.getElementById("phone")?.value.trim() || "";
        const subject = document.getElementById("subject")?.value.trim() || "New contact form submission";
        const message = document.getElementById("message")?.value.trim() || "";
        const recipient = "harishtingirikar2021@gmail.com";

        const mailBody = [
            "Full Name: " + name,
            "Email: " + email,
            "Phone Number: " + phone,
            "",
            "Subject: " + subject,
            "",
            "Message:",
            message
        ].join("%0D%0A");

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${mailBody}`;

        window.location.href = mailtoLink;
        contactForm.reset();
    });
}

/**
 * ============================================================================
 *  1. MOBILE NAVIGATION LOGIC
 *  Mengatur interaksi menu hamburger dan dropdown pada perangkat mobile.
 * ============================================================================
 */
mobileMenuBtn.addEventListener("click", function () {
    mobileMenuBtn.classList.toggle("active");
    
    if (mobileDropdown.classList.contains("active")) {
        mobileDropdown.classList.add("closing");
        
        setTimeout(function() {
            mobileDropdown.classList.remove("active");
            mobileDropdown.classList.remove("closing");
        }, 300);
    } else {
        mobileDropdown.classList.add("active");
    }
});

const mobileMenuLinks = document.querySelectorAll(".Mobile-Menu li a");
mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
        mobileDropdown.classList.add("closing");
        mobileMenuBtn.classList.remove("active");
        
        setTimeout(function() {
            mobileDropdown.classList.remove("active");
            mobileDropdown.classList.remove("closing");
        }, 300);
    });
});

/**
 * ============================================================================
 *  1.5 ACTIVE NAVBAR LINK HIGHLIGHTING
 *  Highlights the navbar link based on the current section being viewed.
 * ============================================================================
 */
const navLinks = document.querySelectorAll(".Menu li a, .Mobile-Menu li a");

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        const targetId = link.getAttribute("href");
        
        if (targetId.startsWith("#")) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add("active");
                }
            }
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
document.addEventListener("DOMContentLoaded", updateActiveLink);

/**
 * ============================================================================
 *  1.6 FAQ ACCORDION LOGIC
 *  Toggles FAQ answers and keeps the expanded state accessible.
 * ============================================================================
 */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((faqItem) => {
    const faqQuestion = faqItem.querySelector('.faq-question');

    if (!faqQuestion) return;

    faqQuestion.setAttribute('aria-expanded', faqItem.classList.contains('active'));

    faqQuestion.addEventListener('click', () => {
        const isActive = faqItem.classList.contains('active');

        faqItems.forEach((item) => {
            item.classList.remove('active');
            item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
            faqItem.classList.add('active');
            faqQuestion.setAttribute('aria-expanded', 'true');
        }
    });
});

/**
 * ============================================================================
 *  2. PRODUCT SLIDER CONFIGURATION (SWIPER.JS)
 *  Inisialisasi carousel produk dengan setting responsif dan autoplay.
 * ============================================================================
 */
const swiper = new Swiper('.Products-Swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    observer: true,
    observeParents: true,

    // Perbaikan: Refresh AOS saat Swiper selesai inisialisasi
    on: {
        init: function() {
            setTimeout(function() {
                if (typeof AOS !== 'undefined') AOS.refresh();
            }, 500);
        }
    },

    // Autoplay configuration
    autoplay: {
        delay: 2000, // 2 detik
        disableOnInteraction: true, // Hentikan autoplay setelah interaksi pengguna
        pauseOnMouseEnter: true, // Jeda autoplay saat kursor berada di atas slider
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        // jika lebar layar >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // jika lebar layar >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // jika lebar layar >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

/**
 * ============================================================================
 *  4. UTILITY & DYNAMIC DATA
 *  Fungsi-fungsi pembantu untuk data dinamis (Tahun Copyright).
 * ============================================================================
 */
const Year = document.getElementById('copyright-year');
if (Year) {
    Year.textContent = new Date().getFullYear();
}

/**
 * ============================================================================
 *  5. GLOBAL EVENT HANDLERS
 *  Listener untuk resize window dan scroll (Responsive adjustments).
 * ============================================================================
 */
window.addEventListener('resize', function() {
    if (swiper) {
        swiper.update();
        if (!document.querySelector('.truck-button.animation')) {
            swiper.autoplay.start();
        }
    }
    // Beri sedikit jeda agar refresh dilakukan setelah layout benar-benar stabil
    setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 200);
});

// Logika untuk menyembunyikan credit developer saat footer terlihat
window.addEventListener('scroll', function() {
    const footerSection = document.querySelector('.Footer-Section');
    const devCredit = document.querySelector('.Dev-Credit');

    if (!footerSection || !devCredit) return;

    const footerTop = footerSection.offsetTop;
    const windowBottom = window.scrollY + window.innerHeight;

    if (windowBottom > footerTop) {
        devCredit.style.display = 'none';
    } else {
        devCredit.style.display = 'block';
    }
});

/**
 * ============================================================================
 *  6. CONTENT PROTECTION (ANTI-INSPECT)
 *  Mencegah klik kanan dan shortcut keyboard untuk Developer Tools.
 * ============================================================================
 */
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    // Mencegah tombol F12
    if (e.keyCode === 123) {
        e.preventDefault();
    }
    // Mencegah Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
    }
    // Mencegah Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
});

/**
 * ============================================================================
 *  9. ANIMATE ON SCROLL (AOS) SETUP
 *  Konfigurasi animasi scroll dengan penyesuaian untuk berbagai ukuran layar.
 *  (Moved here to run after restoration logic)
 * ============================================================================
 */
var screenWidth = window.innerWidth;

// Untuk device destop
var aosOffset = 100;
var aosDuration = 1000;

// Untuk device mobile
if (screenWidth < 768) {
    aosOffset = 50;
    aosDuration = 600;
// Untuk device tablet
} else if (screenWidth >= 768 && screenWidth <= 1024) {
    aosOffset = 80;
    aosDuration = 800;
}

AOS.init({
    duration: aosDuration,
    once: true,
    offset: aosOffset,
    easing: 'ease-out-cubic',
    anchorPlacement: 'top-bottom'
});

window.addEventListener('load', function() {
    AOS.refresh();
    const savedScrollPos = sessionStorage.getItem('aerostreet_scrollPos');
    const savedAnimatedIndices = JSON.parse(sessionStorage.getItem('aerostreet_animatedIndices') || '[]');

    // Jika ada posisi tersimpan dan user datang dari halaman cart
    if (savedScrollPos) {
        // Gunakan behavior 'instant' agar terasa tidak di-refresh (langsung lompat)
        window.scrollTo({ top: parseInt(savedScrollPos), behavior: 'instant' });
        
        // Restore status animasi AOS
        const aosElements = document.querySelectorAll('[data-aos]');
        const windowHeight = window.innerHeight;

        aosElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            // Jika elemen sudah teranimasi sebelumnya ATAU berada di viewport/di atasnya saat ini
            const shouldSkip = savedAnimatedIndices.includes(index) || (rect.top < windowHeight);

            if (shouldSkip) {
                el.classList.add('aos-animate');
                // Disable transisi sesaat agar instan
                el.style.setProperty('transition-duration', '0s', 'important');
                el.style.setProperty('transition-delay', '0s', 'important');
                
                setTimeout(() => {
                    el.style.removeProperty('transition-duration');
                    el.style.removeProperty('transition-delay');
                }, 500);
            }
        });

        // Force refresh AOS untuk sinkronisasi
        setTimeout(() => {
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 100);

        // Bersihkan data setelah dipakai agar tidak mengganggu
        sessionStorage.removeItem('aerostreet_scrollPos');
        sessionStorage.removeItem('aerostreet_animatedIndices');
    } else {
        // Jika user melakukan refresh manual (tidak ada data posisi tersimpan), paksa ke atas
        window.scrollTo(0, 0);
    }
});