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
   *  LIVE COVERAGE — what actually happened during show week
   *
   *  Every item links straight to the original article or post. Only links
   *  that were fetched and matched against their reported headline made it
   *  in: a source that could not be opened was dropped rather than listed
   *  on trust, because a guide whose links rot is worse than a shorter one.
   *
   *  `lang` is the language of the LINKED page, not of this card — the card
   *  is written in both, the badge warns you what you will land on.
   * ===================================================================== */
  {
    slug: "news", layout: "news", icon: "newspaper",
    title:    { en: "Live Coverage", zh: "現場快報" },
    subtitle: { en: "What was actually said, shown and announced during show week — every item linked to its original source.",
                zh: "展會期間真正被說出口、展出與發表的內容——每一則都附上原始出處連結。" },

    takeawaysTitle: { en: "What this year was really about", zh: "今年舉辦的重點" },
    takeawaysSub: {
      en: "Six threads ran through the whole week, from the opening keynote to the closing day.",
      zh: "從開幕主題演講到閉幕日，貫穿整週的六條主線。"
    },
    takeaways: [
      { icon: "hub",
        title: { en: "A chip show that became an AI-infrastructure show", zh: "從半導體展變成 AI 基礎設施展" },
        body: { en: "Cloud and hyperscaler names — Google, Microsoft, Nvidia, Broadcom, Meta, Micron — took top billing alongside TSMC, MediaTek and ASE for the first time. Google's Amin Vahdat opened the CEO Forum with his first public keynote in Asia.",
                zh: "雲端與超大規模業者——Google、微軟、輝達、博通、Meta、美光——首度與台積電、聯發科、日月光並列主舞台。Google 的 Amin Vahdat 以其亞洲首場公開主題演講揭開 CEO 論壇。" } },
      { icon: "lightbulb",
        title: { en: "Silicon photonics and CPO were the loudest theme", zh: "矽光子與 CPO 是今年最大聲的主題" },
        body: { en: "Optical interconnect was framed as the fix for AI's bandwidth and power wall. TSMC put numbers on its COUPE platform, and 2026 was repeatedly called the year optical links go from demo to deployment.",
                zh: "光互連被定位為 AI 頻寬與功耗牆的解方。台積電為 COUPE 平台給出具體數字，2026 一再被稱為光互連從展示走向大規模部署的一年。" } },
      { icon: "layers",
        title: { en: "Advanced packaging got its own pavilion — and its own bottleneck", zh: "先進封裝有了專屬展區，也有了瓶頸" },
        body: { en: "A new Chiplet Pavilion joined the packaging zone, while ASE and MediaTek used their stage time to flag manufacturing-capacity limits rather than to celebrate demand.",
                zh: "封裝技術區新增小晶片（Chiplet）專區；日月光與聯發科則把台上時間用來點出製造產能的瓶頸，而不是慶祝需求。" } },
      { icon: "science",
        title: { en: "Quantum and smart fab arrived as first-class zones", zh: "量子與晶圓智造首度成為獨立特區" },
        body: { en: "Two zones debuted this year: a Quantum Technology Zone covering superconducting, ion-trap and annealing paths, and a Smart Fab Zone showing collaborative and humanoid robots, digital twins and industrial AI on the fab floor.",
                zh: "今年首度新增兩大特區：量子技術特區涵蓋超導體、離子阱與量子退火三條路線；晶圓智造特區則呈現協作型與人形機器人、數位孿生與工業 AI 在廠務現場的應用。" } },
      { icon: "trending_up",
        title: { en: "The industry's yardstick got redrawn mid-show", zh: "產業的標尺在展期中被重畫" },
        body: { en: "SEMI pulled its US$1 trillion revenue milestone forward from 2030 to this year and now projects US$2 trillion by 2030. Equipment forecasts moved with it — 2026 wafer fab equipment spend up 23.1% to about US$144bn, and TSMC signalling 2026 capex approaching US$64bn.",
                zh: "SEMI 把「全球半導體營收破 1 兆美元」從 2030 年提前到今年，並將 2030 年上修至 2 兆美元。設備預測同步走高——2026 年晶圓廠設備支出年增 23.1% 至約 1,439 億美元，台積電並釋出 2026 年資本支出逼近 640 億美元的訊號。" } },

      { icon: "public",
        title: { en: "Record international scale, with geopolitics on the main stage", zh: "國際規模創紀錄，地緣政治也上了主舞台" },
        body: { en: "The global pavilion drew a record 18 countries. President Lai used the Semicon Network Summit to pitch Taiwan's ecosystem as a resilience play, and a US undersecretary called semiconductors the most important technology of our lifetime.",
                zh: "全球專區吸引創紀錄的 18 國參與。賴清德總統在 Semicon Network Summit 將台灣生態系定位為供應鏈韌性的一環，美方次卿則稱半導體是「我們這一生最重要的技術」。" } }
    ],

    categories: [
      { key: "official", en: "Official", zh: "官方" },
      { key: "media",    en: "Media",    zh: "媒體報導" },
      { key: "vendor",   en: "Exhibitors", zh: "廠商發表" },
      { key: "social",   en: "Social",   zh: "社群" }
    ],

    note: {
      en: "Independently compiled from public reporting and public posts during show week (Aug 31 – Sep 4, 2026). Every link was opened and checked against its headline before being listed; sources that could not be reached were left out. Figures are quoted as the source reported them.",
      zh: "本頁為展會期間（2026/8/31–9/4）公開報導與公開貼文的獨立整理。每一個連結都經實際開啟並與標題比對後才收錄，無法連上的來源一律不列。數字均照原始報導引述，未經二次推算。"
    },

    items: [
      /* ---------------- official ---------------- */
      { date: "2026-09-03", category: "official", lang: "en",
        source: { en: "SEMI", zh: "SEMI 官方" },
        title: { en: "SEMI and Silicon Catalyst partner to accelerate global semiconductor innovation",
                 zh: "SEMI 與 Silicon Catalyst 簽署策略夥伴關係，加速全球半導體創新" },
        summary: { en: "Announced during show week: an MOU linking SEMI's ecosystem with Silicon Catalyst's startup incubator, connecting founders to investors and manufacturers.",
                   zh: "展會期間發布：SEMI 與新創育成機構 Silicon Catalyst 簽署合作備忘錄，串連新創、投資人與製造商。" },
        href: "https://www.semi.org/zh/node/175306",
        tags: [ { en: "Startups", zh: "新創" }, { en: "Announced at the show", zh: "展會現場發布" } ] },

      { date: "2026-08-19", category: "official", lang: "en",
        source: { en: "SEMI", zh: "SEMI 官方" },
        title: { en: "Silicon Startups Zone doubles in size", zh: "晶片新創特區規模翻倍" },
        summary: { en: "Over 40 startups in the Silicon Valley startup area — double the previous edition — with the innovation showcase growing from 6 to 16 companies, plus a new Silicon Valley Startup Stage and SEMI Venture Day.",
                   zh: "矽谷新創展區參展新創逾 40 家，較前年翻倍；創新展示區從 6 家增至 16 家，並新增「矽谷新創舞台」與「SEMI 創投日」。" },
        href: "https://www.semi.org/zh/node/174746",
        tags: [ { en: "Startups", zh: "新創" }, { en: "Zones", zh: "特區" } ] },

      { date: "2026-08-14", category: "official", lang: "en",
        source: { en: "SEMI", zh: "SEMI 官方" },
        title: { en: "First full-day CEO Forum and Ecosystem Executive Summit — full speaker list",
                 zh: "CEO 論壇暨生態系高峰會首度全日制——完整講者名單" },
        summary: { en: "The official lineup: Amin Vahdat (Google) opening, plus Rani Borkar (Microsoft), Manish Bhatia (Micron), Asad Khamisy (Broadcom), Alexander Gorski (Infineon), CQ Tang (Meta) and Michael Kagan (Nvidia). Closing panel chaired by ASE's Tien Wu and TSIA's Cliff Hou.",
                   zh: "官方講者陣容：Google 的 Amin Vahdat 開場，另有微軟 Rani Borkar、美光 Manish Bhatia、博通 Asad Khamisy、英飛凌 Alexander Gorski、Meta 的 CQ Tang 與輝達 Michael Kagan。閉幕座談由日月光吳田玉與台灣半導體產業協會侯永清主持。" },
        href: "https://www.semi.org/zh/node/174581",
        tags: [ { en: "CEO Summit", zh: "大師論壇" }, { en: "Keynote", zh: "主題演講" } ] },

      { date: "2026-05-20", category: "official", lang: "zh",
        source: { en: "SEMI", zh: "SEMI 官方" },
        title: { en: "SEMICON Taiwan 2026 launches with four new spotlight zones",
                 zh: "SEMICON Taiwan 2026 正式啟動，量子技術、晶圓智造、AI 半導體、晶片新創特區登場" },
        summary: { en: "The kickoff release: 1,300+ exhibitors and 4,300+ booths, both records, with the Quantum Technology and Smart Fab zones debuting and a Chiplet Pavilion added to the packaging area.",
                   zh: "啟動新聞稿：逾 1,300 家展商、4,300 個攤位雙創新高，首度新增量子技術特區與晶圓智造特區，封裝技術概念區並增設小晶片（Chiplet）專區。" },
        href: "https://www.semi.org/zh/node/172436",
        tags: [ { en: "Scale", zh: "展會規模" }, { en: "Zones", zh: "特區" } ] },

      { date: "2026-05-20", category: "official", lang: "zh",
        source: { en: "SEMI", zh: "SEMI 官方" },
        title: { en: "SEMI 20 Under 40 awards, second edition", zh: "SEMI 20 Under 40 半導體新銳獎第二屆" },
        summary: { en: "The award returns for a second year with a new industry-academia category, honouring 20 people under 40 from across the Taiwanese chip ecosystem.",
                   zh: "新銳獎邁入第二屆並新增「產學應用組」，表彰台灣半導體生態系中 20 位 40 歲以下的人才。" },
        href: "https://www.semi.org/zh/SEMI-20-UNDER-40",
        tags: [ { en: "Awards", zh: "獎項" }, { en: "Talent", zh: "人才" } ] },

      /* ---------------- media ---------------- */
      { date: "2026-09-02", category: "media", lang: "zh",
        source: { en: "CRNTT", zh: "中評社" },
        title: { en: "SEMI hands its first Semiconductor Partnership Leadership Award to the AIT director",
                 zh: "SEMI 首度頒發半導體夥伴領導獎給 AIT 處長谷立言" },
        summary: { en: "First-hand reporting from the opening ceremony: the premier attended with the economy minister and the NSTC head, then toured the US pavilion. At the ceremony SEMI gave a first-of-its-kind partnership leadership award to AIT's director for his role in US-Taiwan chip cooperation. The premier's remarks put the number of national pavilions at 19.",
                   zh: "開幕典禮現場報導：行政院長卓榮泰偕經濟部長龔明鑫、國科會主委吳誠文出席後參觀美國專區。典禮上 SEMI 首度頒發「半導體夥伴領導獎」給美國在台協會處長谷立言，表彰其促成台美半導體合作的角色。卓榮泰致詞時提及共 19 國設置國家館。" },
        href: "https://hk.crntt.com/doc/1602/6/3/7/160263743.html?coluid=7&kindid=0&docid=160263743&mdate=0902150841",
        tags: [ { en: "Opening", zh: "開幕" }, { en: "Awards", zh: "獎項" } ] },

      { date: "2026-09-02", category: "media", lang: "zh",
        source: { en: "Anue Cnyes", zh: "鉅亨網" },
        title: { en: "US pavilion opens as Taiwan announces another US$20 billion of US investment",
                 zh: "台美合作開新局！龔明鑫爆赴美「加碼」200 億美元再掀一波投資潮" },
        summary: { en: "The Chinese-language opening-day account of the US pavilion ribbon-cutting, where the economy minister put a further US$20bn of Taiwanese investment in the US on the table — on top of the US$35bn pledged in May.",
                   zh: "美國館揭幕當天的中文報導：經濟部長於現場宣布台灣半導體供應鏈再加碼 200 億美元赴美投資，係在 5 月已宣布的 350 億美元之外。" },
        href: "https://news.cnyes.com/news/id/6595465",
        tags: [ { en: "Opening", zh: "開幕" }, { en: "Policy", zh: "政策" } ] },

      { date: "2026-09-04", category: "media", lang: "en",
        source: { en: "Taipei Times", zh: "Taipei Times" },
        title: { en: "SEMI pulls its US$1 trillion milestone forward from 2030 to this year",
                 zh: "SEMI 把「全球半導體營收破 1 兆美元」從 2030 年提前到今年" },
        summary: { en: "Citing the order momentum visible at the show, Taiwan's economy minister said SEMI has raised its global semiconductor revenue forecast to US$1tn this year and US$2tn by 2030 — the earlier estimate had put the US$1tn mark at 2030. He tied it to a planned additional US$20bn of Taiwanese investment in the US.",
                   zh: "經濟部長談及展會上暢旺的接單動能時表示，SEMI 已將全球半導體營收預測上修為今年 1 兆美元、2030 年 2 兆美元——先前的估計是 2030 年才達到 1 兆美元。他並提及台灣企業規劃追加赴美投資 200 億美元。" },
        href: "https://www.taipeitimes.com/News/biz/archives/2026/09/04/2003863636",
        tags: [ { en: "Market outlook", zh: "市場預測" }, { en: "Policy", zh: "政策" } ] },

      { date: "2026-09-04", category: "media", lang: "en",
        source: { en: "Digitimes Asia", zh: "Digitimes Asia" },
        title: { en: "QuantumDiamonds cracks the hybrid bonding blind spot with new inline metrology",
                 zh: "QuantumDiamonds 以新的線上量測補上混合鍵合的盲區" },
        summary: { en: "A startup showing at the metrology forum on closing day: inline measurement aimed at the part of hybrid bonding that existing tools cannot see — the inspection gap that advanced packaging keeps running into.",
                   zh: "閉幕日檢測計量論壇上的新創展示：針對現有工具看不到的混合鍵合環節做線上量測，正是先進封裝一再撞上的檢測缺口。" },
        href: "https://www.digitimes.com/news/a20260904VL212/taiwan-2026-metrology-semiconductor-industry-wafer.html",
        tags: [ { en: "Metrology", zh: "檢測計量" }, { en: "Advanced packaging", zh: "先進封裝" } ] },

      { date: "2026-09-03", category: "media", lang: "zh",
        source: { en: "Commercial Times", zh: "工商時報" },
        title: { en: "Taiwan's 'AI five' share a stage for the first time — competition is now a whole-supply-chain fight",
                 zh: "晶片升級「系統戰」！科技五虎將開講，說的其實是同一句話：AI 需求仍強" },
        summary: { en: "TSMC, MediaTek, Foxconn, ASE and Unimicron — together worth over NT$76 trillion — appeared together for the first time, spanning foundry, IC design, test and assembly, AI systems and substrates. Their shared message: the contest has moved from single chips to the whole supply chain.",
                   zh: "台積電、聯發科、鴻海、日月光投控與欣興首度同台，五家總市值逾 76 兆元，橫跨晶圓製造、IC 設計、封測、AI 系統與 IC 載板。共同定調：競爭已從單一晶片較勁，升級為整條供應鏈的系統戰。" },
        href: "https://www.ctee.com.tw/news/20260903700054-439901",
        tags: [ { en: "CEO Summit", zh: "大師論壇" }, { en: "Supply chain", zh: "供應鏈" } ] },

      { date: "2026-09-03", category: "media", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "This year's show isn't over and the 2027 booth scramble has already begun",
                 zh: "今年展還沒結束、明年先廝殺！SEMICON 台灣 2027 搶攤大戰開打" },
        summary: { en: "A look at how floor space actually gets allocated: priority follows how many years a company has exhibited, so the long-timers pick first and latecomers are left with whatever is off the main aisles.",
                   zh: "報導展位如何分配：排序依過往參展次數而定，「老班底」先挑，熱門走道與人流密集區最搶手，排序靠後的廠商選擇餘地有限。" },
        href: "https://ccc.technews.tw/2026/09/03/semicon-taiwan-2027-booth-wars-kick-off-before-this-years-exhibition-concludes",
        tags: [ { en: "Behind the scenes", zh: "展會幕後" } ] },

      { date: "2026-09-03", category: "media", lang: "en",
        source: { en: "Digitimes Asia", zh: "Digitimes Asia" },
        title: { en: "TSMC doubles down on equipment purchases as AI outpaces supply-chain planning",
                 zh: "台積電加碼設備採購，AI 需求超出供應鏈規劃速度" },
        summary: { en: "TSMC Deputy Co-COO Cliff Hou told the show its quarterly chipmaking-tool needs had been raised to roughly 1.9× the December estimate, with 2026 capex possibly approaching US$64 billion.",
                   zh: "台積電副共同營運長侯永清於展會表示，季度晶片製造設備需求已上調至去年 12 月估計值的約 1.9 倍，2026 年資本支出可能逼近 640 億美元。" },
        href: "https://www.digitimes.com/news/a20260903PD217/tsmc-equipment-demand-supply-chain-taiwan.html",
        tags: [ { en: "TSMC", zh: "台積電" }, { en: "Capex", zh: "資本支出" } ] },

      { date: "2026-09-02", category: "media", lang: "en",
        source: { en: "Taipei Times", zh: "Taipei Times" },
        title: { en: "Lai touts industrial connections at Semicon", zh: "賴清德在 Semicon 強調半導體帶來的產業連結" },
        summary: { en: "At the Semicon Network Summit the president argued chips have built 'a more diversified and resilient supply chain'; a US undersecretary, appearing by video, called semiconductors 'the single most important technology of our lifetime'.",
                   zh: "總統在 Semicon Network Summit 表示半導體打造出「更多元、更具韌性的供應鏈」；美方次卿以預錄影片稱半導體是「我們這一生最重要的技術」。" },
        href: "https://www.taipeitimes.com/News/front/archives/2026/09/02/2003863534",
        tags: [ { en: "Opening", zh: "開幕" }, { en: "Policy", zh: "政策" } ] },

      { date: "2026-09-02", category: "media", lang: "zh",
        source: { en: "CRNTT", zh: "中評社" },
        title: { en: "Queues out the door on day one as the show hits a new high",
                 zh: "國際半導體展台灣登場規模升級，排長隊觀展" },
        summary: { en: "On-the-ground reporting from opening day: queues formed outside the Hall 2 ceremony before doors opened, entry split into Express and general lanes, with a notably high share of international visitors.",
                   zh: "開幕首日現場報導：二館七樓開幕典禮會場外在開放入場前已排起長隊，動線分為 Express 與一般參觀者兩條，等候人潮中外籍面孔比例甚高。" },
        href: "https://hk.crntt.com/doc/1602/6/3/4/160263481.html?coluid=7&kindid=0&docid=160263481&mdate=0902100946",
        tags: [ { en: "On the ground", zh: "現場直擊" }, { en: "Scale", zh: "展會規模" } ] },

      { date: "2026-09-02", category: "media", lang: "en",
        source: { en: "Digitimes Asia", zh: "Digitimes Asia" },
        title: { en: "Semicon Taiwan 2026 signals a broader race for AI-era leadership",
                 zh: "SEMICON Taiwan 2026 揭示 AI 時代半導體競賽的擴大" },
        summary: { en: "Framing piece arguing the show has expanded beyond chipmaking into packaging, smart fab, quantum technology and system integration.",
                   zh: "評析報導指出，展會已從晶片製造擴展至封裝、智慧廠務、量子技術與系統整合。" },
        href: "https://www.digitimes.com/news/a20260902PD209/taiwan-2026-packaging-technology-fab.html",
        tags: [ { en: "Analysis", zh: "產業分析" } ] },

      { date: "2026-09-01", category: "media", lang: "en",
        source: { en: "Digitimes Asia", zh: "Digitimes Asia" },
        title: { en: "SEMI lifts 2028 wafer fab equipment forecast to US$220 billion",
                 zh: "SEMI 上調 2028 年晶圓廠設備支出預測至 2,200 億美元" },
        summary: { en: "Show-floor forecast numbers: 2026 WFE spend projected up 23.1% to US$143.9bn, 300mm fab equipment around US$133bn (+18%), foundry/logic WFE up 18.9% on 2nm and sub-2nm buildouts.",
                   zh: "展會發布的預測數字：2026 年晶圓廠設備支出預估年增 23.1% 至 1,439 億美元，300mm 廠設備約 1,330 億美元（+18%），晶圓代工／邏輯設備年增 18.9%，由 2 奈米與以下製程建置驅動。" },
        href: "https://www.digitimes.com/news/a20260901VL214/semicon-taiwan-wafer-fab-equipment-forecast-semi.html",
        tags: [ { en: "Market outlook", zh: "市場預測" }, { en: "Equipment", zh: "設備" } ] },

      { date: "2026-09-01", category: "media", lang: "en",
        source: { en: "Digitimes Asia", zh: "Digitimes Asia" },
        title: { en: "AI packaging demand surges — ASE EVP names two manufacturing bottlenecks",
                 zh: "AI 封裝需求激增，日月光執行副總點出兩大製造瓶頸" },
        summary: { en: "ASE's executive vice president used the show to identify where advanced-packaging capacity actually binds, rather than to talk up demand.",
                   zh: "日月光執行副總於展會指出先進封裝產能真正卡關之處，而非只談需求成長。" },
        href: "https://www.digitimes.com/news/a20260901PD244/ase-equipment-packaging-demand-taiwan.html",
        tags: [ { en: "Advanced packaging", zh: "先進封裝" }, { en: "ASE", zh: "日月光" } ] },

      { date: "2026-08-31", category: "media", lang: "en",
        source: { en: "TrendForce", zh: "TrendForce" },
        title: { en: "Show highlights AI infrastructure and CPO; Google AI chief technologist makes Asia keynote debut",
                 zh: "展會聚焦 AI 基礎設施與 CPO，Google AI 基礎設施長首度在亞洲發表主題演講" },
        summary: { en: "Calls this the largest edition on record. Google's Amin Vahdat gives his first public keynote in Asia on custom chips, data centers and high-speed networking; TSMC's session covers heterogeneous integration for the AI era.",
                   zh: "稱本屆為歷來最大規模。Google 的 Amin Vahdat 於亞洲首度公開演講，主題為客製化晶片、資料中心與高速網路；台積電場次則談 AI 時代的異質整合。" },
        href: "https://www.trendforce.com/news/2026/08/31/news-semicon-taiwan-highlights-ai-infrastructure-cpo-google-ai-chief-technologist-to-make-asia-keynote-debut",
        tags: [ { en: "Keynote", zh: "主題演講" }, { en: "AI infrastructure", zh: "AI 基礎設施" } ] },

      { date: "2026-08-31", category: "media", lang: "en",
        source: { en: "TrendForce", zh: "TrendForce" },
        title: { en: "TSMC: SoIC and CoWoS to drive 50× compute by 2029; silicon photonics to top 50% of transceiver market by 2027",
                 zh: "台積電：SoIC 與 CoWoS 2029 年前推升運算效能 50 倍，矽光子 2027 年將佔光收發器市場逾五成" },
        summary: { en: "TSMC put numbers on the roadmap: N2P-on-N3P in 2026 through A14-on-A14 in 2029, and a COUPE platform moving optical bandwidth from 3.2Tbps to above 12.8Tbps.",
                   zh: "台積電給出具體路線圖：2026 年 N2P-on-N3P、2029 年 A14-on-A14；COUPE 平台將光通訊頻寬從 3.2Tbps 推升至 12.8Tbps 以上。" },
        href: "https://www.trendforce.com/news/2026/08/31/news-tsmc-soic-cowos-drive-50x-compute-by-2029-silicon-photonics-to-top-50-of-transceiver-market-by-2027/",
        tags: [ { en: "TSMC", zh: "台積電" }, { en: "Silicon photonics", zh: "矽光子" } ] },

      { date: "2026-08-31", category: "media", lang: "en",
        source: { en: "Taipei Times", zh: "Taipei Times" },
        title: { en: "Semicon to put spotlight on CPO, silicon photonics", zh: "Semicon 聚焦 CPO 與矽光子" },
        summary: { en: "Preview of the show's central technical theme: co-packaged optics as the answer to data-center bandwidth and power limits.",
                   zh: "展前報導指出今年核心技術主題：共封裝光學（CPO）作為資料中心頻寬與功耗限制的解方。" },
        href: "https://www.taipeitimes.com/News/biz/archives/2026/08/31/2003863391",
        tags: [ { en: "Silicon photonics", zh: "矽光子" }, { en: "CPO", zh: "CPO" } ] },

      { date: "2026-08-31", category: "media", lang: "en",
        source: { en: "Tech Times", zh: "Tech Times" },
        title: { en: "SEMICON Taiwan 2026 kicks off: AI chips' bottleneck is the wires connecting them",
                 zh: "SEMICON Taiwan 2026 開幕：AI 晶片的瓶頸在連接它們的線路" },
        summary: { en: "Opening-day framing of the week's central argument — interconnect, not transistor count, is what now limits AI systems.",
                   zh: "開展報導點出本週核心論點：限制 AI 系統的已不是電晶體數量，而是互連。" },
        href: "https://www.techtimes.com/articles/326056/20260831/semicon-taiwan-2026-kicks-off-ai-chips-bottleneck-wires-connecting-them.htm",
        tags: [ { en: "Interconnect", zh: "互連技術" } ] },

      { date: "2026-08-30", category: "media", lang: "en",
        source: { en: "Focus Taiwan", zh: "中央社 Focus Taiwan" },
        title: { en: "SEMICON Taiwan 2026: what to watch", zh: "SEMICON Taiwan 2026 有什麼看點" },
        summary: { en: "Preview with the official numbers — 1,300+ exhibitors, 4,300 booths, 65 countries, 18 national pavilions, 100,000+ attendees — and notes cloud and data-center firms are featured for the first time.",
                   zh: "展前導覽附官方數字：逾 1,300 家展商、4,300 個攤位、65 國、18 個國家館、逾 10 萬人次，並指出雲端與資料中心業者首度被納入主要陣容。" },
        href: "https://focustaiwan.tw/sci-tech/202608300005",
        tags: [ { en: "Preview", zh: "展前導覽" }, { en: "Scale", zh: "展會規模" } ] },

      { date: "2026-08-30", category: "media", lang: "en",
        source: { en: "Focus Taiwan", zh: "中央社 Focus Taiwan" },
        title: { en: "SEMICON Taiwan to spotlight silicon photonics, CPO commercialization",
                 zh: "SEMICON Taiwan 聚焦矽光子與 CPO 商用化" },
        summary: { en: "Cites TSMC's COUPE platform progress and Nvidia's Spectrum-X CPO switches entering production, calling 2026 a pivotal year for large-scale optical interconnect.",
                   zh: "引述台積電 COUPE 平台進展與輝達 Spectrum-X CPO 交換器進入量產，稱 2026 為光互連大規模部署的關鍵年。" },
        href: "https://focustaiwan.tw/sci-tech/202608300007",
        tags: [ { en: "Silicon photonics", zh: "矽光子" }, { en: "CPO", zh: "CPO" } ] },

      { date: "2026-08-15", category: "media", lang: "en",
        source: { en: "Focus Taiwan", zh: "中央社 Focus Taiwan" },
        title: { en: "SEMICON Taiwan 2026 forum to expand to full-day format",
                 zh: "SEMICON Taiwan 2026 論壇擴大為全日制" },
        summary: { en: "The CEO Summit and Ecosystem Executive Summit become a full-day program for the first time, held Sept 2 at TaiNEX Hall 2.",
                   zh: "CEO 論壇與生態系高峰會首度擴大為全日制，9 月 2 日於南港展覽館 2 館舉行。" },
        href: "https://focustaiwan.tw/sci-tech/202608150006",
        tags: [ { en: "CEO Summit", zh: "大師論壇" } ] },

      { date: "2026-09-01", category: "media", lang: "zh",
        source: { en: "mashdigi", zh: "mashdigi" },
        title: { en: "'Dream Fab' micro-fab exhibit opens up chipmaking in four stations",
                 zh: "「Dream Fab」微型晶圓廠四大展區，揭開晶片製造神祕面紗" },
        summary: { en: "SEMI and ten partners built a working miniature fab on the show floor: an ASML High-NA EUV lithography model, SCREEN wafer cleaning, Gudeng FOUP carriers, overhead transport, plus Advantest and MPI test and probe-card stations.",
                   zh: "SEMI 攜手十家夥伴在展場打造微型晶圓廠：ASML High-NA EUV 微影模型、SCREEN 晶圓清洗設備、家登精密晶圓傳送盒（FOUP）、天車搬運系統，以及愛德萬測試與旺矽的測試機與探針卡。" },
        href: "https://mashdigi.com/semicon-taiwan-2026-will-showcase-the-dream-fab-micro-wafer-fab-with-four-exhibition-areas-unveiling-the-mysteries-of-chip-manufacturing/",
        tags: [ { en: "Show floor", zh: "展場亮點" }, { en: "Talent", zh: "人才培育" } ] },

      /* ---------------- vendor ---------------- */
      { date: "2026-09-04", category: "vendor", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "Toward Technologies brings 60GHz relays and Opto-SiC MOSFET switching",
                 zh: "拓緯展示最新 Relay 技術，布局高階 Switching Solution" },
        summary: { en: "The company showed a broadband conical inductor supporting up to 60GHz and an Opto-SiC MOSFET relay combining SiC MOSFETs with optocouplers at kV-class load voltage.",
                   zh: "以「顛覆你對 Relay 的想像」為題，展出可支援至 60GHz 的 Broadband Conical Inductor，以及整合 SiC MOSFET 與光耦合、負載電壓達 kV 等級的 Opto-SiC MOSFET Relay。" },
        href: "https://technews.tw/2026/09/04/toward-semicon-taiwan-2026",
        tags: [ { en: "New product", zh: "新產品" }, { en: "Taiwan supplier", zh: "台廠" } ] },

      { date: "2026-09-03", category: "vendor", lang: "zh",
        source: { en: "CNA", zh: "中央社 CNA" },
        title: { en: "Qisda Group targets CPO with a 160-channel fiber array unit line",
                 zh: "佳世達集團聚焦先進製程 CPO 與矽光子應用" },
        summary: { en: "Three group companies exhibited: dry-ice cleaning modules for precision cleaning, electronic fluorinated liquid for tool temperature control and server cooling, and a 160-channel FAU one-stop manufacturing solution aimed at CPO volume production.",
                   zh: "集團旗下三家公司參展：羅昇推乾冰清洗倉模組做精密清潔、資騰導入電子氟化液用於設備溫控與伺服器冷卻、光陽光電以「160 通道 FAU 智慧製造一站式解決方案」切入 CPO 量產需求。" },
        href: "https://www.cna.com.tw/news/afe/202609030305.aspx",
        tags: [ { en: "CPO", zh: "CPO" }, { en: "Taiwan supplier", zh: "台廠" } ] },

      { date: "2026-09-03", category: "vendor", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "Applied Materials on CPO's thermal problem: optics don't just slow down, they move",
                 zh: "應材揭先進封裝挑戰：CPO 超怕「熱」，每個元件都有脾氣還會位移" },
        summary: { en: "An Applied Materials VP explained that heat in co-packaged optics causes physical displacement of optical components rather than a graceful performance drop, making whole-process control and defect inspection the real requirement.",
                   zh: "應材副總鄭心圃指出，CPO 的熱問題會造成光學元件實際「位移」而非單純效能下降，每個元件對溫度與壓力反應不同，需整體製程控制與缺陷檢測方案。" },
        href: "https://technews.tw/2026/09/03/applied-materials-semicon-taiwan-2026",
        tags: [ { en: "CPO", zh: "CPO" }, { en: "Applied Materials", zh: "應用材料" } ] },

      { date: "2026-09-03", category: "vendor", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "Merck completes NT$17 billion Taiwan investment", zh: "完成 170 億元在台投資！默克：持續深化在地布局" },
        summary: { en: "Merck announced its roughly NT$17bn (€500m) Taiwan investment is complete, with its CEO arguing that classical scaling alone can no longer carry industry growth.",
                   zh: "默克宣布完成約新台幣 170 億元（5 億歐元）在台投資，執行長賀天銘表示「僅靠傳統微縮已不足支撐產業成長」。" },
        href: "https://technews.tw/2026/09/03/merck-semicon-taiwan-2026",
        tags: [ { en: "Materials", zh: "材料" }, { en: "Investment", zh: "投資" } ] },

      { date: "2026-08-26", category: "vendor", lang: "en",
        source: { en: "PR Newswire", zh: "PR Newswire" },
        title: { en: "E&R Engineering launches five-axis laser drilling and hybrid plasma systems for CPO",
                 zh: "鈦昇科技發表五軸雷射鑽孔與混合電漿系統，鎖定 CPO 與先進封裝" },
        summary: { en: "Taiwanese supplier E&R Engineering introduced a ±0.5μm five-axis FAU laser drilling system and a dual-source hybrid plasma system aimed at fiber array units, glass substrates and through-glass vias.",
                   zh: "台廠鈦昇科技發表精度 ±0.5μm 的五軸 FAU 雷射鑽孔系統與雙源混合電漿系統，鎖定光纖陣列單元、玻璃基板與穿透玻璃通孔（TGV）加工。" },
        href: "https://www.prnewswire.com/news-releases/er-engineering-launches-new-high-precision-laser-drilling-and-advanced-hybrid-plasma-solutions-for-cpo-and-advanced-packaging-at-semicon-taiwan-2026-302860379.html",
        tags: [ { en: "New product", zh: "新產品" }, { en: "Taiwan supplier", zh: "台廠" } ] },

      { date: "2026-08-24", category: "vendor", lang: "zh",
        source: { en: "CNA via PChome", zh: "中央社（PChome 轉載）" },
        title: { en: "Lam Research brings etch, photonics, FOPLP and digital-twin talks to the show",
                 zh: "科林研發以先進製程創新亮相 SEMICON Taiwan 2026" },
        summary: { en: "Six Lam specialists spoke across forums on plasma etch for 3D manufacturing, silicon photonics and CPO, panel-level fan-out, digital-twin yield optimisation, robotic maintenance and hybrid bonding.",
                   zh: "科林研發六位專家橫跨多場論壇，分享電漿蝕刻 3D 製造、矽光子與 CPO、面板級扇出封裝、數位分身良率優化、機器人自動化維護與混合鍵合。" },
        href: "https://news.pchome.com.tw/living/cna/20260824/index-17875544739990718009.html",
        tags: [ { en: "Equipment", zh: "設備" }, { en: "Forums", zh: "論壇" } ] },

      { date: "2026-08-21", category: "vendor", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "ASE raises 2026 capex to US$10.5 billion, joins SEMI materials consortium",
                 zh: "日月光：攜手在地半導體材料供應鏈，為台灣築起 20 年防禦高牆" },
        summary: { en: "At the founding of SEMI's semiconductor materials consortium, ASE said 2026 capex rises to US$10.5bn — about US$4bn for facilities and US$6.5bn for production equipment.",
                   zh: "於 SEMI 半導體材料聯盟成立大會上，日月光表示 2026 年資本支出上調至 105 億美元，其中約 40 億美元用於新廠房與基礎設施、65 億美元用於生產設備。" },
        href: "https://finance.technews.tw/2026/08/21/by-joining-hands-with-the-local-semiconductor-materials-supply-chain-a-20-year-defensive-wall-has-been-built-for-taiwan/",
        tags: [ { en: "ASE", zh: "日月光" }, { en: "Capex", zh: "資本支出" } ] },

      { date: "2026-08-19", category: "vendor", lang: "zh",
        source: { en: "TechNews", zh: "科技新報 TechNews" },
        title: { en: "Applied Materials on panel-level packaging; Qnity CEO takes the Master Forum stage",
                 zh: "應材 SEMICON Taiwan 論壇聚焦關鍵技術；Qnity 執行長首登大師論壇" },
        summary: { en: "Applied Materials presented its panel-level electrochemical deposition portfolio and explained how maskless digital imaging improves pattern accuracy and yield on large panels.",
                   zh: "應材發表面板級電化學沉積（ECD）產品組合，並說明無光罩數位成像如何提升大尺寸面板的圖案精度與良率。" },
        href: "https://technews.tw/2026/08/19/semicon-taiwan-2026-applied-materials-qnity/",
        tags: [ { en: "Advanced packaging", zh: "先進封裝" }, { en: "FOPLP", zh: "面板級封裝" } ] },

      { date: "2026-09-02", category: "vendor", lang: "zh",
        source: { en: "Hermes-Epitek", zh: "漢民科技" },
        title: { en: "Hermes-Epitek shows SiC substrates and a quantum technology lineup",
                 zh: "漢民科技展出半導體關鍵設備與量子技術" },
        summary: { en: "Alongside its ion implanter, ICP etcher and MOCVD systems and 8/12-inch SiC substrates, the company made its first quantum-zone showing with superconducting film epitaxy, SNSPD single-photon detectors and photonic quantum chips.",
                   zh: "除自製離子植入機、ICP 蝕刻機、MOCVD 系統與 8 吋／12 吋碳化矽基板外，並於量子專區首度展示超導薄膜磊晶平台、超導奈米線單光子偵測器（SNSPD）與光量子晶片。" },
        href: "https://www.hermes.com.tw/semicon-taiwan-2026/",
        tags: [ { en: "Quantum", zh: "量子技術" }, { en: "Taiwan supplier", zh: "台廠" } ] },

      { date: "2026-09-02", category: "vendor", lang: "en",
        source: { en: "KLA", zh: "KLA" },
        title: { en: "KLA at booth M0248, with talks at the CEO Summit and 3DIC Summit",
                 zh: "KLA 於 M0248 攤位展出，並在 CEO 論壇與異質整合高峰會演講" },
        summary: { en: "The company's official show page: wafer-handling and chemical process control on the floor, plus its semiconductor products president speaking at the CEO Summit.",
                   zh: "官方展會頁面：攤位展示晶圓處理與化學製程控制方案，半導體產品總裁於 CEO 論壇演講。" },
        href: "https://www.kla.com/events/semicon-taiwan-2026",
        tags: [ { en: "Process control", zh: "製程控制" } ] },

      /* ---------------- social ---------------- */
      { date: "2026-09-02", category: "social", lang: "en",
        source: { en: "TaiwanPlus News (YouTube)", zh: "TaiwanPlus News（YouTube）" },
        title: { en: "Semicon Taiwan 2026 kicks off in Taipei", zh: "Semicon Taiwan 2026 於台北開幕" },
        summary: { en: "Opening-day video report from the show floor.",
                   zh: "開展當日的展場影音報導。" },
        href: "https://www.youtube.com/watch?v=eR5Cp5CJajQ",
        tags: [ { en: "Video", zh: "影音" }, { en: "Opening", zh: "開幕" } ] },

      { date: "2026-09-02", category: "social", lang: "zh",
        source: { en: "YouTube", zh: "YouTube" },
        title: { en: "Walking the floor: the Taiwanese test and packaging suppliers behind TSMC",
                 zh: "2026 SEMICON 展場直擊！台積電大軍發威，現場帶你挖出「半導體隱形冠軍」" },
        summary: { en: "A finance channel walks the show floor booth by booth through Taiwan's test, probe-card and equipment suppliers — the closest thing to a first-hand visitor walkthrough that surfaced.",
                   zh: "財經頻道逐攤走訪台灣測試、探針卡與設備供應商攤位，是目前搜尋到最接近第一手逛展紀錄的內容。" },
        href: "https://www.youtube.com/watch?v=Es5rvQroRRo",
        tags: [ { en: "On the ground", zh: "現場直擊" }, { en: "Supply chain", zh: "供應鏈" } ] },

      { date: "2026-08-30", category: "social", lang: "en",
        source: { en: "TaiwanPlus News (YouTube)", zh: "TaiwanPlus News（YouTube）" },
        title: { en: "Record number of participating countries join SEMICON Taiwan 2026",
                 zh: "SEMICON Taiwan 2026 參與國家數創新高" },
        summary: { en: "Report on the global pavilion reaching a record 18 countries, with Spain, Mexico and Finland joining for the first time.",
                   zh: "報導全球專區達創紀錄的 18 國參與，西班牙、墨西哥與芬蘭首度加入。" },
        href: "https://www.youtube.com/watch?v=g4Q5-FkgS_8",
        tags: [ { en: "Video", zh: "影音" }, { en: "International", zh: "國際參與" } ] },

      { date: "2026-08-28", category: "social", lang: "en",
        source: { en: "HK Business Wire (LinkedIn)", zh: "HK Business Wire（LinkedIn）" },
        title: { en: "Smart manufacturing zone grows 20% to become the show's largest",
                 zh: "智慧製造特區成長 20%，成為本屆最大展區" },
        summary: { en: "Post summarising the floor-plan shift: smart manufacturing up 20% year on year to become the largest zone, advanced packaging up 6% as the second largest, with new 3DIC, FOPLP, packaging and chiplet areas.",
                   zh: "貼文整理展區配置變化：智慧製造特區年增 20% 成為最大展區，先進封裝特區成長 6% 居次，並新設 3DIC、FOPLP、封裝與小晶片四大專區。" },
        href: "https://www.linkedin.com/posts/hk-business-wire_semicon-taiwan-2026-highlights-ai-driven-activity-7495680926513963008--vQY",
        tags: [ { en: "Zones", zh: "特區" }, { en: "Smart manufacturing", zh: "智慧製造" } ] },

      { date: "2026-08-27", category: "social", lang: "en",
        source: { en: "RENA Technologies (LinkedIn)", zh: "RENA Technologies（LinkedIn）" },
        title: { en: "RENA to show through-glass-via panel processing and wet process automation",
                 zh: "RENA 將展示穿透玻璃通孔面板製程與全自動濕製程方案" },
        summary: { en: "An exhibitor's own pre-show post describing what it brought to the floor — glass-substrate TGV panel equipment and fully automated wet processing.",
                   zh: "參展商展前自述帶到現場的內容：玻璃基板 TGV 面板設備與全自動濕製程解決方案。" },
        href: "https://www.linkedin.com/posts/rena-technologies_at-semicon-taiwan-2026-our-glass-and-semiconductor-activity-7492469042692222976-03Su",
        tags: [ { en: "Glass substrate", zh: "玻璃基板" }, { en: "Exhibitor post", zh: "參展商貼文" } ] }
    ]
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
      { slug: "process-eng", category: "technical",
        tags: [ { en: "Advanced Process", zh: "先進製程" },
                { en: "Inspection & Metrology", zh: "計量檢測" },
                { en: "Smart Manufacturing", zh: "智慧製造" } ],
        exhibitors: [ { name: "Tokyo Electron", booth: "M0648" }, { name: "Lam Research", booth: "M0858" }, { name: "KLA", booth: "M0248" }, { name: "Accretech", booth: "M0348" }, { name: "Onto Innovation", booth: "L0728" }, { name: "Nikon", booth: "M0148" }, { name: "Lasertec", booth: "L1128" }, { name: "SUSS MicroTec", booth: "N0162" }, { name: "ULVAC", booth: "P5206" }, { name: "ACM Research", booth: "K2268" } ],
        title:   { en: "Process & Equipment Engineers", zh: "製程・設備工程師" },
        summary: { en: "Chasing the leading edge of nodes, metrology and the fab floor.", zh: "鎖定最前沿製程、量測與產線的工程師。" },
        overview:{ en: "Don't miss the Advanced Process Technology Forum (Aug 31), plus Inspection & Metrology and Advanced Test (Sep 3–4). On the floor, head to the Smart Fab Zone for AI-plus-robotics production lines. Tip: forum days (Aug 31, Sep 3) sit largely off-site at the hotels — separate them from your show-floor days (Sep 2–4).",
                   zh: "必看「半導體先進製程科技論壇」（8/31），以及「先進檢測與計量」「先進測試」（9/3–9/4）；展場則到「晶圓智造特區」看 AI×機器人產線。動線提示：論壇多在漢來飯店與雅悅會館，建議把論壇日（8/31、9/3）與逛展日（9/2–9/4）分開安排。" } },
      { slug: "packaging-eng", category: "technical",
        tags: [ "HIGS", "3DIC", { en: "Panel-Level Fan-Out", zh: "面板級扇出" } ],
        exhibitors: [ { name: "BESI", booth: "M0438" }, { name: "ASMPT", booth: "L0716" }, { name: "DISCO", booth: "M0748" }, { name: "Kulicke & Soffa", booth: "L0616" }, { name: "Nordson", booth: "I2308" }, { name: "Gallant Precision", booth: "N0662" }, { name: "Hanmi Semiconductor", booth: "L0516" }, { name: "PowerTech (PTI)", booth: "K2882" } ],
        title:   { en: "Packaging & Heterogeneous Integration", zh: "封裝・異質整合工程師" },
        summary: { en: "Chiplets, advanced packaging and 3D stacking are your world.", zh: "小晶片、先進封裝與 3D 堆疊是你的主場。" },
        overview:{ en: "Anchor on the three-day HIGS summit (Sep 1, 3, 4 at Ya-Yue Hall, Fu-Li Hall), then add the 3DIC Global Summit (Sep 1) and Panel-Level Fan-Out (Aug 31). HIGS runs three consecutive days in the same room, so it's easy to follow start to finish.",
                   zh: "以「異質整合 HIGS」三天（9/1、9/3、9/4，雅悅會館 馥儷廳）為主軸，搭配「3DIC 全球高峰論壇」（9/1）與「面板級扇出封裝」（8/31）。HIGS 連三天同一場地，方便從頭跟到尾。" } },
      { slug: "design-ai", category: "technical",
        tags: [ { en: "AI Zone", zh: "AI 特區" },
                { en: "Silicon Photonics", zh: "矽光子" },
                { en: "Memory", zh: "記憶體" } ],
        exhibitors: [ { name: "Siemens (EDA)", booth: "Q5536" }, { name: "Keysight", booth: "K2037" }, { name: "Chroma ATE", booth: "K2576" }, { name: "Advantech", booth: "Q5637" }, { name: "WIN Semiconductors", booth: "J3234" }, { name: "United Silicon Innovation", booth: "L1024" } ],
        title:   { en: "Design & AI Chips", zh: "設計・AI 晶片" },
        summary: { en: "AI accelerators, ASICs and the interconnect feeding them.", zh: "AI 加速器、ASIC 與餵養它們的互連。" },
        overview:{ en: "Start in the AI Technology Zone for chip-design and ASIC trends, then catch Silicon Photonics (Aug 31), the Memory Summit (Sep 1) and Market Trends (Sep 1). Put the CEO Summit (Sep 2) on your must-attend list.",
                   zh: "先逛「AI 半導體技術特區」掌握晶片設計與 ASIC 趨勢，論壇看「矽光子」（8/31）、「記憶體高峰論壇」（9/1）與「市場趨勢」（9/1），並把「大師論壇」（9/2）列為必聽。" } },
      { slug: "sustain-facility", category: "technical",
        tags: [ { en: "Sustainability", zh: "永續力" },
                { en: "Facilities", zh: "廠房設施" },
                { en: "Cybersecurity", zh: "資安" } ],
        exhibitors: [ { name: "Ebara", booth: "N0368" }, { name: "Atlas Copco", booth: "R7924" }, { name: "Pfeiffer Vacuum", booth: "J2840" }, { name: "VAT", booth: "M0942" }, { name: "Linde LienHwa", booth: "L0210" }, { name: "Entegris", booth: "L0128" }, { name: "ABB", booth: "R7906" }, { name: "Advantech", booth: "Q5637" } ],
        title:   { en: "Sustainability & Facilities", zh: "永續・廠務・資安" },
        summary: { en: "Energy, water, cleanrooms and operational resilience.", zh: "能源、用水、無塵室與運營韌性。" },
        overview:{ en: "Target the Sustainability Forum (Sep 2, TaiNEX 1 Room 402), the High-Tech Facility Forum (Sep 3), Smart Manufacturing (Sep 1) and the Cybersecurity Summit (Sep 4). Several of these sit inside the halls, so they pair well with show-floor time.",
                   zh: "鎖定「半導體永續力論壇」（9/2，南港 1 館 402）、「高科技廠房設施論壇」（9/3）、「智慧製造論壇」（9/1）與「資安趨勢高峰論壇」（9/4）。部分在展館內，適合搭配逛展。" } },
      { slug: "business-bd", category: "business",
        tags: [ { en: "Whole show floor", zh: "全展區" },
                { en: "Market Trends", zh: "市場趨勢" },
                { en: "Partner events", zh: "合作夥伴" } ],
        exhibitors: [ { name: "Topco Scientific", booth: "I2700" }, { name: "NAGASE", booth: "L0910" }, { name: "Marketech International", booth: "M0234" }, { name: "Scientech", booth: "M0338" }, { name: "Allied Supreme", booth: "L1116" }, { name: "Resonac", booth: "M1148" }, { name: "Entegris", booth: "L0128" }, { name: "Linde LienHwa", booth: "L0210" } ],
        title:   { en: "Procurement, Sales & BD", zh: "採購・業務・商務開發" },
        summary: { en: "Find the right booths and the right people, fast.", zh: "快速找到對的攤位與對的人。" },
        overview:{ en: "Use the official exhibitor list to map target booths first, read the room with the Market Trends and CEO Summit forums, and work the Partner Events and the Industry Leadership Dinner for relationship-building.",
                   zh: "先用官方「參展廠商名單」鎖定目標攤位，聽「市場趨勢論壇」與「大師論壇」掌握風向，並把握「合作夥伴活動」與「科技菁英領袖晚宴」拓展人脈。" } },
      { slug: "investor", category: "business",
        tags: [ { en: "CEO Summit", zh: "大師論壇" },
                { en: "Market Trends", zh: "市場趨勢" },
                { en: "Silicon Startups", zh: "晶片新創" } ],
        exhibitors: [ { name: "Tokyo Electron", booth: "M0648" }, { name: "Lam Research", booth: "M0858" }, { name: "KLA", booth: "M0248" }, { name: "ASMPT", booth: "L0716" }, { name: "BESI", booth: "M0438" }, { name: "WIN Semiconductors", booth: "J3234" }, { name: "Keysight", booth: "K2037" } ],
        title:   { en: "Investors & Analysts", zh: "投資人・分析師" },
        summary: { en: "Macro signals, supply-demand and the next breakout.", zh: "總經訊號、供需與下一個爆點。" },
        overview:{ en: "Lead with the CEO Summit, Market Trends and Memory Summit for macro and supply-demand, then visit the Silicon Startups Zone for 10-minute pitches and watch the News Center for first-hand announcements.",
                   zh: "以「大師論壇」「市場趨勢」「記憶體高峰論壇」抓總經與供需，並到「晶片新創特區」聽 10 分鐘 pitch、留意「新聞中心」第一手消息。" } },
      { slug: "startup", category: "business",
        tags: [ { en: "Silicon Startups", zh: "晶片新創" },
                "pitch",
                { en: "Matchmaking", zh: "媒合" } ],
        exhibitors: [ { name: "Quantumtek Innovatives", booth: "I2816" }, { name: "United Silicon Innovation", booth: "L1024" }, { name: "MDI Taiwan Innovations", booth: "R7918" }, { name: "GeChi Compound Semiconductor", booth: "I3222" } ],
        title:   { en: "Startups", zh: "新創團隊" },
        summary: { en: "Get on stage, meet partners and investors.", zh: "上台發表，遇見夥伴與投資人。" },
        overview:{ en: "Your home base is the Silicon Startups Zone (hosted by SEMI with NSTC, linked to the IC Taiwan Grand Challenge); selected teams get a 10-minute pitch slot. Pair it with the 3DIC, Silicon Photonics and Quantum forums to find tech partners and investors.",
                   zh: "主場是「晶片新創特區」（SEMI 主辦、國科會支持，連結 IC Taiwan Grand Challenge），入選團隊可享 10 分鐘技術發表；搭配 3DIC、矽光子、量子論壇找技術夥伴與投資人。" } },
      { slug: "student", category: "talent",
        tags: [ { en: "Workforce Development", zh: "人才培育" },
                { en: "20Under40", zh: "新銳獎" },
                { en: "Free admission", zh: "免費觀展" } ],
        exhibitors: [ { name: "Tokyo Electron", booth: "M0648" }, { name: "Lam Research", booth: "M0858" }, { name: "KLA", booth: "M0248" }, { name: "ASMPT", booth: "L0716" }, { name: "Onto Innovation", booth: "L0728" }, { name: "Advantech", booth: "Q5637" }, { name: "WIN Semiconductors", booth: "J3234" }, { name: "Chroma ATE", booth: "K2576" }, { name: "Topco Scientific", booth: "I2700" } ],
        title:   { en: "Students & Job-seekers", zh: "學生・求職者" },
        summary: { en: "Get inside the industry and build your network.", zh: "走進產業現場，累積人脈與視野。" },
        overview:{ en: "Center your trip on the Workforce Development activities — campus ambassadors, guided floor tours, the 20Under40 Salon and the Tech Master Forum (Sep 4). Admission often has free-entry offers, so register and collect your badge early.",
                   zh: "以「人才培育主題活動」為核心——校園大使、展區導覽、「新銳獎沙龍」與「科技大師論壇」（9/4）。觀展常有免費入場優惠，建議及早報名領證。" } },
      { slug: "international", category: "talent",
        tags: [ { en: "Flagship forums", zh: "旗艦論壇" },
                { en: "Travel & lodging", zh: "交通住宿" },
                { en: "Trip planning", zh: "行程規劃" } ],
        exhibitors: [ { name: "Tokyo Electron", booth: "M0648" }, { name: "Lam Research", booth: "M0858" }, { name: "KLA", booth: "M0248" }, { name: "BESI", booth: "M0438" }, { name: "ASMPT", booth: "L0716" }, { name: "Hitachi High-Tech", booth: "S7540" }, { name: "Ebara", booth: "N0368" }, { name: "Entegris", booth: "L0128" }, { name: "Siemens", booth: "Q5536" }, { name: "Keysight", booth: "K2037" } ],
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
  },

  /* ===================================================================== *
   *  GAMES — semiconductor-themed mini-games (arcade layout)
   *  The launcher menu + game stage are rendered by app.js's "arcade"
   *  renderer; each game lives in its own assets/games/<id>.js and
   *  self-registers via window.SEMICON_ARCADE. This page entry only wires
   *  the page into the cross-page nav.
   * ===================================================================== */
  {
    slug: "game", layout: "arcade", icon: "stadia_controller",
    title:    { en: "Mini Games", zh: "小遊戲" },
    subtitle: { en: "Take a break with four bite-sized, semiconductor-themed games — match chips, beat the forum quiz, sort wafers and shrink process nodes.",
                zh: "用四款半導體主題小遊戲喘口氣——配對晶片、挑戰論壇快問快答、分類晶圓、合成製程節點。" }
  }
];
