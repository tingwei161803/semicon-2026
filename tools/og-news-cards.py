"""產生「現場快報 / Live Coverage」頁的中英 og:image（1200×630）。

    uv run --with pillow tools/og-news-cards.py

輸出 og-news-zh.png / og-news-en.png 到 repo 根目錄。字型第一次執行會自動從
google/fonts 下載到 ~/.cache/semicon-og-fonts/（站上用的 Space Grotesk、
Plus Jakarta Sans、Noto Sans TC）。

版面刻意對齊既有的 og-image.png（slate 底、藍色網址、白色大標、底部藍條），
讓兩張快報卡片看起來是全站卡片的兄弟。文案取自
docs/2026-09-04-社群分享圖-內容brief.md 的主標版本＋數字帶。
"""
from pathlib import Path
from urllib.request import urlretrieve
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path.home() / ".cache" / "semicon-og-fonts"
FONT_URLS = {
    "SpaceGrotesk[wght].ttf":    "https://github.com/google/fonts/raw/main/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf",
    "PlusJakartaSans[wght].ttf": "https://github.com/google/fonts/raw/main/ofl/plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf",
    "NotoSansTC[wght].ttf":      "https://github.com/google/fonts/raw/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf",
}
SG, PJ, NT = FONT_URLS  # dict order == insertion order

W, H = 1200, 630
BG, BLUE, WHITE, GREY = (0x0f,0x17,0x2a), (0x25,0x63,0xeb), (0xf8,0xfa,0xfc), (0x94,0xa3,0xb8)
HAIR = (0x1e,0x29,0x3b)
M = 80  # 左右邊界，與 og-image.png 相同

CARDS = {
  "zh": dict(
    page="現場快報",
    headline=["半導體展，變成了", "AI 基礎設施展"], head_font=NT, head_size=84,
    sub=["SEMICON Taiwan 2026 · Transform Tomorrow", "2026/9/2–9/4 · 台北南港展覽館 1 & 2 館"], sub_font=NT,
    stats=[("1,300+","參展企業"),("4,300+","展出攤位"),("65","參與國家"),("18","國家館"),("100,000+","專業觀眾人次")],
    label_font=NT, ui_font=NT),
  "en": dict(
    page="Live Coverage",
    headline=["The chip show became", "an AI-infrastructure show"], head_font=SG, head_size=78,
    sub=["SEMICON Taiwan 2026 · Transform Tomorrow", "Sep 2–4, 2026 · Taipei Nangang, TaiNEX 1 & 2"], sub_font=PJ,
    stats=[("1,300+","exhibitors"),("4,300+","booths"),("65","countries"),("18","national pavilions"),("100,000+","visitors")],
    label_font=PJ, ui_font=PJ),
}

def ensure_fonts():
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for name, url in FONT_URLS.items():
        if not (FONT_DIR / name).exists():
            print("downloading", name); urlretrieve(url, FONT_DIR / name)

def font(name, size, wght):
    f = ImageFont.truetype(str(FONT_DIR / name), size); f.set_variation_by_axes([wght]); return f

def fit(name, size, wght, lines, maxw):
    """字級往下縮到最寬那行放得進內容寬度為止。"""
    while size > 20:
        f = font(name, size, wght)
        if max(f.getlength(l) for l in lines) <= maxw: return f, size
        size -= 2
    return f, size

def render(lang, c):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    cw = W - 2*M

    # 頂列：藍色網址 + 頁名膠囊
    url_f = font(PJ, 28, 600); url = "semicon-2026.peteraim.com"
    y = 70; d.text((M, y), url, font=url_f, fill=BLUE, anchor="la")
    pill_f = font(c["ui_font"], 22, 600)
    px = M + url_f.getlength(url) + 22; pw = pill_f.getlength(c["page"]) + 28; ph = 36; py = y + 2
    d.rounded_rectangle((px, py, px+pw, py+ph), radius=ph//2, fill=BLUE)
    d.text((px+pw/2, py+ph/2), c["page"], font=pill_f, fill=WHITE, anchor="mm")

    # 主標兩行
    hf, hs = fit(c["head_font"], c["head_size"], 700, c["headline"], cw)
    lh = int(hs*1.18); y = 150
    for line in c["headline"]:
        d.text((M, y), line, font=hf, fill=WHITE, anchor="la"); y += lh
    y += 26

    # 副標兩行（灰）
    sf = font(c["sub_font"], 27, 500)
    for line in c["sub"]:
        d.text((M, y), line, font=sf, fill=GREY, anchor="la"); y += 38
    y += 26

    # 細線 + 數字帶（五欄依實際寬度平均分配）
    d.rectangle((M, y, W-M, y+1), fill=HAIR); y += 28
    nf = font(SG, 44, 700); lf = font(c["label_font"], 21, 500)
    cols = [max(nf.getlength(n), lf.getlength(l)) for n, l in c["stats"]]
    gap = (cw - sum(cols)) / (len(cols) - 1)
    x = M
    for (n, l), colw in zip(c["stats"], cols):
        d.text((x, y), n, font=nf, fill=WHITE, anchor="la")
        d.text((x, y+56), l, font=lf, fill=GREY, anchor="la")
        x += colw + gap

    # 底部藍條，幾何與 og-image.png 相同
    d.rectangle((0, 616, W, H), fill=BLUE)
    out = ROOT / f"og-news-{lang}.png"
    im.save(out, optimize=True); print("wrote", out.relative_to(ROOT), f"(headline {hs}px)")

if __name__ == "__main__":
    ensure_fonts()
    for lang, card in CARDS.items(): render(lang, card)
