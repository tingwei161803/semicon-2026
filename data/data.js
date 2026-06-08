/* =========================================================================
   SEMICON Taiwan 2026 — data layer (single shared file, loaded by every page)

   Two globals drive the whole multi-page site:
     window.SITE_META   = { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_PAGES  = [ { slug, layout, icon, title:{en,zh}, ...layoutData } ]

   Every human-visible string is an {en,zh} object so the language toggle can
   repaint the entire site with nothing left stuck in one language.

   Content is curated from the official SEMICON Taiwan 2026 site
   (semicontaiwan.org). This is an independent, non-official guide.
   ========================================================================= */

window.SITE_META = {
  title:    { en: "SEMICON Taiwan 2026", zh: "SEMICON Taiwan 2026" },
  subtitle: { en: "Transform Tomorrow · Sept 2–4, 2026 · Taipei Nangang (TaiNEX 1 & 2)",
              zh: "Transform Tomorrow · 2026/9/2–4 · 台北南港展覽館 1 & 2 館" }
};

window.SITE_PAGES = [

  /* ===================================================================== *
   *  HOME — composite overview (enriched "hub" renderer)
   * ===================================================================== */
  {
    slug: "home", layout: "hub", icon: "auto_awesome",
    title:    { en: "Overview", zh: "展會總覽" },
    subtitle: { en: "Your independent guide to Asia's flagship semiconductor exhibition.",
                zh: "亞洲旗艦半導體專業展會的獨立導覽。" },

    hero: {
      eyebrow:  { en: "SEMICON Taiwan 2026", zh: "SEMICON Taiwan 2026" },
      headline: { en: "Transform Tomorrow", zh: "Transform Tomorrow" },
      lead: {
        en: "Taiwan's most international — and only dedicated — semiconductor exhibition, where the most influential companies, talent and technologies across the global chip ecosystem converge to spark new market opportunities.",
        zh: "台灣最國際化、也是唯一的半導體專業展會——匯集全球最具影響力的廠商、人才與技術，串聯完整微電子生態圈，創造嶄新的市場機會。"
      },
      meta: [
        { icon: "calendar_month", label: { en: "Sept 2–4, 2026 · Wed–Fri", zh: "2026/9/2–9/4 · 三至五" } },
        { icon: "location_on",    label: { en: "Taipei Nangang · TaiNEX 1 & 2", zh: "台北南港展覽館 1 & 2 館" } },
        { icon: "verified",       label: { en: "Organized by SEMI", zh: "SEMI 主辦" } }
      ],
      ctas: [
        { label: { en: "Explore the forums", zh: "探索國際論壇" }, href: "forums.html", icon: "arrow_outward" },
        { label: { en: "Plan your visit",    zh: "規劃參觀資訊" }, href: "visit.html",  icon: "arrow_outward", subtle: true }
      ]
    },

    stats: [
      { num: 65,     suffix: "",  label: { en: "Countries & regions", zh: "參與國家與地區" } },
      { num: 100000, suffix: "+", label: { en: "Professional visitors", zh: "專業參觀人次" } },
      { num: 1300,   suffix: "+", label: { en: "Exhibitors", zh: "參展企業" } },
      { num: 4300,   suffix: "+", label: { en: "Booths", zh: "展出攤位" } },
      { num: 200,    suffix: "+", label: { en: "Industry leaders", zh: "產業領袖" } },
      { num: 25,     suffix: "+", label: { en: "Forums", zh: "前瞻國際論壇" } }
    ],

    themesTitle: { en: "Focus technologies", zh: "焦點技術主題" },
    themesSub:   { en: "The technology arcs shaping this year's forums and show floor.",
                   zh: "貫穿今年論壇與展區的技術主軸。" },
    themes: [
      { icon: "memory",                  title: { en: "Advanced Process", zh: "先進製程" },
        body: { en: "Sub-2nm nodes and the leading-edge processes driving the next compute generation.", zh: "2 奈米以下節點與驅動次世代運算的尖端製程。" } },
      { icon: "layers",                  title: { en: "Heterogeneous Integration & 3DIC", zh: "異質整合與 3DIC" },
        body: { en: "Chiplets, advanced packaging and 3D stacking that keep scaling alive beyond Moore.", zh: "小晶片、先進封裝與 3D 堆疊，於摩爾定律之外延續微縮。" } },
      { icon: "lightbulb",               title: { en: "Silicon Photonics", zh: "矽光子" },
        body: { en: "Co-packaged optics and light-based interconnect for AI-era bandwidth.", zh: "共封裝光學與光互連，滿足 AI 時代的頻寬需求。" } },
      { icon: "database",                title: { en: "Memory", zh: "記憶體" },
        body: { en: "HBM and next-generation memory feeding accelerated computing.", zh: "HBM 與次世代記憶體，餵養加速運算。" } },
      { icon: "bolt",                    title: { en: "Power & Compound Semi", zh: "功率與化合物半導體" },
        body: { en: "SiC, GaN and power devices for energy, mobility and electrification.", zh: "SiC、GaN 與功率元件，支撐能源、移動與電氣化。" } },
      { icon: "hub",                     title: { en: "Quantum", zh: "量子技術" },
        body: { en: "Superconducting and ion-trap systems moving from lab to market.", zh: "超導與離子阱系統，從實驗室走向市場。" } },
      { icon: "precision_manufacturing", title: { en: "Smart Manufacturing", zh: "智慧製造" },
        body: { en: "AI and embodied robotics for autonomous, resilient fabs.", zh: "AI 與實體機器人，打造自主、具韌性的晶圓廠。" } },
      { icon: "eco",                     title: { en: "Sustainability & Security", zh: "永續與資安" },
        body: { en: "Greener manufacturing and cyber-resilience across the supply chain.", zh: "更綠的製造與供應鏈資安韌性。" } }
    ],

    mission: {
      title: { en: "Three founding commitments", zh: "三大初衷" },
      items: [
        { icon: "trending_up", title: { en: "Lead the tech wave", zh: "引領科技潮流" },
          body: { en: "Surface the trends and breakthroughs that set the direction for the global industry.", zh: "呈現定義全球產業方向的趨勢與突破。" } },
        { icon: "science",     title: { en: "Advance technology", zh: "推動技術演進" },
          body: { en: "Move ideas from research into manufacturing through deep, expert-led programs.", zh: "透過深度的專家論壇，把構想從研究推向量產。" } },
        { icon: "handshake",   title: { en: "Foster collaboration", zh: "促進合作交流" },
          body: { en: "Bridge industry, government, academia and research, and connect Taiwan to the world.", zh: "暢通產官學研合作橋梁，連結台灣與全球。" } }
      ]
    },

    exploreTitle: { en: "Explore the show", zh: "探索展會" },

    organizers: {
      title: { en: "Behind the show", zh: "展會主辦" },
      items: [
        { role: { en: "Organizer",    zh: "主辦單位" }, name: { en: "SEMI", zh: "SEMI" } },
        { role: { en: "Co-organizer", zh: "協辦單位" }, name: { en: "TSIA", zh: "TSIA 台灣半導體產業協會" } },
        { role: { en: "Guidance",     zh: "指導單位" }, name: { en: "MOEA", zh: "經濟部 MOEA" } }
      ]
    }
  },

  /* ===================================================================== *
   *  FORUMS — international forums & summits (gallery + dialog)
   * ===================================================================== */
  {
    slug: "forums", layout: "gallery", icon: "forum",
    title:    { en: "International Forums", zh: "國際論壇" },
    subtitle: { en: "20+ expert programs run Aug 31–Sep 4 — search, filter by track, tap a card for detail.",
                zh: "20+ 場專家論壇於 8/31–9/4 登場——可搜尋、依領域篩選，點卡片看詳情。" },
    categories: [
      { key: "leadership", en: "Leadership & Trends",  zh: "領袖・趨勢" },
      { key: "process",    en: "Process & Packaging",  zh: "製程・封裝" },
      { key: "materials",  en: "Materials & Devices",   zh: "材料・元件" },
      { key: "smart",      en: "Smart Mfg・Sustain・Security", zh: "智造・永續・資安" },
      { key: "quantum",    en: "Quantum",               zh: "量子" }
    ],
    items: [
      /* ---- leadership & trends ---- */
      { slug: "ceo-summit", category: "leadership", tags: ["9/2"],
        title:   { en: "CEO Summit", zh: "大師論壇" },
        summary: { en: "The flagship keynote stage for global semiconductor leaders.", zh: "全球半導體領袖齊聚的旗艦主題舞台。" },
        overview:{ en: "SEMICON Taiwan's marquee program, where chief executives of the world's leading chip and technology companies share their reading of the market, geopolitics and the next wave of compute.",
                   zh: "SEMICON Taiwan 的旗艦壓軸論壇，全球頂尖晶片與科技企業執行長齊聚，分享對市場、地緣政治與下一波運算浪潮的判讀。" } },
      { slug: "market-trends", category: "leadership", tags: ["9/1"],
        title:   { en: "Market Trends Forum", zh: "市場趨勢論壇" },
        summary: { en: "Where the semiconductor cycle and demand outlook are headed.", zh: "解析半導體景氣循環與需求展望。" },
        overview:{ en: "Analysts and executives map the demand outlook across AI, automotive, memory and mature nodes, and what the next phase of the cycle means for capacity and investment.",
                   zh: "分析師與高管解讀 AI、車用、記憶體與成熟製程的需求展望，以及下一階段景氣循環對產能與投資的意義。" } },
      { slug: "20under40-salon", category: "leadership", tags: ["9/4"],
        title:   { en: "SEMI 20Under40 Salon", zh: "SEMI 半導體新銳獎沙龍" },
        summary: { en: "Rising young talent share the moves that set them apart.", zh: "半導體新世代分享脫穎而出的關鍵歷程。" },
        overview:{ en: "An intimate session where SEMI 20Under40 honourees trace their career choices, skill-building and turning points — a candid look at how the next generation rises in the industry.",
                   zh: "SEMI 半導體新銳獎得主現身說法，回顧職涯選擇、能力養成與關鍵轉折，呈現年輕世代在產業中成長的真實路徑。" } },
      { slug: "20under40-awards", category: "leadership", tags: ["9/4"],
        title:   { en: "20Under40 Awards & Tech Master Forum", zh: "SEMI 半導體新銳獎頒獎典禮 & 科技大師論壇" },
        summary: { en: "Honouring rising talent alongside masters of the craft.", zh: "表彰產業新銳，並邀集科技大師對談。" },
        overview:{ en: "The closing-day centerpiece pairs the 20Under40 awards ceremony with a Tech Master forum, where senior leaders look back on how the industry took shape and offer their expectations for the new generation.",
                   zh: "閉幕日壓軸活動，結合半導體新銳獎頒獎典禮與科技大師論壇，由資深領袖回看產業形成的歷程，並對新世代提出期許。" } },

      /* ---- process & packaging ---- */
      { slug: "advanced-process", category: "process", tags: ["8/31"],
        title:   { en: "Advanced Process Technology Forum", zh: "半導體先進製程科技論壇" },
        summary: { en: "Sub-2nm and the leading edge of process scaling.", zh: "2 奈米以下與製程微縮的最前沿。" },
        overview:{ en: "A deep look at gate-all-around transistors, sub-2nm nodes, EUV/high-NA lithography and the device innovations carrying scaling into the next decade.",
                   zh: "深入環繞閘極電晶體、2 奈米以下節點、EUV / High-NA 微影，以及帶領微縮邁向下一個十年的元件創新。" } },
      { slug: "higs", category: "process", tags: ["9/1", "9/3", "9/4"],
        title:   { en: "Heterogeneous Integration Global Summit (HIGS)", zh: "異質整合國際高峰論壇 (HIGS)" },
        summary: { en: "The three-day anchor summit on advanced packaging.", zh: "貫穿三天的先進封裝旗艦高峰論壇。" },
        overview:{ en: "SEMICON Taiwan's signature multi-day summit on chiplets, 2.5D/3D integration and advanced packaging — the architectures keeping performance scaling alive as monolithic shrink slows. Runs across Sept 1, 3 and 4.",
                   zh: "SEMICON Taiwan 招牌的多日高峰論壇，聚焦小晶片、2.5D/3D 整合與先進封裝——在單體微縮趨緩之際維繫效能成長的關鍵架構。橫跨 9/1、9/3、9/4 三天。" } },
      { slug: "3dic-summit", category: "process", tags: ["9/1"],
        title:   { en: "3DIC Global Summit", zh: "3DIC 全球高峰論壇" },
        summary: { en: "Vertical stacking and 3D system integration.", zh: "垂直堆疊與 3D 系統整合。" },
        overview:{ en: "Focused on 3D IC stacking, hybrid bonding and through-silicon vias — the techniques that pack more compute and bandwidth into a single package for AI and HPC.",
                   zh: "聚焦 3D IC 堆疊、混合鍵合與矽穿孔（TSV）——為 AI 與高效能運算在單一封裝中塞入更多算力與頻寬的關鍵技術。" } },
      { slug: "panel-fan-out", category: "process", tags: ["8/31"],
        title:   { en: "Panel-Level Fan-Out Packaging Forum", zh: "面板級扇出型封裝創新論壇" },
        summary: { en: "Scaling fan-out packaging to panel format.", zh: "把扇出型封裝推進到面板級。" },
        overview:{ en: "Part of the HIGS series, this forum examines panel-level fan-out — moving from wafer to large rectangular panels to cut cost and unlock larger, denser packages.",
                   zh: "為 HIGS 系列活動之一，探討面板級扇出型封裝——從晶圓走向大尺寸矩形面板，降低成本並實現更大、更高密度的封裝。" } },
      { slug: "advanced-test", category: "process", tags: ["9/3"],
        title:   { en: "Advanced Test Forum", zh: "先進測試論壇" },
        summary: { en: "Testing strategies for chiplets and 3D packages.", zh: "小晶片與 3D 封裝的測試策略。" },
        overview:{ en: "As packages grow more heterogeneous, test gets harder. This forum covers known-good-die, in-package test and the strategies keeping yield and reliability high.",
                   zh: "當封裝日益異質化，測試也更加困難。本論壇涵蓋良裸晶（KGD）、封裝內測試，以及維持良率與可靠度的策略。" } },
      { slug: "inspection-metrology", category: "process", tags: ["9/4"],
        title:   { en: "Advanced Inspection & Metrology Forum", zh: "半導體先進檢測與計量國際論壇" },
        summary: { en: "Seeing and measuring at the atomic scale.", zh: "在原子尺度上觀察與量測。" },
        overview:{ en: "Defect inspection, e-beam and optical metrology, and the measurement science required to control sub-2nm processes and complex 3D structures.",
                   zh: "缺陷檢測、電子束與光學計量，以及掌控 2 奈米以下製程與複雜 3D 結構所需的量測科學。" } },

      /* ---- materials & devices ---- */
      { slug: "power-compound", category: "materials", tags: ["9/1"],
        title:   { en: "Power & Compound Semiconductor Forum", zh: "功率暨化合物半導體論壇" },
        summary: { en: "SiC, GaN and the electrification wave.", zh: "SiC、GaN 與電氣化浪潮。" },
        overview:{ en: "Wide-bandgap power devices — silicon carbide and gallium nitride — for EVs, renewable energy, fast charging and the grid, plus the manufacturing scale-up behind them.",
                   zh: "寬能隙功率元件——碳化矽（SiC）與氮化鎵（GaN）——應用於電動車、再生能源、快充與電網，並探討背後的量產擴張。" } },
      { slug: "memory-summit", category: "materials", tags: ["9/1"],
        title:   { en: "Memory Summit", zh: "記憶體高峰論壇" },
        summary: { en: "HBM and the memory wall in the AI era.", zh: "HBM 與 AI 時代的記憶體牆。" },
        overview:{ en: "High-bandwidth memory, DRAM and emerging memory technologies — the bandwidth and capacity that increasingly gate the performance of AI accelerators.",
                   zh: "高頻寬記憶體（HBM）、DRAM 與新興記憶體技術——日益成為 AI 加速器效能瓶頸的頻寬與容量。" } },
      { slug: "silicon-photonics", category: "materials", tags: ["8/31"],
        title:   { en: "Silicon Photonics Forum", zh: "矽光子國際論壇" },
        summary: { en: "Light-based interconnect and co-packaged optics.", zh: "光互連與共封裝光學。" },
        overview:{ en: "Silicon photonics and co-packaged optics move data with light instead of copper — a leading answer to the interconnect bottleneck inside AI data centers.",
                   zh: "矽光子與共封裝光學以光取代銅來傳輸資料——是解決 AI 資料中心互連瓶頸的領先方案。" } },
      { slug: "mems-sensors", category: "materials", tags: ["8/31"],
        title:   { en: "MEMS & Sensors Forum", zh: "微機電暨感測器論壇" },
        summary: { en: "The sensing layer for AI, mobility and health.", zh: "AI、移動與健康的感測層。" },
        overview:{ en: "Micro-electro-mechanical systems and sensors that let devices perceive the physical world — from automotive and robotics to consumer and medical applications.",
                   zh: "讓裝置感知實體世界的微機電系統與感測器——橫跨車用、機器人、消費性與醫療應用。" } },
      { slug: "smc", category: "materials", tags: ["9/3"],
        title:   { en: "Strategic Materials Conference (SMC)", zh: "策略材料高峰論壇" },
        summary: { en: "Materials as the foundation of every node.", zh: "材料是每個節點的根基。" },
        overview:{ en: "The materials enabling advanced nodes and packaging — precursors, photoresists, specialty gases and substrates — and the resilient supply chains they depend on.",
                   zh: "支撐先進節點與封裝的材料——前驅物、光阻、特殊氣體與基板——以及它們所仰賴的韌性供應鏈。" } },

      /* ---- smart mfg / sustainability / security ---- */
      { slug: "smart-manufacturing", category: "smart", tags: ["9/1"],
        title:   { en: "Smart Manufacturing Forum", zh: "高科技智慧製造論壇" },
        summary: { en: "AI and robotics for the autonomous fab.", zh: "AI 與機器人驅動的自主晶圓廠。" },
        overview:{ en: "How AI, digital twins and embodied robotics move fabs from automation toward autonomy — zero-fault precision execution and resilient, sustainable operations.",
                   zh: "AI、數位分身與實體機器人如何讓晶圓廠從自動化邁向自主化——零容錯的精密執行與具韌性、永續的運營。" } },
      { slug: "sustainability", category: "smart", tags: ["9/2"],
        title:   { en: "Semiconductor Sustainability Forum", zh: "半導體永續力國際論壇" },
        summary: { en: "Decarbonizing the most demanding manufacturing.", zh: "為最嚴苛的製造去碳。" },
        overview:{ en: "Energy, water, abatement and net-zero roadmaps for an industry whose footprint grows with demand — and the technologies cutting emissions per wafer.",
                   zh: "面對需求成長帶來的足跡擴張，探討能源、用水、減排與淨零路徑，以及降低每片晶圓碳排的技術。" } },
      { slug: "cybersecurity", category: "smart", tags: ["9/4"],
        title:   { en: "Semiconductor Cybersecurity Summit", zh: "半導體資安趨勢高峰論壇" },
        summary: { en: "Securing fabs and the supply chain.", zh: "守護晶圓廠與供應鏈。" },
        overview:{ en: "Threats to fab operations and the semiconductor supply chain — from OT security to standards like SEMI E187 — and how the industry builds cyber-resilience.",
                   zh: "晶圓廠運營與半導體供應鏈面臨的威脅——從 OT 資安到 SEMI E187 等標準——以及產業如何建立資安韌性。" } },
      { slug: "facility", category: "smart", tags: ["9/3"],
        title:   { en: "High-Tech Facility Forum", zh: "高科技廠房設施國際論壇" },
        summary: { en: "The cleanrooms and infrastructure behind the chips.", zh: "撐起晶片的無塵室與基礎設施。" },
        overview:{ en: "A collaborative forum on fab construction, cleanroom, power, gas and water systems — the demanding infrastructure that advanced manufacturing is built on.",
                   zh: "聚焦廠房建造、無塵室、電力、氣體與水系統的合作論壇——支撐先進製造的嚴苛基礎設施。" } },

      /* ---- quantum ---- */
      { slug: "quantum-computers", category: "quantum", tags: ["9/1"],
        title:   { en: "Quantum Taiwan Forum — Quantum Computers", zh: "量子台灣論壇 — 量子電腦" },
        summary: { en: "Hardware racing toward useful quantum.", zh: "邁向實用量子的硬體競賽。" },
        overview:{ en: "A collaborative Quantum Taiwan program on quantum computing hardware — superconducting and ion-trap architectures — and how the semiconductor ecosystem enables it.",
                   zh: "量子台灣系列的合作論壇，聚焦量子運算硬體——超導與離子阱架構——以及半導體生態系如何賦能。" } },
      { slug: "quantum-ecosystem", category: "quantum", tags: ["9/2"],
        title:   { en: "Quantum Taiwan Forum — Enabling Tech Ecosystem", zh: "量子台灣論壇 — 關鍵支援技術生態系" },
        summary: { en: "Cryogenics, control and the quantum supply chain.", zh: "低溫、控制與量子供應鏈。" },
        overview:{ en: "The enabling layer around quantum processors — cryogenics, control electronics, materials and packaging — and the supply-chain ecosystem taking quantum from lab to market by 2030.",
                   zh: "圍繞量子處理器的支援層——低溫、控制電子、材料與封裝——以及在 2030 年前把量子從實驗室帶向市場的供應鏈生態系。" } }
    ]
  },

  /* ===================================================================== *
   *  SCHEDULE — every forum in chronological order (exact time + venue)
   * ===================================================================== */
  {
    slug: "schedule", layout: "timeline", icon: "calendar_month",
    title:    { en: "Forum Schedule", zh: "論壇時間軸" },
    subtitle: { en: "Every international forum in chronological order with exact times and venues (Aug 31–Sep 4). Forums are spread across Taipei Nangang (TaiNEX) and nearby hotels — check the venue for each session.",
                zh: "所有國際論壇依時間排序，標註確切時間與地點（8/31–9/4）。論壇分散於南港展覽館與鄰近飯店，請逐場確認地點。" },
    events: [
      /* ---- Mon, Aug 31 ---- */
      { date: { en: "Aug 31 Mon · 08:30", zh: "8/31 週一 · 08:30" }, title: { en: "Advanced Process Technology Forum", zh: "半導體先進製程科技論壇" },
        body: { en: "08:30–15:10 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall C", zh: "時間 08:30–15:10 ｜ 地點 台北漢來大飯店 3F 鉑金C廳" } },
      { date: { en: "Aug 31 Mon · 08:50", zh: "8/31 週一 · 08:50" }, title: { en: "MEMS & Sensors Forum", zh: "微機電暨感測器論壇" },
        body: { en: "08:50–16:25 · Ya-Yue Hall, 3F Bao-Li Hall", zh: "時間 08:50–16:25 ｜ 地點 雅悅會館 3F 寶儷廳" } },
      { date: { en: "Aug 31 Mon · 09:00", zh: "8/31 週一 · 09:00" }, title: { en: "Silicon Photonics Forum", zh: "矽光子國際論壇" },
        body: { en: "09:00–17:05 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall B", zh: "時間 09:00–17:05 ｜ 地點 台北漢來大飯店 3F 鉑金B廳" } },
      { date: { en: "Aug 31 Mon · 13:00", zh: "8/31 週一 · 13:00" }, title: { en: "Panel-Level Fan-Out Packaging Forum (HIGS series)", zh: "面板級扇出型封裝創新論壇（HIGS 系列）" },
        body: { en: "13:00–17:00 · Ya-Yue Hall, 3F Fu-Li Hall", zh: "時間 13:00–17:00 ｜ 地點 雅悅會館 3F 馥儷廳" } },

      /* ---- Tue, Sep 1 ---- */
      { date: { en: "Sep 1 Tue · 08:30", zh: "9/1 週二 · 08:30" }, title: { en: "Heterogeneous Integration Global Summit — Day 1", zh: "異質整合國際高峰論壇（HIGS）第一天" },
        body: { en: "08:30–17:00 · Ya-Yue Hall, 3F Fu-Li Hall", zh: "時間 08:30–17:00 ｜ 地點 雅悅會館 3F 馥儷廳" } },
      { date: { en: "Sep 1 Tue · 08:30", zh: "9/1 週二 · 08:30" }, title: { en: "Quantum Taiwan Forum — Quantum Computers", zh: "量子台灣論壇 — 量子電腦" },
        body: { en: "08:30–17:00 · TaiNEX 1, 5F Room 504", zh: "時間 08:30–17:00 ｜ 地點 南港展覽館 1 館 5F-504" } },
      { date: { en: "Sep 1 Tue · 08:30", zh: "9/1 週二 · 08:30" }, title: { en: "Power & Compound Semiconductor Forum", zh: "功率暨化合物半導體論壇" },
        body: { en: "08:30–16:50 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall B", zh: "時間 08:30–16:50 ｜ 地點 台北漢來大飯店 3F 鉑金B廳" } },
      { date: { en: "Sep 1 Tue · 09:00", zh: "9/1 週二 · 09:00" }, title: { en: "Smart Manufacturing Forum", zh: "高科技智慧製造論壇" },
        body: { en: "09:00–16:20 · Ya-Yue Hall, 3F Bao-Li Hall", zh: "時間 09:00–16:20 ｜ 地點 雅悅會館 3F 寶儷廳" } },
      { date: { en: "Sep 1 Tue · 09:30", zh: "9/1 週二 · 09:30" }, title: { en: "3DIC Global Summit", zh: "3DIC 全球高峰論壇" },
        body: { en: "09:30–12:00 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall C", zh: "時間 09:30–12:00 ｜ 地點 台北漢來大飯店 3F 鉑金C廳" } },
      { date: { en: "Sep 1 Tue · 13:00", zh: "9/1 週二 · 13:00" }, title: { en: "Market Trends Forum", zh: "市場趨勢論壇" },
        body: { en: "13:00–16:40 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall C", zh: "時間 13:00–16:40 ｜ 地點 台北漢來大飯店 3F 鉑金C廳" } },
      { date: { en: "Sep 1 Tue · 13:30", zh: "9/1 週二 · 13:30" }, title: { en: "Memory Summit", zh: "記憶體高峰論壇" },
        body: { en: "13:30–17:20 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall A", zh: "時間 13:30–17:20 ｜ 地點 台北漢來大飯店 3F 鉑金A廳" } },

      /* ---- Wed, Sep 2 ---- */
      { date: { en: "Sep 2 Wed · 08:30", zh: "9/2 週三 · 08:30" }, title: { en: "Quantum Taiwan Forum — Enabling Tech Ecosystem", zh: "量子台灣論壇 — 關鍵支援技術生態系" },
        body: { en: "08:30–17:00 · TaiNEX 1, 5F Room 504", zh: "時間 08:30–17:00 ｜ 地點 南港展覽館 1 館 5F-504" } },
      { date: { en: "Sep 2 Wed · 09:30", zh: "9/2 週三 · 09:30" }, title: { en: "Semiconductor Sustainability Forum", zh: "半導體永續力國際論壇" },
        body: { en: "09:30–16:25 · TaiNEX 1, 4F Room 402", zh: "時間 09:30–16:25 ｜ 地點 南港展覽館 1 館 4F-402" } },
      { date: { en: "Sep 2 Wed · 10:00", zh: "9/2 週三 · 10:00" }, title: { en: "CEO Summit", zh: "大師論壇" },
        body: { en: "10:00–17:00 · TaiNEX 2, 7F Room 701AB (Future Stage)", zh: "時間 10:00–17:00 ｜ 地點 南港展覽館 2 館 7F-701AB（Future Stage）" } },

      /* ---- Thu, Sep 3 ---- */
      { date: { en: "Sep 3 Thu · 08:30", zh: "9/3 週四 · 08:30" }, title: { en: "Heterogeneous Integration Global Summit — Day 2", zh: "異質整合國際高峰論壇（HIGS）第二天" },
        body: { en: "08:30–17:00 · Ya-Yue Hall, 3F Fu-Li Hall", zh: "時間 08:30–17:00 ｜ 地點 雅悅會館 3F 馥儷廳" } },
      { date: { en: "Sep 3 Thu · 08:30", zh: "9/3 週四 · 08:30" }, title: { en: "High-Tech Facility Forum", zh: "高科技廠房設施國際論壇" },
        body: { en: "08:30–17:00 · Grand Hi-Lai Hotel Taipei, 3F Platinum Hall A & B", zh: "時間 08:30–17:00 ｜ 地點 台北漢來大飯店 3F 鉑金A、B廳" } },
      { date: { en: "Sep 3 Thu · 09:00", zh: "9/3 週四 · 09:00" }, title: { en: "Advanced Test Forum", zh: "先進測試論壇" },
        body: { en: "09:00–16:00 · Ya-Yue Hall, 3F Bao-Li Hall", zh: "時間 09:00–16:00 ｜ 地點 雅悅會館 3F 寶儷廳" } },
      { date: { en: "Sep 3 Thu · 09:30", zh: "9/3 週四 · 09:30" }, title: { en: "Strategic Materials Conference (SMC)", zh: "策略材料高峰論壇" },
        body: { en: "09:30–16:55 · TaiNEX 2, 7F Room 701AB (Future Stage)", zh: "時間 09:30–16:55 ｜ 地點 南港展覽館 2 館 7F-701AB（Future Stage）" } },

      /* ---- Fri, Sep 4 ---- */
      { date: { en: "Sep 4 Fri · 08:30", zh: "9/4 週五 · 08:30" }, title: { en: "Heterogeneous Integration Global Summit — Day 3", zh: "異質整合國際高峰論壇（HIGS）第三天" },
        body: { en: "08:30–15:30 · Ya-Yue Hall, 3F Fu-Li Hall", zh: "時間 08:30–15:30 ｜ 地點 雅悅會館 3F 馥儷廳" } },
      { date: { en: "Sep 4 Fri · 08:30", zh: "9/4 週五 · 08:30" }, title: { en: "Advanced Inspection & Metrology Forum", zh: "半導體先進檢測與計量國際論壇" },
        body: { en: "08:30–16:20 · TaiNEX 1, 4F Room 402", zh: "時間 08:30–16:20 ｜ 地點 南港展覽館 1 館 4F-402" } },
      { date: { en: "Sep 4 Fri · 09:30", zh: "9/4 週五 · 09:30" }, title: { en: "Semiconductor Cybersecurity Summit", zh: "半導體資安趨勢高峰論壇" },
        body: { en: "From 09:30 · Ya-Yue Hall, 3F Bao-Li Hall", zh: "時間 09:30 起 ｜ 地點 雅悅會館 3F 寶儷廳" } },
      { date: { en: "Sep 4 Fri · 10:00", zh: "9/4 週五 · 10:00" }, title: { en: "SEMI 20Under40 Salon", zh: "SEMI 半導體新銳獎沙龍" },
        body: { en: "From 10:00 · Taipei Nangang (TaiNEX) — see official site for the room", zh: "時間 10:00 起 ｜ 地點 南港展覽館（會議室詳見官網）" } },
      { date: { en: "Sep 4 Fri · 13:00", zh: "9/4 週五 · 13:00" }, title: { en: "20Under40 Awards & Tech Master Forum", zh: "SEMI 半導體新銳獎頒獎典禮 & 科技大師論壇" },
        body: { en: "From 13:00 · Taipei Nangang (TaiNEX) — closing-day finale; see official site for the room", zh: "時間 13:00 起 ｜ 地點 南港展覽館（閉幕日壓軸，會議室詳見官網）" } }
    ]
  },

  /* ===================================================================== *
   *  ZONES — themed technology pavilions (bento showcase)
   * ===================================================================== */
  {
    slug: "zones", layout: "bento", icon: "grid_view",
    title:    { en: "Technology Zones", zh: "主題特區" },
    subtitle: { en: "Four spotlight technology zones plus a workforce pavilion anchor this year's show floor.",
                zh: "四大亮點技術特區加上人才培育主題活動，構成今年展區的核心。" },
    tiles: [
      { size: "lg", accent: true, icon: "smart_toy",
        title: { en: "AI Technology Zone", zh: "AI 半導體技術特區" },
        body:  { en: "The silicon heart of the show: premier AI chip design and ASICs, chip manufacturing at its finest, and edge AI giving devices real-time decision-making — a collaborative, high-performance, energy-efficient AI semiconductor ecosystem.",
                 zh: "展會的矽晶核心：頂尖 AI 晶片設計與 ASIC、極致的晶片製造，以及賦予終端即時決策的邊緣運算——呈現協同、高效能且節能的 AI 半導體生態系。" } },
      { size: "tall", icon: "hub",
        title: { en: "Quantum Technology Zone", zh: "量子技術特區" },
        body:  { en: "With quantum expected to reach early commercial deployment by 2030, the zone shows how superconducting and ion-trap systems weave together with AI and the semiconductor ecosystem to break past classical compute limits.",
                 zh: "全球預期量子技術於 2030 年前進入初步商用——特區呈現超導與離子阱系統如何與 AI 及半導體生態系交織，突破傳統運算極限。" } },
      { size: "tall", icon: "precision_manufacturing",
        title: { en: "Smart Fab Zone", zh: "晶圓智造特區" },
        body:  { en: "As sub-2nm and AI-chip demand explode, fabs evolve from automation to autonomy. AI and embodied-AI robots drive zero-fault precision and high flow toward a sustainable, resilient, human-centric fab.",
                 zh: "隨 2 奈米以下與 AI 晶片需求爆發，晶圓廠從自動化邁向自主化。AI 與實體機器人驅動零容錯精密執行與高效流動，打造永續、具韌性且以人為本的製造環境。" } },
      { size: "wide", icon: "rocket_launch",
        title: { en: "Silicon Startups Zone", zh: "晶片新創特區" },
        body:  { en: "Hosted by SEMI with NSTC support and linked to the IC Taiwan Grand Challenge, a dedicated platform connecting global chip startups to Taiwan's world-class ecosystem — with a 10-minute pitch stage for selected teams.",
                 zh: "由 SEMI 主辦、國科會（NSTC）支持，串聯 IC Taiwan Grand Challenge 新創團隊，連結全球半導體新創與台灣世界級生態系——入選團隊可享 10 分鐘技術發表舞台。" } },
      { size: "wide", icon: "school",
        title: { en: "Workforce Development", zh: "人才培育主題活動" },
        body:  { en: "A real bridge between students and industry under the theme \"inherit and co-create\" — Tech Master forums, 20Under40 sharing, campus ambassadors and a professor-courtesy program, with guided show-floor tours.",
                 zh: "以「傳承與共創」為精神，搭起學生與產業的實質橋梁——科技大師論壇、新銳分享、校園大使與教授禮遇計畫，搭配展區主題導覽。" } }
    ]
  },

  /* ===================================================================== *
   *  EVENTS — show-week timeline of signature moments
   * ===================================================================== */
  {
    slug: "events", layout: "timeline", icon: "event",
    title:    { en: "Show Week", zh: "展會週程" },
    subtitle: { en: "How the week unfolds — forums open Aug 31, the exhibition runs Sep 2–4.",
                zh: "一週如何展開——論壇 8/31 開跑，展覽 9/2–9/4 登場。" },
    events: [
      { date: { en: "Mon · Aug 31", zh: "週一 · 8/31" },
        title: { en: "Forums open", zh: "國際論壇開幕" },
        body:  { en: "The forum program kicks off ahead of the exhibition with Advanced Process Technology, Silicon Photonics, MEMS & Sensors and the Panel-Level Fan-Out (HIGS series) forums.",
                 zh: "論壇先於展覽揭開序幕：半導體先進製程科技、矽光子、微機電暨感測器，以及面板級扇出型封裝（HIGS 系列）論壇率先登場。" } },
      { date: { en: "Tue · Sep 1", zh: "週二 · 9/1" },
        title: { en: "Summit peak day", zh: "論壇高峰日" },
        body:  { en: "A dense day of summits: HIGS Day 1, the 3DIC Global Summit, Memory Summit, Power & Compound Semiconductor, Quantum Taiwan, Market Trends and Smart Manufacturing.",
                 zh: "高峰論壇密集登場：異質整合 HIGS 第一天、3DIC 全球高峰論壇、記憶體高峰論壇、功率暨化合物半導體、量子台灣、市場趨勢與高科技智慧製造論壇。" } },
      { date: { en: "Wed · Sep 2", zh: "週三 · 9/2" },
        title: { en: "Exhibition opens × CEO Summit", zh: "展覽開幕 × 大師論壇" },
        body:  { en: "Doors open at TaiNEX 1 & 2 (10:00–17:00). The flagship CEO Summit takes the stage, alongside the Sustainability forum and the Quantum Taiwan enabling-ecosystem program.",
                 zh: "南港 1 & 2 館展覽開幕（10:00–17:00）。旗艦大師論壇（CEO Summit）登場，同場舉辦半導體永續力論壇與量子台灣關鍵支援技術生態系論壇。" } },
      { date: { en: "Thu · Sep 3", zh: "週四 · 9/3" },
        title: { en: "Depth day", zh: "技術縱深日" },
        body:  { en: "HIGS Day 2, the Advanced Test Forum, the Strategic Materials Conference (SMC) and the High-Tech Facility forum dig into the engineering behind the leading edge.",
                 zh: "異質整合 HIGS 第二天、先進測試論壇、策略材料高峰論壇（SMC）與高科技廠房設施論壇，深入最前沿背後的工程。" } },
      { date: { en: "Fri · Sep 4", zh: "週五 · 9/4" },
        title: { en: "Finale × 20Under40 Awards", zh: "閉幕日 × 新銳獎" },
        body:  { en: "The closing day pairs HIGS Day 3, the Cybersecurity Summit and the Inspection & Metrology forum with the SEMI 20Under40 awards ceremony and Tech Master Forum as the grand finale.",
                 zh: "閉幕日結合異質整合 HIGS 第三天、資安趨勢高峰論壇與先進檢測計量論壇，並以 SEMI 半導體新銳獎頒獎典禮與科技大師論壇壓軸。" } },
      { date: { en: "All week", zh: "全展期" },
        title: { en: "Signature activities", zh: "亮點活動" },
        body:  { en: "Beyond the forums: the Opening Ceremony, the Industry Leadership Dinner, TechXPOT show-floor presentations, SEMI Forest, hospitality suites and partner events — plus the co-located Smart Manufacturing Taiwan exhibition.",
                 zh: "論壇之外的亮點：開幕典禮、科技菁英領袖晚宴、創新技術發表會 TechXPOT、SEMI Forest、企業貴賓室與合作夥伴活動——以及同期展出的「高科技智慧製造特展」。" } }
    ]
  },

  /* ===================================================================== *
   *  GUIDE — tailored "what to see" advice per visitor persona (gallery)
   * ===================================================================== */
  {
    slug: "guide", layout: "gallery", icon: "tips_and_updates",
    title:    { en: "Visit Guide", zh: "逛展參考" },
    subtitle: { en: "Different visitors, different routes. Pick the profile that fits you for a tailored set of forums, zones and tips.",
                zh: "不同的人，看不同的重點。挑一個最貼近你的身分，獲得量身的論壇、特區與動線建議。" },
    categories: [
      { key: "technical", en: "Technical",       zh: "技術人" },
      { key: "business",  en: "Business",        zh: "商務人" },
      { key: "talent",    en: "Talent & Guests", zh: "學界與訪客" }
    ],
    items: [
      { slug: "process-eng", category: "technical", tags: ["先進製程", "計量檢測", "智慧製造"],
        title:   { en: "Process & Equipment Engineers", zh: "製程・設備工程師" },
        summary: { en: "Chasing the leading edge of nodes, metrology and the fab floor.", zh: "鎖定最前沿製程、量測與產線的工程師。" },
        overview:{ en: "Don't miss the Advanced Process Technology Forum (Aug 31), plus Inspection & Metrology and Advanced Test (Sep 3–4). On the floor, head to the Smart Fab Zone for AI-plus-robotics production lines. Tip: forum days (Aug 31, Sep 3) sit largely off-site at the hotels — separate them from your show-floor days (Sep 2–4).",
                   zh: "必看「半導體先進製程科技論壇」（8/31），以及「先進檢測與計量」「先進測試」（9/3–9/4）；展場則到「晶圓智造特區」看 AI×機器人產線。動線提示：論壇多在漢來飯店與雅悅會館，建議把論壇日（8/31、9/3）與逛展日（9/2–9/4）分開安排。" } },
      { slug: "packaging-eng", category: "technical", tags: ["HIGS", "3DIC", "面板級扇出"],
        title:   { en: "Packaging & Heterogeneous Integration", zh: "封裝・異質整合工程師" },
        summary: { en: "Chiplets, advanced packaging and 3D stacking are your world.", zh: "小晶片、先進封裝與 3D 堆疊是你的主場。" },
        overview:{ en: "Anchor on the three-day HIGS summit (Sep 1, 3, 4 at Ya-Yue Hall, Fu-Li Hall), then add the 3DIC Global Summit (Sep 1) and Panel-Level Fan-Out (Aug 31). HIGS runs three consecutive days in the same room, so it's easy to follow start to finish.",
                   zh: "以「異質整合 HIGS」三天（9/1、9/3、9/4，雅悅會館 馥儷廳）為主軸，搭配「3DIC 全球高峰論壇」（9/1）與「面板級扇出封裝」（8/31）。HIGS 連三天同一場地，方便從頭跟到尾。" } },
      { slug: "design-ai", category: "technical", tags: ["AI 特區", "矽光子", "記憶體"],
        title:   { en: "Design & AI Chips", zh: "設計・AI 晶片" },
        summary: { en: "AI accelerators, ASICs and the interconnect feeding them.", zh: "AI 加速器、ASIC 與餵養它們的互連。" },
        overview:{ en: "Start in the AI Technology Zone for chip-design and ASIC trends, then catch Silicon Photonics (Aug 31), the Memory Summit (Sep 1) and Market Trends (Sep 1). Put the CEO Summit (Sep 2) on your must-attend list.",
                   zh: "先逛「AI 半導體技術特區」掌握晶片設計與 ASIC 趨勢，論壇看「矽光子」（8/31）、「記憶體高峰論壇」（9/1）與「市場趨勢」（9/1），並把「大師論壇」（9/2）列為必聽。" } },
      { slug: "sustain-facility", category: "technical", tags: ["永續力", "廠房設施", "資安"],
        title:   { en: "Sustainability & Facilities", zh: "永續・廠務・資安" },
        summary: { en: "Energy, water, cleanrooms and operational resilience.", zh: "能源、用水、無塵室與運營韌性。" },
        overview:{ en: "Target the Sustainability Forum (Sep 2, TaiNEX 1 Room 402), the High-Tech Facility Forum (Sep 3), Smart Manufacturing (Sep 1) and the Cybersecurity Summit (Sep 4). Several of these sit inside the halls, so they pair well with show-floor time.",
                   zh: "鎖定「半導體永續力論壇」（9/2，南港 1 館 402）、「高科技廠房設施論壇」（9/3）、「智慧製造論壇」（9/1）與「資安趨勢高峰論壇」（9/4）。部分在展館內，適合搭配逛展。" } },
      { slug: "business-bd", category: "business", tags: ["全展區", "市場趨勢", "合作夥伴"],
        title:   { en: "Procurement, Sales & BD", zh: "採購・業務・商務開發" },
        summary: { en: "Find the right booths and the right people, fast.", zh: "快速找到對的攤位與對的人。" },
        overview:{ en: "Use the official exhibitor list to map target booths first, read the room with the Market Trends and CEO Summit forums, and work the Partner Events and the Industry Leadership Dinner for relationship-building.",
                   zh: "先用官方「參展廠商名單」鎖定目標攤位，聽「市場趨勢論壇」與「大師論壇」掌握風向，並把握「合作夥伴活動」與「科技菁英領袖晚宴」拓展人脈。" } },
      { slug: "investor", category: "business", tags: ["大師論壇", "市場趨勢", "晶片新創"],
        title:   { en: "Investors & Analysts", zh: "投資人・分析師" },
        summary: { en: "Macro signals, supply-demand and the next breakout.", zh: "總經訊號、供需與下一個爆點。" },
        overview:{ en: "Lead with the CEO Summit, Market Trends and Memory Summit for macro and supply-demand, then visit the Silicon Startups Zone for 10-minute pitches and watch the News Center for first-hand announcements.",
                   zh: "以「大師論壇」「市場趨勢」「記憶體高峰論壇」抓總經與供需，並到「晶片新創特區」聽 10 分鐘 pitch、留意「新聞中心」第一手消息。" } },
      { slug: "startup", category: "business", tags: ["晶片新創", "pitch", "媒合"],
        title:   { en: "Startups", zh: "新創團隊" },
        summary: { en: "Get on stage, meet partners and investors.", zh: "上台發表，遇見夥伴與投資人。" },
        overview:{ en: "Your home base is the Silicon Startups Zone (hosted by SEMI with NSTC, linked to the IC Taiwan Grand Challenge); selected teams get a 10-minute pitch slot. Pair it with the 3DIC, Silicon Photonics and Quantum forums to find tech partners and investors.",
                   zh: "主場是「晶片新創特區」（SEMI 主辦、國科會支持，連結 IC Taiwan Grand Challenge），入選團隊可享 10 分鐘技術發表；搭配 3DIC、矽光子、量子論壇找技術夥伴與投資人。" } },
      { slug: "student", category: "talent", tags: ["人才培育", "新銳獎", "免費觀展"],
        title:   { en: "Students & Job-seekers", zh: "學生・求職者" },
        summary: { en: "Get inside the industry and build your network.", zh: "走進產業現場，累積人脈與視野。" },
        overview:{ en: "Center your trip on the Workforce Development activities — campus ambassadors, guided floor tours, the 20Under40 Salon and the Tech Master Forum (Sep 4). Admission often has free-entry offers, so register and collect your badge early.",
                   zh: "以「人才培育主題活動」為核心——校園大使、展區導覽、「新銳獎沙龍」與「科技大師論壇」（9/4）。觀展常有免費入場優惠，建議及早報名領證。" } },
      { slug: "international", category: "talent", tags: ["旗艦論壇", "交通住宿", "行程規劃"],
        title:   { en: "International Visitors", zh: "國際訪客" },
        summary: { en: "Hit the flagship sessions and travel smart.", zh: "鎖定旗艦場次，聰明安排旅程。" },
        overview:{ en: "Prioritize the flagship CEO Summit (Sep 2) plus HIGS, 3DIC and Silicon Photonics. Use the official \"Plan your trip\" guide for travel and lodging; the venue is Taipei Nangang Exhibition Center, directly served by the Taipei Metro (Nangang Exhibition Center Station).",
                   zh: "旗艦場次「大師論壇」（9/2）與 HIGS、3DIC、矽光子值得鎖定；用官方「規劃您的行程」安排交通住宿。會場在台北南港展覽館，捷運「南港展覽館站」直達。" } }
    ]
  },

  /* ===================================================================== *
   *  VISIT — practical visitor FAQ (with official links)
   * ===================================================================== */
  {
    slug: "visit", layout: "faq", icon: "info",
    title:    { en: "Visitor Info", zh: "參觀資訊" },
    subtitle: { en: "Dates, venue, tickets and official links — everything you need to plan the trip.",
                zh: "展期、地點、購票與官方連結——規劃行程所需的一切。" },
    qa: [
      { q: { en: "When does the exhibition run?", zh: "展期是什麼時候？" },
        a: { en: "September 2–4, 2026 (Wed–Fri). Hours: Wed 10:00–17:00, Thu 10:00–17:00, Fri 10:00–16:00.",
             zh: "2026 年 9 月 2 日至 4 日（週三至週五）。開放時間：週三 10:00–17:00、週四 10:00–17:00、週五 10:00–16:00。" } },
      { q: { en: "Where is it, and how do I get there?", zh: "在哪裡舉辦？如何抵達？" },
        a: { en: "Taipei Nangang Exhibition Center, Halls 1 & 2 (TaiNEX 1 & 2). Take the Taipei Metro to Taipei Nangang Exhibition Center Station (Bannan Blue Line / Wenhu Brown Line).",
             zh: "台北南港展覽館 1 & 2 館（TaiNEX 1 & 2）。可搭台北捷運至「南港展覽館站」（板南線藍線 / 文湖線棕線）。" } },
      { q: { en: "When are the international forums?", zh: "國際論壇何時舉行？" },
        a: { en: "Forums run Monday Aug 31 through Friday Sep 4 — they begin before the exhibition floor opens, so plan forum days separately from your show-floor visit.",
             zh: "論壇於 8/31（週一）至 9/4（週五）舉行——比展覽提早開始，建議將論壇日與逛展日分開規劃。" } },
      { q: { en: "How do I register or collect a badge?", zh: "如何購票 / 領證？" },
        a: { en: "Register online via the official SEMICON Taiwan site, then collect your badge on-site. Check the official page for the latest pricing and any limited-time admission offers.",
             zh: "於 SEMICON Taiwan 官方網站線上報名，再至現場領證。最新票價與限時免費觀展優惠請以官方頁面為準。" },
        links: [ { label: { en: "Official registration", zh: "官方購票與領證" }, href: "https://www.semicontaiwan.org/zh/about/register" } ] },
      { q: { en: "Where is the floor plan?", zh: "哪裡看展區平面圖？" },
        a: { en: "The official interactive event map shows halls, zones and booths.",
             zh: "官方互動展區平面圖可查看館別、特區與攤位。" },
        links: [ { label: { en: "Official event map", zh: "官方展區平面圖" }, href: "https://expo.semi.org/taiwan2026/Public/EventMap.aspx?ID=31911&shAvailable=1&Thumbnail=1&sortMenu=102000" } ] },
      { q: { en: "Where is the exhibitor list?", zh: "哪裡看參展廠商名單？" },
        a: { en: "Search the full official exhibitor directory to find companies and booth numbers before you go.",
             zh: "出發前可查詢官方完整參展廠商名錄，找到企業與攤位號。" },
        links: [ { label: { en: "Official exhibitor list", zh: "官方參展廠商名單" }, href: "https://expo.semi.org/taiwan2026/public/exhibitors.aspx?ID=31939&sortMenu=103001" } ] },
      { q: { en: "What are the highlight zones and activities?", zh: "有哪些亮點特區與活動？" },
        a: { en: "Four spotlight zones — AI, Quantum, Smart Fab and Silicon Startups — plus a Workforce pavilion. See the Technology Zones and Show Week pages of this guide for a tour.",
             zh: "四大亮點特區——AI、量子、晶圓智造與晶片新創——以及人才培育主題活動。可參考本導覽的「主題特區」與「展會週程」頁。" },
        links: [ { label: { en: "Browse the zones", zh: "瀏覽主題特區" }, href: "zones.html" },
                 { label: { en: "See show week", zh: "查看展會週程" }, href: "events.html" } ] },
      { q: { en: "Who organizes the show?", zh: "主辦與協辦單位是誰？" },
        a: { en: "SEMICON Taiwan is organized by SEMI, co-organized by TSIA (Taiwan Semiconductor Industry Association), with guidance from Taiwan's Ministry of Economic Affairs (MOEA).",
             zh: "SEMICON Taiwan 由 SEMI 主辦、TSIA（台灣半導體產業協會）協辦，並由經濟部（MOEA）指導。" } },
      { q: { en: "How can I plan my trip?", zh: "如何規劃參觀行程？" },
        a: { en: "The official site offers a trip-planning guide with travel, accommodation and on-site tips for international and domestic visitors.",
             zh: "官方網站提供行程規劃指南，含交通、住宿與現場小撇步，適合國內外參觀者參考。" },
        links: [ { label: { en: "Plan your trip", zh: "規劃您的行程" }, href: "https://www.semicontaiwan.org/zh/about/plan_your_trip" },
                 { label: { en: "Official website", zh: "前往官方網站" }, href: "https://www.semicontaiwan.org/zh" } ] }
    ]
  }
];
