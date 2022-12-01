import { AchievementPlusScoring } from "./AchievementPlusScoring"
import { IndexPlusScoring } from "./IndexPlusScoring"
import { Scoring } from "./Scoring"

export const scoringCards: Scoring[] = [
  new IndexPlusScoring("D-001", "異世界拉麵食堂", 1, "卡面上的冒險者", 2),
  new IndexPlusScoring("D-002", "老舊的放映機", 0, "桌面的事件卡", 3, 6),
  new IndexPlusScoring("D-003", "聖女親衛隊", 0, "深淵洞穴", 1),
  new IndexPlusScoring("D-004", "迷宮開拓村", 2, "卡面上的冒險者", 0.5),
  new IndexPlusScoring(
    "D-005",
    "吟遊詩人的傳唱",
    0,
    "生活商業零件之中持有數量最少的標記",
    1
  ),
  new IndexPlusScoring("D-006", "設立冒險者學校", 0, "迷宮板塊", 2),
  new AchievementPlusScoring("D-007", "迷宮祕寶館", 1, [
    { indexType: "廢品標籤", indexThreadhold: 5, score: 2 },
    { indexType: "桌面的事件卡", indexThreadhold: 12, score: 2 },
  ]),
  new AchievementPlusScoring("D-008", "流浪商隊", 1, [
    { indexType: "人物標籤", indexThreadhold: 2, score: 2 },
    { indexType: "商業標籤", indexThreadhold: 5, score: 2 },
  ]),
  new IndexPlusScoring("E-002", "夏爾洛特 皇女", 1, "生活標籤", 2),
  new IndexPlusScoring("E-003", "騎士公主 甘娜許", 1, "據點", 1),
  new IndexPlusScoring("E-004", "球形關節少女", 0, "廢品標籤", 2),
  new IndexPlusScoring("E-005", "人狼女王", 2, "力量", 3, 5),
  new IndexPlusScoring("E-006", "聖女馬卡龍", 1, "深淵洞穴", 0.5),
  new IndexPlusScoring("E-009", "傳奇旅行商人費蕾茲", 1, "商業標籤", 2),
  new IndexPlusScoring("E-010", "勇者蘿謝特", 1, "迷宮板塊", 2),
  new IndexPlusScoring("E-011", "流浪魔女歐貝拉", 1, "藥水", 2, 5),
  new IndexPlusScoring("R-003", "地城保險", 1, "商業標籤", 2),
  new IndexPlusScoring("R-014", "空白的百科全書", 1, "廢品標籤", 2),
  new IndexPlusScoring("R-013", "聖艾爾摩之火", 1, "生活標籤", 2),
  new IndexPlusScoring("R-011", "今天公會也盛況空前！", 1, "迷宮板塊", 2),
]
