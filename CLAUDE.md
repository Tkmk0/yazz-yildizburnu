# yazz Yıldızburnu

Tek sayfalık restoran web sitesi — Çeşme / İzmir. Saf HTML + CSS + JS (React yok).

## Yapı
```
index.html · css/{variables,reset,typography,layout,components,sections,animations}.css · js/{main,interactions}.js · img/
```

## Kurallar
- `data-tr` / `data-en` ile TR/EN dil desteği koru
- Renkler her zaman `var(--primary)` vb. CSS değişkeni — hardcode renk yazma
- Scroll reveal: `.rv` `.rv-l` `.rv-r` `.rv-s` sınıfları
- Breakpoint'ler: 1024px · 768px · 480px
- Nav logosu: `img/logo.png` (mix-blend-mode:multiply)
- Hero shader: `#shader-mount` (Warp, CDN'den, scroll clip-path ile açılır)
