/* ============================================================
   解剖生理學溫習 — offline study app
   Vanilla JS · localStorage · no external dependencies
   ============================================================ */
(function () {
  "use strict";

  /* Small polyfills for older Android WebViews (API 24 devices may ship Chrome 51). */
  if (!String.prototype.padStart) {
    String.prototype.padStart = function (length, pad) {
      var str = String(this);
      pad = pad == null ? " " : String(pad);
      if (str.length >= length || !pad) return str;
      var fill = "";
      while (fill.length < length - str.length) fill += pad;
      return fill.slice(0, length - str.length) + str;
    };
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function (pred, thisArg) {
      for (var i = 0; i < this.length; i++) if (pred.call(thisArg, this[i], i, this)) return this[i];
      return undefined;
    };
  }

  /* ---------------- data ---------------- */
  const CH = window.CHAPTERS || [];
  const QS = window.QUESTIONS || [];
  const SYSTEMS = window.SYSTEMS || [];
  const CHEATSHEET = window.CHEATSHEET || [];
  const ATLAS = window.ATLAS || [];
  const DIAGRAMS = window.DIAGRAMS || [];

  const LS_KEY = "ap_state_v1";
  const GROUPS = [
    { name: "基礎", tone: "#2F7B6A", tint: "#DCE9DE", icon: "cell" },
    { name: "運動", tone: "#7A6B43", tint: "#EDE7D5", icon: "bone" },
    { name: "循環呼吸", tone: "#A9483C", tint: "#F2DDD7", icon: "heart" },
    { name: "內臟", tone: "#A2722B", tint: "#F1E4CB", icon: "stomach" },
    { name: "免疫", tone: "#4F7A55", tint: "#DDEADD", icon: "shield" },
    { name: "內分泌", tone: "#8A5A7A", tint: "#EEDFEA", icon: "thyroid" },
    { name: "神經感官", tone: "#4D6485", tint: "#DDE4EF", icon: "brain" },
    { name: "生殖", tone: "#9A5B68", tint: "#F0DDE2", icon: "reproductive" }
  ];
  const CHAPTER_ICONS = {
    ch01: "cell", ch02: "skin", ch03: "stomach", ch04: "bone", ch05: "joint",
    ch06: "muscle", ch07: "nerve", ch08: "leaf", ch09: "lungs", ch10: "heart",
    ch11: "drop", ch12: "shield", ch13: "kidney", ch14: "liver", ch15: "thyroid",
    ch16: "brain", ch17: "male", ch18: "female", ch19: "eye"
  };

  /* ---------------- icons ---------------- */
  const ICONS = {
    home: '<path d="M3 10.6 12 3l9 7.6V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 5.2A3.2 3.2 0 0 1 7.2 2H20v18H7.2A3.2 3.2 0 0 0 4 23z"/><path d="M4 19.2A3.2 3.2 0 0 1 7.2 16H20"/>',
    atlas: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.2a2.7 2.7 0 1 1 4.4 2.1c-.9.7-1.8 1.2-1.8 2.5"/><path d="M12 17.2h.01"/>',
    chart: '<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/>',
    flame: '<path d="M12.2 2.5c1.1 4.3-3.6 5.3-3.6 9.6a3.4 3.4 0 0 0 6.8.1c0-1.6-.9-2.6-.9-2.6s2.6 1.6 2.6 4.3a5 5 0 0 1-10 0c0-5.1 5.1-7.1 5.1-11.4z"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    check: '<path d="m5 12 4.2 4L19 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    bookmark: '<path d="M6 3h12v18l-6-4.2L6 21z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    spark: '<path d="m12 2.8 1.7 5.5 5.5 1.7-5.5 1.7L12 17.2l-1.7-5.5L4.8 10l5.5-1.7z"/><path d="M19 17.5v3M17.5 19h3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.7"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-5L4 8M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2M20 20v-4h-4"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.2 6h.01M3.2 12h.01M3.2 18h.01"/>',
    alert: '<path d="M12 3 2.5 20.5h19z"/><path d="M12 9v4.5M12 17.3h.01"/>',
    zoom: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 10.5h5M10.5 8v5"/>',
    cell: '<circle cx="12" cy="12" r="9"/><circle cx="9.5" cy="9.5" r="2.4"/><path d="M14.5 7.5h2M16 14.5l2-1M8 16l-1.2 2M5.8 8.5 4.5 7.8"/>',
    skin: '<path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    stomach: '<path d="M9 3v4c0 3.4-4 4.2-4 8.2a6 6 0 0 0 12 0c0-4-3-4.8-3-8.2V3"/><path d="M9 7.5c3 .8 4.2 3 4.2 5.8"/>',
    bone: '<path d="M7.3 4.2a2.6 2.6 0 0 0-3.1 3.1 2.6 2.6 0 0 0 1 4.2l7.3 7.3a2.6 2.6 0 0 0 4.2 1 2.6 2.6 0 0 0 3.1-3.1 2.6 2.6 0 0 0-1-4.2l-7.3-7.3a2.6 2.6 0 0 0-4.2-1z"/>',
    joint: '<path d="M8 3v5.5a4 4 0 0 0 8 0V3M8 21v-5.5M16 21v-5.5"/><circle cx="12" cy="12" r="3.2"/>',
    muscle: '<path d="M6 4c5.5 0 9 3.8 9 8s-3.5 8-9 8c2.1-3 2.1-5 2.1-8S8.1 7 6 4z"/><path d="M10 6c2.1 2 2.1 10 0 12M14 8c1.1 2 1.1 6 0 8"/>',
    nerve: '<circle cx="8" cy="8" r="3"/><path d="M8 5V2M5 8H2M10.2 10.2 13 13M12.5 4.5 15 2M4.5 12.5 2 15M13 13l7 5"/><path d="M11.8 11.8a3 3 0 0 1 2 5"/>',
    leaf: '<path d="M20 4C10.5 4 4.5 8 4.5 15a4.5 4.5 0 0 0 4.5 4.5C16 19.5 20 13.5 20 4z"/><path d="M8.5 19c2.2-5 5.4-8.2 9.5-11"/>',
    lungs: '<path d="M12 3v10M12 8.2c-2-2-5-2-7 .1-2 3-2 7.8 1 9.8 3 2 6 .1 6-3.9M12 8.2c2-2 5-2 7 .1 2 3 2 7.8-1 9.8-3 2-6 .1-6-3.9"/>',
    heart: '<path d="M12 21S4 16 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',
    drop: '<path d="M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/>',
    shield: '<path d="M12 3 20 6v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.3L16 9.6"/>',
    kidney: '<path d="M9 3C5 3 4 7 4 11c0 6 4 10 7 10 2 0 3-2 3-4 0-3-2-4-2-7 0-4-1-7-3-7z"/><path d="M15 21c4 0 5-4 5-8 0-6-4-10-7-10-2 0-3 2-3 4 0 3 2 4 2 7 0 4 1 7 3 7z"/>',
    liver: '<path d="M3 7c5-3 12-3 17 1 2 5-2 9-7 9-2 0-3-2-5-2-3 0-5-2-5-8z"/><path d="M10 7v4"/>',
    thyroid: '<path d="M12 8v4M7 7c-2 0-4 2-4 5 0 4 3 7 6 7 2 0 3-2 3-4 0-3-2-8-5-8zM17 7c2 0 4 2 4 5 0 4-3 7-6 7-2 0-3-2-3-4 0-3 2-8 5-8z"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1V5a3 3 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 4 3 3 0 0 1-5 1V5a3 3 0 0 1 3-1z"/><path d="M9 8H6.5M15 8h2.5M8 13H6M16 13h2M9 17H7M15 17h2"/>',
    male: '<circle cx="10" cy="14" r="5"/><path d="M14 10 21 3M15.5 3H21v5.5"/>',
    female: '<circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 19h6"/>',
    reproductive: '<circle cx="10" cy="13.5" r="4.5"/><path d="M13.2 10.3 20 3.5M15.8 3.5H20V8"/><path d="M10 18v3M7.5 20.5h5"/>',
    eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3.2"/>',
    ear: '<path d="M7 20c0-3 2-4 4-6 3-3 3-8-1-9-3-1-6 1-6 4 0 2 1 3 2 4"/><path d="M13 20c0-3 2-4 3-6 2-4-1-8-5-8"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2.2 4.2L8.5 15.5l2.2-4.2z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    swap: '<path d="M4 8h16M16 4l4 4-4 4M20 16H4M8 12l-4 4 4 4"/>',
    pill: '<path d="M10 20a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7z"/><path d="m8 16 6-6"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    "volume-off": '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/>',
    body: '<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M7 11h10M9 22l3-7 3 7"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.info) + "</svg>";
  }

  /* ---------------- helpers ---------------- */
  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function todayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function nowMs() { return Date.now(); }
  function fmtTime(sec) {
    if (sec < 60) return sec + " 秒";
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + " 分" + (s ? " " + s + " 秒" : "");
  }
  function groupMeta(name) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].name === name) return GROUPS[i];
    return GROUPS[0];
  }
  function chapterById(id) { return CH.find(function (c) { return c.id === id; }); }
  function chapterByNum(n) { return CH.find(function (c) { return Number(c.num) === Number(n); }); }
  function questionsOf(level, chId) {
    return QS.filter(function (q) {
      return (!level || Number(q.level) === Number(level)) && (!chId || q.chId === chId);
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function difficultyName(l) { return l === 1 ? "初階" : l === 2 ? "中階" : "高階"; }
  function letter(i) { return "ABCDE".charAt(i); }
  function answerLetters(q, arr) {
    return (arr || []).slice().sort(function (a, b) { return a - b; }).map(function (i) { return letter(i); }).join("、");
  }
  function sameSet(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    var x = a.slice().sort().join(","), y = b.slice().sort().join(",");
    return x === y;
  }

  /* ---------------- audio + speech ---------------- */
  var SFX = {};
  var speechTimer = null;

  function nativeTTS() {
    return (window.AndroidTTS && typeof window.AndroidTTS.speak === "function") ? window.AndroidTTS : null;
  }
  function nativeVoiceStatus() {
    try {
      if (nativeTTS() && typeof window.AndroidTTS.getVoiceStatus === "function") {
        return window.AndroidTTS.getVoiceStatus();
      }
    } catch (e) {}
    return "browser";
  }
  function voiceStatusLabel() {
    var st = nativeVoiceStatus();
    if (st === "cantonese") return "粵語（yue / zh-HK）";
    if (st === "zh-HK") return "粵語（zh-HK）";
    if (st === "mandarin") return "台灣／國語（未安裝粵語）";
    if (st === "none") return "未支援／未安裝中文語音";
    return "Safari 系統語音（zh-HK）";
  }
  var warnedCanto = false;
  function maybeWarnCantonese() {
    if (warnedCanto || !nativeTTS()) return;
    try {
      if (typeof window.AndroidTTS.isAvailable === "function" && !window.AndroidTTS.isAvailable()) return;
    } catch (e) {}
    var st = nativeVoiceStatus();
    if (st === "mandarin") {
      warnedCanto = true;
      toast("未安裝粵語語音，暫用台灣中文；請在系統設定下載「中文（香港）」");
    } else if (st === "none") {
      warnedCanto = true;
      toast("此手機未支援中文語音，請在系統設定安裝 TTS 語音");
    }
  }
  function pickCantoVoice() {
    if (!window.speechSynthesis) return null;
    try {
      var vs = window.speechSynthesis.getVoices() || [];
      var exact = vs.filter(function (v) { return /^(zh[-_]HK|yue[-_]HK)$/i.test(v.lang || ""); });
      if (exact.length) return exact[0];
      var named = vs.filter(function (v) { return /cantonese|粵|廣東/i.test((v.name || "") + " " + (v.voiceURI || "")); });
      if (named.length) return named[0];
    } catch (e) {}
    return null;
  }
  function playSfx(kind) {
    if (!S.prefs || !S.prefs.sfx) return;
    try {
      var a = SFX[kind];
      if (!a) {
        a = new Audio(kind + ".wav");
        a.preload = "auto";
        SFX[kind] = a;
      }
      a.currentTime = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function chunkSpeech(text) {
    text = String(text || "").replace(/\s+/g, " ").trim();
    if (!text) return [];
    var bits = text.match(/[^。！？；;\n]+[。！？；;]?/g) || [text];
    var chunks = [], cur = "";
    bits.forEach(function (b) {
      b = b.trim();
      if (!b) return;
      if (cur && (cur.length + b.length) > 240) { chunks.push(cur); cur = ""; }
      cur += b;
    });
    if (cur) chunks.push(cur);
    return chunks;
  }
  function stopSpeech() {
    clearTimeout(speechTimer);
    try { if (nativeTTS()) nativeTTS().stop(); } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }
  function speakText(text, btn) {
    if (!S.prefs || !S.prefs.voice) { toast("朗讀已關閉，可在「進度 → 聲音設定」開啟"); return false; }
    var chunks = chunkSpeech(text);
    if (!chunks.length) return false;
    maybeWarnCantonese();
    stopSpeech();
    var ok = false;
    try {
      if (nativeTTS()) {
        nativeTTS().speak(chunks[0]);
        for (var i = 1; i < chunks.length; i++) nativeTTS().queue(chunks[i]);
        ok = true;
      }
    } catch (e) {}
    if (!ok && window.speechSynthesis) {
      try {
        var canto = pickCantoVoice();
        chunks.forEach(function (c) {
          var u = new SpeechSynthesisUtterance(c);
          u.lang = "zh-HK";
          if (canto) u.voice = canto;
          u.rate = 0.95;
          u.pitch = 1;
          window.speechSynthesis.speak(u);
        });
        ok = true;
      } catch (e) {}
    }
    if (!ok) { toast("此裝置未支援中文朗讀"); return false; }
    if (btn) {
      btn.classList.add("speaking");
      clearTimeout(speechTimer);
      var ms = Math.min(90000, Math.max(1800, chunks.join("").length * 120));
      speechTimer = setTimeout(function () { btn.classList.remove("speaking"); }, ms);
    }
    return true;
  }
  function setPref(k, v) {
    if (!S.prefs) S.prefs = { voice: true, sfx: true, autoRead: false };
    S.prefs[k] = !!v;
    saveState();
  }
  function soundButtonHTML() {
    var off = S.prefs && !S.prefs.voice;
    return '<button class="icon-btn sound-btn' + (off ? " off" : "") + '" data-act="sound-settings" aria-label="聲音設定">' + icon(off ? "volume-off" : "volume") + '</button>';
  }
  function updateSoundButtons() {
    $$(".sound-btn").forEach(function (b) {
      var off = S.prefs && !S.prefs.voice;
      b.classList.toggle("off", off);
      b.innerHTML = icon(off ? "volume-off" : "volume");
    });
  }
  function soundSettingsSheet() {
    var p = S.prefs || { voice: true, sfx: true, autoRead: false };
    openSheet('<h2>聲音與朗讀</h2><p>用粵語朗讀章節、題目與解釋；答對／答錯有音效。設定會存在這部手機。</p>' +
      '<div class="voice-status"><b>目前語音：</b>' + esc(voiceStatusLabel()) + '<button class="btn btn-soft btn-sm" data-act="check-canto">檢查粵語</button></div>' +
      settingRow("voice", "朗讀文字", "顯示朗讀按鈕，逐段讀出章節、題目與解釋。", p.voice) +
      settingRow("sfx", "答對／答錯音效", "答題後播放短音效；亦會用於互動構造圖小測驗。", p.sfx) +
      settingRow("autoRead", "自動朗讀題目", "進入每題時自動讀出題目與選項；預設關閉。", p.autoRead) +
      '<div class="sound-test"><button class="btn btn-soft btn-sm" data-act="test-voice">試聽粵語</button><button class="btn btn-soft btn-sm" data-act="test-sfx" data-kind="correct">試聽答對</button><button class="btn btn-soft btn-sm" data-act="test-sfx" data-kind="wrong">試聽答錯</button><button class="btn btn-soft btn-sm" data-act="stop-speech">停止朗讀</button></div>' +
      '<p class="io-note">Android APK 使用系統文字轉語音（TTS）；iPhone／PWA 使用 Safari 的語音。若裝置未安裝中文語音，請在系統設定加入「中文（香港）」或「中文（台灣）」語音。</p>' +
      '<div class="sheet-actions"><button class="btn btn-primary btn-block" data-act="close-sheet">完成</button></div>');
  }
  function settingRow(key, title, desc, on) {
    return '<button class="setting-row" data-act="toggle-pref" data-key="' + key + '"><span><h3>' + title + '</h3><p>' + desc + '</p></span><span class="switch' + (on ? " on" : "") + '" aria-hidden="true"></span></button>';
  }
  function speakSection(chId, idx) {
    var c = chapterById(chId); if (!c) return false;
    var s = (c.sections || [])[idx]; if (!s) return false;
    var text = s.title + "。" + (s.points || []).join("。");
    if (s.table && s.table.headers) {
      text += "。表格。";
      s.table.rows.forEach(function (r) { text += r.join("，") + "。"; });
    }
    return speakText(text);
  }
  function speakTips(chId) {
    var c = chapterById(chId); if (!c) return false;
    return speakText("考試必記位。" + (c.examTips || []).join("。"));
  }
  function speakTerm(chId, idx) {
    var c = chapterById(chId); if (!c) return false;
    var t = (c.terms || [])[idx]; if (!t) return false;
    return speakText(t.zh + "。" + t.en + "。" + t.def);
  }
  function questionSpeech(q) {
    return q.q + "。選項。" + q.options.map(function (o, i) { return letter(i) + "。" + o; }).join("。");
  }
  function speakChapter(id) {
    var c = chapterById(id); if (!c) return;
    var parts = [c.title + "。" + c.tagline + "。", c.intro];
    (c.sections || []).forEach(function (s) {
      parts.push(s.title + "。");
      (s.points || []).forEach(function (p) { parts.push(p); });
    });
    if (c.examTips && c.examTips.length) { parts.push("考試必記位。"); c.examTips.forEach(function (t) { parts.push(t); }); }
    return speakText(parts.join("。"));
  }

  /* ---------------- state ---------------- */
  function freshState() {
    return { read: {}, stats: {}, wrong: {}, bookmarks: {}, attempts: [], daily: {}, createdAt: nowMs(), prefs: { voice: true, sfx: true, autoRead: false } };
  }
  var S = loadState();
  function loadState() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return freshState();
      var o = JSON.parse(raw);
      var f = freshState();
      ["read", "stats", "wrong", "bookmarks", "attempts", "daily"].forEach(function (k) {
        if (o[k] != null) f[k] = o[k];
      });
      f.createdAt = o.createdAt || f.createdAt;
      if (o.prefs && typeof o.prefs === "object") {
        ["voice", "sfx", "autoRead"].forEach(function (k) {
          if (typeof o.prefs[k] === "boolean") f.prefs[k] = o.prefs[k];
        });
      }
      return f;
    } catch (e) { return freshState(); }
  }
  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* private mode / file:// */ }
  }

  function totalAnswered() {
    var n = 0;
    Object.keys(S.stats).forEach(function (k) { n += (S.stats[k].total || 0); });
    return n;
  }
  function totalCorrect() {
    var n = 0;
    Object.keys(S.stats).forEach(function (k) { n += (S.stats[k].correct || 0); });
    return n;
  }
  function accuracy() {
    var t = totalAnswered();
    return t ? Math.round(totalCorrect() / t * 100) : 0;
  }
  function chapterMastery(id) {
    var st = S.stats[id] || { correct: 0, total: 0 };
    var acc = st.total ? st.correct / st.total * 100 : 0;
    var read = S.read[id] ? 30 : 0;
    return Math.max(0, Math.min(100, Math.round(read + acc * 0.7)));
  }
  function overallMastery() {
    if (!CH.length) return 0;
    var sum = 0;
    CH.forEach(function (c) { sum += chapterMastery(c.id); });
    return Math.round(sum / CH.length);
  }
  function masteredCount() {
    return CH.filter(function (c) { return chapterMastery(c.id) >= 70; }).length;
  }
  function readCount() { return CH.filter(function (c) { return !!S.read[c.id]; }).length; }
  function streak() {
    var d = new Date();
    if (!S.daily[todayKey(d)]) d.setDate(d.getDate() - 1);
    var n = 0;
    while (S.daily[todayKey(d)]) { n++; d.setDate(d.getDate() - 1); if (n > 999) break; }
    return n;
  }
  function todayCount() { return S.daily[todayKey()] || 0; }
  function wrongIds() {
    return Object.keys(S.wrong).filter(function (id) { return QS.some(function (q) { return q.id === id; }); });
  }
  function bookmarkIds() {
    return Object.keys(S.bookmarks).filter(function (id) { return QS.some(function (q) { return q.id === id; }); });
  }
  function bestForLevel(level) {
    var best = 0;
    S.attempts.forEach(function (a) {
      if (Number(a.level) === Number(level) && a.total) best = Math.max(best, Math.round(a.correct / a.total * 100));
    });
    return best;
  }

  /* ---------------- routing ---------------- */
  var view = "home";
  var params = {};
  var history = [];
  var session = null;
  var lastResult = null;
  var overlayOpen = false;
  var viewer = null;
  var studyQuery = "";
  var studyFilter = "全部";
  var setupChapter = "all";
  var setupCount = 10;

  const TABS = [
    { id: "home", label: "首頁", icon: "home" },
    { id: "study", label: "學習", icon: "book" },
    { id: "atlas", label: "圖鑑", icon: "atlas" },
    { id: "quiz", label: "測驗", icon: "quiz" },
    { id: "progress", label: "進度", icon: "chart" }
  ];
  function tabbarHTML() {
    return TABS.map(function (t) {
      return '<button class="tab' + (view === t.id ? " active" : "") + '" data-act="tab" data-view="' + t.id + '" aria-label="' + t.label + '">' + icon(t.icon) + '<span>' + t.label + "</span></button>";
    }).join("");
  }
  function setChrome(isRoot) {
    document.body.classList.toggle("no-tabs", !isRoot);
    var tb = $("#tabbar");
    if (tb) { tb.innerHTML = tabbarHTML(); tb.style.display = isRoot ? "" : "none"; }
  }
  function render() {
    var rootViews = ["home", "study", "atlas", "quiz", "progress"];
    var isRoot = rootViews.indexOf(view) >= 0;
    var html = "";
    if (view === "home") html = homeView();
    else if (view === "study") html = studyView();
    else if (view === "chapter") html = chapterView(params.id);
    else if (view === "diagram") html = diagramView(params.id);
    else if (view === "atlas") html = atlasView();
    else if (view === "quiz") html = quizSetupView();
    else if (view === "session") html = sessionView();
    else if (view === "result") html = resultView();
    else if (view === "progress") html = progressView();
    else if (view === "systems") html = systemsView();
    else if (view === "cheatsheet") html = cheatsheetView();
    else html = homeView();
    var screen = $("#screen");
    screen.innerHTML = '<div class="view-enter">' + html + "</div>";
    setChrome(isRoot);
    if (isRoot) {
      // tabbar is outside #screen; redraw to reflect active state
      setTimeout(function () { var tb = $("#tabbar"); if (tb) tb.innerHTML = tabbarHTML(); }, 0);
    }
    if (view === "session" && session && S.prefs && S.prefs.autoRead && S.prefs.voice && !session.checked && session._autoReadIdx !== session.idx) {
      session._autoReadIdx = session.idx;
      setTimeout(function () {
        if (view === "session" && session && !session.checked) {
          var aq = currentQ();
          if (aq) speakText(questionSpeech(aq));
        }
      }, 550);
    }
  }
  function go(v, p, replace) {
    p = p || {};
    if (!replace) history.push({ view: view, params: params });
    view = v; params = p;
    closeSheet(true);
    render();
    window.scrollTo(0, 0);
  }
  function goTab(v) {
    history = [];
    view = v; params = {};
    closeSheet(true);
    render();
    window.scrollTo(0, 0);
  }
  function back() {
    if (overlayOpen) { closeSheet(); return true; }
    if (view === "session") { confirmExitQuiz(); return true; }
    if (history.length) {
      var h = history.pop();
      view = h.view; params = h.params || {};
      render();
      window.scrollTo(0, 0);
      return true;
    }
    if (view !== "home") { goTab("home"); return true; }
    return false;
  }
  window.appBack = function () {
    try { return back(); } catch (e) { return false; }
  };

  /* ---------------- toast / sheets ---------------- */
  var toastTimer = null;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function openSheet(inner, opts) {
    opts = opts || {};
    var ov = $("#overlay");
    ov.innerHTML = '<div class="overlay-bg" data-act="close-sheet"></div><div class="sheet">' + (opts.noHandle ? "" : '<div class="sheet-handle"></div>') + inner + "</div>";
    ov.classList.add("show");
    overlayOpen = true;
    document.body.style.overflow = "hidden";
  }
  function closeSheet(silent) {
    var ov = $("#overlay");
    if (!overlayOpen && !viewer) return;
    ov.classList.remove("show");
    ov.innerHTML = "";
    overlayOpen = false;
    viewer = null;
    document.body.style.overflow = "";
    if (!silent) { /* nothing */ }
  }

  /* ---------------- ring ---------------- */
  function ringHTML(pct, size, cls) {
    size = size || 80;
    var r = 33, c = 2 * Math.PI * r;
    var off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<div class="' + (cls || "ring") + '" style="width:' + size + 'px;height:' + size + 'px">' +
      '<svg viewBox="0 0 80 80"><circle class="ring-bg" cx="40" cy="40" r="' + r + '"></circle>' +
      '<circle class="ring-fg ' + (cls === "big-ring" ? "br-fg" : "") + '" cx="40" cy="40" r="' + r + '" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg>' +
      '<div class="ring-txt"><b>' + pct + '<small>%</small></b></div></div>';
  }

  /* ---------------- topbar ---------------- */
  function brandTop() {
    return '<header class="topbar"><div class="brand">' +
      '<div class="brand-mark"><span>A&amp;P</span></div>' +
      '<div class="brand-copy"><div class="brand-name">解剖生理學</div><div class="brand-sub">Study Atlas</div></div>' +
      '</div><div class="top-actions">' +
      '<div class="streak">' + icon("flame") + '<span>' + (streak() || 0) + ' 日</span></div>' +
      soundButtonHTML() +
      '<button class="icon-btn" data-act="tab" data-view="study" aria-label="搜尋">' + icon("search") + '</button>' +
      '</div></header>';
  }
  function pageHeader(title, sub, backAct) {
    return '<header class="topbar"><div class="brand">' +
      '<button class="icon-btn" data-act="back" aria-label="返回">' + icon("back") + '</button>' +
      '<div class="brand-copy"><div class="brand-name">' + esc(title) + '</div>' + (sub ? '<div class="brand-sub">' + esc(sub) + "</div>" : "") + '</div></div>' +
      '<div class="top-actions">' + soundButtonHTML() + (backAct || "") + '</div></header>';
  }

  /* ============================================================
     HOME
     ============================================================ */
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }
  function installTipHTML() {
    if (!isIOS() || window.navigator.standalone) return "";
    try { if (localStorage.getItem("ap_hide_ios_tip") === "1") return ""; } catch (e) {}
    return '<div class="install-tip"><span class="it-ico">' + icon("plus") + '</span><div><b>加到 iPhone 主畫面</b><p>Safari 下方按「分享」→「加入主畫面」，就可以全螢幕、離線使用。</p></div><button class="it-close" data-act="hide-ios-tip" aria-label="關閉提示">×</button></div>';
  }
  function homeView() {
    var hour = new Date().getHours();
    var hi = hour < 12 ? "早晨" : hour < 18 ? "午安" : "晚上";
    var om = overallMastery();
    var l1 = questionsOf(1).length, l2 = questionsOf(2).length, l3 = questionsOf(3).length;
    var read = readCount();
    return brandTop() +
      '<section class="hero">' +
        '<div class="eyebrow">Anatomy &amp; Physiology · 19 章</div>' +
        '<h1>今日，讀懂<br><em>自己的身體。</em></h1>' +
        '<p>' + hi + '。由細胞到感官，把構造、功能與考試陷阱一次過串連起來。</p>' +
        heroArt() +
      '</section>' +
      installTipHTML() +
      '<div class="home-body">' +
        '<div class="progress-card">' +
          '<div class="pc-top">' +
            ringHTML(om, 76) +
            '<div class="pc-copy"><div class="pc-kicker">整體掌握度</div><h3>' + (om < 20 ? "由第一章開始" : om < 60 ? "穩步前進" : om < 85 ? "接近掌握" : "狀態大勇") + '</h3><p>已完成 ' + read + " / " + CH.length + ' 章 · 累積 ' + totalAnswered() + ' 題</p></div>' +
          '</div>' +
          '<div class="pc-bar"><i style="width:' + om + '%"></i></div>' +
          '<div class="pc-foot"><span>' + (om >= 100 ? "全部章節已掌握，保持溫習！" : "距離全面掌握還有 " + (100 - om) + "%") + '</span><button data-act="continue">' + (read ? "繼續溫習" : "開始第一章") + icon("arrow", "icon") + '</button></div>' +
        '</div>' +
        '<div class="section-head"><h2>選擇程度</h2><span class="link" data-act="tab" data-view="quiz">全部題型 ' + QS.length + " 題</span></div>" +
        '<div class="level-grid">' +
          levelCard(1, l1, "辨認構造與功能") +
          levelCard(2, l2, "比較、次序與應用") +
          levelCard(3, l3, "個案與跨章整合") +
        '</div>' +
      '</div>' +
      '<div class="section-head"><h2>系統地圖</h2><span class="link" data-act="open-systems">全部 ' + SYSTEMS.length + " 個系統 " + icon("chevron", "icon") + '</span></div>' +
      '<div class="system-scroll">' + SYSTEMS.slice(0, 7).map(systemTile).join("") + '</div>' +
      '<div class="home-body">' +
        '<div class="daily-card">' +
          '<div class="dc-top"><span class="pill pill-coral">' + icon("spark", "icon") + ' 今日 5 分鐘</span></div>' +
          '<h3>隨機 5 題，喚醒記憶</h3>' +
          '<p>' + (todayCount() ? "今日已答 " + todayCount() + " 題。再來一組，鞏固短期記憶。" : "未開始今日的溫習。用 5 題快速檢查自己的狀態。") + '</p>' +
          '<button class="pill pill-teal" data-act="start-daily">開始 ' + icon("arrow", "icon") + '</button>' +
          '<button class="dc-arrow" data-act="start-daily" aria-label="開始今日五題">' + icon("arrow") + '</button>' +
        '</div>' +
        '<button class="cheat-strip" data-act="open-cheatsheet" style="width:100%;text-align:left">' +
          '<span class="cs-icon">' + icon("target") + '</span><span><h3>考前速覽</h3><p>數字、方向詞、易混淆配對、必背次序</p></span>' + icon("chevron") +
        '</button>' +
        '<button class="cheat-strip" data-act="tab" data-view="atlas" style="width:100%;text-align:left;margin-top:9px">' +
          '<span class="cs-icon" style="background:var(--sage);color:var(--teal)">' + icon("body") + '</span><span><h3>互動構造圖 · 看圖找構造</h3><p>14 幅圖 · 點擊器官 · 5 題指認測驗</p></span>' + icon("chevron") +
        '</button>' +
      '</div>';
  }
  function heroArt() {
    return '<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 200 230" fill="none" stroke="#162B2A" stroke-width="1.1" stroke-linecap="round">' +
      '<circle cx="102" cy="38" r="22" opacity=".22"/>' +
      '<path d="M102 60v18M78 92c8-9 16-13 24-13s16 4 24 13" opacity=".22"/>' +
      '<path d="M78 92c-10 20-13 48-10 76 3 25 10 41 19 49M126 92c10 20 13 48 10 76-3 25-10 41-19 49" opacity=".18"/>' +
      '<path d="M88 105c8 5 20 5 28 0M86 120c10 6 22 6 32 0M86 136c10 6 22 6 32 0M88 152c8 5 20 5 28 0" opacity=".14"/>' +
      '<path d="M102 100v102" opacity=".18"/>' +
      '<path d="M102 116s-17-9-17-20a8 8 0 0 1 17-2 8 8 0 0 1 17 2c0 11-17 20-17 20z" fill="#D1624B" fill-opacity=".22" stroke="#D1624B" stroke-opacity=".55"/>' +
      '<path d="M88 113c-7 10-10 26-9 42M116 113c7 10 10 26 9 42" stroke="#0E4B4A" stroke-opacity=".18"/>' +
      '</svg></div>';
  }
  function levelCard(level, count, desc) {
    return '<button class="level-card lv' + level + '" data-act="start-level" data-level="' + level + '" data-home="1">' +
      '<div><div class="lv-no">0' + level + '</div><h3>' + difficultyName(level) + '</h3><p>' + desc + '</p></div>' +
      '<div class="lv-foot"><span>' + count + ' 題</span>' + icon("arrow") + '</div></button>';
  }
  function systemTile(s) {
    return '<button class="system-tile" data-act="open-system" data-id="' + s.id + '" style="--tone:' + s.tone + '">' +
      '<div class="sys-ico">' + icon(s.icon) + '</div>' +
      '<div><h3>' + esc(s.name) + '</h3><p>' + esc(s.en) + '</p></div>' +
      '<span class="sys-count">' + String(s.chapters.length).padStart(2, "0") + '</span></button>';
  }

  /* ============================================================
     STUDY
     ============================================================ */
  function studyView() {
    return brandTop() +
      '<div class="page-head" style="display:block;padding-bottom:0"><div style="display:flex;align-items:flex-end;justify-content:space-between;gap:10px"><div><h1 class="page-title">學習地圖</h1><p class="page-sub">已完成 ' + readCount() + " / " + CH.length + ' 章 · 點入去睇重點、詞彙與圖鑑</p></div><span class="pill pill-teal">' + overallMastery() + '% 掌握</span></div></div>' +
      '<div class="search-box">' + icon("search") + '<input id="study-search" type="search" placeholder="搜尋章節、器官或英文名…" autocomplete="off" value="' + esc(studyQuery) + '"><button class="clear-search' + (studyQuery ? "" : " hidden") + '" data-act="clear-search">清除</button></div>' +
      '<div class="filter-row">' + ["全部"].concat(GROUPS.map(function (g) { return g.name; })).map(function (g) {
        return '<button class="chip' + (studyFilter === g ? " active" : "") + '" data-act="filter" data-group="' + g + '">' + g + "</button>";
      }).join("") + '</div>' +
      '<div id="study-list">' + studyListHTML() + '</div>';
  }
  function studyListHTML() {
    var q = studyQuery.trim().toLowerCase();
    var list = CH.filter(function (c) {
      if (studyFilter !== "全部" && c.group !== studyFilter) return false;
      if (!q) return true;
      var hay = [c.title, c.en, c.tagline, c.intro].concat((c.terms || []).map(function (t) { return t.zh + " " + t.en; })).join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    });
    if (!list.length) return '<div class="empty">' + icon("search") + '搵唔到相關章節。<br>試下其他關鍵字，或清除篩選。</div>';
    var html = "", last = "";
    list.forEach(function (c) {
      if (studyFilter === "全部" && !q && c.group !== last) {
        html += '<div class="group-label">' + esc(c.group) + "</div>";
        last = c.group;
      }
      html += chapterRow(c);
    });
    return (q ? '<div class="group-label">搜尋結果 · ' + list.length + ' 章</div>' : "") + html;
  }
  function chapterRow(c) {
    var gm = groupMeta(c.group);
    var m = chapterMastery(c.id);
    var st = S.stats[c.id] || { total: 0 };
    return '<button class="chapter-row' + (S.read[c.id] ? " done" : "") + '" data-act="open-chapter" data-id="' + c.id + '" style="--ch-tone:' + gm.tone + ";--ch-tint:" + gm.tint + '">' +
      '<span class="ch-no">' + String(c.num).padStart(2, "0") + '</span>' +
      '<span class="ch-icon">' + icon(CHAPTER_ICONS[c.id] || "book") + '</span>' +
      '<span class="ch-copy"><h3>' + esc(c.title) + '</h3><div class="ch-en">' + esc(c.en) + '</div>' +
      '<div class="ch-progress"><span class="bar"><i style="width:' + m + '%"></i></span><span>' + (st.total ? m + "%" : (S.read[c.id] ? "已讀" : "未開始")) + '</span></div></span>' +
      icon("chevron", "chev") + "</button>";
  }

  /* ============================================================
     CHAPTER
     ============================================================ */
  function chapterView(id) {
    var c = chapterById(id);
    if (!c) return pageHeader("找不到章節", "") + '<div class="empty">章節資料未載入。</div>';
    var gm = groupMeta(c.group);
    var m = chapterMastery(c.id);
    var qs = QS.filter(function (q) { return q.chId === c.id; });
    var terms = c.terms || [];
    var secs = c.sections || [];
    var atlasPages = (c.atlas || []).map(atlasByPage).filter(Boolean);
    var idx = CH.indexOf(c);
    var next = CH[idx + 1];
    var diag = diagramById(CHAPTER_DIAGRAM[c.id]);
    var html = '<div style="--ch-tone:' + gm.tone + ";--ch-tint:" + gm.tint + '">' +
      pageHeader("第 " + String(c.num).padStart(2, "0") + " 章", c.en) +
      '<section class="chapter-hero" style="--ch-tone:' + gm.tone + ";--ch-tint:" + gm.tint + '">' +
        '<div class="ch-kicker"><i></i>' + esc(c.group) + " · Chapter " + pad(c.num) + '</div>' +
        '<div class="ch-big">' + pad(c.num) + '</div>' +
        '<h1>' + esc(c.title) + '</h1>' +
        '<div class="ch-en">' + esc(c.en) + '</div>' +
        '<p class="ch-tagline">' + esc(c.tagline) + '</p>' +
        '<div class="ch-actions"><span class="pill">' + icon("target", "icon-sm") + ' ' + m + '% 掌握</span><span class="pill">' + icon("quiz", "icon-sm") + " " + qs.length + ' 題</span><span class="pill">' + icon("book", "icon-sm") + " " + terms.length + ' 詞彙</span><button class="ch-speak" data-act="speak-chapter" data-id="' + c.id + '" aria-label="朗讀本章">' + icon("volume") + '</button></div>' +
      '</section>' +
      '<div class="detail-body">' +
        '<button class="read-toggle' + (S.read[c.id] ? " on" : "") + '" data-act="toggle-read" data-id="' + c.id + '"><span class="rt-copy"><span class="rt-check">' + icon("check") + '</span><span><h3>' + (S.read[c.id] ? "已標記為讀完" : "標記為讀完") + '</h3><p>' + (S.read[c.id] ? "掌握度已加入已讀分數" : "讀完後，掌握度會計入已讀分") + '</p></span></span><span class="rt-label">' + (S.read[c.id] ? "完成" : "標記") + "</span></button>" +
        '<p style="font-size:12px;line-height:1.75;color:var(--ink-soft);margin:12px 2px 0">' + esc(c.intro) + "</p>" +
        (diag ? '<button class="diagram-link" data-act="open-diagram" data-id="' + diag.id + '"><span class="dl-ico">' + icon(diag.icon || "body") + '</span><span><b>互動構造圖：' + esc(diag.title) + '</b><span>點擊圖中 ' + diag.parts.length + ' 個構造，邊看邊記功能</span></span>' + icon("chevron") + '</button>' : "") +
        (c.memoryHook ? '<div class="hook"><span class="hook-ico">' + icon("spark") + '</span><div><h3>記憶鉤子</h3><p>' + esc(c.memoryHook) + "</p></div></div>" : "") +
        secs.map(function (s, i) { return sectionBlock(s, i, gm.tone, c.id); }).join("") +
        tipsBlock(c.examTips || [], c.id) +
        remedyBlock(c.remedies || []) +
        termsBlock(terms, c.id) +
        atlasMini(atlasPages) +
      '</div>' +
      '<div class="chapter-cta"><button class="btn btn-primary" data-act="chapter-quiz" data-id="' + c.id + '">' + icon("quiz", "icon-sm") + ' 測驗本章</button>' +
      (next ? '<button class="btn btn-ghost" data-act="open-chapter" data-id="' + next.id + '" aria-label="下一章" style="flex:0 0 48px;padding:0">' + icon("arrow") + "</button>" : "") +
      "</div></div>";
    return html;
  }
  function sectionBlock(s, i, tone, chId) {
    var table = "";
    if (s.table && s.table.headers && s.table.rows) {
      table = '<div class="data-table-wrap"><table class="data-table"><thead><tr>' + s.table.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        s.table.rows.map(function (r) { return "<tr>" + r.map(function (x) { return "<td>" + esc(x) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    }
    return '<section class="section-block" style="--ch-tone:' + tone + '"><h3><span class="sec-no">' + pad(i + 1) + '</span>' + esc(s.title) + '<button class="speak-btn" data-act="speak-section" data-ch="' + chId + '" data-sec="' + i + '" aria-label="朗讀本節">' + icon("volume", "icon-sm") + "</button></h3>" +
      '<ul class="point-list">' + (s.points || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" + table + "</section>";
  }
  function tipsBlock(tips, chId) {
    if (!tips.length) return "";
    return '<section class="tips-block"><h3>' + icon("target") + ' 考試必記位<button class="speak-btn" data-act="speak-tips" data-ch="' + chId + '" aria-label="朗讀考試必記位">' + icon("volume", "icon-sm") + "</button></h3>" +
      tips.map(function (t, i) { return '<div class="tip-item"><b>' + pad(i + 1) + "</b><span>" + esc(t) + "</span></div>"; }).join("") + "</section>";
  }
  function remedyBlock(rem) {
    if (!rem.length) return "";
    return '<section class="remedy-block"><h3>' + icon("pill") + ' 順勢療法連結</h3>' +
      rem.map(function (r) { return '<div class="remedy-row"><b>' + esc(r.name) + "</b><span>" + esc(r.note) + "</span></div>"; }).join("") + "</section>";
  }
  function termsBlock(terms, chId) {
    if (!terms.length) return "";
    return '<section class="terms-block"><div class="tb-head"><h2>本章詞彙</h2><span>' + terms.length + ' 個中英對照</span></div><div class="term-list">' +
      terms.map(function (t, i) { return '<div class="term-card"><div class="tc-top"><b>' + esc(t.zh) + '</b><span class="en">' + esc(t.en) + '</span><button class="speak-btn" data-act="speak-term" data-ch="' + chId + '" data-term="' + i + '" aria-label="朗讀詞彙">' + icon("volume", "icon-sm") + "</button></div><p>" + esc(t.def) + "</p></div>"; }).join("") + "</div></section>";
  }
  function atlasMini(pages) {
    if (!pages.length) return "";
    return '<section class="atlas-mini"><h2>本章圖鑑</h2><div class="atlas-mini-grid">' +
      pages.map(function (a) { return '<button class="atlas-mini-card' + (a.wide ? " wide" : "") + '" data-act="atlas-open" data-page="' + a.page + '"><img src="' + a.src + '" alt="' + esc(a.title) + '" loading="lazy"><span>P.' + a.page + "</span></button>"; }).join("") + "</div></section>";
  }
  function atlasByPage(n) { return ATLAS.find(function (a) { return Number(a.page) === Number(n); }); }


  /* ============================================================
     ATLAS
     ============================================================ */
  var atlasFilter = "全部";
  var atlasMode = "diagrams";
  function atlasView() {
    return brandTop() +
      '<div class="page-head" style="display:block;padding-bottom:0"><h1 class="page-title">圖鑑</h1><p class="page-sub">互動構造圖 · 課程圖頁 · 點擊學習</p></div>' +
      '<div class="atlas-switch"><button class="' + (atlasMode === "diagrams" ? "active" : "") + '" data-act="atlas-mode" data-mode="diagrams">互動構造圖</button><button class="' + (atlasMode === "pages" ? "active" : "") + '" data-act="atlas-mode" data-mode="pages">課程圖頁</button></div>' +
      (atlasMode === "diagrams" ? diagramListHTML() : courseAtlasHTML());
  }
  function diagramListHTML() {
    return '<p class="diagram-intro">3D 質感原創示意圖：點擊圖中任何構造或標籤，即時看名稱、英文與功能；可朗讀，也可以玩「看圖找構造」小測驗。圖中為中文標籤，下方有中英對照；心臟圖直接以中英雙語標示。</p>' +
      '<div class="diagram-list">' + DIAGRAMS.map(function (d) {
        return '<button class="diagram-card" data-act="open-diagram" data-id="' + d.id + '"><span class="dc-icon">' + icon(d.icon || "body") + '</span><span class="dc-copy"><h3>' + esc(d.title) + '</h3><div class="dc-en">' + esc(d.en) + '</div><p>' + esc(d.intro) + '</p><div class="dc-meta"><span class="pill">' + esc(d.tag) + '</span><span class="pill">' + d.parts.length + ' 個構造</span></div></span>' + icon("chevron") + '</button>';
      }).join("") + '</div>' +
      '<p class="atlas-note">互動圖是原創教學示意圖，並非臨床解剖圖；位置與比例經簡化，考試作答仍以課文描述為準。</p>';
  }
  function courseAtlasHTML() {
    var tags = ["全部"];
    ATLAS.forEach(function (a) { if (a.tag && tags.indexOf(a.tag) < 0) tags.push(a.tag); });
    var list = ATLAS.filter(function (a) { return atlasFilter === "全部" || a.tag === atlasFilter; });
    return '<div class="filter-row" style="padding-top:2px">' + tags.map(function (t) {
      return '<button class="chip' + (atlasFilter === t ? " active" : "") + '" data-act="atlas-filter" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("") + '</div>' +
      '<div class="atlas-grid">' + list.map(function (a) {
        return '<button class="atlas-card' + (a.wide ? " wide" : "") + '" data-act="atlas-open" data-page="' + a.page + '"><div class="ac-img"><img src="' + a.src + '" alt="' + esc(a.title) + '" loading="lazy"><span class="ac-zoom">' + icon("zoom", "icon-sm") + '</span></div><div class="ac-copy"><div class="ac-tag">' + esc(a.tag || "圖鑑") + ' · P.' + a.page + '</div><h3>' + esc(a.title) + "</h3></div></button>";
      }).join("") + '</div>' +
      '<p class="atlas-note">圖像取自課程《解剖學圖鑑》，僅供個人溫習使用。部分頁面保留原課程標題與版權字樣；如需轉載，請先取得課程機構授權。</p>';
  }
  var diagramState = null;
  var CHAPTER_DIAGRAM = { ch01: "cell", ch02: "skin", ch03: "digestive", ch04: "skeleton", ch09: "respiratory", ch10: "heart", ch13: "nephron", ch16: "brain", ch19: "eye" };
  function diagramById(id) { return DIAGRAMS.find(function (d) { return d.id === id; }); }
  function ensureDiagramState(d) {
    if (!diagramState || diagramState.id !== d.id) {
      diagramState = { id: d.id, selected: d.parts.length ? d.parts[0].id : null, labels: true, quiz: null };
    }
  }
  function diagramSVG(d) { return d.svg; }
  function diagramLegendHTML(d) {
    return '<div class="part-legend">' + d.parts.map(function (p, i) {
      return '<button data-act="diagram-part" data-part="' + p.id + '"><b>' + (i + 1) + '. ' + esc(p.name) + '</b><span>' + esc(p.en) + '</span></button>';
    }).join("") + '</div>';
  }
  function diagramView(id) {
    var d = diagramById(id);
    if (!d) return pageHeader("互動構造圖", "") + '<div class="empty">找不到這幅構造圖。</div>';
    ensureDiagramState(d);
    var q = diagramState.quiz;
    var hideLabels = !diagramState.labels || (q && !q.done);
    return pageHeader("互動構造圖", d.en) +
      '<div class="diagram-hero"><div class="eyebrow">3D 質感 · ' + esc(d.tag) + ' · Interactive diagram</div><h1>' + esc(d.title) + '</h1><div class="dh-en">' + esc(d.en) + '</div><p>' + esc(d.intro) + '</p></div>' +
      '<div class="diagram-stage-wrap"><div id="diagram-quiz-slot">' + diagramQuizHTML(d) + '</div><div class="diagram-stage' + (hideLabels ? " labels-hidden" : "") + '" id="diagram-stage">' + diagramSVG(d) + '</div></div>' +
      '<div class="diagram-tools"><button class="chip' + (diagramState.labels ? " on" : "") + '" id="diagram-label-btn" data-act="diagram-labels">' + (diagramState.labels ? "隱藏標籤" : "顯示標籤") + '</button>' +
      (q ? '<button class="chip" data-act="diagram-quiz-exit">退出測驗</button>' : '<button class="chip" data-act="diagram-quiz-start">看圖找構造</button>') +
      '<button class="chip" data-act="stop-speech">停止朗讀</button></div>' +
      '<div id="diagram-info">' + diagramInfoHTML(d) + '</div>' +
      (q ? "" : diagramLegendHTML(d)) +
      '<p class="atlas-note">3D 質感原創教學圖，位置與比例經簡化；考試作答以課文描述為準。</p>';
  }
  function selectedDiagramPart(d) {
    if (!diagramState || !diagramState.selected) return null;
    return d.parts.find(function (p) { return p.id === diagramState.selected; }) || null;
  }
  function diagramInfoHTML(d) {
    var p = selectedDiagramPart(d);
    if (!p) return '<div class="diagram-info"><h3>點擊圖中的構造</h3><p>點擊器官、組織或標籤，就會顯示名稱、英文與功能；也可以按「朗讀」。 </p></div>';
    return '<div class="diagram-info"><div class="di-top"><div><h3>' + esc(p.name) + '</h3><div class="di-en">' + esc(p.en) + '</div></div><button class="speak-btn" data-act="speak-diagram-selected" data-id="' + d.id + '" aria-label="朗讀這個構造">' + icon("volume", "icon-sm") + '</button></div><p>' + esc(p.desc) + '</p></div>';
  }
  function diagramQuizHTML(d) {
    var q = diagramState && diagramState.quiz;
    if (!q) return "";
    if (q.done) {
      var msg = q.score >= 4 ? "好穩！你已經認得大部分構造。" : q.score >= 3 ? "不錯，再認一次錯的構造。" : "建議先顯示標籤，逐個點一次，再重玩。";
      return '<div class="diagram-quizbar ' + (q.score >= 3 ? "good" : "bad") + '"><div class="dq-top"><span class="pill">完成</span></div><h3>答對 ' + q.score + ' / ' + q.queue.length + '</h3><p>' + msg + '</p><div class="dq-next"><button class="btn btn-primary btn-sm" data-act="diagram-quiz-start">再玩一次</button> <button class="btn btn-soft btn-sm" data-act="diagram-quiz-exit">退出測驗</button></div></div>';
    }
    var target = d.parts.find(function (p) { return p.id === q.target; });
    var body = q.answered
      ? '<p><b>' + (q.correct ? "答對！" : "答錯，正確是「" + esc(target.name) + "」。") + '</b> ' + esc(target.desc) + '</p><div class="dq-next"><button class="btn ' + (q.correct ? "btn-primary" : "btn-coral") + ' btn-sm" data-act="diagram-quiz-next">' + (q.idx + 1 >= q.queue.length ? "看成績" : "下一題") + '</button></div>'
      : '<p>在圖中點擊你認為正確的構造。</p>';
    return '<div class="diagram-quizbar ' + (q.answered ? (q.correct ? "good" : "bad") : "") + '"><div class="dq-top"><span class="pill">第 ' + (q.idx + 1) + ' / ' + q.queue.length + ' 題</span><button class="speak-btn" data-act="speak-diagram-target" data-id="' + d.id + '" aria-label="朗讀題目">' + icon("volume", "icon-sm") + '</button></div><h3>請點擊：' + esc(target.name) + '</h3>' + body + '</div>';
  }
  function updateDiagramDOM() {
    var stage = $("#diagram-stage"); if (!stage) return;
    var d = diagramById(diagramState.id); if (!d) return;
    var q = diagramState.quiz;
    $$("[data-part]", stage).forEach(function (el) {
      var id = el.getAttribute("data-part");
      el.classList.toggle("active", id === diagramState.selected);
      el.classList.toggle("correct", !!(q && q.answered && id === q.target));
      el.classList.toggle("wrong", !!(q && q.answered && id === q.selected && !q.correct));
    });
    $$(".part-legend [data-part]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-part") === diagramState.selected);
    });
  }
  function renderDiagramInfo() {
    var d = diagramById(diagramState.id); if (!d) return;
    var box = $("#diagram-info"); if (box) box.innerHTML = diagramInfoHTML(d);
  }
  function renderDiagramQuiz() {
    var d = diagramById(diagramState.id); if (!d) return;
    var slot = $("#diagram-quiz-slot"); if (slot) slot.innerHTML = diagramQuizHTML(d);
  }
  function diagramPartClick(partId) {
    var d = diagramById(diagramState.id); if (!d) return;
    var q = diagramState.quiz;
    if (q && !q.done) {
      if (q.answered) return;
      q.answered = true;
      q.selected = partId;
      q.correct = (partId === q.target);
      if (q.correct) q.score += 1;
      playSfx(q.correct ? "correct" : "wrong");
      diagramState.selected = q.target;
      updateDiagramDOM(); renderDiagramInfo(); renderDiagramQuiz();
      return;
    }
    diagramState.selected = partId;
    updateDiagramDOM(); renderDiagramInfo();
  }
  function startDiagramQuiz(id) {
    var d = diagramById(id); if (!d) return;
    var queue = shuffle(d.parts.map(function (p) { return p.id; })).slice(0, 5);
    diagramState.quiz = { queue: queue, idx: 0, score: 0, answered: false, selected: null, target: queue[0], done: false };
    diagramState.labels = false;
    diagramState.selected = null;
    render(); window.scrollTo(0, 0);
  }
  function nextDiagramQuestion() {
    var d = diagramById(diagramState.id); if (!d) return;
    var q = diagramState.quiz; if (!q) return;
    if (q.idx + 1 >= q.queue.length) { q.done = true; q.answered = false; q.selected = null; }
    else { q.idx += 1; q.target = q.queue[q.idx]; q.answered = false; q.selected = null; q.correct = false; }
    render();
  }
  function exitDiagramQuiz() {
    var d = diagramById(diagramState.id); if (!d) return;
    diagramState.quiz = null; diagramState.labels = true; diagramState.selected = d.parts[0].id;
    render();
  }
  function speakDiagramSelected() {
    var d = diagramById(diagramState.id); var p = selectedDiagramPart(d);
    if (p) speakText(p.name + "。" + p.en + "。" + p.desc);
  }
  function speakDiagramTarget() {
    var d = diagramById(diagramState.id); var q = diagramState.quiz;
    if (q && !q.done) {
      var t = d.parts.find(function (p) { return p.id === q.target; });
      if (t) speakText("請點擊：" + t.name + "。");
    } else speakDiagramSelected();
  }
  function openAtlas(page) {
    var a = atlasByPage(page);
    if (!a) return;
    viewer = { a: a, scale: 1, x: 0, y: 0, pointers: {}, startDist: 0, startScale: 1, startX: 0, startY: 0, dragX: 0, dragY: 0, dragging: false };
    var ov = $("#overlay");
    ov.innerHTML = '<div class="atlas-viewer"><div class="av-top"><div class="av-title">' + esc(a.title) + '</div><button class="av-close" data-act="atlas-close" aria-label="關閉">' + icon("close") + '</button></div>' +
      '<div class="av-stage" id="av-stage"><img id="av-img" src="' + a.src + '" alt="' + esc(a.title) + '"></div>' +
      '<div class="av-cap">' + esc(a.caption || a.title) + '</div>' +
      '<div class="av-controls"><button data-act="atlas-zoom-out" aria-label="縮小">−</button><button data-act="atlas-reset" aria-label="重設">' + icon("refresh", "icon-sm") + '</button><button data-act="atlas-zoom-in" aria-label="放大">+</button><span id="av-zoom">100%</span></div>' +
      '<div class="av-hint">雙指縮放 · 拖動平移</div></div>';
    ov.classList.add("show");
    overlayOpen = true;
    document.body.style.overflow = "hidden";
    bindViewer();
    applyViewerTransform();
  }
  function bindViewer() {
    var stage = $("#av-stage");
    if (!stage || !viewer) return;
    var v = viewer;
    stage.addEventListener("pointerdown", function (e) {
      stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
      v.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var pts = Object.keys(v.pointers);
      if (pts.length === 1) {
        v.dragging = true; v.dragX = e.clientX; v.dragY = e.clientY; v.startX = v.x; v.startY = v.y;
      } else if (pts.length === 2) {
        v.dragging = false;
        var p = pts.map(function (k) { return v.pointers[k]; });
        v.startDist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        v.startScale = v.scale;
      }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!v.pointers[e.pointerId]) return;
      v.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var pts = Object.keys(v.pointers);
      if (pts.length === 2) {
        var p = pts.map(function (k) { return v.pointers[k]; });
        var d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        if (v.startDist > 0) v.scale = Math.max(1, Math.min(5, v.startScale * d / v.startDist));
        applyViewerTransform();
      } else if (v.dragging && v.scale > 1) {
        v.x = v.startX + (e.clientX - v.dragX);
        v.y = v.startY + (e.clientY - v.dragY);
        applyViewerTransform();
      }
    });
    function up(e) {
      delete v.pointers[e.pointerId];
      if (!Object.keys(v.pointers).length) v.dragging = false;
      if (v.scale <= 1) { v.x = 0; v.y = 0; applyViewerTransform(); }
    }
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("dblclick", function () {
      v.scale = v.scale > 2 ? 1 : 2.5;
      if (v.scale === 1) { v.x = 0; v.y = 0; }
      applyViewerTransform();
    });
  }
  function applyViewerTransform() {
    if (!viewer) return;
    var img = $("#av-img");
    if (img) img.style.transform = "translate(" + viewer.x + "px," + viewer.y + "px) scale(" + viewer.scale + ")";
    var z = $("#av-zoom");
    if (z) z.textContent = Math.round(viewer.scale * 100) + "%";
  }
  function viewerZoom(mult) {
    if (!viewer) return;
    viewer.scale = Math.max(1, Math.min(5, viewer.scale * mult));
    if (viewer.scale === 1) { viewer.x = 0; viewer.y = 0; }
    applyViewerTransform();
  }
  function viewerReset() {
    if (!viewer) return;
    viewer.scale = 1; viewer.x = 0; viewer.y = 0;
    applyViewerTransform();
  }

  /* ============================================================
     QUIZ SETUP
     ============================================================ */
  function quizSetupView() {
    var l1 = questionsOf(1).length, l2 = questionsOf(2).length, l3 = questionsOf(3).length;
    var wr = wrongIds().length;
    return brandTop() +
      '<div class="page-head" style="display:block"><h1 class="page-title">測驗</h1><p class="page-sub">由背誦到個案推理，分三個程度操練</p></div>' +
      '<section class="quiz-hero"><div class="eyebrow">Question Bank</div><h1>由你唔熟嘅位，<br>開始操。</h1><p>每題都有即時解析與課文出處；答錯會自動入錯題本。</p><div class="qh-stats"><div><b>' + QS.length + '</b><span>總題數</span></div><div><b>' + CH.length + '</b><span>章節</span></div><div><b>' + (totalAnswered() ? accuracy() + "%" : "—") + '</b><span>總正確率</span></div></div></section>' +
      '<div class="level-list">' +
        levelRow(1, l1, "辨認構造、配對功能、定義", "4 選 1 · 基礎鞏固") +
        levelRow(2, l2, "比較異同、次序、概念應用", "4 選 1 / 多選 · 深入理解") +
        levelRow(3, l3, "短個案、跨章整合、多步推理", "個案 / 多選 · 考試實戰") +
      '</div>' +
      (wr ? '<div class="wrong-callout"><span class="wc-ico">' + icon("refresh") + '</span><div><h3>錯題本有 ' + wr + ' 題</h3><p>答對兩次會自動移除</p></div><button data-act="start-wrong">重練 ' + icon("arrow", "icon-sm") + '</button></div>' : "") +
      '<div class="setup-panel"><h3>測驗設定</h3>' +
        '<div class="select-wrap" style="margin-bottom:9px"><select id="setup-chapter" aria-label="選擇章節"><option value="all">全部章節</option>' +
          CH.map(function (c) { return '<option value="' + c.id + '"' + (setupChapter === c.id ? " selected" : "") + '>第 ' + pad(c.num) + ' 章 · ' + esc(c.title) + "</option>"; }).join("") + '</select>' + icon("chevron") + '</div>' +
        '<div class="segmented" id="count-seg"><button data-act="set-count" data-count="10" class="' + (setupCount === 10 ? "active" : "") + '">10 題</button><button data-act="set-count" data-count="20" class="' + (setupCount === 20 ? "active" : "") + '">20 題</button><button data-act="set-count" data-count="0" class="' + (setupCount === 0 ? "active" : "") + '">全部</button></div>' +
      '</div>' +
      '<div class="setup-foot"><button class="btn btn-primary btn-block" data-act="start-level" data-level="1">' + icon("spark", "icon-sm") + ' 由初階開始</button></div>' +
      '<p class="atlas-note" style="text-align:center">題目會隨機抽取；每次重新開始都會重新洗牌。</p>';
  }
  function levelRow(l, count, desc, meta) {
    var best = bestForLevel(l);
    return '<button class="level-row lv' + l + '" data-act="start-level" data-level="' + l + '"><span class="lr-no">0' + l + '</span><span class="lr-copy"><h3>' + difficultyName(l) + '</h3><p>' + desc + '</p><div class="lr-meta"><span>' + count + ' 題</span><span>·</span><span>' + meta + '</span>' + (best ? '<span>·</span><span>最佳 ' + best + '%</span>' : "") + '</div></span><span class="lr-go">' + icon("arrow") + '</span></button>';
  }

  /* ============================================================
     SESSION
     ============================================================ */
  function startLevel(level) {
    var chId = setupChapter !== "all" ? setupChapter : null;
    startSession({ mode: "level", level: level, chId: chId, count: setupCount });
  }
  function startSession(opts) {
    var pool = [];
    if (opts.mode === "wrong") {
      var ids = wrongIds();
      pool = QS.filter(function (q) { return ids.indexOf(q.id) >= 0; });
    } else if (opts.mode === "bookmark") {
      var bids = bookmarkIds();
      pool = QS.filter(function (q) { return bids.indexOf(q.id) >= 0; });
    } else if (opts.mode === "daily") {
      pool = QS.slice();
    } else if (opts.mode === "chapter") {
      pool = QS.filter(function (q) { return q.chId === opts.chId; });
    } else {
      pool = questionsOf(opts.level, opts.chId);
    }
    if (!pool.length) { toast("這個範圍暫時未有題目"); return; }
    var limit = opts.count === 0 ? pool.length : (opts.count || 10);
    if (opts.mode === "daily") limit = 5;
    var picked = shuffle(pool).slice(0, Math.min(limit, pool.length));
    session = {
      qs: picked, idx: 0, answers: [], selected: [], checked: false,
      config: opts, startedAt: nowMs(), level: opts.level || 0,
      origin: { view: view, params: params }
    };
    lastResult = null;
    go("session", {}, true);
  }
  function currentQ() { return session && session.qs[session.idx]; }
  function sessionView() {
    if (!session || !session.qs.length) return pageHeader("測驗", "") + '<div class="empty">沒有題目。</div>';
    var q = currentQ();
    var c = chapterById(q.chId);
    var total = session.qs.length;
    var pct = Math.round(session.idx / total * 100);
    var marked = !!S.bookmarks[q.id];
    return '<div class="quiz-shell"><div class="quiz-bar"><button class="q-close" data-act="exit-quiz" aria-label="離開測驗">' + icon("close") + '</button><div class="q-mid"><div class="q-label"><span>第 ' + (session.idx + 1) + " / " + total + ' 題</span><span>' + pct + '%</span></div><div class="q-bar"><i style="width:' + pct + '%"></i></div></div><button class="q-mark' + (marked ? " on" : "") + '" data-act="bookmark" aria-label="收藏題目">' + icon("bookmark") + '</button></div>' +
      '<div class="quiz-body"><div class="q-tags"><span class="pill pill-teal">' + esc(c ? c.title : "綜合") + '</span><span class="pill ' + (q.level === 3 ? "pill-coral" : q.level === 2 ? "pill-gold" : "") + '">' + difficultyName(q.level) + '</span><span class="pill">' + (q.type === "multi" ? "多選" : "單選") + '</span>' + (q.style === "case" ? '<span class="pill">個案</span>' : "") + (q.style === "remedy" ? '<span class="pill">療劑連結</span>' : "") + '<button class="speak-btn" data-act="speak-question" aria-label="朗讀題目">' + icon("volume", "icon-sm") + "</button></div>" +
      '<h1 class="q-text">' + esc(q.q) + '</h1>' +
      (q.type === "multi" ? '<div class="q-hint">' + icon("info") + ' 選出所有正確項</div>' : '<div class="q-hint">' + icon("info") + ' 選出最適合的一項</div>') +
      '<div class="options" id="options">' + q.options.map(function (o, i) {
        return '<button class="option" data-act="option" data-i="' + i + '"><span class="opt-key">' + letter(i) + '</span><span class="opt-text">' + esc(o) + '</span><span class="opt-check">' + icon("check", "icon-sm") + '</span></button>';
      }).join("") + '</div>' +
      '<div id="feedback-slot"></div>' +
      '<div class="quiz-actions"><button class="btn btn-primary btn-block" id="check-btn" data-act="check" disabled>確認答案</button></div></div></div>';
  }
  function optionClick(i) {
    if (!session || session.checked) return;
    var q = currentQ();
    var sel = session.selected.slice();
    if (q.type === "multi") {
      var at = sel.indexOf(i);
      if (at >= 0) sel.splice(at, 1); else sel.push(i);
    } else {
      sel = [i];
    }
    session.selected = sel;
    refreshOptions();
  }
  function refreshOptions() {
    if (!session) return;
    var q = currentQ();
    $$("#options .option").forEach(function (el, i) {
      el.classList.remove("selected", "correct", "wrong", "dim");
      var picked = session.selected.indexOf(i) >= 0;
      if (!session.checked && picked) el.classList.add("selected");
      if (session.checked) {
        var isAnswer = q.answer.indexOf(i) >= 0;
        if (isAnswer) el.classList.add("correct");
        else if (picked) el.classList.add("wrong");
        else el.classList.add("dim");
        el.disabled = true;
      }
    });
    var btn = $("#check-btn");
    if (btn && !session.checked) btn.disabled = session.selected.length === 0;
  }
  function checkAnswer() {
    if (!session || session.checked || !session.selected.length) return;
    var q = currentQ();
    var picked = session.selected.slice().sort(function (a, b) { return a - b; });
    var correct = sameSet(picked, q.answer);
    session.checked = true;
    session.answers.push({ q: q, selected: picked, correct: correct });
    recordAnswer(q, picked, correct);
    playSfx(correct ? "correct" : "wrong");
    if (S.prefs && S.prefs.autoRead && S.prefs.voice) {
      var spoken = (correct ? "答對。" : "答錯。正確答案是 " + answerLetters(q, q.answer) + "。") + q.explain;
      setTimeout(function () { speakText(spoken); }, 350);
    }
    refreshOptions();
    var slot = $("#feedback-slot");
    if (slot) slot.innerHTML = feedbackHTML(q, picked, correct);
    var act = $(".quiz-actions");
    if (act) act.innerHTML = '<button class="btn ' + (correct ? "btn-primary" : "btn-coral") + ' btn-block" data-act="next">' + (session.idx + 1 >= session.qs.length ? "查看結果" : "下一題") + " " + icon("arrow", "icon-sm") + "</button>";
    var fb = $("#feedback-slot");
    if (fb) setTimeout(function () { fb.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 80);
  }
  function feedbackHTML(q, picked, correct) {
    var right = q.answer.slice().sort(function (a, b) { return a - b; }).map(function (i) { return letter(i); }).join("、");
    return '<div class="feedback ' + (correct ? "good" : "bad") + '"><div class="fb-top">' + icon(correct ? "check" : "alert", "icon-sm") + (correct ? "答對" : "答錯，正確答案：" + right) + '<button class="speak-btn" data-act="speak-feedback" aria-label="朗讀解釋">' + icon("volume", "icon-sm") + "</button></div><p>" + esc(q.explain) + '</p><div class="fb-source">' + esc(q.source || "") + "</div></div>";
  }
  function recordAnswer(q, picked, correct) {
    var st = S.stats[q.chId] || { correct: 0, total: 0 };
    st.total += 1;
    if (correct) st.correct += 1;
    S.stats[q.chId] = st;
    var dk = todayKey();
    S.daily[dk] = (S.daily[dk] || 0) + 1;
    if (!correct) {
      var w = S.wrong[q.id] || { count: 0, right: 0 };
      w.count += 1; w.right = 0; w.ts = nowMs();
      S.wrong[q.id] = w;
    } else if (S.wrong[q.id]) {
      var x = S.wrong[q.id];
      x.right = (x.right || 0) + 1;
      if (x.right >= 2) delete S.wrong[q.id];
    }
    saveState();
  }
  function nextQuestion() {
    if (!session) return;
    if (session.idx + 1 >= session.qs.length) { finishSession(); return; }
    session.idx += 1;
    session.selected = [];
    session.checked = false;
    render();
    window.scrollTo(0, 0);
  }
  function finishSession() {
    if (!session) return;
    var correct = session.answers.filter(function (a) { return a.correct; }).length;
    var total = session.qs.length;
    var duration = Math.max(1, Math.round((nowMs() - session.startedAt) / 1000));
    var attempt = { ts: nowMs(), level: session.level, mode: session.config.mode, chId: session.config.chId || null, correct: correct, total: total, duration: duration };
    S.attempts.push(attempt);
    if (S.attempts.length > 120) S.attempts = S.attempts.slice(-120);
    saveState();
    lastResult = {
      correct: correct, total: total, duration: duration,
      config: session.config, level: session.level,
      items: session.answers.slice(),
      newWrong: session.answers.filter(function (a) { return !a.correct; }).length
    };
    session = null;
    go("result", {}, true);
    window.scrollTo(0, 0);
  }
  function confirmExitQuiz() {
    openSheet('<h2>離開測驗？</h2><p>已作答的題目會計入進度，但今次測驗不會完成。下次可以再由測驗頁重新開始。</p><div class="sheet-actions"><button class="btn btn-soft" data-act="close-sheet">繼續作答</button><button class="btn btn-coral" data-act="exit-quiz-confirm">離開</button></div>');
  }

  /* ============================================================
     RESULT
     ============================================================ */
  function resultView() {
    if (!lastResult) return pageHeader("測驗結果", "") + '<div class="empty">未有測驗記錄。<br><button class="btn btn-primary btn-sm" style="margin-top:12px" data-act="tab" data-view="quiz">去測驗</button></div>';
    var r = lastResult;
    var pct = Math.round(r.correct / r.total * 100);
    var good = pct >= 70;
    var c = r.items.length ? chapterById(r.items[0].q.chId) : null;
    var subtitle = r.config.mode === "wrong" ? "錯題重練" : r.config.mode === "daily" ? "今日 5 分鐘" : r.config.mode === "chapter" ? (c ? c.title : "本章測驗") : difficultyName(r.level) + "練習";
    var circ = 2 * Math.PI * 60;
    var off = circ * (1 - pct / 100);
    return '<div class="result-wrap"><div class="result-hero"><div class="eyebrow">RESULT · ' + esc(subtitle) + '</div><h1>' + (pct === 100 ? "全對，好穩。" : pct >= 80 ? "掌握得唔錯。" : pct >= 60 ? "基礎已有，補漏。" : "呢幾題要再溫。") + '</h1><p>' + (r.correct >= r.total ? "全部答對，繼續保持。" : "錯題已自動收入錯題本，答對兩次會移除。") + '</p></div>' +
      '<div class="big-ring"><svg viewBox="0 0 160 160"><circle class="br-bg" cx="80" cy="80" r="60"></circle><circle class="br-fg" cx="80" cy="80" r="60" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg><div class="br-txt"><b>' + pct + '%</b><span>答對 ' + r.correct + " / " + r.total + '</span></div></div>' +
      '<div class="result-stats"><div class="result-stat"><b>' + r.correct + '</b><span>答對</span></div><div class="result-stat"><b>' + r.newWrong + '</b><span>今次錯題</span></div><div class="result-stat"><b>' + fmtTime(r.duration) + '</b><span>用時</span></div></div>' +
      '<div class="result-msg ' + (good ? "" : "bad") + '">' + (good ? "已達到掌握水平。下一步：返回相關章節，補看解釋提到的概念，再挑戰下一個程度。" : "建議先回到相關章節，重看「考試必記位」與詞彙，再用錯題重練鞏固。") + '</div>' +
      '<div class="review-list">' + r.items.map(function (a, i) {
        var q = a.q;
        var your = a.selected.length ? answerLetters(q, a.selected) : "未答";
        var right = answerLetters(q, q.answer);
        return '<div class="review-item"><div class="review-head"><span class="rv-no ' + (a.correct ? "ok" : "no") + '">' + (a.correct ? "✓" : "✕") + '</span><p>' + (i + 1) + ". " + esc(q.q) + '</p></div><div class="review-body">你的答案：<b>' + your + '</b> · 正確：<b>' + right + '</b><br>' + esc(q.explain) + '</div></div>';
      }).join("") + '</div>' +
      '<div class="result-actions"><button class="btn btn-primary" data-act="retry">' + icon("refresh", "icon-sm") + ' 再練一次</button><button class="btn btn-ghost" data-act="tab" data-view="quiz">返回測驗</button></div></div>';
  }

  /* ============================================================
     PROGRESS
     ============================================================ */
  function exportProgressSheet() {
    var json = JSON.stringify(S);
    openSheet('<h2>匯出進度</h2><p>複製下面文字，傳到另一部手機（WhatsApp／Notes／AirDrop 均可），再用「匯入進度」貼上。只包含進度與錯題，不含個人資料。</p>' +
      '<textarea class="io-area" id="io-text" readonly>' + esc(json) + '</textarea>' +
      '<p class="io-note">Android APK 與 iPhone PWA 的進度是分開儲存的；用這個方法可以在兩部機之間搬移。</p>' +
      '<div class="sheet-actions"><button class="btn btn-soft" data-act="close-sheet">關閉</button><button class="btn btn-primary" data-act="copy-progress">複製進度</button></div>');
  }
  function importProgressSheet() {
    openSheet('<h2>匯入進度</h2><p>把另一部手機「匯出進度」的文字貼在下面，按「匯入」會覆蓋這部機目前的進度。</p>' +
      '<textarea class="io-area" id="io-text" placeholder="貼上進度 JSON…"></textarea>' +
      '<p class="io-note">請只貼上由本 App 匯出的文字；格式錯誤不會匯入。</p>' +
      '<div class="sheet-actions"><button class="btn btn-soft" data-act="close-sheet">取消</button><button class="btn btn-coral" data-act="apply-import">匯入</button></div>');
  }
  function copyProgress() {
    var ta = $("#io-text");
    if (!ta) return;
    ta.focus(); ta.select();
    function ok() { toast("已複製，可以貼到另一部機"); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(ok).catch(function () {
        try { document.execCommand("copy"); ok(); } catch (e) { toast("請長按文字手動複製"); }
      });
    } else {
      try { document.execCommand("copy"); ok(); } catch (e) { toast("請長按文字手動複製"); }
    }
  }
  function applyImport() {
    var ta = $("#io-text");
    if (!ta) return;
    var raw = ta.value.trim();
    if (!raw) { toast("請先貼上進度文字"); return; }
    var o;
    try { o = JSON.parse(raw); } catch (e) { toast("格式錯誤，未能匯入"); return; }
    if (!o || typeof o !== "object" || !o.stats || !o.read) { toast("這不是本 App 的進度格式"); return; }
    var f = freshState();
    ["read", "stats", "wrong", "bookmarks", "attempts", "daily"].forEach(function (k) {
      if (o[k] != null && typeof o[k] === "object") f[k] = o[k];
    });
    if (o.prefs && typeof o.prefs === "object") {
      ["voice", "sfx", "autoRead"].forEach(function (k) {
        if (typeof o.prefs[k] === "boolean") f.prefs[k] = o.prefs[k];
      });
    }
    f.createdAt = o.createdAt || f.createdAt;
    S = f; saveState(); closeSheet(true); render(); toast("進度已匯入");
  }
  function progressView() {
    var wr = wrongIds(), bm = bookmarkIds();
    return brandTop() +
      '<div class="page-head" style="display:block"><h1 class="page-title">我的進度</h1><p class="page-sub">' + masteredCount() + " / " + CH.length + ' 章已達掌握水平</p></div>' +
      '<div class="stat-grid">' +
        '<div class="stat-card dark"><div class="sc-top"><span>整體掌握度</span>' + icon("target") + '</div><b>' + overallMastery() + '%</b><span>已讀 ' + readCount() + " / " + CH.length + ' 章</span></div>' +
        '<div class="stat-card"><div class="sc-top"><span>累積答題</span>' + icon("quiz") + '</div><b>' + totalAnswered() + '</b><span>正確率 ' + (totalAnswered() ? accuracy() + "%" : "—") + '</span></div>' +
        '<div class="stat-card"><div class="sc-top"><span>連續溫習</span>' + icon("flame") + '</div><b>' + streak() + '</b><span>日 · 今日 ' + todayCount() + ' 題</span></div>' +
        '<div class="stat-card"><div class="sc-top"><span>錯題本</span>' + icon("refresh") + '</div><b>' + wr.length + '</b><span>題待鞏固</span></div>' +
      '</div>' +
      '<div class="progress-section"><h2>章節掌握度</h2>' + CH.map(function (c) {
        var m = chapterMastery(c.id);
        return '<div class="mastery-row"><span class="mr-no">' + pad(c.num) + '</span><div class="mr-copy"><div class="mr-top"><b>' + esc(c.title) + '</b><span>' + m + '%</span></div><div class="mr-bar"><i style="width:' + m + '%"></i></div></div></div>';
      }).join("") + '</div>' +
      (wr.length ? '<div class="progress-section"><h2>錯題本</h2>' + wr.slice(0, 4).map(function (id) {
        var q = QS.find(function (x) { return x.id === id; });
        if (!q) return "";
        var ch = chapterById(q.chId);
        return '<div class="term-card" style="margin-bottom:7px"><div class="tc-top"><b style="font-size:10.5px;line-height:1.5">' + esc(q.q) + '</b><span class="en">' + esc(ch ? ch.title : "") + '</span></div></div>';
      }).join("") + '<button class="btn btn-soft btn-block btn-sm" data-act="start-wrong">重練 ' + wr.length + ' 題 ' + icon("arrow", "icon-sm") + '</button></div>' : "") +
      (bm.length ? '<div class="progress-section"><h2>已收藏</h2>' + bm.slice(0, 4).map(function (id) {
        var q = QS.find(function (x) { return x.id === id; });
        return q ? '<div class="term-card" style="margin-bottom:7px"><div class="tc-top"><b style="font-size:10.5px;line-height:1.5">' + esc(q.q) + '</b><span class="en">收藏</span></div></div>' : "";
      }).join("") + '<button class="btn btn-soft btn-block btn-sm" data-act="start-bookmarks">練習收藏題 ' + icon("arrow", "icon-sm") + '</button></div>' : "") +
      '<div class="progress-section"><h2>聲音與朗讀</h2><p style="font-size:10px;line-height:1.65;color:var(--muted);margin:0 0 9px">朗讀章節、題目與解釋；答對／答錯有音效。可逐項開關。</p><button class="btn btn-soft btn-sm" data-act="sound-settings">調整聲音設定</button></div>' +
      '<div class="progress-section"><h2>跨裝置進度</h2><p style="font-size:10px;line-height:1.65;color:var(--muted);margin:0 0 9px">Android APK 與 iPhone PWA 的進度分開儲存；用匯出／匯入可以在兩部機之間搬移。</p><div class="result-actions"><button class="btn btn-soft btn-sm" data-act="export-progress">匯出進度</button><button class="btn btn-soft btn-sm" data-act="import-progress">匯入進度</button></div></div>' +
      '<p class="progress-note">進度、錯題與收藏只儲存在這部手機的瀏覽器儲存空間（localStorage）。移除 App 或清除資料會一併刪除。內容整理自你提供的課程課文與圖鑑，只供個人溫習，不取代正規課程與臨床判斷。</p>' +
      '<button class="danger-link" data-act="reset">重設所有進度</button>';
  }

  /* ============================================================
     SYSTEMS
     ============================================================ */
  function systemsView() {
    var focus = params.focus;
    return pageHeader("系統總覽", "12 個系統 · 功能與章節對照") +
      '<div class="page-head" style="display:block"><h1 class="page-title">系統總覽</h1><p class="page-sub">先記住每個系統「做咩」，再入章節記構造。</p></div>' +
      '<p class="systems-intro">人體系統不是獨立運作：神經與內分泌負責調節，心血管與呼吸合作供氧，消化與泌尿處理吸收與排泄。考試最常考「哪個構造負責哪個功能」與「哪個系統受影響」。</p>' +
      SYSTEMS.map(function (s) {
        return '<div class="sys-card' + (focus === s.id ? " focus" : "") + '" id="sys-' + s.id + '" style="--tone:' + s.tone + ";--tone-soft:" + s.soft + '"><div class="sys-big">' + icon(s.icon) + '</div><div style="flex:1;min-width:0"><h3>' + esc(s.name) + '<span>' + esc(s.en) + '</span></h3><p>' + esc(s.fn) + '</p><p style="margin-top:5px;color:var(--faint);font-size:9px">主要器官：' + esc(s.organs) + '</p><div class="sys-links">' + s.chapters.map(function (n) {
          var c = chapterByNum(n);
          return c ? '<button data-act="open-chapter" data-id="' + c.id + '">' + pad(n) + " " + esc(c.title) + '</button>' : "";
        }).join("") + '</div></div></div>';
      }).join("") +
      '<p class="atlas-note">系統劃分按課程章節整理；不同教材可能把免疫、淋巴或感官獨立分類。</p>';
  }

  /* ============================================================
     CHEAT SHEET
     ============================================================ */
  function cheatsheetView() {
    return pageHeader("考前速覽", "最後 10 分鐘") +
      '<div class="cheat-hero"><div class="eyebrow">Last-minute review</div><h1>考前速覽</h1><p>只放高頻、易混淆、值得最後再看一次的點。不要在此學新東西，用來啟動記憶。</p></div>' +
      CHEATSHEET.map(function (g) {
        return '<div class="cheat-group" style="--ch-tone:' + g.tone + '"><h2>' + icon(g.icon) + esc(g.title) + '</h2>' + g.items.map(function (t, i) {
          return '<div class="cheat-item"><b>' + pad(i + 1) + '</b><span>' + t + '</span></div>';
        }).join("") + '</div>';
      }).join("") +
      '<p class="atlas-note">速覽只覆蓋最常考的核心；完整解釋請回各章「考試必記位」與詞彙。</p>';
  }

  /* ============================================================
     CHAPTER QUIZ SHEET
     ============================================================ */
  var pendingChapter = null;
  function chapterQuizSheet(id) {
    var c = chapterById(id);
    if (!c) return;
    pendingChapter = id;
    var counts = [1, 2, 3].map(function (l) { return QS.filter(function (q) { return q.chId === id && q.level === l; }).length; });
    openSheet('<h2>' + esc(c.title) + ' · 測驗</h2><p>選擇程度。題目會由本章題庫隨機抽取；做完有逐題解析。</p>' +
      [1, 2, 3].map(function (l, i) {
        return '<button class="level-row lv' + l + '" style="width:100%;margin-bottom:8px" data-act="start-chapter-quiz" data-level="' + l + '"><span class="lr-no">0' + l + '</span><span class="lr-copy"><h3>' + difficultyName(l) + '</h3><p>' + (l === 1 ? "辨認構造與功能" : l === 2 ? "比較與應用" : "個案與整合") + '</p><div class="lr-meta"><span>' + counts[i] + ' 題</span></div></span><span class="lr-go">' + icon("arrow") + '</span></button>';
      }).join("") +
      '<button class="btn btn-soft btn-block" data-act="start-chapter-quiz" data-level="0">' + icon("layers", "icon-sm") + ' 混合程度（最多 10 題）</button>');
  }

  /* ============================================================
     EVENTS
     ============================================================ */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");
    if (act === "tab") { goTab(el.getAttribute("data-view")); return; }
    if (act === "back") { back(); return; }
    if (act === "open-chapter") { go("chapter", { id: el.getAttribute("data-id") }); return; }
    if (act === "chapter-quiz") { chapterQuizSheet(el.getAttribute("data-id")); return; }
    if (act === "start-chapter-quiz") {
      var lv = Number(el.getAttribute("data-level"));
      var chId = pendingChapter;
      closeSheet(true);
      if (lv === 0) startSession({ mode: "chapter", chId: chId, count: 10 });
      else startSession({ mode: "level", level: lv, chId: chId, count: 0 });
      return;
    }
    if (act === "toggle-read") {
      var cid = el.getAttribute("data-id");
      if (S.read[cid]) delete S.read[cid]; else S.read[cid] = true;
      saveState(); render(); toast(S.read[cid] ? "已標記為讀完" : "已取消已讀標記"); return;
    }
    if (act === "filter") { studyFilter = el.getAttribute("data-group"); render(); return; }
    if (act === "clear-search") { studyQuery = ""; render(); return; }
    if (act === "continue") {
      var next = CH.find(function (c) { return !S.read[c.id]; }) || CH.slice().sort(function (a, b) { return chapterMastery(a.id) - chapterMastery(b.id); })[0];
      if (next) go("chapter", { id: next.id }); return;
    }
    if (act === "start-level") { if (el.getAttribute("data-home")) setupChapter = "all"; startLevel(Number(el.getAttribute("data-level"))); return; }
    if (act === "start-daily") { startSession({ mode: "daily", count: 5 }); return; }
    if (act === "start-wrong") { startSession({ mode: "wrong", count: 0 }); return; }
    if (act === "start-bookmarks") { startSession({ mode: "bookmark", count: 0 }); return; }
    if (act === "set-count") { setupCount = Number(el.getAttribute("data-count")); render(); return; }
    if (act === "option") { optionClick(Number(el.getAttribute("data-i"))); return; }
    if (act === "check") { checkAnswer(); return; }
    if (act === "next") { nextQuestion(); return; }
    if (act === "bookmark") {
      var q = currentQ(); if (!q) return;
      if (S.bookmarks[q.id]) { delete S.bookmarks[q.id]; el.classList.remove("on"); toast("已取消收藏"); }
      else { S.bookmarks[q.id] = true; el.classList.add("on"); toast("已收藏"); }
      saveState(); return;
    }
    if (act === "exit-quiz") { confirmExitQuiz(); return; }
    if (act === "exit-quiz-confirm") {
      var origin = session ? session.origin : { view: "quiz", params: {} };
      closeSheet(true); session = null; go(origin.view, origin.params, true); return;
    }
    if (act === "close-sheet") { closeSheet(); return; }
    if (act === "retry") {
      if (!lastResult) { goTab("quiz"); return; }
      startSession(lastResult.config); return;
    }
    if (act === "open-systems") { go("systems", {}); return; }
    if (act === "open-system") { go("systems", { focus: el.getAttribute("data-id") }); return; }
    if (act === "open-cheatsheet") { go("cheatsheet", {}); return; }
    if (act === "atlas-mode") { atlasMode = el.getAttribute("data-mode"); render(); return; }
    if (act === "open-diagram") { diagramState = null; go("diagram", { id: el.getAttribute("data-id") }); return; }
    if (act === "diagram-part") { diagramPartClick(el.getAttribute("data-part")); return; }
    if (act === "diagram-labels") {
      if (diagramState && diagramState.quiz && !diagramState.quiz.done) { toast("測驗中先靠圖判斷，完成後才顯示標籤"); return; }
      if (!diagramState) return;
      diagramState.labels = !diagramState.labels;
      var stage = $("#diagram-stage"); if (stage) stage.classList.toggle("labels-hidden", !diagramState.labels);
      if (el) { el.classList.toggle("on", diagramState.labels); el.textContent = diagramState.labels ? "隱藏標籤" : "顯示標籤"; }
      return;
    }
    if (act === "diagram-quiz-start") { if (diagramState) startDiagramQuiz(diagramState.id); return; }
    if (act === "diagram-quiz-next") { nextDiagramQuestion(); return; }
    if (act === "diagram-quiz-exit") { exitDiagramQuiz(); return; }
    if (act === "speak-diagram-selected") { speakDiagramSelected(); return; }
    if (act === "speak-diagram-target") { speakDiagramTarget(); return; }
    if (act === "atlas-filter") { atlasFilter = el.getAttribute("data-tag"); render(); return; }
    if (act === "atlas-open") { openAtlas(Number(el.getAttribute("data-page"))); return; }
    if (act === "atlas-close") { closeSheet(); return; }
    if (act === "atlas-zoom-in") { viewerZoom(1.35); return; }
    if (act === "atlas-zoom-out") { viewerZoom(1 / 1.35); return; }
    if (act === "atlas-reset") { viewerReset(); return; }
    if (act === "sound-settings") { soundSettingsSheet(); return; }
    if (act === "toggle-pref") {
      var key = el.getAttribute("data-key");
      setPref(key, !(S.prefs && S.prefs[key]));
      updateSoundButtons();
      soundSettingsSheet(); return;
    }
    if (act === "test-sfx") { playSfx(el.getAttribute("data-kind")); return; }
    if (act === "test-voice") { speakText("歡迎使用解剖生理學溫習。祝你考試順利。"); return; }
    if (act === "check-canto") {
      var st = nativeVoiceStatus();
      if (st === "browser") toast("iPhone／PWA 會使用 Safari 的粵語語音（zh-HK）");
      else if (st === "cantonese" || st === "zh-HK") toast("已使用粵語語音：" + voiceStatusLabel());
      else if (st === "mandarin") toast("未安裝粵語，暫用台灣中文；請下載「中文（香港）」語音");
      else toast("未支援中文語音；請在系統設定安裝 TTS 語音");
      return;
    }
    if (act === "stop-speech") { stopSpeech(); toast("已停止朗讀"); return; }
    if (act === "speak-chapter") { if (speakChapter(el.getAttribute("data-id"))) el.classList.add("speaking"); return; }
    if (act === "speak-section") { if (speakSection(el.getAttribute("data-ch"), Number(el.getAttribute("data-sec")))) el.classList.add("speaking"); return; }
    if (act === "speak-tips") { if (speakTips(el.getAttribute("data-ch"))) el.classList.add("speaking"); return; }
    if (act === "speak-term") { if (speakTerm(el.getAttribute("data-ch"), Number(el.getAttribute("data-term")))) el.classList.add("speaking"); return; }
    if (act === "speak-question") { var qq = currentQ(); if (qq && speakText(questionSpeech(qq), el)) {} return; }
    if (act === "speak-feedback") { var qf = currentQ(); if (qf && speakText(qf.explain, el)) {} return; }
    if (act === "hide-ios-tip") {
      try { localStorage.setItem("ap_hide_ios_tip", "1"); } catch (e) {}
      render(); return;
    }
    if (act === "export-progress") { exportProgressSheet(); return; }
    if (act === "import-progress") { importProgressSheet(); return; }
    if (act === "copy-progress") { copyProgress(); return; }
    if (act === "apply-import") { applyImport(); return; }
    if (act === "reset") {
      openSheet('<h2>重設所有進度？</h2><p>已讀章節、答題記錄、錯題本與收藏都會清除。此動作無法復原。</p><div class="sheet-actions"><button class="btn btn-soft" data-act="close-sheet">取消</button><button class="btn btn-coral" data-act="confirm-reset">確定重設</button></div>');
      return;
    }
    if (act === "confirm-reset") {
      S = freshState(); saveState(); closeSheet(true); goTab("home"); toast("進度已重設"); return;
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "study-search") {
      studyQuery = e.target.value;
      var list = $("#study-list");
      if (list) list.innerHTML = studyListHTML();
      var clear = $(".clear-search");
      if (clear) clear.classList.toggle("hidden", !studyQuery);
    }
  });
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "setup-chapter") setupChapter = e.target.value;
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlayOpen) { closeSheet(); }
  });

  /* ---------------- start ---------------- */
  render();
  if (!CH.length) {
    setTimeout(function () { toast("內容載入中…"); }, 300);
  }

  /* PWA: cache the whole app for offline use on iPhone / Android browsers.
     Service workers are not available on file:// (the Android APK), so skip there. */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
