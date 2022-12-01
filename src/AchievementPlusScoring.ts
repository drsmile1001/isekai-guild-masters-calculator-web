import { Scoring } from "./Scoring"
import { useScoringStore } from "./ScoringStore"

export class AchievementPlusScoring implements Scoring {
  baseScore: number
  achievements: {
    indexType: string
    indexThreadhold: number
    score: number
  }[]

  scoring() {
    const globalIndex = useScoringStore().globalIndex
    return (
      this.baseScore +
      this.achievements
        .filter((a) => (globalIndex.get(a.indexType) ?? 0) >= a.indexThreadhold)
        .map((a) => a.score)
        .reduce((total, score) => total + score, 0)
    )
  }

  constructor(
    public id: string,
    public title: string,
    baseValue: number,
    achievements: {
      indexType: string
      indexThreadhold: number
      score: number
    }[]
  ) {
    this.baseScore = baseValue
    this.achievements = achievements
  }
}
