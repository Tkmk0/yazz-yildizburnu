import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "yazz-yildizburnu", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

const RESOURCES = {
  "guidelines://architecture": {
    name: "Mimari Kurallar",
    description: "Projenin temel mimari kuralları",
    mimeType: "text/plain",
    text: [
      "- YAPI: Saf HTML + CSS + JS (Kesinlikle React/Framework kullanılmayacak).",
      "- DİL: data-tr / data-en öznitelikleriyle TR/EN desteği.",
      "- RENKLER: Sadece CSS değişkenleri (var(--primary) vb.) kullanılmalı.",
      "- BREAKPOINTLER: 1024px, 768px, 480px.",
    ].join("\n"),
  },
  "guidelines://technical-pitfalls": {
    name: "Teknik Tuzaklar",
    description: "Bilinen teknik hatalar ve çözüm yolları",
    mimeType: "text/plain",
    text: [
      "- THREE.JS: r128 sürümü. GLSL'de mod289 overload yasaktır; mod289v3/v4 kullanılmalıdır.",
      "- REVIEWS 3D TILT: .rv.on sınıfı transformları sıfırladığı için yüksek özgüllüklü seçici gerekir:",
      "  .reviews-g .rcard:nth-child(n).rv.on",
      "- JITTER: CSS transition ve JS RAF aynı anda kullanılmamalıdır.",
      "- HERO SHADER: #shader-mount clip-path scroll animasyonu henüz implemente edilmemiş.",
    ].join("\n"),
  },
  "guidelines://menu-logic": {
    name: "Menü Mantığı",
    description: "Menü ve Subnav sisteminin çalışma mantığı",
    mimeType: "text/plain",
    text: [
      "- ANA TABLAR: data-tab='yiyecek' (#tab-yiyecek) ve data-tab='icecek' (#tab-icecek).",
      "- SUBNAV: Sticky top:72px. Tıklanınca ilgili .menu-group'u gösterir.",
      "- VARSAYILAN AKTİF: sec-sabah (Yiyecek), sec-soft (İçecek), sec-klasik (Alkol).",
      "- RE-OBSERVE: Tab geçişinde .on kaldırılıp revealObs.observe() yeniden çağrılır.",
    ].join("\n"),
  },
};

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: Object.entries(RESOURCES).map(([uri, r]) => ({
    uri,
    name: r.name,
    description: r.description,
    mimeType: r.mimeType,
  })),
}));

server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  const r = RESOURCES[req.params.uri];
  if (!r) throw new Error(`Kaynak bulunamadı: ${req.params.uri}`);
  return {
    contents: [{ uri: req.params.uri, mimeType: r.mimeType, text: r.text }],
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_project_files",
      description: "Proje dizinindeki kritik dosyaları listeler.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "validate_css_integrity",
      description: "CSS kodunda hardcode renk (#rrggbb) olup olmadığını kontrol eder.",
      inputSchema: {
        type: "object",
        properties: {
          content: { type: "string", description: "Kontrol edilecek CSS içeriği" },
        },
        required: ["content"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "list_project_files") {
    const files = [
      "index.html",
      "css/variables.css",
      "css/components.css",
      "css/reviews.css",
      "css/mountain-scene.css",
      "js/main.js",
      "js/interactions.js",
      "js/mountain-scene.js",
      "js/review-cards.js",
    ];
    return { content: [{ type: "text", text: files.join("\n") }] };
  }

  if (req.params.name === "validate_css_integrity") {
    const content = String(req.params.arguments?.content ?? "");
    const hasHardcode = /#[0-9a-fA-F]{3,6}\b/.test(content) && !content.includes("var(--");
    return {
      content: [
        {
          type: "text",
          text: hasHardcode
            ? "UYARI: Hardcode renk saptandı. Lütfen variables.css'deki değişkenleri kullanın."
            : "CSS kurallara uygun.",
        },
      ],
    };
  }

  throw new Error(`Bilinmeyen araç: ${req.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
