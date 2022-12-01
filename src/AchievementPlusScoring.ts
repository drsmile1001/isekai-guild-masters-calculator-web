import { Scoring } from "./Scoring"
import { useScoringStore } from "./ScoringStore"

export class AchievementPlusScoring implements Scoring {
  baseValue: number
  achievements: {
    indexType: string
    indexThreadhold: number
    score: number
  }[]

  scoring() {
    const globalIndex = useScoringStore().globalIndex
    return this.achievements
      .filter((a) => globalIndex.get(a.indexType) ?? 0 >= a.indexThreadhold)
      .map((a) => a.score)
      .reduce((total, score) => total + score, this.baseValue)
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
    this.baseValue = baseValue
    this.achievements = achievements
  }
}
