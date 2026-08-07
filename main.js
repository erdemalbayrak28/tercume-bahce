const appContainer = document.getElementById('app');

// --- Page Components ---

const LandingPage = `
  <div class="page active" id="landing-page">
    <div class="landing-container">
      <div class="split bahce" data-target="bahce">
        <div class="split-content">
          <h1>Nazay Bahçe</h1>
          <p>Doğanın İçinde Unutulmaz Anlar</p>
          <button class="explore-btn">Keşfet</button>
        </div>
      </div>
      <div class="split tercume" data-target="tercume">
        <div class="split-content">
          <h1>Nazay Tercüme</h1>
          <p>Profesyonel ve Güvenilir Dil Hizmetleri</p>
          <button class="explore-btn">İncele</button>
        </div>
      </div>
    </div>
  </div>
`;

const BahcePage = `
  <div class="page bahce-page" id="bahce-page">
    <header class="header">
      <button class="back-btn" data-target="landing">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Ana Sayfa
      </button>
      <div style="font-size: 1.5rem; font-weight: 700; font-family: 'Outfit', sans-serif;">Nazay Bahçe</div>
    </header>
    
    <section class="hero">
      <div class="hero-content">
        <h1>Üsküdar'ın Kalbinde,<br>Doğayla İç İçe</h1>
        <p>Nişan, kına, iftar organizasyonları ve özel davetleriniz için ferah atmosferi, üstün temizlik anlayışı ve merkezi konumuyla hizmetinizdeyiz.</p>
        <button class="btn btn-primary" onclick="window.location.href='mailto:info@nazay.com'">Rezervasyon Yap</button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Neden Nazay Bahçe?</h2>
      <div class="grid">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600" alt="Davet" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Özel Organizasyonlar</h3>
            <p>Nişan, kına, sünnet, doğum günü ve özel günleriniz için tam kapsamlı ve profesyonel mekan hizmeti.</p>
          </div>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600" alt="Ferah Atmosfer" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Ferah ve Temiz Ortam</h3>
            <p>Doğal havalandırmalı, hijyen standartlarına uygun, geniş ve ferah davet alanları.</p>
          </div>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600" alt="Ulaşım" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Merkezi Konum</h3>
            <p>Üsküdar'da yer alan mekanımız, toplu taşımaya ve ana arterlere son derece yakın konumdadır.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
`;

const TercumePage = `
  <div class="page tercume-page" id="tercume-page">
    <header class="header">
      <button class="back-btn" data-target="landing">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Ana Sayfa
      </button>
      <div style="font-size: 1.5rem; font-weight: 700; font-family: 'Outfit', sans-serif;">Nazay Tercüme</div>
    </header>
    
    <section class="hero">
      <div class="hero-content">
        <h1>Global İletişimde<br><span>Güvenilir Çözüm Ortaklığınız</span></h1>
        <p>Üsküdar merkezli Nazay Tercüme Dil Hizmetleri Ltd. Şti. olarak tüm dünya dillerinde profesyonel, hızlı ve yeminli tercüme hizmetleri sunuyoruz.</p>
        <button class="btn btn-primary" onclick="window.location.href='mailto:info@nazay.com'">Hemen Teklif Al</button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Hizmetlerimiz</h2>
      <div class="grid">
        <div class="card">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" alt="Yazılı Tercüme" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Yazılı Tercüme</h3>
            <p>Hukuki, tıbbi, akademik, teknik ve ticari metinleriniz uzman tercümanlarımız tarafından özenle çevrilir.</p>
          </div>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Sözlü Tercüme" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Sözlü Tercüme</h3>
            <p>Ardıl ve simültane çeviri ihtiyaçlarınızda profesyonel ekiplerimizle etkinliklerinize değer katıyoruz.</p>
          </div>
        </div>
        <div class="card">
          <img src="https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=600" alt="Noter Onaylı" class="card-img">
          <div class="card-body">
            <h3 class="card-title">Noter Onaylı Çeviri</h3>
            <p>Resmi evraklarınız (diploma, vekaletname, sözleşme) yeminli tercüman kaşeli ve noter onaylı olarak hazırlanır.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
`;

// --- Routing & Transitions ---

const routes = {
  landing: LandingPage,
  bahce: BahcePage,
  tercume: TercumePage
};

let currentPage = 'landing';

function renderPage(pageKey) {
  const currentDOMPage = document.querySelector('.page.active');
  
  // Transition out
  if (currentDOMPage) {
    currentDOMPage.classList.remove('active');
    setTimeout(() => {
      loadNewPage(pageKey);
    }, 600); // matches --transition-speed
  } else {
    loadNewPage(pageKey);
  }
}

function loadNewPage(pageKey) {
  appContainer.innerHTML = routes[pageKey];
  currentPage = pageKey;
  
  // Need a tiny timeout to ensure DOM is updated before adding active class for transition to trigger
  setTimeout(() => {
    const newPage = document.querySelector('.page');
    if (newPage) {
      newPage.classList.add('active');
    }
    attachEventListeners();
  }, 50);
}

function attachEventListeners() {
  if (currentPage === 'landing') {
    const splits = document.querySelectorAll('.split');
    splits.forEach(split => {
      split.addEventListener('click', () => {
        const target = split.getAttribute('data-target');
        if(target === 'tercume') {
          window.location.href = './nazay/index.html';
        } else if(target === 'bahce') {
          window.location.href = './nazay bahce/index.html';
        } else if(target) {
          renderPage(target);
        }
      });
    });
  } else {
    const backBtns = document.querySelectorAll('.back-btn');
    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if(target) renderPage(target);
      });
    });
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  renderPage('landing');
});
