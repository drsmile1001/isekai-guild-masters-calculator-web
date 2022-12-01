<template>
  <h1>固定分數型</h1>
  <div v-for="scoring in scoringStore.scorings">
    <div>{{ scoring.title }}</div>
    <div v-if="scoring instanceof FixScoring">
      <input type="number" v-model="scoring.score" />
    </div>
    <div v-if="scoring instanceof IndexPlusScoring">
      <span>{{ scoring.indexType }}</span>
      <span>每 {{ scoring.perPlusPointNeedIndexes }} 個加 1 分</span>
      <input type="number" v-model="scoring.index" />
      <button @click="scoringStore.removeScoring(scoring)">刪除</button>
    </div>
  </div>
  <h1>新增動態分數</h1>
  <select v-model="selectedScoringCard">
    <option v-for="scoringCard in scoringCards" :value="scoringCard.id">
      {{ scoringCard.id }} {{ scoringCard.title }}
    </option>
  </select>
  <button @click="scoringStore.addScoring(selectedScoringCard)">新增</button>
  <h1>總分</h1>
  {{ scoringStore.totalScore }}
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useScoringStore, FixScoring, IndexPlusScoring } from "./Scoring"
  import { scoringCards } from "./ScoringCards"

  const scoringStore = useScoringStore()
  const selectedScoringCard = ref("")
</script>
