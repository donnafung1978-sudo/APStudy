/* Interactive, original schematic diagrams for studying structure & function.
   Simplified teaching diagrams; not to scale and not surgical references. */
window.DIAGRAMS = [
  {
    id: "body", title: "全身器官位置", en: "Body map", tag: "全身", icon: "body",
    intro: "由頭到骨盆，先記住主要器官的相對位置；胸、腹、盆腔的分界是考試常見的方向題。",
    parts: [
      { id: "brain", name: "腦", en: "Brain", desc: "位於顱腔，中樞神經系統的一部分；負責感覺整合、運動指令、記憶與自主調節。" },
      { id: "lungs", name: "肺", en: "Lungs", desc: "位於胸腔兩側，包在胸膜內；肺泡進行氧氣與二氧化碳交換。右肺三葉，左肺兩葉。" },
      { id: "heart", name: "心臟", en: "Heart", desc: "位於胸腔縱隔，略偏左；四個腔室，右心泵血到肺，左心泵血到全身。" },
      { id: "liver", name: "肝臟", en: "Liver", desc: "位於右上腹、橫膈膜下方；最大內臟，負責代謝、解毒、儲存與製造膽汁。" },
      { id: "stomach", name: "胃", en: "Stomach", desc: "位於左上腹；暫時儲存食物，分泌鹽酸、胃蛋白酶與內在因子。" },
      { id: "kidneys", name: "腎臟", en: "Kidneys", desc: "位於腹膜後、脊柱兩側；過濾血液、製造尿液，調節水鹽、酸鹼與血壓。" },
      { id: "intestines", name: "小腸與大腸", en: "Intestines", desc: "小腸主要吸收養分，大腸主要吸水與形成糞便；兩者都在腹腔。" },
      { id: "bladder", name: "膀胱", en: "Urinary bladder", desc: "位於盆腔，儲存尿液；內括約肌不隨意，外括約肌受意識控制。" }
    ],
    svg: `
<svg viewBox="0 0 360 470" role="img" aria-label="全身器官位置示意圖">
  <path d="M180 22c18 0 31 13 31 30s-13 30-31 30-31-13-31-30 13-30 31-30z" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <path d="M167 80h26v20h-26z" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <path d="M118 112 Q180 88 242 112 L254 235 Q245 315 214 340 L146 340 Q115 315 106 235 Z" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <path d="M118 118 Q90 150 82 220 L100 228 Q110 170 132 140" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <path d="M242 118 Q270 150 278 220 L260 228 Q250 170 228 140" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <path d="M146 338 L140 430 L160 430 L176 350 L184 350 L200 430 L220 430 L214 338 Z" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.5"/>
  <g class="dpart" data-act="diagram-part" data-part="brain"><ellipse cx="180" cy="48" rx="18" ry="13" fill="url(#gBrain)" stroke="#B98585"/><ellipse class="hot" cx="180" cy="48" rx="26" ry="20"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lungs"><path d="M148 120c-22 3-29 38-16 62 9 17 24 12 26-8l2-42z" fill="url(#gLung)" stroke="#C78E88"/><path d="M212 120c22 3 29 38 16 62-9 17-24 12-26-8l-2-42z" fill="url(#gLung)" stroke="#C78E88"/><ellipse class="hot" cx="145" cy="150" rx="30" ry="35"/><ellipse class="hot" cx="215" cy="150" rx="30" ry="35"/></g>
  <g class="dpart" data-act="diagram-part" data-part="heart"><path d="M190 148c-10-14-27-4-24 11 2 13 22 25 24 25s22-12 24-25c3-15-14-25-24-11z" fill="url(#gHeart)" stroke="#B54A38"/><ellipse class="hot" cx="190" cy="160" rx="24" ry="25"/></g>
  <g class="dpart" data-act="diagram-part" data-part="liver"><path d="M194 184c24-4 48 6 52 24-5 17-32 21-51 13-8-10-8-27-1-37z" fill="url(#gLiver)" stroke="#9D7954"/><ellipse class="hot" cx="222" cy="201" rx="34" ry="22"/></g>
  <g class="dpart" data-act="diagram-part" data-part="stomach"><path d="M150 186c-14 4-18 26-8 38 12 14 29 7 29-8 0-14-8-28-21-30z" fill="url(#gStomach)" stroke="#B68B45"/><ellipse class="hot" cx="151" cy="205" rx="25" ry="28"/></g>
  <g class="dpart" data-act="diagram-part" data-part="kidneys"><ellipse cx="132" cy="215" rx="14" ry="24" fill="url(#gKidney)" stroke="#8C79A6" transform="rotate(-20 132 215)"/><ellipse cx="228" cy="215" rx="14" ry="24" fill="url(#gKidney)" stroke="#8C79A6" transform="rotate(20 228 215)"/><ellipse class="hot" cx="132" cy="215" rx="20" ry="29"/><ellipse class="hot" cx="228" cy="215" rx="20" ry="29"/></g>
  <g class="dpart" data-act="diagram-part" data-part="intestines"><path d="M145 240c-8 22 8 45 25 43 17-2 24-18 20-31-4-12-18-15-24-6-5 8 2 17 10 14 12-4 10-20-2-24-18-6-30 8-29 24 1 18 18 30 36 24 14-5 20-20 18-33-2-10-12-16-21-12-10 5-10 18 0 22 9 4 19-3 18-13" fill="none" stroke="#D9A988" stroke-width="9" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="260" rx="45" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="bladder"><ellipse cx="180" cy="315" rx="19" ry="15" fill="url(#gBladder)" stroke="#B39A4C"/><ellipse class="hot" cx="180" cy="315" rx="27" ry="22"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="brain"><line x1="45" y1="42" x2="158" y2="45" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="45">腦</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="lungs"><line x1="48" y1="126" x2="120" y2="145" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="129">肺</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="heart"><line x1="300" y1="125" x2="212" y2="155" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="128">心臟</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="liver"><line x1="302" y1="186" x2="250" y2="199" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="189">肝臟</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="stomach"><line x1="48" y1="194" x2="128" y2="204" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="197">胃</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="kidneys"><line x1="300" y1="228" x2="242" y2="222" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="231">腎臟</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="intestines"><line x1="48" y1="275" x2="135" y2="268" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="278">小腸／大腸</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="bladder"><line x1="300" y1="315" x2="199" y2="315" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="318">膀胱</text></g>
</svg>`
  },
  {
    id: "cell", title: "細胞構造", en: "The Cell", tag: "細胞", icon: "cell",
    intro: "細胞膜、細胞核與各胞器是第一章的必考配對；先認位置，再記功能。",
    parts: [
      { id: "membrane", name: "細胞質膜", en: "Plasma membrane", desc: "磷脂雙層，蛋白質嵌入其中；控制物質進出、接收訊號、細胞識別。" },
      { id: "nucleus", name: "細胞核", en: "Nucleus", desc: "含 DNA，控制細胞活動與遺傳；外有核被膜，內有核仁。" },
      { id: "nucleolus", name: "核仁", en: "Nucleolus", desc: "細胞核內製造核糖體 RNA 的構造。" },
      { id: "mitochondria", name: "線粒體", en: "Mitochondria", desc: "有氧呼吸的主要場所，產生 ATP；肌肉與肝細胞含量特別多。" },
      { id: "er", name: "內質網", en: "Endoplasmic reticulum", desc: "粗面內質網附核糖體，負責蛋白質合成；光面內質網負責脂質代謝。" },
      { id: "golgi", name: "高爾基體", en: "Golgi apparatus", desc: "修飾、包裝和運送蛋白質；像細胞的郵局。" },
      { id: "lysosome", name: "溶酶體", en: "Lysosome", desc: "含消化酵素，分解細胞內廢物與外來物質。" },
      { id: "ribosome", name: "核糖小體", en: "Ribosome", desc: "蛋白質合成的場所；可游離在細胞質或附在粗面內質網。" }
    ],
    svg: `
<svg viewBox="0 0 360 360" role="img" aria-label="細胞構造示意圖">
  <ellipse cx="180" cy="180" rx="150" ry="125" fill="url(#gCell)" stroke="#B9A98F" stroke-width="2"/>
  <g class="dpart" data-act="diagram-part" data-part="membrane"><ellipse cx="180" cy="180" rx="150" ry="125" fill="none" stroke="#B9A98F" stroke-width="6"/><ellipse class="hot" cx="180" cy="180" rx="150" ry="125"/></g>
  <g class="dpart" data-act="diagram-part" data-part="nucleus"><circle cx="180" cy="168" r="48" fill="url(#gNucleus)" stroke="#B98578"/><circle class="hot" cx="180" cy="168" r="48"/></g>
  <g class="dpart" data-act="diagram-part" data-part="nucleolus"><circle cx="192" cy="160" r="13" fill="#B98578"/><circle class="hot" cx="192" cy="160" r="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="er"><path d="M130 196c-12 18 6 34 22 23M120 210c-12 18 6 31 22 21M238 142c12 16 0 34-15 27M246 156c12 16 0 31-15 25" fill="none" stroke="#7FA09A" stroke-width="4" stroke-linecap="round"/><ellipse class="hot" cx="130" cy="210" rx="28" ry="30"/><ellipse class="hot" cx="240" cy="158" rx="25" ry="27"/></g>
  <g class="dpart" data-act="diagram-part" data-part="mitochondria"><g transform="translate(90 105) rotate(-28)"><ellipse rx="30" ry="14" fill="url(#gMito)" stroke="#8E5B52"/><path d="M-18 0l6-6 6 12 6-12 6 12 6-6" fill="none" stroke="#8E5B52" stroke-width="1.5"/></g><g transform="translate(258 112) rotate(24)"><ellipse rx="28" ry="13" fill="url(#gMito)" stroke="#8E5B52"/><path d="M-16 0l5-5 6 10 6-10 5 10 5-5" fill="none" stroke="#8E5B52" stroke-width="1.5"/></g><g transform="translate(95 252) rotate(18)"><ellipse rx="25" ry="12" fill="url(#gMito)" stroke="#8E5B52"/><path d="M-14 0l5-5 5 10 5-10 5 10 5-5" fill="none" stroke="#8E5B52" stroke-width="1.5"/></g><ellipse class="hot" cx="92" cy="105" rx="34" ry="22"/><ellipse class="hot" cx="258" cy="112" rx="34" ry="22"/><ellipse class="hot" cx="95" cy="252" rx="32" ry="20"/></g>
  <g class="dpart" data-act="diagram-part" data-part="golgi"><path d="M242 220c18-8 32 2 30 12-14 10-32 6-36-4M236 232c18-8 32 2 30 12-14 10-32 6-36-4M230 244c18-8 32 2 30 12-14 10-32 6-36-4" fill="none" stroke="#C9A45A" stroke-width="4" stroke-linecap="round"/><ellipse class="hot" cx="250" cy="235" rx="32" ry="28"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lysosome"><circle cx="78" cy="186" r="11" fill="url(#gLyso)" stroke="#6F819A"/><circle cx="270" cy="190" r="9" fill="url(#gLyso)" stroke="#6F819A"/><circle class="hot" cx="78" cy="186" r="17"/><circle class="hot" cx="270" cy="190" r="16"/></g>
  <g class="dpart" data-act="diagram-part" data-part="ribosome"><circle cx="90" cy="70" r="2.5" fill="#6E7B76"/><circle cx="104" cy="76" r="2.5" fill="#6E7B76"/><circle cx="118" cy="68" r="2.5" fill="#6E7B76"/><circle cx="250" cy="70" r="2.5" fill="#6E7B76"/><circle cx="264" cy="78" r="2.5" fill="#6E7B76"/><ellipse class="hot" cx="105" cy="73" rx="30" ry="18"/><ellipse class="hot" cx="257" cy="74" rx="24" ry="18"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="membrane"><line x1="15" y1="35" x2="60" y2="92" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="32">細胞膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="nucleus"><line x1="290" y1="75" x2="216" y2="138" stroke="#A7AEA6" stroke-width=".8"/><text x="295" y="72">細胞核</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="nucleolus"><line x1="320" y1="105" x2="202" y2="155" stroke="#A7AEA6" stroke-width=".8"/><text x="325" y="102">核仁</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="mitochondria"><line x1="15" y1="105" x2="65" y2="105" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="102">線粒體</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="er"><line x1="15" y1="265" x2="112" y2="225" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="268">內質網</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="golgi"><line x1="300" y1="285" x2="262" y2="245" stroke="#A7AEA6" stroke-width=".8"/><text x="305" y="288">高爾基體</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="lysosome"><line x1="320" y1="200" x2="280" y2="192" stroke="#A7AEA6" stroke-width=".8"/><text x="325" y="203">溶酶體</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="ribosome"><line x1="38" y1="65" x2="82" y2="69" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="62">核糖小體</text></g>
</svg>`
  },
  {
    id: "heart", title: "心臟四腔與瓣膜", en: "Heart", tag: "心血管", icon: "heart",
    intro: "右心去肺、左心去全身；瓣膜確保單向血流。先分左右，再記房室與大血管。",
    parts: [
      { id: "ra", name: "右心房", en: "Right atrium", desc: "接收上腔靜脈與下腔靜脈回流的缺氧血，經三尖瓣送入右心室。" },
      { id: "rv", name: "右心室", en: "Right ventricle", desc: "把缺氧血經肺動脈送到肺；壁比左心室薄。" },
      { id: "la", name: "左心房", en: "Left atrium", desc: "接收肺靜脈回流的帶氧血，經二尖瓣送入左心室。" },
      { id: "lv", name: "左心室", en: "Left ventricle", desc: "把帶氧血經主動脈泵到全身；壁最厚。" },
      { id: "tricuspid", name: "三尖瓣", en: "Tricuspid valve", desc: "位於右心房與右心室之間，防止血液倒流。" },
      { id: "mitral", name: "二尖瓣", en: "Mitral valve", desc: "位於左心房與左心室之間，又稱雙尖瓣。" },
      { id: "aorta", name: "主動脈", en: "Aorta", desc: "左心室出口的大動脈，把帶氧血送往全身。" },
      { id: "pulmonary", name: "肺動脈", en: "Pulmonary artery", desc: "右心室出口，把缺氧血送到肺；是少數運送缺氧血的動脈。" },
      { id: "svc", name: "上腔靜脈", en: "Superior vena cava", desc: "把上半身的缺氧血帶回右心房。" },
      { id: "ivc", name: "下腔靜脈", en: "Inferior vena cava", desc: "把下半身的缺氧血帶回右心房。" },
      { id: "pv", name: "肺靜脈", en: "Pulmonary veins", desc: "把肺部的帶氧血帶回左心房；是少數運送帶氧血的靜脈。" }
    ],
    svg: `
<svg viewBox="-20 0 500 440" role="img" aria-label="心臟四腔、瓣膜與大血管 3D 示意圖">
  <path d="M215 72c45-38 116-16 120 65 4 92-64 188-120 258-56-70-124-166-120-258 4-81 75-103 120-65z" fill="url(#gMyo)" stroke="#8E3024" stroke-width="2"/>
  <path d="M215 88c34-24 82-8 88 48 6 70-48 148-88 202-40-54-94-132-88-202 6-56 54-72 88-48z" fill="none" stroke="#F4B3A1" stroke-width="1.2" opacity=".45"/>
  <path d="M128 130c-20 40-18 104 8 150M312 126c22 42 20 108-6 156" fill="none" stroke="#F4B3A1" stroke-width="1.2" opacity=".35"/>
  <g class="dpart" data-act="diagram-part" data-part="ra"><path d="M120 140c16-24 60-20 76 10v50c-20 18-56 14-74-10z" fill="url(#gCavity)" stroke="#9B3A2A" stroke-width="2"/><path d="M128 146c14-10 34-8 44 4" fill="none" stroke="#F4B3A1" stroke-width="1" opacity=".35"/><ellipse class="hot" cx="157" cy="170" rx="42" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="rv"><path d="M122 220c18-14 55-8 72 12v82c-22 26-58 16-74-14z" fill="url(#gCavity)" stroke="#9B3A2A" stroke-width="2"/><path d="M136 246c10 18 12 40 4 60M158 238c10 22 10 48 0 70" fill="none" stroke="#F4B3A1" stroke-width="1" opacity=".3"/><ellipse class="hot" cx="158" cy="270" rx="44" ry="50"/></g>
  <g class="dpart" data-act="diagram-part" data-part="la"><path d="M244 140c16-24 60-20 76 10v50c-20 18-56 14-74-10z" fill="url(#gCavity)" stroke="#9B3A2A" stroke-width="2"/><path d="M258 146c14-10 34-8 44 4" fill="none" stroke="#F4B3A1" stroke-width="1" opacity=".35"/><ellipse class="hot" cx="282" cy="170" rx="42" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lv"><path d="M244 220c18-14 56-8 74 14v78c-18 28-58 20-74-10z" fill="url(#gCavity)" stroke="#9B3A2A" stroke-width="2"/><path d="M276 240c12 22 12 48 0 70M294 246c10 18 10 38 0 58" fill="none" stroke="#F4B3A1" stroke-width="1" opacity=".3"/><ellipse class="hot" cx="282" cy="270" rx="44" ry="50"/></g>
  <path d="M200 128c18 30 18 190 0 232" fill="none" stroke="#C25A45" stroke-width="20" stroke-linecap="round" opacity=".85"/>
  <path d="M200 136c14 38 14 178 0 216" fill="none" stroke="#F4B3A1" stroke-width="1.2" opacity=".4"/>
  <g class="dpart" data-act="diagram-part" data-part="tricuspid"><path d="M128 206l22 16 22-16 22 16 22-16" fill="none" stroke="#F4D6C8" stroke-width="5" stroke-linecap="round"/><path d="M150 222c8 12 8 26 2 38M174 222c4 12 4 26 0 38" fill="none" stroke="#F4B3A1" stroke-width="1.2"/><ellipse class="hot" cx="172" cy="211" rx="48" ry="17"/></g>
  <g class="dpart" data-act="diagram-part" data-part="mitral"><path d="M252 206l24 18 24-18 24 18" fill="none" stroke="#F4D6C8" stroke-width="5" stroke-linecap="round"/><path d="M276 224c8 12 8 24 2 36M298 224c4 12 4 24 0 36" fill="none" stroke="#F4B3A1" stroke-width="1.2"/><ellipse class="hot" cx="288" cy="211" rx="48" ry="17"/></g>
  <g class="dpart" data-act="diagram-part" data-part="svc"><path d="M134 42v88" fill="none" stroke="url(#gVesselBlue)" stroke-width="20" stroke-linecap="round"/><ellipse class="hot" cx="134" cy="82" rx="22" ry="48"/></g>
  <g class="dpart" data-act="diagram-part" data-part="ivc"><path d="M153 402c-8-46-8-104-4-160" fill="none" stroke="url(#gVesselBlue)" stroke-width="20" stroke-linecap="round"/><ellipse class="hot" cx="148" cy="345" rx="24" ry="60"/></g>
  <g class="dpart" data-act="diagram-part" data-part="aorta"><path d="M276 158c0-52 8-82 36-88 24-5 40 8 40 28" fill="none" stroke="url(#gVesselRed)" stroke-width="20" stroke-linecap="round"/><path d="M292 72c-4-18-2-30 2-42M310 66c0-18 4-30 10-40M326 72c4-16 12-26 20-34" fill="none" stroke="#B54A38" stroke-width="9" stroke-linecap="round"/><ellipse class="hot" cx="316" cy="78" rx="44" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pulmonary"><path d="M184 158c0-48-12-72-36-80-16-5-28 4-32 18M184 158c0-42 14-68 36-76" fill="none" stroke="url(#gVesselPurple)" stroke-width="18" stroke-linecap="round"/><ellipse class="hot" cx="170" cy="88" rx="46" ry="36"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pv"><path d="M344 176h-34M344 194h-34M344 212h-34" stroke="url(#gVesselRed)" stroke-width="9" stroke-linecap="round"/><ellipse class="hot" cx="330" cy="194" rx="20" ry="30"/></g>
  <path d="M132 252c10 5 14 20 10 34M316 250c-10 6-14 20-10 34" fill="none" stroke="#F4B3A1" stroke-width="1" opacity=".4"/>
  <g class="dlabel" data-act="diagram-part" data-part="svc"><text x="5" y="56">上腔靜脈</text><text class="en-label" x="5" y="67">Superior vena cava</text><line x1="92" y1="72" x2="124" y2="82" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="ra"><text x="5" y="156">右心房</text><text class="en-label" x="5" y="167">Right atrium</text><line x1="68" y1="160" x2="120" y2="168" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="rv"><text x="5" y="286">右心室</text><text class="en-label" x="5" y="297">Right ventricle</text><line x1="78" y1="286" x2="124" y2="280" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="ivc"><text x="5" y="392">下腔靜脈</text><text class="en-label" x="5" y="403">Inferior vena cava</text><line x1="92" y1="390" x2="142" y2="378" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="aorta"><text x="365" y="56">主動脈</text><text class="en-label" x="365" y="67">Aorta</text><line x1="362" y1="60" x2="314" y2="72" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="pulmonary"><text x="365" y="106">肺動脈</text><text class="en-label" x="365" y="117">Pulmonary artery</text><line x1="362" y1="108" x2="220" y2="96" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="la"><text x="365" y="166">左心房</text><text class="en-label" x="365" y="177">Left atrium</text><line x1="362" y1="168" x2="310" y2="176" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="mitral"><text x="365" y="220">二尖瓣</text><text class="en-label" x="365" y="231">Mitral valve</text><line x1="362" y1="220" x2="306" y2="216" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="pv"><text x="365" y="258">肺靜脈</text><text class="en-label" x="365" y="269">Pulmonary veins</text><line x1="362" y1="258" x2="334" y2="210" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="tricuspid"><text x="5" y="226">三尖瓣</text><text class="en-label" x="5" y="237">Tricuspid valve</text><line x1="68" y1="226" x2="126" y2="214" stroke="#A7AEA6" stroke-width=".8"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="lv"><text x="365" y="306">左心室</text><text class="en-label" x="365" y="317">Left ventricle</text><line x1="362" y1="306" x2="310" y2="286" stroke="#A7AEA6" stroke-width=".8"/></g>
</svg>`
  },
  {
    id: "respiratory", title: "呼吸系統", en: "Respiratory system", tag: "呼吸", icon: "lungs",
    intro: "空氣由鼻到肺泡，被暖化、濕化、過濾；氣體在肺泡與微血管之間擴散。",
    parts: [
      { id: "nose", name: "鼻腔", en: "Nasal cavity", desc: "暖化、濕化、過濾吸入空氣；鼻甲增加表面積，嗅覺末梢位於鼻頂。" },
      { id: "pharynx", name: "咽", en: "Pharynx", desc: "空氣與食物的共同通道；耳咽管連接中耳，與聽覺有關。" },
      { id: "larynx", name: "喉", en: "Larynx", desc: "由甲狀軟骨、環狀軟骨、杓狀軟骨與會厭構成；發聲並保護下呼吸道。" },
      { id: "trachea", name: "氣管", en: "Trachea", desc: "C 形透明軟骨環支撐，後壁柔軟；黏膜纖毛把微粒向上推。" },
      { id: "bronchi", name: "支氣管", en: "Bronchi", desc: "氣管分叉為左右主支氣管；右支氣管短、闊、垂直，異物較常入右肺。" },
      { id: "lungs", name: "肺", en: "Lungs", desc: "右肺三葉、左肺兩葉；肺泡是氣體交換的主要場所。" },
      { id: "alveoli", name: "肺泡", en: "Alveoli", desc: "薄壁、微血管豐富；氧氣與二氧化碳沿分壓差擴散。" },
      { id: "diaphragm", name: "橫膈膜", en: "Diaphragm", desc: "平靜吸氣的主要肌肉；收縮時下降，增加胸腔容積。" }
    ],
    svg: `
<svg viewBox="0 0 360 410" role="img" aria-label="呼吸系統示意圖">
  <g class="dpart" data-act="diagram-part" data-part="nose"><path d="M120 42c18-18 44-16 56 4l-8 44c-12 8-26 8-38 0z" fill="url(#gBrain)" stroke="#B98578" opacity=".55"/><ellipse class="hot" cx="150" cy="55" rx="35" ry="25"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pharynx"><path d="M168 74h18v32h-18z" fill="url(#gNucleus)" stroke="#B98578"/><ellipse class="hot" cx="177" cy="90" rx="16" ry="20"/></g>
  <g class="dpart" data-act="diagram-part" data-part="larynx"><path d="M160 106h30l-4 24h-22z" fill="url(#gLiver)" stroke="#9D7954"/><ellipse class="hot" cx="175" cy="118" rx="20" ry="16"/></g>
  <g class="dpart" data-act="diagram-part" data-part="trachea"><path d="M166 130h18v72h-18z" fill="url(#gTeal)" stroke="#7C9A8A"/><path d="M166 142h18M166 154h18M166 166h18M166 178h18" stroke="#7C9A8A" stroke-width="1"/><ellipse class="hot" cx="175" cy="165" rx="14" ry="38"/></g>
  <g class="dpart" data-act="diagram-part" data-part="bronchi"><path d="M175 202l-45 30M175 202l45 30M175 202v18" fill="none" stroke="#8FB3A6" stroke-width="8" stroke-linecap="round"/><ellipse class="hot" cx="175" cy="215" rx="55" ry="28"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lungs"><path d="M130 208c-38 6-48 64-24 94 18 22 44 8 44-22v-62z" fill="url(#gLung)" stroke="#C78E88"/><path d="M220 208c38 6 48 64 24 94-18 22-44 8-44-22v-62z" fill="url(#gLung)" stroke="#C78E88"/><ellipse class="hot" cx="118" cy="265" rx="40" ry="60"/><ellipse class="hot" cx="232" cy="265" rx="40" ry="60"/></g>
  <g class="dpart" data-act="diagram-part" data-part="alveoli"><g transform="translate(272 310)"><circle r="20" fill="url(#gLung)" stroke="#C78E88"/><circle cx="-15" cy="10" r="12" fill="url(#gLung)" stroke="#C78E88"/><circle cx="15" cy="12" r="12" fill="url(#gLung)" stroke="#C78E88"/><path d="M-20 0h40M-15 10h30" stroke="#B98578" stroke-width="1.5"/></g><ellipse class="hot" cx="272" cy="318" rx="36" ry="30"/></g>
  <g class="dpart" data-act="diagram-part" data-part="diaphragm"><path d="M70 350q110 42 220 0" fill="none" stroke="#A9483C" stroke-width="8" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="355" rx="110" ry="26"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="nose"><line x1="30" y1="45" x2="112" y2="52" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="42">鼻腔</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="pharynx"><line x1="300" y1="75" x2="192" y2="88" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="72">咽</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="larynx"><line x1="300" y1="115" x2="192" y2="118" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="112">喉</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="trachea"><line x1="300" y1="160" x2="192" y2="165" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="157">氣管</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="bronchi"><line x1="300" y1="215" x2="220" y2="215" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="212">支氣管</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="lungs"><line x1="30" y1="255" x2="76" y2="260" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="252">肺</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="alveoli"><line x1="300" y1="330" x2="292" y2="322" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="333">肺泡</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="diaphragm"><line x1="30" y1="365" x2="82" y2="356" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="368">橫膈膜</text></g>
</svg>`
  },
  {
    id: "nephron", title: "腎元與尿液形成", en: "Nephron", tag: "排泄", icon: "kidney",
    intro: "腎元是腎臟的機能單位：先濾過，再選擇性重吸收，最後分泌。跟著管腔走一次。",
    parts: [
      { id: "glomerulus", name: "腎小球", en: "Glomerulus", desc: "一團微血管，血壓高，把水、葡萄糖、鹽和廢物濾入鮑氏囊。" },
      { id: "bowman", name: "鮑氏囊", en: "Bowman's capsule", desc: "包住腎小球，收集濾液；濾液之後進入近曲小管。" },
      { id: "pct", name: "近曲小管", en: "Proximal convoluted tubule", desc: "重吸收大部分水、葡萄糖、氨基酸和鹽；刷狀緣增加表面積。" },
      { id: "loop", name: "亨利氏環", en: "Loop of Henle", desc: "建立髓質滲透壓梯度，為收集管濃縮尿液做準備。" },
      { id: "dct", name: "遠曲小管", en: "Distal convoluted tubule", desc: "受醛固酮調節，重吸收鈉、分泌鉀；也參與酸鹼調節。" },
      { id: "collecting", name: "收集管", en: "Collecting duct", desc: "ADH 增加其對水的通透性；水被重吸收，尿液濃縮。" }
    ],
    svg: `
<svg viewBox="0 0 360 410" role="img" aria-label="腎元示意圖">
  <g class="dpart" data-act="diagram-part" data-part="bowman"><circle cx="100" cy="100" r="44" fill="url(#gLung)" stroke="#C78E88" stroke-width="2"/><circle class="hot" cx="100" cy="100" r="50"/></g>
  <g class="dpart" data-act="diagram-part" data-part="glomerulus"><circle cx="100" cy="100" r="26" fill="url(#gHeart)" stroke="#B54A38"/><path d="M82 92c10-12 26-12 36 0M80 105c12-10 28-10 40 0M90 116c8-8 20-8 28 0" fill="none" stroke="#8F3C2D" stroke-width="1.2"/><circle class="hot" cx="100" cy="100" r="28"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pct"><path d="M100 144c-26 10-30 44-8 56 18 10 40-2 36-22-3-16-20-22-30-12-8 8-3 22 8 20" fill="none" stroke="#D9A45A" stroke-width="12" stroke-linecap="round"/><ellipse class="hot" cx="94" cy="190" rx="36" ry="38"/></g>
  <g class="dpart" data-act="diagram-part" data-part="loop"><path d="M112 205c-30 22-38 70-16 96 18 20 42 4 40-24-2-20-18-36-18-56" fill="none" stroke="#C78E5A" stroke-width="12" stroke-linecap="round"/><ellipse class="hot" cx="92" cy="280" rx="34" ry="55"/></g>
  <g class="dpart" data-act="diagram-part" data-part="dct"><path d="M118 220c34-16 64 2 68 34 3 24-14 38-32 44" fill="none" stroke="#D9A45A" stroke-width="12" stroke-linecap="round"/><ellipse class="hot" cx="160" cy="245" rx="42" ry="36"/></g>
  <g class="dpart" data-act="diagram-part" data-part="collecting"><path d="M154 298c0 38 4 62 4 82" fill="none" stroke="#B9A98F" stroke-width="14" stroke-linecap="round"/><path d="M140 320h30M140 340h30M140 360h30" stroke="#8E7B63" stroke-width="1.2"/><ellipse class="hot" cx="154" cy="340" rx="24" ry="55"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="glomerulus"><line x1="20" y1="55" x2="78" y2="88" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="52">腎小球</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="bowman"><line x1="210" y1="60" x2="132" y2="85" stroke="#A7AEA6" stroke-width=".8"/><text x="216" y="57">鮑氏囊</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="pct"><line x1="220" y1="160" x2="126" y2="180" stroke="#A7AEA6" stroke-width=".8"/><text x="226" y="157">近曲小管</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="loop"><line x1="20" y1="275" x2="58" y2="275" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="272">亨利氏環</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="dct"><line x1="250" y1="230" x2="196" y2="240" stroke="#A7AEA6" stroke-width=".8"/><text x="256" y="227">遠曲小管</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="collecting"><line x1="240" y1="330" x2="178" y2="335" stroke="#A7AEA6" stroke-width=".8"/><text x="246" y="327">收集管</text></g>
  <text x="10" y="398" font-size="9" fill="#A7AEA6">示意圖：實際腎元在皮質與髓質之間彎曲走行</text>
</svg>`
  },
  {
    id: "brain", title: "腦部主要區域", en: "Brain", tag: "神經", icon: "brain",
    intro: "大腦、小腦、腦幹各司其職；丘腦是轉發站，下丘腦是體內平衡控制中心。",
    parts: [
      { id: "cerebrum", name: "大腦", en: "Cerebrum", desc: "最高級整合中心；皮層分額、頂、顳、枕葉，負責運動、感覺、語言、視聽與思考。" },
      { id: "cerebellum", name: "小腦", en: "Cerebellum", desc: "協調隨意動作、維持平衡和肌肉張力；受損會動作笨拙、不協調。" },
      { id: "brainstem", name: "腦幹", en: "Brain stem", desc: "中腦、橋腦、延髓；內有心血管中樞、呼吸中樞及多個腦神經核。" },
      { id: "thalamus", name: "丘腦", en: "Thalamus", desc: "感覺訊息（嗅覺除外）傳往皮層前的主要轉發站。" },
      { id: "hypothalamus", name: "下丘腦", en: "Hypothalamus", desc: "調節體溫、食慾、渴、睡眠、情緒與內分泌；連接神經與內分泌系統。" },
      { id: "medulla", name: "延髓", en: "Medulla oblongata", desc: "心血管中樞、呼吸中樞、反射中樞；錐體交叉在此，左右運動控制交叉。" }
    ],
    svg: `
<svg viewBox="0 0 360 340" role="img" aria-label="腦部主要區域示意圖">
  <g class="dpart" data-act="diagram-part" data-part="cerebrum"><path d="M82 120c-18-52 38-88 88-86 54 2 96 34 92 84-2 34-24 52-44 62-8 4-10 14-8 24 3 14-8 24-22 20-18-5-30-20-48-22-26-3-54-26-58-52z" fill="url(#gBrain)" stroke="#B98585" opacity=".55"/><path d="M94 95c18-18 40-22 62-14M120 70c18-8 38-6 54 6M108 125c20-12 44-12 62 0M156 92c16-6 32-2 44 8M100 148c16 10 34 12 48 6" fill="none" stroke="#B98585" stroke-width="1.2"/><ellipse class="hot" cx="170" cy="105" rx="85" ry="55"/></g>
  <g class="dpart" data-act="diagram-part" data-part="cerebellum"><path d="M205 190c26-8 50 6 56 28 4 18-10 32-30 30-22-2-38-18-42-34-2-10 4-20 16-24z" fill="url(#gKidney)" stroke="#8C79A6"/><path d="M218 202c12-4 24 0 30 10M216 216c12-4 24 0 30 10M220 230c10-4 20-2 26 6" fill="none" stroke="#8C79A6" stroke-width="1"/><ellipse class="hot" cx="230" cy="218" rx="40" ry="35"/></g>
  <g class="dpart" data-act="diagram-part" data-part="brainstem"><path d="M162 214c8 26 8 46 8 64 0 12 10 18 20 12 8-6 8-18 4-28-6-16-10-32-8-48z" fill="url(#gBone)" stroke="#9D7954"/><ellipse class="hot" cx="180" cy="252" rx="26" ry="48"/></g>
  <g class="dpart" data-act="diagram-part" data-part="thalamus"><ellipse cx="168" cy="154" rx="22" ry="14" fill="url(#gGold)" stroke="#8E6B2E"/><ellipse class="hot" cx="168" cy="154" rx="26" ry="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="hypothalamus"><ellipse cx="158" cy="180" rx="16" ry="10" fill="url(#gHeart)" stroke="#A9483C"/><ellipse class="hot" cx="158" cy="180" rx="22" ry="15"/></g>
  <g class="dpart" data-act="diagram-part" data-part="medulla"><path d="M170 260c8 14 8 28 4 40 10 2 20-4 22-14 2-10-4-20-10-28z" fill="url(#gLiver)" stroke="#9D7954"/><ellipse class="hot" cx="184" cy="278" rx="22" ry="28"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="cerebrum"><line x1="30" y1="70" x2="110" y2="88" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="67">大腦</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="cerebellum"><line x1="300" y1="230" x2="258" y2="222" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="233">小腦</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="brainstem"><line x1="300" y1="286" x2="204" y2="275" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="289">腦幹</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="thalamus"><line x1="300" y1="150" x2="192" y2="154" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="147">丘腦</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="hypothalamus"><line x1="30" y1="190" x2="140" y2="181" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="187">下丘腦</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="medulla"><line x1="30" y1="285" x2="162" y2="278" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="282">延髓</text></g>
</svg>`
  },
  {
    id: "digestive", title: "消化系統", en: "Digestive system", tag: "消化", icon: "stomach",
    intro: "由口腔到肛門，加上肝、膽、胰三個附屬器官；記住「哪一層、哪一段、哪種酵素」。",
    parts: [
      { id: "mouth", name: "口腔", en: "Mouth", desc: "牙齒咀嚼、舌頭攪拌；唾液澱粉酶開始分解澱粉，形成食團。" },
      { id: "esophagus", name: "食道", en: "Oesophagus", desc: "以蠕動把食團送到胃；上下括約肌控制通過。" },
      { id: "stomach", name: "胃", en: "Stomach", desc: "儲存食物，分泌鹽酸、胃蛋白酶與內在因子；把食物變成食糜。" },
      { id: "liver", name: "肝臟", en: "Liver", desc: "製造膽汁、代謝營養、解毒、儲存肝醣與維他命。" },
      { id: "gallbladder", name: "膽囊", en: "Gallbladder", desc: "儲存並濃縮膽汁；CCK 令它收縮，把膽汁排入十二指腸。" },
      { id: "pancreas", name: "胰臟", en: "Pancreas", desc: "外分泌胰液（澱粉酶、蛋白酶、脂肪酶）；內分泌胰島素與高血糖素。" },
      { id: "small", name: "小腸", en: "Small intestine", desc: "十二指腸、空腸、迴腸；主要消化與吸收場所，絨毛增加表面積。" },
      { id: "large", name: "大腸", en: "Large intestine", desc: "主要吸水與形成糞便；結腸細菌合成維他命 K。" }
    ],
    svg: `
<svg viewBox="0 0 360 460" role="img" aria-label="消化系統示意圖">
  <path d="M180 24c17 0 29 12 29 28s-12 28-29 28-29-12-29-28 12-28 29-28z" fill="url(#gBody)" stroke="#D8CBB8"/>
  <path d="M118 104 Q180 82 242 104 L252 232 Q242 310 210 336 L150 336 Q118 310 108 232 Z" fill="url(#gBody)" stroke="#D8CBB8" stroke-width="1.2"/>
  <g class="dpart" data-act="diagram-part" data-part="mouth"><path d="M156 54q24 14 48 0" fill="none" stroke="#C78E88" stroke-width="8" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="56" rx="34" ry="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="esophagus"><path d="M174 78v72" stroke="#D9A45A" stroke-width="10" stroke-linecap="round"/><ellipse class="hot" cx="174" cy="112" rx="16" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="stomach"><path d="M160 150c-26 6-34 42-16 62 20 22 48 8 46-18-2-20-14-38-30-44z" fill="url(#gStomach)" stroke="#B68B45"/><ellipse class="hot" cx="162" cy="185" rx="34" ry="40"/></g>
  <g class="dpart" data-act="diagram-part" data-part="liver"><path d="M190 142c30-8 58 4 62 28-4 22-40 30-62 20-8-14-8-34 0-48z" fill="url(#gLiver)" stroke="#9D7954"/><ellipse class="hot" cx="222" cy="168" rx="45" ry="30"/></g>
  <g class="dpart" data-act="diagram-part" data-part="gallbladder"><path d="M210 196c8-10 20-8 22 4 2 12-8 20-18 18-8-2-10-12-4-22z" fill="url(#gLyso)" stroke="#6F819A"/><ellipse class="hot" cx="220" cy="206" rx="18" ry="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pancreas"><path d="M150 222c30-10 60-4 72 10-16 12-44 12-66 0z" fill="url(#gGold)" stroke="#9D7954"/><ellipse class="hot" cx="190" cy="226" rx="45" ry="16"/></g>
  <g class="dpart" data-act="diagram-part" data-part="small"><path d="M145 245c-8 22 8 44 25 42 17-2 24-18 20-31-4-12-18-15-24-6-5 8 2 17 10 14 12-4 10-20-2-24-18-6-30 8-29 24 1 18 18 30 36 24 14-5 20-20 18-33" fill="none" stroke="#D9A988" stroke-width="9" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="262" rx="48" ry="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="large"><path d="M132 240v58c0 16 12 28 28 28h46c16 0 28-12 28-28v-58" fill="none" stroke="#C9A47B" stroke-width="12" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="312" rx="62" ry="45"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="mouth"><line x1="30" y1="45" x2="142" y2="52" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="42">口腔</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="esophagus"><line x1="300" y1="95" x2="190" y2="100" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="92">食道</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="stomach"><line x1="30" y1="175" x2="126" y2="180" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="172">胃</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="liver"><line x1="300" y1="145" x2="258" y2="155" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="142">肝臟</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="gallbladder"><line x1="300" y1="200" x2="240" y2="204" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="197">膽囊</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="pancreas"><line x1="300" y1="238" x2="238" y2="232" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="235">胰臟</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="small"><line x1="30" y1="270" x2="130" y2="265" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="267">小腸</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="large"><line x1="30" y1="330" x2="120" y2="320" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="327">大腸</text></g>
</svg>`
  },
  {
    id: "skeleton", title: "骨骼分區", en: "Skeleton", tag: "骨骼", icon: "bone",
    intro: "中軸骨骼保護內臟，附肢骨骼負責移動；先記顱骨、脊柱、胸廓、骨盆與四肢骨的相對位置。",
    parts: [
      { id: "skull", name: "顱骨", en: "Skull", desc: "保護腦；由多塊骨以骨縫連接，下頜骨是唯一可動的頭骨。" },
      { id: "spine", name: "脊柱", en: "Vertebral column", desc: "頸 7、胸 12、腰 5；支持軀幹、保護脊髓，並容許彎曲與旋轉。" },
      { id: "ribs", name: "胸廓", en: "Thoracic cage", desc: "胸骨、肋骨與胸椎構成；保護心臟與肺，參與呼吸。" },
      { id: "pelvis", name: "骨盆", en: "Pelvis", desc: "連接脊柱與下肢，保護盆腔器官；承受上半身重量。" },
      { id: "femur", name: "股骨", en: "Femur", desc: "人體最長最強壯的骨；股骨頭與髖臼形成髖關節。" },
      { id: "humerus", name: "肱骨", en: "Humerus", desc: "上臂骨；上端與肩胛骨形成肩關節，下端與橈尺骨形成肘關節。" }
    ],
    svg: `
<svg viewBox="0 0 360 450" role="img" aria-label="骨骼分區示意圖">
  <g class="dpart" data-act="diagram-part" data-part="skull"><ellipse cx="180" cy="48" rx="34" ry="38" fill="url(#gBody)" stroke="#B9A98F" stroke-width="2"/><path d="M160 40q20-14 40 0M158 54q22 12 44 0M164 70q16 8 32 0" fill="none" stroke="#B9A98F"/><ellipse class="hot" cx="180" cy="48" rx="40" ry="44"/></g>
  <g class="dpart" data-act="diagram-part" data-part="spine"><path d="M180 86v220" stroke="#B9A98F" stroke-width="12" stroke-linecap="round"/><path d="M172 100h16M172 116h16M172 132h16M172 148h16M172 164h16M172 180h16M172 196h16M172 212h16M172 228h16M172 244h16M172 260h16M172 276h16M172 292h16" stroke="#8E7B63" stroke-width="1"/><ellipse class="hot" cx="180" cy="190" rx="22" ry="108"/></g>
  <g class="dpart" data-act="diagram-part" data-part="ribs"><path d="M180 108c-30 10-42 34-42 54 0 22 16 34 42 34M180 108c30 10 42 34 42 54 0 22-16 34-42 34M180 124c-24 8-34 26-34 42M180 124c24 8 34 26 34 42M180 144c-18 6-26 18-26 30M180 144c18 6 26 18 26 30" fill="none" stroke="#B9A98F" stroke-width="4"/><ellipse class="hot" cx="180" cy="155" rx="58" ry="55"/></g>
  <g class="dpart" data-act="diagram-part" data-part="pelvis"><path d="M146 270c-14 18-8 40 16 44 12 2 18-6 18-18 0-12 0-22 0-30zM214 270c14 18 8 40-16 44-12 2-18-6-18-18 0-12 0-22 0-30z" fill="url(#gPelvis)" stroke="#8C79A6" stroke-width="1.5"/><ellipse class="hot" cx="180" cy="288" rx="50" ry="32"/></g>
  <g class="dpart" data-act="diagram-part" data-part="femur"><path d="M164 316v82c0 8 6 12 12 12s12-4 12-12v-82" fill="none" stroke="#D9C6A6" stroke-width="12" stroke-linecap="round"/><circle cx="170" cy="312" r="8" fill="url(#gBone)"/><ellipse class="hot" cx="172" cy="365" rx="24" ry="58"/></g>
  <g class="dpart" data-act="diagram-part" data-part="humerus"><path d="M120 128v92c0 8 6 12 12 12s12-4 12-12v-92" fill="none" stroke="#D9C6A6" stroke-width="10" stroke-linecap="round"/><circle cx="126" cy="124" r="7" fill="url(#gBone)"/><ellipse class="hot" cx="126" cy="180" rx="22" ry="55"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="skull"><line x1="30" y1="48" x2="142" y2="48" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="45">顱骨</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="spine"><line x1="300" y1="155" x2="196" y2="165" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="152">脊柱</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="ribs"><line x1="30" y1="130" x2="128" y2="145" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="127">胸廓</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="pelvis"><line x1="300" y1="285" x2="222" y2="285" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="282">骨盆</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="femur"><line x1="300" y1="375" x2="190" y2="370" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="372">股骨</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="humerus"><line x1="30" y1="190" x2="108" y2="182" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="187">肱骨</text></g>
</svg>`
  },
  {
    id: "eye", title: "眼球結構", en: "Eye", tag: "感官", icon: "eye",
    intro: "光線經角膜、房水、瞳孔、晶狀體、玻璃體到視網膜；視神經把訊號送往枕葉。",
    parts: [
      { id: "cornea", name: "角膜", en: "Cornea", desc: "眼球前方透明的屈光面，沒有血管；負責大部分屈光。" },
      { id: "iris", name: "虹膜", en: "Iris", desc: "控制瞳孔大小，調節進入眼球的光量；由環狀肌與輻射肌組成。" },
      { id: "lens", name: "晶狀體", en: "Lens", desc: "可調節厚度以對焦；看近物時睫狀肌收縮、懸韌帶放鬆、晶狀體變厚。" },
      { id: "retina", name: "視網膜", en: "Retina", desc: "含視桿與視錐細胞；視錐負責顏色與細節，視桿對弱光敏感。" },
      { id: "optic", name: "視神經", en: "Optic nerve", desc: "把視網膜訊號送往腦；在視交叉，鼻側纖維交叉到對側。" }
    ],
    svg: `
<svg viewBox="0 0 360 300" role="img" aria-label="眼球結構示意圖">
  <circle cx="190" cy="110" r="92" fill="url(#gCell)" stroke="#B9A98F" stroke-width="2"/>
  <circle cx="190" cy="110" r="80" fill="url(#gBody)" stroke="#CFC0A6"/>
  <g class="dpart" data-act="diagram-part" data-part="cornea"><path d="M86 150c-22-26-22-58 0-84 18-22 44-18 44 8v72c0 26-26 30-44 4z" fill="url(#gEye)" stroke="#7FA0B0" stroke-width="2"/><ellipse class="hot" cx="96" cy="110" rx="30" ry="50"/></g>
  <g class="dpart" data-act="diagram-part" data-part="iris"><circle cx="120" cy="110" r="26" fill="url(#gTeal)" stroke="#4F7A6E" stroke-width="2"/><circle cx="120" cy="110" r="10" fill="#1D2A28"/><ellipse class="hot" cx="120" cy="110" rx="32" ry="34"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lens"><ellipse cx="146" cy="110" rx="16" ry="34" fill="url(#gEye)" stroke="#7FA0B0" stroke-width="2"/><ellipse class="hot" cx="146" cy="110" rx="22" ry="40"/></g>
  <g class="dpart" data-act="diagram-part" data-part="retina"><path d="M246 64c18 22 22 70 0 94-12 14-28 18-38 12" fill="none" stroke="#D98C76" stroke-width="8" stroke-linecap="round"/><ellipse class="hot" cx="248" cy="110" rx="24" ry="58"/></g>
  <g class="dpart" data-act="diagram-part" data-part="optic"><path d="M258 110h54" stroke="#C9A47B" stroke-width="14" stroke-linecap="round"/><path d="M258 110h54" stroke="#9D7954" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7"/><ellipse class="hot" cx="290" cy="110" rx="40" ry="18"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="cornea"><line x1="20" y1="45" x2="76" y2="72" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="42">角膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="iris"><line x1="20" y1="175" x2="100" y2="136" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="178">虹膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="lens"><line x1="20" y1="235" x2="132" y2="140" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="238">晶狀體</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="retina"><line x1="300" y1="190" x2="256" y2="160" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="193">視網膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="optic"><line x1="300" y1="250" x2="288" y2="126" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="253">視神經</text></g>
</svg>`
  },
  {
    id: "ear", title: "耳與聽覺", en: "Ear", tag: "感官", icon: "ear",
    intro: "外耳收集聲音，中耳放大振動，內耳把機械能轉成神經衝動；半規管負責平衡。",
    parts: [
      { id: "auricle", name: "耳廓", en: "Auricle", desc: "收集聲波；由纖維彈性軟骨構成，耳垂含脂肪與纖維。" },
      { id: "canal", name: "外耳道", en: "External auditory canal", desc: "把聲波導向鼓膜；耳垢腺分泌耳垢保護。" },
      { id: "eardrum", name: "鼓膜", en: "Tympanic membrane", desc: "聲波令鼓膜振動，把能量傳給聽小骨。" },
      { id: "ossicles", name: "聽小骨", en: "Ossicles", desc: "錘骨、砧骨、鐙骨；放大並傳遞振動到卵圓窗。" },
      { id: "cochlea", name: "耳蝸", en: "Cochlea", desc: "內含螺旋器與毛細胞；把振動轉成聽覺神經衝動。" },
      { id: "semicircular", name: "半規管", en: "Semicircular canals", desc: "感受頭部旋轉與空間位置，與平衡有關，不負責聽覺。" }
    ],
    svg: `
<svg viewBox="0 0 360 330" role="img" aria-label="耳與聽覺示意圖">
  <g class="dpart" data-act="diagram-part" data-part="auricle"><path d="M62 100c-22 8-32 40-18 66 12 22 34 28 50 12 10-10 8-24 0-30-6-4-12 0-12 8 0 6 4 10 8 12" fill="url(#gFlesh)" stroke="#C89A8E" stroke-width="2"/><path d="M50 112c-10 16-8 38 6 48" fill="none" stroke="#C89A8E" stroke-width="1.5"/><ellipse class="hot" cx="62" cy="140" rx="34" ry="52"/></g>
  <g class="dpart" data-act="diagram-part" data-part="canal"><path d="M100 140h56" stroke="#D9A45A" stroke-width="14" stroke-linecap="round"/><ellipse class="hot" cx="128" cy="140" rx="32" ry="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="eardrum"><path d="M158 116v48" stroke="#B98578" stroke-width="7" stroke-linecap="round"/><ellipse class="hot" cx="158" cy="140" rx="12" ry="30"/></g>
  <g class="dpart" data-act="diagram-part" data-part="ossicles"><path d="M170 132l20-12 10 22 18-10" fill="none" stroke="#C9A47B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><ellipse class="hot" cx="196" cy="134" rx="30" ry="26"/></g>
  <g class="dpart" data-act="diagram-part" data-part="cochlea"><path d="M222 150c40-8 62 12 56 38-6 24-34 34-54 20-14-10-12-28 2-34 10-4 20 2 20 12 0 8-8 12-14 8" fill="none" stroke="#7FA09A" stroke-width="10" stroke-linecap="round"/><ellipse class="hot" cx="254" cy="180" rx="42" ry="40"/></g>
  <g class="dpart" data-act="diagram-part" data-part="semicircular"><path d="M208 92c12-26 44-28 52-4M212 96c-18 12-18 36 2 44M220 88c-16-18-8-40 12-44" fill="none" stroke="#8FB3A6" stroke-width="7" stroke-linecap="round"/><ellipse class="hot" cx="230" cy="92" rx="38" ry="32"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="auricle"><line x1="20" y1="50" x2="50" y2="100" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="47">耳廓</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="canal"><line x1="20" y1="210" x2="110" y2="155" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="213">外耳道</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="eardrum"><line x1="20" y1="265" x2="148" y2="165" stroke="#A7AEA6" stroke-width=".8"/><text x="8" y="268">鼓膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="ossicles"><line x1="300" y1="60" x2="206" y2="120" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="57">聽小骨</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="cochlea"><line x1="300" y1="250" x2="270" y2="200" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="253">耳蝸</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="semicircular"><line x1="300" y1="105" x2="254" y2="95" stroke="#A7AEA6" stroke-width=".8"/><text x="306" y="102">半規管</text></g>
</svg>`
  },
  {
    id: "skin", title: "皮膚分層", en: "Skin layers", tag: "皮膚", icon: "skin",
    intro: "表皮、真皮、皮下組織由外到內；毛囊、皮脂腺、汗腺都在真皮，表皮沒有血管。",
    parts: [
      { id: "corneum", name: "角質層", en: "Stratum corneum", desc: "表皮最外層，由扁平、無核的角質細胞組成；富含角蛋白，防水並抵抗摩擦。" },
      { id: "germinative", name: "生發層", en: "Germinative layer", desc: "表皮最深層，細胞不斷分裂，把新細胞推向表面；表皮約一個月更新一次。" },
      { id: "dermis", name: "真皮", en: "Dermis", desc: "含血管、淋巴管、神經末梢、毛囊、汗腺和皮脂腺；提供表皮營養。" },
      { id: "subcutaneous", name: "皮下組織", en: "Subcutaneous tissue", desc: "皮膚下方的脂肪層，保溫、緩衝和儲存能量。" },
      { id: "hair", name: "毛囊", en: "Hair follicle", desc: "毛髮由毛囊長出；毛囊附有皮脂腺和豎毛肌。" },
      { id: "sebaceous", name: "皮脂腺", en: "Sebaceous gland", desc: "分泌皮脂，潤滑皮膚和毛髮；開口通入毛囊。" },
      { id: "sweat", name: "汗腺", en: "Sweat gland", desc: "分泌汗液，蒸發散熱；受交感神經刺激，遍佈全身但手掌、腳底、腋窩特別多。" }
    ],
    svg: `
<svg viewBox="0 0 360 380" role="img" aria-label="皮膚分層示意圖">
  <rect x="40" y="58" width="280" height="42" fill="url(#gCorneum)" stroke="#D8CBB8"/>
  <rect x="40" y="100" width="280" height="24" fill="url(#gStomach)" stroke="#D8CBB8"/>
  <rect x="40" y="124" width="280" height="26" fill="url(#gGold)" stroke="#D8CBB8"/>
  <rect x="40" y="150" width="280" height="140" fill="url(#gSkin)" stroke="#D8CBB8"/>
  <rect x="40" y="290" width="280" height="55" fill="url(#gSubcut)" stroke="#D8CBB8"/>
  <path d="M40 150q70 14 140 0t140 0" fill="none" stroke="#C78E88" stroke-width="2"/>
  <g class="dpart" data-act="diagram-part" data-part="corneum"><rect x="40" y="58" width="280" height="42" fill="url(#gCorneum)" stroke="#C9A47B"/><rect class="hot" x="40" y="58" width="280" height="42"/></g>
  <g class="dpart" data-act="diagram-part" data-part="germinative"><rect x="40" y="124" width="280" height="26" fill="url(#gGold)" stroke="#9D7954"/><rect class="hot" x="40" y="124" width="280" height="26"/></g>
  <g class="dpart" data-act="diagram-part" data-part="dermis"><rect x="40" y="150" width="280" height="140" fill="none" stroke="#C78E88" stroke-width="2"/><rect class="hot" x="40" y="150" width="280" height="140"/></g>
  <g class="dpart" data-act="diagram-part" data-part="subcutaneous"><rect x="40" y="290" width="280" height="55" fill="none" stroke="#C9A47B" stroke-width="2"/><rect class="hot" x="40" y="290" width="280" height="55"/></g>
  <g class="dpart" data-act="diagram-part" data-part="hair"><path d="M206 18l24 120" stroke="#5E4A3A" stroke-width="3" stroke-linecap="round"/><path d="M230 136c14 0 18 18 12 32-6 14-22 16-30 4-8-12 2-26 12-26" fill="url(#gFlesh)" stroke="#9D7954" stroke-width="1.5"/><rect class="hot" x="196" y="20" width="58" height="140" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="sebaceous"><circle cx="252" cy="148" r="14" fill="url(#gStomach)" stroke="#B68B45"/><circle cx="264" cy="156" r="10" fill="url(#gStomach)" stroke="#B68B45"/><circle cx="244" cy="162" r="8" fill="url(#gStomach)" stroke="#B68B45"/><circle class="hot" cx="254" cy="155" r="24"/></g>
  <g class="dpart" data-act="diagram-part" data-part="sweat"><path d="M112 84v150c0 18 20 22 30 8" fill="none" stroke="#8FB3A6" stroke-width="4" stroke-linecap="round"/><path d="M120 280c-16 0-20 18-6 24 12 6 24-6 16-16-6-8-18-2-14 6" fill="none" stroke="#8FB3A6" stroke-width="4" stroke-linecap="round"/><rect class="hot" x="100" y="78" width="50" height="220" fill="transparent"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="corneum"><text x="8" y="78">角質層</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="germinative"><text x="8" y="142">生發層</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="dermis"><text x="8" y="220">真皮</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="subcutaneous"><text x="8" y="325">皮下組織</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="hair"><text x="300" y="70">毛囊</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="sebaceous"><text x="300" y="150">皮脂腺</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="sweat"><text x="300" y="285">汗腺</text></g>
</svg>`
  },
  {
    id: "pleura", title: "胸膜與肺", en: "Pleura", tag: "呼吸", icon: "lungs",
    intro: "胸膜是漿膜：壁層貼胸壁、臟層包肺，中間的胸膜腔有漿液，減少呼吸時的摩擦。",
    parts: [
      { id: "parietal", name: "壁層胸膜", en: "Parietal pleura", desc: "貼着胸壁、橫膈膜和縱隔的胸膜外層。" },
      { id: "visceral", name: "臟層胸膜", en: "Visceral pleura", desc: "緊貼肺表面，隨肺一起移動。" },
      { id: "cavity", name: "胸膜腔", en: "Pleural cavity", desc: "兩層胸膜之間的潛在空間，含少量漿液；正常壓力低於大氣壓，幫助肺擴張。" },
      { id: "lung", name: "肺", en: "Lung", desc: "位於胸腔，表面覆蓋臟層胸膜；肺泡進行氣體交換。" },
      { id: "diaphragm", name: "橫膈膜", en: "Diaphragm", desc: "胸腔與腹腔的分界；收縮下降時增加胸腔容積，引起吸氣。" }
    ],
    svg: `
<svg viewBox="0 0 360 330" role="img" aria-label="胸膜與肺示意圖">
  <path d="M52 42q128-26 256 0v214q-128 30-256 0z" fill="url(#gCell)" stroke="#D8CBB8" stroke-width="2"/>
  <path d="M70 58q110-18 220 0v184q-110 26-220 0z" fill="url(#gBody)" stroke="#D8CBB8"/>
  <g class="dpart" data-act="diagram-part" data-part="parietal"><path d="M72 60q108-18 216 0v180q-108 26-216 0z" fill="none" stroke="#4F7A6E" stroke-width="5"/><path class="hot" d="M72 60q108-18 216 0v180q-108 26-216 0z" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="lung"><path d="M104 86c-26 8-34 52-18 82 12 22 34 20 42-2 6-16 4-40 0-64-2-14-10-20-24-16z" fill="url(#gLung)" stroke="#C78E88"/><path d="M256 86c26 8 34 52 18 82-12 22-34 20-42-2-6-16-4-40 0-64 2-14 10-20 24-16z" fill="url(#gLung)" stroke="#C78E88"/><ellipse class="hot" cx="118" cy="140" rx="40" ry="55"/><ellipse class="hot" cx="242" cy="140" rx="40" ry="55"/></g>
  <g class="dpart" data-act="diagram-part" data-part="visceral"><path d="M104 86c-26 8-34 52-18 82 12 22 34 20 42-2 6-16 4-40 0-64-2-14-10-20-24-16zM256 86c26 8 34 52 18 82-12 22-34 20-42-2-6-16-4-40 0-64 2-14 10-20 24-16z" fill="none" stroke="#D1624B" stroke-width="5"/><ellipse class="hot" cx="118" cy="140" rx="40" ry="55" fill="transparent"/><ellipse class="hot" cx="242" cy="140" rx="40" ry="55" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="cavity"><path d="M91 72q89-14 178 0v158q-89 20-178 0z" fill="none" stroke="#C9A45A" stroke-width="2" stroke-dasharray="4 4"/><path class="hot" d="M91 72q89-14 178 0v158q-89 20-178 0z" fill="transparent"/></g>
  <path d="M162 120c-12-14-28-4-24 12 4 14 24 24 24 24s20-10 24-24c4-16-12-26-24-12z" fill="url(#gHeart)" stroke="#B54A38"/>
  <g class="dpart" data-act="diagram-part" data-part="diaphragm"><path d="M72 262q108 34 216 0" fill="none" stroke="#A9483C" stroke-width="8" stroke-linecap="round"/><ellipse class="hot" cx="180" cy="268" rx="110" ry="24"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="parietal"><text x="8" y="62">壁層胸膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="visceral"><text x="8" y="110">臟層胸膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="cavity"><text x="300" y="100">胸膜腔</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="lung"><text x="300" y="190">肺</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="diaphragm"><text x="8" y="300">橫膈膜</text></g>
</svg>`
  },
  {
    id: "gutwall", title: "消化道壁四層", en: "Gut wall", tag: "消化", icon: "stomach",
    intro: "由內到外：黏膜、黏膜下層、肌肉層、漿膜；歐氏神經叢在肌肉層，麥氏神經叢在黏膜下層。",
    parts: [
      { id: "mucosa", name: "黏膜", en: "Mucosa", desc: "最內層，含上皮、結締組織和肌肉黏膜；分泌黏液、吸收養分。" },
      { id: "submucosa", name: "黏膜下層", en: "Submucosa", desc: "疏鬆結締組織，含血管、淋巴管和麥氏神經叢。" },
      { id: "circular", name: "環形肌層", en: "Circular muscle", desc: "肌肉層的內層，收縮時令腸腔變窄，推動食糜。" },
      { id: "longitudinal", name: "縱形肌層", en: "Longitudinal muscle", desc: "肌肉層的外層，收縮時令腸管縮短。" },
      { id: "serosa", name: "漿膜", en: "Serosa", desc: "最外層；腹腔內器官的漿膜就是腹膜臟層，減少摩擦。" },
      { id: "myenteric", name: "歐氏神經叢", en: "Myenteric plexus", desc: "位於環形肌與縱形肌之間，主要控制蠕動。" },
      { id: "submucosal", name: "麥氏神經叢", en: "Submucosal plexus", desc: "位於黏膜下層，主要控制腺體分泌和血流。" }
    ],
    svg: `
<svg viewBox="0 0 360 320" role="img" aria-label="消化道壁四層示意圖">
  <rect x="50" y="46" width="260" height="24" fill="url(#gCorneum)" stroke="#B9A98F"/>
  <rect x="50" y="70" width="260" height="30" fill="url(#gGold)" stroke="#B9A98F"/>
  <rect x="50" y="100" width="260" height="58" fill="url(#gGold)" stroke="#B9A98F"/>
  <rect x="50" y="158" width="260" height="50" fill="url(#gFlesh)" stroke="#B9A98F"/>
  <rect x="50" y="208" width="260" height="58" fill="url(#gLung)" stroke="#B9A98F"/>
  <path d="M50 236q65 18 130 0t130 0v30H50z" fill="url(#gCell)"/>
  <g class="dpart" data-act="diagram-part" data-part="serosa"><rect x="50" y="46" width="260" height="24" fill="none" stroke="#4F7A6E" stroke-width="3"/><rect class="hot" x="50" y="46" width="260" height="24"/></g>
  <g class="dpart" data-act="diagram-part" data-part="longitudinal"><rect x="50" y="70" width="260" height="30" fill="none" stroke="#A2722B" stroke-width="2"/><path d="M70 70v30M100 70v30M130 70v30M160 70v30M190 70v30M220 70v30M250 70v30M280 70v30" stroke="#A2722B" stroke-width="1"/><rect class="hot" x="50" y="70" width="260" height="30" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="circular"><rect x="50" y="100" width="260" height="58" fill="none" stroke="#B54A38" stroke-width="2"/><path d="M60 108h240M60 118h240M60 128h240M60 138h240M60 148h240" stroke="#B54A38" stroke-width="1" opacity=".55"/><rect class="hot" x="50" y="100" width="260" height="58" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="myenteric"><circle cx="90" cy="100" r="6" fill="#4D6485"/><circle cx="140" cy="100" r="6" fill="#4D6485"/><circle cx="190" cy="100" r="6" fill="#4D6485"/><circle cx="240" cy="100" r="6" fill="#4D6485"/><circle class="hot" cx="165" cy="100" rx="105" ry="14"/></g>
  <g class="dpart" data-act="diagram-part" data-part="submucosa"><rect x="50" y="158" width="260" height="50" fill="none" stroke="#8A5A7A" stroke-width="2"/><circle cx="80" cy="180" r="4" fill="#8A5A7A"/><circle cx="120" cy="174" r="4" fill="#8A5A7A"/><circle cx="160" cy="186" r="4" fill="#8A5A7A"/><circle cx="220" cy="176" r="4" fill="#8A5A7A"/><rect class="hot" x="50" y="158" width="260" height="50" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="submucosal"><circle cx="105" cy="173" r="7" fill="url(#gGold)"/><circle cx="195" cy="183" r="7" fill="url(#gGold)"/><circle class="hot" cx="150" cy="178" rx="70" ry="18"/></g>
  <g class="dpart" data-act="diagram-part" data-part="mucosa"><rect x="50" y="208" width="260" height="58" fill="none" stroke="#C78E88" stroke-width="3"/><path d="M70 208v24M90 208v18M110 208v26M130 208v20M150 208v28M170 208v22M190 208v26M210 208v18M230 208v24M250 208v20M270 208v26M290 208v22" stroke="#C78E88" stroke-width="4" stroke-linecap="round"/><rect class="hot" x="50" y="208" width="260" height="58" fill="transparent"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="serosa"><text x="8" y="58">漿膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="longitudinal"><text x="8" y="84">縱形肌</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="circular"><text x="8" y="120">環形肌</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="myenteric"><text x="300" y="100">歐氏叢</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="submucosa"><text x="8" y="180">黏膜下層</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="submucosal"><text x="300" y="180">麥氏叢</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="mucosa"><text x="8" y="235">黏膜</text></g>
  <text x="160" y="278" text-anchor="middle" font-size="10" fill="#A7AEA6">腸腔</text>
</svg>`
  },
  {
    id: "longbone", title: "長骨構造", en: "Long bone", tag: "骨骼", icon: "bone",
    intro: "長骨兩端是骨骺、中間是骨幹；骨膜包住外層，中央骨髓腔含黃骨髓，兩端疏鬆骨含紅骨髓。",
    parts: [
      { id: "periosteum", name: "骨膜", en: "Periosteum", desc: "包住骨表面的纖維膜，含造骨細胞和血管，負責生長與修復。" },
      { id: "compact", name: "緻密骨", en: "Compact bone", desc: "骨幹外層，堅硬、含骨單位；支撐重量。" },
      { id: "spongy", name: "疏鬆骨", en: "Spongy bone", desc: "骨端內部呈海綿狀，含紅骨髓；可吸收壓力。" },
      { id: "marrow", name: "骨髓腔", en: "Medullary cavity", desc: "骨幹中央的空腔，成人主要含黃骨髓（脂肪）。" },
      { id: "redmarrow", name: "紅骨髓", en: "Red marrow", desc: "位於疏鬆骨內，製造紅血球、白血球和血小板。" },
      { id: "cartilage", name: "關節軟骨", en: "Articular cartilage", desc: "覆蓋骨端關節面，減少摩擦、吸收壓力；沒有血管。" }
    ],
    svg: `
<svg viewBox="0 0 360 440" role="img" aria-label="長骨構造示意圖">
  <path d="M146 80c-20-38-66-42-74 4-6 32 10 52 30 60v190c-20 8-36 28-30 60 8 46 54 42 74 4 6-12 8-26 8-40V124c0-18-2-32-8-44z" fill="url(#gBody)" stroke="#B9A98F" stroke-width="2" transform="translate(70 0)"/>
  <path d="M216 80c20-38 66-42 74 4 6 32-10 52-30 60v190c20 8 36 28 30 60-8 46-54 42-74 4-6-12-8-26-8-40V124c0-18 2-32 8-44z" fill="url(#gBody)" stroke="#B9A98F" stroke-width="2" transform="translate(-70 0)"/>
  <rect x="156" y="140" width="48" height="150" fill="url(#gSubcut)" stroke="#C9A47B"/>
  <g class="dpart" data-act="diagram-part" data-part="periosteum"><path d="M108 100c-10 20-10 44 0 62M252 100c10 20 10 44 0 62M108 338c-10-20-10-44 0-62M252 338c10-20 10-44 0-62" fill="none" stroke="#D1624B" stroke-width="4"/><rect class="hot" x="100" y="80" width="160" height="290" fill="transparent"/></g>
  <g class="dpart" data-act="diagram-part" data-part="compact"><path d="M116 120h24v190h-24zM220 120h24v190h-24z" fill="url(#gCompact)" stroke="#B9A98F"/><rect class="hot" x="110" y="120" width="36" height="190"/><rect class="hot" x="214" y="120" width="36" height="190"/></g>
  <g class="dpart" data-act="diagram-part" data-part="spongy"><ellipse cx="128" cy="100" rx="30" ry="28" fill="url(#gFlesh)" stroke="#C78E88"/><ellipse cx="232" cy="100" rx="30" ry="28" fill="url(#gFlesh)" stroke="#C78E88"/><ellipse cx="128" cy="342" rx="30" ry="28" fill="url(#gFlesh)" stroke="#C78E88"/><ellipse cx="232" cy="342" rx="30" ry="28" fill="url(#gFlesh)" stroke="#C78E88"/><ellipse class="hot" cx="128" cy="100" rx="36" ry="34"/><ellipse class="hot" cx="232" cy="100" rx="36" ry="34"/><ellipse class="hot" cx="128" cy="342" rx="36" ry="34"/><ellipse class="hot" cx="232" cy="342" rx="36" ry="34"/></g>
  <g class="dpart" data-act="diagram-part" data-part="marrow"><rect x="166" y="140" width="28" height="150" fill="url(#gBladder)" stroke="#B39A4C"/><rect class="hot" x="166" y="140" width="28" height="150"/></g>
  <g class="dpart" data-act="diagram-part" data-part="redmarrow"><circle cx="120" cy="92" r="4" fill="#C45B47"/><circle cx="136" cy="106" r="4" fill="#C45B47"/><circle cx="224" cy="96" r="4" fill="#C45B47"/><circle cx="240" cy="108" r="4" fill="#C45B47"/><circle class="hot" cx="128" cy="100" rx="40" ry="36"/><circle class="hot" cx="232" cy="100" rx="40" ry="36"/></g>
  <g class="dpart" data-act="diagram-part" data-part="cartilage"><path d="M96 72c20-20 46-22 66-6M198 66c20-16 46-14 66 6M96 368c20 20 46 22 66 6M198 374c20 16 46 14 66-6" fill="none" stroke="#8FB3A6" stroke-width="6" stroke-linecap="round"/><rect class="hot" x="90" y="58" width="180" height="24" fill="transparent"/><rect class="hot" x="90" y="356" width="180" height="24" fill="transparent"/></g>
  <g class="dlabel" data-act="diagram-part" data-part="periosteum"><text x="8" y="130">骨膜</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="compact"><text x="300" y="180">緻密骨</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="spongy"><text x="8" y="95">疏鬆骨</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="marrow"><text x="300" y="240">骨髓腔</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="redmarrow"><text x="8" y="355">紅骨髓</text></g>
  <g class="dlabel" data-act="diagram-part" data-part="cartilage"><text x="300" y="65">關節軟骨</text></g>
</svg>`
  }
];
