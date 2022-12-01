import { Scoring, IndexPlusScoring } from "./Scoring"

export interface ScoringCard {
  id: string
  title: string
  baseScore: number
  buildScoring: () => Scoring
}

export class IndexPlusScoringCard implements ScoringCard {
  id: string
  title: string
  baseScore: number
  indexName: string
  perPlusPointNeedIndexes: number
  maxScore: number | null

  constructor(
    id: string,
    title: string,
    baseScore: number,
    indexName: string,
    perPlusPointNeedIndexes: number,
    maxScore = null as number | null
  ) {
    this.id = id
    this.title = title
    this.baseScore = baseScore
    this.indexName = indexName
    this.perPlusPointNeedIndexes = perPlusPointNeedIndexes
    this.maxScore = maxScore
  }

  buildScoring(): IndexPlusScoring {
    const scoring = new IndexPlusScoring(
      this.id,
      this.title,
      this.baseScore,
      this.perPlusPointNeedIndexes,
      this.indexName,
      this.maxScore
    )
    return scoring
  }
}

export const scoringCards: ScoringCard[] = [
  new IndexPlusScoringCard("D-001", "異世界拉麵食堂", 1, "卡面上的冒險者", 2),
  new IndexPlusScoringCard("D-002", "老舊的放映機", 0, "桌面的事件卡", 3, 6),
  new IndexPlusScoringCard("D-003", "聖女親衛隊", 0, "深淵洞穴", 1),
  new IndexPlusScoringCard("D-004", "迷宮開拓村", 2, "卡面上的冒險者", 0.5),
  new IndexPlusScoringCard(
    "D-005",
    "吟遊詩人的傳唱",
    0,
    "生活商業零件之中持有數量最少的標記",
    1
  ),
  new IndexPlusScoringCard("D-006", "設立冒險者學校", 0, "迷宮板塊", 2),
  new IndexPlusScoringCard("E-002", "夏爾洛特 皇女", 1, "生活", 2),
  new IndexPlusScoringCard("E-003", "騎士公主 甘娜許", 1, "據點", 1),
  new IndexPlusScoringCard("E-004", "球形關節少女", 0, "零件", 2),
  new IndexPlusScoringCard("E-005", "人狼女王", 2, "力量", 3, 5),
  new IndexPlusScoringCard("E-006", "聖女馬卡龍", 1, "深淵洞穴", 0.5),
  new IndexPlusScoringCard("E-009", "傳奇旅行商人費蕾茲", 1, "商業", 2),
  new IndexPlusScoringCard("E-010", "勇者蘿謝特", 1, "迷宮板塊", 2),
  new IndexPlusScoringCard("E-011", "流浪魔女歐貝拉", 1, "藥水", 2, 5),
  new IndexPlusScoringCard("R-003", "地城保險", 1, "商業", 2),
  new IndexPlusScoringCard("R-014", "空白的百科全書", 1, "零件", 2),
  new IndexPlusScoringCard("R-013", "聖艾爾摩之火", 1, "生活", 2),
  new IndexPlusScoringCard("R-011", "今天公會也盛況空前！", 1, "迷宮板塊", 2),
]
