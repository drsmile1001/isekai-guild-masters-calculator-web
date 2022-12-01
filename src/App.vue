<template>
  <h1 class="text-center py-4 mb-2 text-3xl bg-blue-400 text-white">
    異世界公會長 分數計算機
  </h1>
  <div v-for="scoring in scoringStore.scorings">
    <div v-if="scoring instanceof FixScoring" class="flex justify-between mb-2">
      <h2 class="px-4">{{ scoring.title }}</h2>
      <div class="px-4">
        <ElInputNumber v-model="scoring.score" size="large" />
      </div>
    </div>
    <div v-if="scoring instanceof IndexPlusScoring" class="mb-2">
      <div class="px-4 flex justify-between">
        <h2>{{ scoring.title }} (+{{ scoring.baseScore }})</h2>
        <ElButton @click="scoringStore.removeScoring(scoring)" size="large"
          >移除</ElButton
        >
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
        <div class="px-4 py-1">
          <ElInputNumber v-model="scoring.index" size="large" />
        </div>
      </div>
    </div>
  </div>
  <div class="text-right pr-4">
    <ElButton
      size="large"
      @click="
        () => {
          showAddScoring = true
        }
      "
      >新增動態計分項目</ElButton
    >
  </div>
  <ElDrawer v-model="showAddScoring" title="新增動態計分項目" direction="btt">
    <div class="flex justify-between">
      <ElSelect v-model="selectedScoringCard" size="large">
        <ElOption
          v-for="scoringCard in scoringCards"
          :value="scoringCard.id"
          :key="scoringCard.id"
          :label="`${scoringCard.id} ${scoringCard.title}`"
        >
        </ElOption>
      </ElSelect>
      <ElButton
        size="large"
        @click="
          () => {
            scoringStore.addScoring(selectedScoringCard)
            showAddScoring = false
          }
        "
      >
        新增
      </ElButton>
    </div>
  </ElDrawer>
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
  const showAddScoring = ref(false)
</script>
