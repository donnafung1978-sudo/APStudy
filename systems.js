/* 12 個人體系統的「一句功能 + 主要器官 + 對應章節」 */
window.SYSTEMS = [
  {
    id: "integumentary", name: "皮膚系統", en: "Integumentary", icon: "skin",
    tone: "#B06A45", soft: "#F0E0D2",
    fn: "身體最大的器官：屏障、體溫調節、維他命 D 合成、感覺與少量排泄。",
    organs: "表皮、真皮、皮下脂肪、毛髮、指甲、汗腺、皮脂腺",
    chapters: [2]
  },
  {
    id: "skeletal", name: "骨骼系統", en: "Skeletal", icon: "bone",
    tone: "#6E7B5A", soft: "#E6E9D9",
    fn: "支撐身體、保護內臟、作為肌肉槓桿、製造血球、儲存鈣與磷。",
    organs: "顱骨、脊柱、肋骨、骨盆、上肢骨、下肢骨、關節軟骨",
    chapters: [4, 5]
  },
  {
    id: "muscular", name: "肌肉系統", en: "Muscular", icon: "muscle",
    tone: "#A55445", soft: "#F2DDD6",
    fn: "產生動作、維持姿勢、穩定關節、產熱；心肌與平滑肌另有內臟功能。",
    organs: "骨骼肌、心肌、平滑肌、肌腱、筋膜",
    chapters: [6, 8]
  },
  {
    id: "nervous", name: "神經系統", en: "Nervous", icon: "brain",
    tone: "#4D6485", soft: "#DDE4EF",
    fn: "接收感覺、整合資訊、發出運動指令，並透過自主神經維持內環境穩定。",
    organs: "腦、脊髓、顱神經、脊神經、交感與副交感神經",
    chapters: [7, 16, 19]
  },
  {
    id: "endocrine", name: "內分泌系統", en: "Endocrine", icon: "thyroid",
    tone: "#8A5A7A", soft: "#EEDFEA",
    fn: "以荷爾蒙調節代謝、生長、壓力反應、水鹽平衡與生殖，多數走負回饋。",
    organs: "下丘腦、腦下垂體、甲狀腺、副甲狀腺、腎上腺、胰島、性腺",
    chapters: [15]
  },
  {
    id: "cardiovascular", name: "心血管系統", en: "Cardiovascular", icon: "heart",
    tone: "#A9483C", soft: "#F2D9D2",
    fn: "用血液運送氧氣、養分、荷爾蒙與廢物，並協助體溫調節與免疫防禦。",
    organs: "心臟、動脈、微血管、靜脈、血液",
    chapters: [10, 11]
  },
  {
    id: "respiratory", name: "呼吸系統", en: "Respiratory", icon: "lungs",
    tone: "#4B7C7B", soft: "#D9E8E5",
    fn: "在肺泡進行氧氣與二氧化碳交換，同時調節血液酸鹼值、發聲與嗅覺。",
    organs: "鼻腔、咽、喉、氣管、支氣管、肺、肺泡、橫膈膜",
    chapters: [9]
  },
  {
    id: "digestive", name: "消化系統", en: "Digestive", icon: "stomach",
    tone: "#B07A3D", soft: "#F1E4CE",
    fn: "攝入、機械與化學消化、吸收養分與水，最後排出不能消化的殘餘物。",
    organs: "口腔、食道、胃、小腸、大腸、肝、膽囊、胰",
    chapters: [3, 14]
  },
  {
    id: "urinary", name: "泌尿系統", en: "Urinary", icon: "kidney",
    tone: "#6A5A8E", soft: "#E6E1F0",
    fn: "濾過血液、製造尿液、排出代謝廢物，調節水、電解質、酸鹼與血壓。",
    organs: "腎臟、腎元、輸尿管、膀胱、尿道",
    chapters: [13]
  },
  {
    id: "immune", name: "免疫與淋巴系統", en: "Immune & Lymphatic", icon: "shield",
    tone: "#4F7A55", soft: "#DDEADD",
    fn: "辨認並清除病原體與異常細胞；回收組織液，並在腸道吸收脂肪。",
    organs: "淋巴管、淋巴結、脾、胸腺、扁桃腺、MALT、B/T 淋巴細胞",
    chapters: [12]
  },
  {
    id: "reproductive", name: "生殖系統", en: "Reproductive", icon: "reproductive",
    tone: "#9A5B68", soft: "#F0DDE2",
    fn: "製造配子、產生性荷爾蒙、運送配子，並在女性體內支持受精、著床與發育。",
    organs: "睪丸、附睪、輸精管、前列腺；卵巢、輸卵管、子宮、陰道",
    chapters: [17, 18]
  },
  {
    id: "sensory", name: "特殊感官", en: "Special Senses", icon: "eye",
    tone: "#4E6D8A", soft: "#DCE5EE",
    fn: "視覺、聽覺、平衡、嗅覺與味覺，把外界刺激轉成神經訊號。",
    organs: "眼、耳、耳蝸、半規管、鼻、舌",
    chapters: [19]
  }
];
