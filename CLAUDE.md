# yazz Yıldızburnu

Tek sayfalık restoran web sitesi — Çeşme / İzmir. Saf HTML + CSS + JS (React yok).

## Yapı
```
index.html
css/{variables,reset,typography,layout,components,sections,animations}.css
css/{mountain-scene,reviews,review-cards,mobile-reviews}.css
css/{mobile-base,mobile-nav,mobile-hero,mobile-about,mobile-quote,mobile-menu,mobile-gallery,mobile-experience,mobile-contact,mobile-hero-mountain}.css
js/{main,interactions,mobile,mountain-scene,review-cards}.js
img/
```

## Kurallar
- `data-tr` / `data-en` ile TR/EN dil desteği koru
- Renkler her zaman `var(--primary)` vb. CSS değişkeni — hardcode renk yazma
- Scroll reveal: `.rv` `.rv-l` `.rv-r` `.rv-s` sınıfları
- Breakpoint'ler: 1024px · 768px · 480px
- Nav logosu: `img/logo.png` (mix-blend-mode:multiply)
- Hero shader: `#shader-mount` — tam viewport gradyan (`shaderShift` 9s), clip-path scroll animasyonu henüz implemente edilmemiş

## CSS Değişkenleri (variables.css)

### Marka Renkleri
- `--primary: #005b7f` · `--primary-dark: #003d57` · `--primary-light: #1a7a9e`
- `--secondary: #C0C0C0` (gümüş) · `--accent: #B8622E` (terracotta)
- `--neutral: #f5f5f5` · `--warmth: #FFA500` (amber)
- Teal aliases: `--teal`, `--teal-d`, `--teal-l`
- Primary scale: `--primary-50` … `--primary-900` (10 ton)
- Neutral scale: `--neutral-50` … `--neutral-900` (10 ton)
- Legacy palette: `--beige`, `--beige2`, `--cream`, `--deep`, `--deep2`, `--warm`, `--warm-l`, `--sand`, `--silver`

### Tipografi Değişkenleri
- `--fd: 'Cormorant Garamond', Georgia, serif` — başlık/display
- `--fs: 'Dancing Script', cursive` — imza/script
- `--fb: 'Jost', system-ui, sans-serif` — gövde/UI
- Google Fonts `<link>` ile yükleniyor: Cormorant 300/400/500 normal+italic · Jost 300-600 · Dancing Script 600/700

### Sistem Token'ları
- **Gölge:** `--shadow-sm` … `--shadow-2xl` (6 seviye)
- **Boşluk:** `--space-1` … `--space-20` (4px tabanlı, 20 değer)
- **Z-Index:** `--z-base` · `--z-above` · `--z-nav` · `--z-overlay` · `--z-modal` · `--z-toast`
- **Süre:** `--dur-fast:150ms` · `--dur-base:300ms` · `--dur-slow:500ms` · `--dur-enter:700ms`
- **Easing:** `--ease: cubic-bezier(.16,1,.3,1)` (spring) · `--ease-out: cubic-bezier(.4,0,.2,1)` (material)
- **Radius:** `--radius-sm:4px` · `--radius-md:8px` · `--radius-lg:12px` · `--radius-xl:20px` · `--radius-pill:100px` · `--radius-organic:clamp(80px,14vw,160px)`

### Review & Mountain
- `--mountain-h: 42vh` — Three.js canvas yüksekliği
- `--review-card-bg: rgba(255,255,255,0.08)` — kart arka plan
- `--star-color: #f59e0b` — yıldız rengi

## Animasyon Sistemi (animations.css)

### Reveal Sınıfları
- `.rv` → opacity 0→1, translateY(32px)→none, 0.85s `--ease`
- `.rv-l` → opacity 0→1, translateX(-32px)→none, 0.9s (soldan kayma)
- `.rv-r` → opacity 0→1, translateX(32px)→none, 0.9s (sağdan kayma)
- `.rv-s` → opacity 0→1, scale(0.95)→none, 0.9s (ölçek içe)
- `[data-d="1..5"]` → 0.1s–0.5s gecikme yardımcıları

