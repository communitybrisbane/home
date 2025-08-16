/**
 * Community Brisbane Website
 * Main JavaScript functionality
 */

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
    { title: { en: 'International Exchange BBQ', ja: '国際交流BBQ' }, subtitle: { en: 'Creating opportunities to make friends', ja: '友達をつくるきっかけを創出' } },
    { title: { en: 'Japanese Culture Exchange', ja: '日本文化交流' }, subtitle: { en: 'Spreading Japanese culture in Brisbane', ja: '日本の文化をブリスベンに広めます。' } },
    { title: { en: 'Christmas Party', ja: 'クリスマス会' }, subtitle: { en: 'Celebrating special seasons together', ja: '特別な季節をみんなで祝います。' } }
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
    
    // テキストの更新（現在の言語に応じて）
    const currentLang = document.documentElement.lang;
    slideshowTitleElement.textContent = slideshowTexts[slideIndex - 1].title[currentLang];
    slideshowSubtitleElement.textContent = slideshowTexts[slideIndex - 1].subtitle[currentLang];

    setTimeout(showMainSlides, 5000); // 5秒ごとに画像を切り替え
}

document.addEventListener('DOMContentLoaded', showMainSlides);

// Cultureセクションの画像スライドショー機能（自動切り替え）
let cultureIndex = 0;
const cultureImages = document.querySelectorAll('.culture-image');
const totalCultureImages = cultureImages.length;

function showCultureImage(n) {
    // すべての画像からactiveクラスを削除
    cultureImages.forEach(img => {
        img.classList.remove('active');
        img.style.zIndex = '0';
    });
    
    // 指定された画像にactiveクラスを追加し、z-indexを設定
    if (cultureImages[n]) {
        cultureImages[n].classList.add('active');
        cultureImages[n].style.zIndex = '1';
    }
}

function nextCultureImage() {
    cultureIndex++;
    if (cultureIndex >= totalCultureImages) {
        cultureIndex = 0;
    }
    showCultureImage(cultureIndex);
}

// 自動切り替えの開始
function startCultureSlideshow() {
    if (cultureImages.length > 0) {
        // 3秒ごとに画像を切り替え
        setInterval(nextCultureImage, 3000);
    }
}

// ギャラリー機能の改善
function goToImage(index) {
    const images = document.querySelectorAll('.gallery-image');
    const indicators = document.querySelectorAll('.gallery-indicator');
    
    // すべての画像とインジケーターを非アクティブに
    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 指定された画像とインジケーターをアクティブに
    images[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // インジケーターのスタイルを更新
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('bg-white/80');
            indicator.classList.remove('bg-white/60');
        } else {
            indicator.classList.remove('bg-white/80');
            indicator.classList.add('bg-white/60');
        }
    });
    
    cultureIndex = index;
}

// 翻訳機能
let currentLanguage = 'en'; // デフォルトは英語

const translations = {
    ja: {
        'translate-button': 'English',
        'mobile-translate-button': 'English',
        'html-lang': 'ja'
    },
    en: {
        'translate-button': '日本語',
        'mobile-translate-button': '日本語',
        'html-lang': 'en'
    }
};

function translatePage(language) {
    currentLanguage = language;
    
    // HTMLのlang属性を更新
    document.documentElement.lang = language;
    
    // 翻訳ボタンのテキストを更新
    const translateButton = document.getElementById('translate-button');
    const mobileTranslateButton = document.getElementById('mobile-translate-button');
    
    if (translateButton) translateButton.textContent = translations[language]['translate-button'];
    if (mobileTranslateButton) mobileTranslateButton.textContent = translations[language]['mobile-translate-button'];
    
    // データ属性を持つ要素を翻訳
    const elementsToTranslate = document.querySelectorAll('[data-en][data-ja]');
    elementsToTranslate.forEach(element => {
        if (language === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ja');
        }
    });
    
    // スライドショーのテキストも更新
    if (slideshowTitleElement && slideshowSubtitleElement) {
        slideshowTitleElement.textContent = slideshowTexts[slideIndex - 1].title[language];
        slideshowSubtitleElement.textContent = slideshowTexts[slideIndex - 1].subtitle[language];
    }
}

// 翻訳ボタンの切り替え機能
const translateButton = document.getElementById('translate-button');
const mobileTranslateButton = document.getElementById('mobile-translate-button');

function toggleLanguage() {
    if (currentLanguage === 'en') {
        translatePage('ja');
    } else {
        translatePage('en');
    }
}

translateButton.addEventListener('click', toggleLanguage);
mobileTranslateButton.addEventListener('click', toggleLanguage);

// ページ読み込み時に英語で初期化
document.addEventListener('DOMContentLoaded', () => {
    translatePage('en');
}); 

// ページ読み込み時にCULTURE画像の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 既存の初期化処理
    translatePage('en');
    
    // CULTURE画像の初期化
    if (cultureImages.length > 0) {
        showCultureImage(0);
        startCultureSlideshow(); // 自動切り替えを開始
    }
}); 