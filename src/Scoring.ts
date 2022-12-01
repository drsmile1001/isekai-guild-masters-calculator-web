import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { scoringCards } from "./ScoringCards"

export const useScoringStore = defineStore("scoring", () => {
  const scorings = ref<Scoring[]>([
    new FixScoring("事件卡"),
    new FixScoring("王權"),
    new FixScoring("寶藏"),
    new FixScoring("地圖板塊"),
    new FixScoring("地圖格"),
    new FixScoring("看板娘"),
  ])

  function getTotalScore() {
    return scorings.value.reduce(
      (total, scoring) => total + scoring.scoring(),
      0
    )
  }

  function addScoring(id: string) {
    const card = scoringCards.find((card) => card.id === id)
    if (!card) return
    const scoring = card.buildScoring()
    scorings.value.push(scoring)
  }

  function removeScoring(scoring: Scoring) {
    scorings.value = scorings.value.filter((s) => s.id !== scoring.id)
  }

  const totalScore = computed(() => getTotalScore())

  return {
    scorings,
    getTotalScore,
    totalScore,
    removeScoring,
    addScoring,
  }
})

export interface Scoring {
  id: string
  title: string
  scoring: () => number
}

export class FixScoring implements Scoring {
  id: string
  score = 0
  scoring() {
    return this.score
  }
  constructor(public title: string) {
    this.id = title
  }
}

export class IndexPlusScoring implements Scoring {
  baseScore: number
  perPlusPointNeedIndexes: number
  indexType: string
  index = 0
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
    perPlusPointNeedIndexes: number,
    indexType: string,
    maxScore: number | null = null
  ) {
    this.baseScore = baseScore
    this.perPlusPointNeedIndexes = perPlusPointNeedIndexes
    this.indexType = indexType
    this.maxScore = maxScore
  }
}

export class AchievementPlusScoring implements Scoring {
  baseValue: number
  achievements = ref<
    {
      title: string
      score: number
      done: boolean
    }[]
  >([])

  scoring() {
    const doneAchievements = this.achievements.value.filter(
      (achievement) => achievement.done
    )
    return (
      this.baseValue +
      doneAchievements.reduce(
        (total, achievement) => achievement.score + total,
        0
      )
    )
  }

  constructor(public id: string, public title: string, baseValue: number) {
    this.baseValue = baseValue
  }
}
