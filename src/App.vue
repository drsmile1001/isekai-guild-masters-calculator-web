<template>
  <h1 class="text-center py-4 mb-2 text-3xl bg-blue-400 text-white">
    異世界公會長 分數計算機
  </h1>
  <div v-for="scoring in scoringStore.scorings">
    <div v-if="scoring instanceof FixScoring" class="flex justify-between mb-2">
      <h2 class="px-4">{{ scoring.title }}</h2>
      <div class="px-4"><ElInputNumber v-model="scoring.score" /></div>
    </div>
    <div v-if="scoring instanceof IndexPlusScoring" class="mb-2">
      <div class="px-4 flex justify-between">
        <h2>{{ scoring.title }} (+{{ scoring.baseScore }})</h2>
        <ElButton @click="scoringStore.removeScoring(scoring)">移除</ElButton>
      </div>
      <div class="flex justify-between">
        <span class="px-4 py-1 text-sm"
          >{{ scoring.indexType }}
          {{
            scoring.perPlusPointNeedIndexes > 1
              ? `(+1/${scoring.perPlusPointNeedIndexes})`
              : `(+${1 / scoring.perPlusPointNeedIndexes}/1)`
          }}</span
        >
        <div class="px-4 py-1"><ElInputNumber v-model="scoring.index" /></div>
      </div>
    </div>
  </div>
  <h2>新增動態分數</h2>
  <select v-model="selectedScoringCard">
    <option v-for="scoringCard in scoringCards" :value="scoringCard.id">
      {{ scoringCard.id }} {{ scoringCard.title }}
    </option>
  </select>
  <button @click="scoringStore.addScoring(selectedScoringCard)">新增</button>
  <div class="flex justify-between">
    <h1 class="px-2 py-4 text-2xl">總分</h1>
    <span class="px-2 py-4 text-2xl">{{ scoringStore.totalScore }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useScoringStore, FixScoring, IndexPlusScoring } from "./Scoring"
  import { scoringCards } from "./ScoringCards"

  const scoringStore = useScoringStore()
  const selectedScoringCard = ref("")
</script>
