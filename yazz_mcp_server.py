import os
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("yazz-yildizburnu-filesystem")

@mcp.resource("guidelines://architecture")
def get_arch_guidelines() -> str:
    """Projenin temel mimari kuralları."""
    return """
    - YAPI: Saf HTML + CSS + JS (Kesinlikle React/Framework kullanılmayacak).
    - DİL: data-tr / data-en öznitelikleriyle TR/EN desteği.
    - RENKLER: Sadece CSS değişkenleri (var(--primary) vb.) kullanılmalı.
    - BREAKPOINTLER: 1024px, 768px, 480px.
    """

@mcp.resource("guidelines://technical-pitfalls")
def get_pitfalls() -> str:
    """Bilinen teknik hatalar ve çözüm yolları."""
    return """
    - THREE.JS: r128 sürümü. GLSL'de mod289 overload yasaktır; mod289v3/v4 kullanılmalıdır.
    - REVIEWS 3D TILT: .rv.on sınıfı transformları sıfırladığı için yüksek özgüllüklü seçici
      (.reviews-g .rcard:nth-child(n).rv.on) kullanılmalıdır.
    - JITTER: CSS transition ve JS RAF aynı anda kullanılmamalıdır.
    """

@mcp.resource("guidelines://menu-logic")
def get_menu_logic() -> str:
    """Menü ve Subnav sisteminin çalışma mantığı."""
    return """
    - ANA TABLAR: data-tab="yiyecek" (#tab-yiyecek) ve data-tab="icecek" (#tab-icecek).
    - SUBNAV: Sticky (top: 72px). İlgili sectionları (#sec-sabah vb.) tetikler.
    - AKTİF SECTIONLAR: sec-sabah (Yiyecek), sec-soft (İçecek), sec-klasik (Alkol) varsayılan aktiftir.
    """

@mcp.tool()
def list_project_files() -> list:
    """Proje dizinindeki kritik dosyaları listeler."""
    return [
        "index.html",
        "css/variables.css", "css/components.css", "css/reviews.css", "css/mountain-scene.css",
        "js/main.js", "js/interactions.js", "js/mountain-scene.js", "js/review-cards.js"
    ]

@mcp.tool()
def validate_css_integrity(content: str) -> str:
    """CSS kodunda hardcode renk olup olmadığını kontrol eder."""
    if "#" in content and "var(--" not in content:
        return "UYARI: Hardcode renk saptandı. Lütfen variables.css'deki değişkenleri kullanın."
    return "CSS kurallara uygun."

if __name__ == "__main__":
    mcp.run()
