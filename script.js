// モバイルメニューのトグル機能
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// スライドショー機能
let slideIndex = 0;
const mainSlides = document.querySelectorAll('.slideshow-image');
const slideshowTexts = [
    { title: '国際交流BBQ', subtitle: '友達をつくるきっかけを創出' },
    { title: '日本文化交流', subtitle: '日本の文化をブリスベンに' },
    { title: 'クリスマス会', subtitle: '特別な季節をみんなで祝福' }
];
const slideshowTitleElement = document.getElementById('slideshow-title');
const slideshowSubtitleElement = document.getElementById('slideshow-subtitle');
const totalMainSlides = mainSlides.length;

function showMainSlides() {
    mainSlides.forEach(slide => slide.classList.remove('active'));
    slideIndex++;
    if (slideIndex > totalMainSlides) {
        slideIndex = 1;
    }
    mainSlides[slideIndex - 1].classList.add('active');
    
    // テキストの更新
    slideshowTitleElement.textContent = slideshowTexts[slideIndex - 1].title;
    slideshowSubtitleElement.textContent = slideshowTexts[slideIndex - 1].subtitle;

    setTimeout(showMainSlides, 5000); // 5秒ごとに画像を切り替え
}

document.addEventListener('DOMContentLoaded', showMainSlides);

// Cultureセクションの画像スライドショー機能
let cultureIndex = 0;
const cultureImages = document.querySelectorAll('.culture-image-container img');
const totalCultureImages = cultureImages.length;

function showCultureImage(n) {
    cultureImages.forEach(img => img.classList.remove('active'));
    cultureImages[n].classList.add('active');
}

function nextImage() {
    cultureIndex++;
    if (cultureIndex >= totalCultureImages) {
        cultureIndex = 0;
    }
    showCultureImage(cultureIndex);
}

function prevImage() {
    cultureIndex--;
    if (cultureIndex < 0) {
        cultureIndex = totalCultureImages - 1;
    }
    showCultureImage(cultureIndex);
}

// 翻訳ボタンの切り替え機能
const translateButton = document.getElementById('translate-button');
const mobileTranslateButton = document.getElementById('mobile-translate-button');
let isJapanese = true;

function toggleLanguage() {
    if (isJapanese) {
        translateButton.textContent = 'English';
        mobileTranslateButton.textContent = 'English';
        // ここに英語に切り替えるロジックを実装
        document.documentElement.lang = 'en';
    } else {
        translateButton.textContent = '日本語';
        mobileTranslateButton.textContent = '日本語';
        // ここに日本語に切り替えるロジックを実装
        document.documentElement.lang = 'ja';
    }
    isJapanese = !isJapanese;
}

translateButton.addEventListener('click', toggleLanguage);
mobileTranslateButton.addEventListener('click', toggleLanguage); 