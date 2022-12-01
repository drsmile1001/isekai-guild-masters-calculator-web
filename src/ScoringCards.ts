import { ScoreBase, IndexPlusScoring } from "./Scoring"

export interface ScoringCard {
  id: string
  title: string
  baseScore: number
  buildScoring: () => ScoreBase
}

export class IndexPlusScoringCard implements ScoringCard {
  id: string
  title: string
  baseScore: number
  indexName: string
  perPlusPointNeedIndexes: number

  constructor(
    id: string,
    title: string,
    baseScore: number,
    indexName: string,
    perPlusPointNeedIndexes: number
  ) {
    this.id = id
    this.title = title
    this.baseScore = baseScore
    this.indexName = indexName
    this.perPlusPointNeedIndexes = perPlusPointNeedIndexes
  }

  buildScoring(): IndexPlusScoring {
    const scoring = new IndexPlusScoring(
      this.id,
      this.title,
      this.baseScore,
      this.perPlusPointNeedIndexes,
      this.indexName
    )
    return scoring
  }
}

export const scoringCards: ScoringCard[] = [
  new IndexPlusScoringCard("D-001", "異世界食堂", 1, "卡面上的冒險者", 2),
  new IndexPlusScoringCard("D-002", "老舊投影機", 0, "桌面的事件卡", 3),
  new IndexPlusScoringCard("D-003", "聖女親衛隊", 0, "深淵洞穴", 1),
  new IndexPlusScoringCard("D-004", "迷宮開拓村", 2, "卡面上的冒險者", 0.5),
  new IndexPlusScoringCard(
    "D-005",
    "吟遊詩人的敘事歌",
    0,
    "生活商業零件之中持有數量最少的標記",
    1
  ),
  new IndexPlusScoringCard("D-006", "設立冒險者學校", 0, "迷宮板塊", 2),
]
