import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { scoringCards } from "./DynamicScoringMethod"
import { FixScoring } from "./FixScoring"
import { Scoring } from "./Scoring"

export const useScoringStore = defineStore("scoring", () => {
  const globalIndex = ref<Map<string, number>>(
    new Map([
      ["桌面的事件卡", 0],
      ["迷宮板塊", 0],
      ["深淵洞穴", 0],
      ["據點", 0],
      ["生活", 0],
      ["商業", 0],
      ["零件", 0],
      ["力量", 0],
      ["藥水", 0],
    ])
  )

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
    const scoring = scoringCards.find((card) => card.id === id)
    if (!scoring) return
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
    globalIndex,
  }
})