### Keyframe'ler
`shaderShift` (background-position 0%→100%→0%, 9s) · `fu` (fade-up) · `fu-r` (fade-right)
`rot` (0→360deg, hero badge) · `sp` (scroll indicator nabız 35%–90% opacity)
`mq` (marquee translateX(-50%)) · `wap` (WhatsApp yeşil box-shadow nabzı)
`mountainFadeIn` (opacity 0→1, Three.js canvas)

### Hero Stagger (hero-revealed sonrası)
| Eleman | Gecikme |
|--------|---------|
| `.hero-eyebrow` | 0.50s |
| `.hero-brand-wrap` | 0.60s |
| `.hero-right` | 0.55s |
| `.hero-location` | 0.70s |
| `.hero-tagline` | 0.82s |
| `.hero-acts` | 0.94s |
| `.scroll-ind` | 1.10s |

### Hero State'leri
- `#home` başlangıç: tüm içerik `opacity:0; transform:translateY(28px)`
- `#home.hero-revealed` → gecikme tablosuyla görünür
- `#home.hero-ready` → 1400ms sonra eklenir, gecikmeleri sıfırlar
- `#home.hero-out` → bottom < %25vh iken içerik gizlenir; bottom > %35vh → geri açılır

### Erişilebilirlik
`@media (prefers-reduced-motion: reduce)` tüm geçiş sürelerini sıfırlar

## Section Sırası (index.html)
`#home` → `#about` → `#menu` → `#gallery` → **`#experience`** → **`#reviews`** → `#contact`

## Menü Sistemi (güncel yapı)
2 ana tab: `data-tab="yiyecek"` → `#tab-yiyecek` · `data-tab="icecek"` → `#tab-icecek`

**Tab JS:** `interactions.js` — 1=Burger 2=Menu Tabs+subnav+defaults 3=Subnav TAB switching 4=Alkol accordion 5=Gallery

**Subnav:** `.subnav#subnav-yiyecek` (sticky top:72px) / `#subnav-icecek` (başlangıçta gizli)
- `.snav[data-scroll="sec-x"]` tıklanınca: sibling `.menu-group`lar gizlenir, `#sec-x` gösterilir (sub-tab)
- `.snav-sub` (alkol alt kategori) tıklanınca: sadece sub-butonların `.act`'i güncellenir, accordion açık kalır
- Üst seviye buton (Soft/Kahve) tıklanınca: TÜM `.snav`'dan `.act` kaldırılır + accordion kapatılır
- `.snav-alkol` tıklanınca: `#alkol-sub` accordion açılır + `#sec-alkol` gösterilir + ilk alt kategori aktif

**Subnav default aktif:** `sec-sabah` (Yiyecekler) · `sec-soft` (İçecekler) · `sec-klasik` (Alkol açıldığında)

**Yiyecekler panel section ID'leri:** `sec-sabah`* · `sec-atistirmalik` · `sec-salata` · `sec-denizden` · `sec-ana`

**İçecekler panel section ID'leri:** `sec-soft`* · `sec-kahve` · `sec-alkol` (üst)
→ alkol altı: `sec-klasik`* · `sec-imza` · `sec-spritz` · `sec-vodka` · `sec-shot` · `sec-viski` · `sec-gin` · `sec-sampanya` · `sec-sarap`
→ sec-sarap içi 6 grup (`.menu-subhead-sub`): Kırmızı Kadeh · Beyaz Kadeh · Blush ve Rosé Kadeh · Kırmızı Şişe · Beyaz Şişe · Blush ve Rosé Şişe
(*= HTML'de başlangıçta `.act` class'ı var)

**Menü ürün grid kalıbı:** `.mgrid` > `.mi rv[data-d="n"]` > `.mi-head` > `h3.mi-name` · `data-d` stagger her bölümde 0'dan başlar
**Bölüm içi alt başlık:** `.menu-subhead-sub rv` > `span[data-tr][data-en]`

