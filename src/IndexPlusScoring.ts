import { Scoring } from "./Scoring"
import { useScoringStore } from "./ScoringStore"

export class IndexPlusScoring implements Scoring {
  baseScore: number
  perPlusPointNeedIndexes: number
  indexType: string
  localIndex = 0

  get index() {
    return useScoringStore().globalIndex.get(this.indexType) ?? this.localIndex
  }

  set index(value: number) {
    if (useScoringStore().globalIndex.has(this.indexType)) {
      useScoringStore().globalIndex.set(this.indexType, value)
    } else {
      this.localIndex = value
    }
  }
  maxScore: number | null = null
  scoring() {
    const plusPoint = Math.floor(this.index / this.perPlusPointNeedIndexes)
    return (
      this.baseScore +
      (this.maxScore === null ? plusPoint : Math.min(plusPoint, this.maxScore!))
    )
  }

  constructor(
    public id: string,
    public title: string,
    baseScore: number,
    indexType: string,
    perPlusPointNeedIndexes: number,
    maxScore: number | null = null
  ) {
    this.baseScore = baseScore
    this.perPlusPointNeedIndexes = perPlusPointNeedIndexes
    this.indexType = indexType
    this.maxScore = maxScore
  }
}
