/**
 * Community Brisbane Website
 * Main JavaScript functionality
 */

// 扉形式のモバイルメニューのトグル機能
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    // hiddenクラスの切り替え
    mobileMenu.classList.toggle('hidden');
    
    // メニューボタンのアイコンを変更
    const menuIcon = menuButton.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fas fa-bars text-xl';
        // メニューを閉じるアニメーション
        mobileMenu.style.animation = 'slideOutToTop 0.4s ease-in forwards';
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 400);
    } else {
        menuIcon.className = 'fas fa-times text-xl';
        // メニューを開くアニメーション
        mobileMenu.style.display = 'block';
        mobileMenu.style.animation = 'slideInFromTop 0.6s ease-out forwards';
    }
});

// モバイルメニュー内のリンクをクリックしたときにメニューを閉じる
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const menuIcon = menuButton.querySelector('i');
        menuIcon.className = 'fas fa-bars text-xl';
        
        // メニューを閉じるアニメーション
        mobileMenu.style.animation = 'slideOutToTop 0.4s ease-in forwards';
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 400);
    });
});

// メニュー外をクリックしたときにメニューを閉じる
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const menuIcon = menuButton.querySelector('i');
            menuIcon.className = 'fas fa-bars text-xl';
            
            // メニューを閉じるアニメーション
            mobileMenu.style.animation = 'slideOutToTop 0.4s ease-in forwards';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 400);
        }
    }
});

// スライドショー機能
let slideIndex = 0;
const mainSlides = document.querySelectorAll('.slideshow-image');
const slideshowTexts = [
    { title: { en: 'International Exchange BBQ', ja: '国際交流BBQ' }, subtitle: { en: 'Creating opportunities to make friends', ja: '友達をつくるきっかけを創出' } },
    { title: { en: 'Japanese Culture Exchange', ja: '日本文化交流' }, subtitle: { en: 'Spreading Japanese culture in Brisbane', ja: '日本の文化をブリスベンに。' } },
    { title: { en: 'Christmas Party', ja: 'クリスマス会' }, subtitle: { en: 'Celebrating special seasons', ja: '特別な季節をみんなで祝福。' } }
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

// Cultureセクションの画像切り替え関連のコードを削除
// 以下のコードは削除してください：
// - cultureImages配列
// - currentCultureIndex
// - showCultureImage関数
// - イベントリスナー

// 翻訳機能
let currentLanguage = 'en'; // デフォルトは英語

const translations = {
    ja: {
        'translate-button': 'English',
        'mobile-translate-button': 'English',
        'html-lang': 'ja'
    },
    en: {
        'translate-button': 'japanese',
        'mobile-translate-button': 'japanese',
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

// Cultureセクションの画像手動切り替え機能を根本から修正
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: Culture画像切り替えを初期化中...');
    
    // 要素を取得
    const cultureImages = document.querySelectorAll('.culture-image');
    const cultureNavButtons = document.querySelectorAll('.culture-nav-btn');
    
    console.log('Culture画像数:', cultureImages.length);
    console.log('ナビゲーションボタン数:', cultureNavButtons.length);
    
    if (cultureImages.length === 0 || cultureNavButtons.length === 0) {
        console.error('Culture画像またはナビゲーションボタンが見つかりません');
        return;
    }
    
    let currentIndex = 0;
    
    // 画像を表示する関数
    function showImage(index) {
        console.log('showImage called with index:', index);
        
        // すべての画像を非表示
        cultureImages.forEach((img, i) => {
            img.classList.remove('active');
            img.style.opacity = '0';
            img.style.zIndex = '0';
            console.log(`Image ${i}: opacity set to 0`);
        });
        
        // すべてのボタンからactiveクラスを削除
        cultureNavButtons.forEach((btn, i) => {
            btn.classList.remove('active');
            btn.style.background = 'rgba(255, 255, 255, 0.8)';
            btn.style.color = '#6b7280';
            btn.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        });
        
        // 指定された画像を表示
        if (cultureImages[index]) {
            cultureImages[index].classList.add('active');
            cultureImages[index].style.opacity = '1';
            cultureImages[index].style.zIndex = '2';
            console.log(`Image ${index}: opacity set to 1, z-index set to 2`);
        }
        
        // 指定されたボタンをアクティブに
        if (cultureNavButtons[index]) {
            cultureNavButtons[index].classList.add('active');
            cultureNavButtons[index].style.background = '#3b82f6';
            cultureNavButtons[index].style.color = 'white';
            cultureNavButtons[index].style.borderColor = '#3b82f6';
        }
        
        currentIndex = index;
    }
    
    // ナビゲーションボタンにクリックイベントを設定
    cultureNavButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Button ${index} clicked`);
            showImage(index);
        });
        
        // ボタンの初期状態を設定
        if (index === 0) {
            btn.classList.add('active');
            btn.style.background = '#3b82f6';
            btn.style.color = 'white';
            btn.style.borderColor = '#3b82f6';
        }
    });
    
    // 最初の画像を表示
    showImage(0);
    
    console.log('Culture画像切り替えの初期化が完了しました');
}); 

// ロゴのサイズを強制的に設定
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('#about img[src*="logo.png"]');
    logoImages.forEach(img => {
        img.style.width = '160px';
        img.style.height = '160px';
        img.style.maxWidth = '160px';
        img.style.maxHeight = '160px';
        img.style.minWidth = '160px';
        img.style.minHeight = '160px';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
    });
}); 