**CSS sınıfları** (`components.css` ~satır 535):
`.subnav` · `.snav` · `.snav-alkol` · `.snav-sub` · `.alkol-sub` · `.menu-group` (display:none default) · `.menu-group.act` (display:block) · `.menu-subhead` · `.menu-subhead-sub`

**Nav yüksekliği:** 86px (normal) / 72px (scroll) · sticky subnav `top: 72px`

## Hero — Mountain Scene (Three.js)
- CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">` `<head>`'de
- Canvas container: `#mountain-mount` (`.hero-sticky` içinde, `.scroll-ind`'den sonra)
- HTML sırası (`.hero-sticky` içi): `#shader-mount` → `.hero-bg-text` → `.brush-hero` → `.hero-inner` → `.scroll-ind` → `#mountain-mount`
- z-index stack: `#shader-mount`(0) → `#mountain-mount`(1) → `.hero-inner`(2) — z-index ataması HTML sırasından bağımsız CSS ile yapılır
- JS: `js/mountain-scene.js` → `window.initMountainScene()` · `main.js`'de çağrılır
- CSS: `css/mountain-scene.css` + `css/mobile-hero-mountain.css`
- GLSL: `mod289v3` / `mod289v4` adlandırması kullanılır (r128'de overload yasak)
- IntersectionObserver ile hero görünmeyince RAF pause edilir (`interactions.js` sonunda IIFE)
- `window.mountainScene = { pause, resume, destroy }` public API

## Misafir Yorumları Section (#reviews)
**Konum:** `#gallery` kapandıktan sonra, `#contact`'tan önce

**3 Gerçek Google Yorumu:**
| Kart | Kullanıcı | Resim | Tarih |
|------|-----------|-------|-------|
| 1 | Merve | `img/deniz-masa.png` | 8 ay önce |
| 2 | Uğur (2 yorum · 3 fotoğraf) | `img/sarap-gece.png` | 11 ay önce |
| 3 | Büşra Sevben (Yerel Rehber · 18 yorum) | `img/ic-mekan.png` | 6 ay önce |

Her kart: Yiyecek 5/5 · Hizmet 5/5 · Atmosfer 5/5

**HTML yapısı:**
```
.reviews-sec.sec-pad#reviews
  .reviews-bgtxt (aria-hidden)
  .ctr → .sec-label.rv · h2.sec-h.rv · .divider.rv
  .ctr.reviews-g
    .rcard.rv[data-d="1..3"]
      .rcard-inner
        img.rcard-img · .rcard-overlay · .rcard-content
          .rcard-header → .rcard-stars · p.rcard-text · a.rcard-link
          .rcard-foot → .rcard-author(.rcard-name + .rcard-badge + .rcard-date) · .rcard-scores
```

**CSS dosyaları:**
- `css/reviews.css` — section layout, `.reviews-g { perspective: 1400px; perspective-origin: 50% 30% }`
- `css/review-cards.css` — tüm `.rcard*` stilleri, 3D tilt sistemi
- `css/mobile-reviews.css` — 768px→2 sütun, 480px→1 sütun, `@media(hover:none)` tilt devre dışı

**JS:** `js/review-cards.js` → `window.initReviewCards()` · `main.js`'de çağrılır · 3D efekt tamamen CSS

**3D Tilt Sistemi (CSS-only, JS yok):**
- `perspective: 1400px` → `.reviews-g` üzerinde (ortak vanishing point)
- Dinlenme hali: `rotateX(6-7deg)` — her zaman hafif 3D görünüm
  - Kart 1: `rotateX(6deg) rotateY(3deg)` · Kart 2: `rotateX(7deg)` · Kart 3: `rotateX(6deg) rotateY(-3deg)`
- Hover: `rotateX(-6/-8deg) rotateY(±10deg) translateY(-10px)`
- `.rcard-inner` hover: `translateZ(40px)` + derin gölge
- **ÖNEMLİ:** `.rv.on { transform: none }` çakışması — yüksek özgüllüklü seçici gerekir:
  `.reviews-g .rcard:nth-child(n).rv.on` (4 class) → `.rv.on` (2 class)'ı override eder
- Mobil override: tüm hover/tilt state'leri tek tek liste halinde `@media(hover:none)`'da sıfırlanır
- `transform-style: preserve-3d` zorunlu `.rcard` üzerinde — yoksa `translateZ` görünmez

**Stagger:** `animations.css`'de `.reviews-g .rcard:nth-child(1/2/3)` ile `transition-delay`
(data-d değil nth-child — `reviews.css` yüksek özgüllüklü override'larla çakışmaz)

## mobile.js (≤430px)

Yalnızca `window.matchMedia('(max-width: 430px)').matches` koşulunda çalışır (iPhone 15 ve altı).

1. **Galeri touch swipe** — `.gal-grid` üzerinde touchstart/touchmove ile yatay momentum kaydırma
2. **Kart dokunma geri bildirimi** — `.feat`, `.stat`, `.mi` öğelerinde touchstart → `opacity:.82`, touchend → geri al (150ms)
3. **Menü tab merkez hizalama** — `.mtab` tıklanınca `scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'})`

## Script Yükleme Sırası (body sonu)
```html
<script src="leaflet.js">
<script src="js/mountain-scene.js">
<script src="js/review-cards.js">
<script src="js/main.js" defer>
<script src="js/interactions.js" defer>
<script src="js/mobile.js" defer>
```

## Bölüm İçerikleri (index.html)

### #about (~satır 170)
- Görsel: `img/ic-mekan.png`
- Başlık: "Ege'nin ruhu tabağınızda."
- Badge: "365 Gün Açık" (`animation: rot 20s linear infinite`)
- 4 özellik: Günlük Taze Balık · Curated Wine · Deniz Manzarası · À La Carte

### #gallery (~satır 515)
- 8 resim: `deniz-masa` · `deniz-urunu` · `bar-detail` · `sarap-gece` · `ic-mekan` · `lounge` · `kokteyl-1` · `kokteyl-2`
- Lightbox: `interactions.js` IIFE, `.gi` tıklanınca overlay açar (`role="dialog" aria-modal="true"`)
  - ESC tuşu + overlay arka plan tıklaması ile kapatılır; `.gi-ph` yer tutucu hücreler hariç tutulur

### #experience (~satır 536)
- index.html:536-561 arası — nav'da link yok, ayrı bir bölüm olarak sayfada mevcut

### #contact (~satır 679)
- **Form yok** — yalnızca bilgi gösterimi
- Adres: 5253 Sok. No:13, Ilıca Mah., Çeşme, İzmir · Telefon: +90 507 930 63 44
- Saatler: Her gün 12:00–00:00 · E-posta: info@yazzrestaurant.com
- Harita: Leaflet@1.9.4, CartoDB Positron tiles, koordinat: 38.312053, 26.357127, zoom:16

## main.js — Scroll Listener Davranışları
```js
// scrollY > 50  → nav.classList.add('sc')         (küçük nav modu)
// scrollY > 25  → heroRevealed = true
//                → hero.classList.add('hero-revealed')
//                → setTimeout(1400ms) → hero.classList.add('hero-ready')
// bottom < vh*0.25 → hero.classList.add('hero-out')    (hero görünümden çıktı)
// bottom > vh*0.35 → hero.classList.remove('hero-out') (hero geri döndü)
```

`window.revealObs = revealObs` — `interactions.js`'nin tab geçişlerinde yeniden kullanması için export edilir.
**Re-observe pattern:** Tab/subnav geçişinde görünür hale gelen öğelerden `.on` kaldırılıp `revealObs.observe(el)` tekrar çağrılır → reveal animasyonları yeniden tetiklenir.

## interactions.js — Bölüm Listesi
1. Burger menü
2. Menü tab'ları + subnav + default'lar
3. Subnav TAB geçişi (re-observe dahil)
4. Alkol accordion
5. Galeri lightbox (dynamic overlay IIFE, `.gi` öğeleri, ESC+click kapatma)
6. Mountain scene IntersectionObserver (threshold:0.05 → `mountainScene.pause/resume`)

## main.js Çağrı Sırası
```js
// 4. MOUNTAIN SCENE
if (typeof initMountainScene === 'function') initMountainScene();
// 5. REVIEW CARDS
if (typeof initReviewCards === 'function') initReviewCards();
```

## Sayfa Yenileme / Scroll Restoration

**Her yenilemede tam ekran açılış deneyimi (mavi + shader + logo) gösterilir.**

Üç katmanlı çözüm (`index.html` head inline script + `js/main.js` başı):
```html
<!-- index.html <head> — inline script, defer'den önce çalışır -->
<script>
  history.scrollRestoration = 'manual';                          /* session scroll geri yüklemeyi devre dışı bırakır */
  if (location.hash) history.replaceState(null, '', location.pathname); /* #menu gibi hash'leri temizler, browser native scroll'u önler */
</script>
```
```js
// js/main.js — ilk satır
window.scrollTo({ top: 0, behavior: 'instant' }); // 'smooth' değil — reset.css'te scroll-behavior:smooth var
```

**`#logoSplash` davranışı:** Her sayfa yüklemesinde görünür (sessionStorage kullanma).
`done` flag'i IIFE closure'ındadır — reload'da sıfırlanır. Kullanıcı 25px scroll yaparsa
logo nav'a uçar + `.hero-revealed` eklenir → hero içeriği görünür.

**Z-index yığını:** `#shader-mount`(0) → `#mountain-mount`(1) → `.hero-inner`(2) → `.nav`(100) → `#logoSplash`(200)

## Güvenlik & CDN

**CSP Meta Tag** (`index.html` head):
- `script-src 'self' cdnjs.cloudflare.com unpkg.com esm.sh 'unsafe-inline'`
- `style-src 'self' fonts.googleapis.com unpkg.com 'unsafe-inline'`
- `font-src fonts.gstatic.com` · `img-src 'self' data: https:` · `connect-src 'self' basemaps.cartocdn.com`

**SRI Hash'leri:**
- Three.js r128 JS: `sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==`
- Leaflet@1.9.4 JS: `sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=`
- Leaflet@1.9.4 CSS: `sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=`

## Bilinen Tuzaklar
- `.rv.on { transform: none }` her 3D transform'u sıfırlar → section-specific override zorunlu
- `translateZ` rotasyon olmadan görünmez → `perspective` + `rotateX/Y` mutlaka gerekli
- Three.js r128: GLSL `mod289` overload yasak → `mod289v3` / `mod289v4` kullan
- CSS `transition: transform` + JS RAF loop aynı anda kullanılırsa jitter oluşur — biri seçilmeli
- `perspective()` fonksiyon notasyonu parent'ta `perspective` property'si varsa çift perspektif oluşturur
- `#logoSplash`'e `sessionStorage` veya `localStorage` ile "ilk ziyaret" kontrolü ekleme — her yenilemede gösterilmeli
- `history.scrollRestoration = 'manual'` URL hash scroll'unu engellemez — `history.replaceState` ile hash'i de temizle
- `#shader-mount` clip-path scroll animasyonu CLAUDE.md'de referans vardı ama implemente edilmemiş — çalışmayan özellik olarak not edildi
- `interactions.js` galeri lightbox koda `"3. GALLERY LIGHTBOX"` yazılmış ama gerçekte 5. bloktur
- `#experience` section index.html'de mevcut (~satır 536) ama nav'da link yok
- `mobile.js` ≤430px breakpoint'i kullanır — diğer breakpoint'lerden (480/768/1024px) farklı, `@media` ile değil `matchMedia` JS koşuluyla
