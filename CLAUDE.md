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
- Hero shader: `#shader-mount` (Warp, CDN'den, scroll clip-path ile açılır)

## CSS Değişkenleri (variables.css)
- `--mountain-h: 42vh` — Three.js canvas yüksekliği
- `--review-card-bg: rgba(255,255,255,0.08)` — kart arka plan
- `--star-color: #f59e0b` — yıldız rengi

## Section Sırası (index.html)
`#home` → `#about` → `#menu` → `#gallery` → **`#reviews`** → `#contact`

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
- z-index stack: `#shader-mount`(0) → `#mountain-mount`(1) → `.hero-inner`(2) → `.scroll-ind`(2/3)
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

## Script Yükleme Sırası (body sonu)
```html
<script src="leaflet.js">
<script src="js/mountain-scene.js">
<script src="js/review-cards.js">
<script src="js/main.js" defer>
<script src="js/interactions.js" defer>
<script src="js/mobile.js" defer>
```

## main.js Çağrı Sırası
```js
// 4. MOUNTAIN SCENE
if (typeof initMountainScene === 'function') initMountainScene();
// 5. REVIEW CARDS
if (typeof initReviewCards === 'function') initReviewCards();
```

## Bilinen Tuzaklar
- `.rv.on { transform: none }` her 3D transform'u sıfırlar → section-specific override zorunlu
- `translateZ` rotasyon olmadan görünmez → `perspective` + `rotateX/Y` mutlaka gerekli
- Three.js r128: GLSL `mod289` overload yasak → `mod289v3` / `mod289v4` kullan
- CSS `transition: transform` + JS RAF loop aynı anda kullanılırsa jitter oluşur — biri seçilmeli
- `perspective()` fonksiyon notasyonu parent'ta `perspective` property'si varsa çift perspektif oluşturur
