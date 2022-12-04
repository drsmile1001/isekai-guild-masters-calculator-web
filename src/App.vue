<template>
  <div class="mx-auto max-w-lg">
    <div ref="captureArea">
      <h1 class="text-center py-4 mb-2 text-3xl bg-blue-400 text-white">
        異世界公會長 分數計算機
      </h1>
      <div v-for="scoring in scoringStore.scorings" class="mb-2">
        <div
          v-if="scoring instanceof FixScoring"
          class="flex justify-between mb-2"
        >
          <h2 class="px-4">{{ scoring.title }}</h2>
          <div class="px-4">
            <ElInputNumber v-model="scoring.score" size="large" />
          </div>
        </div>
        <div v-if="scoring instanceof IndexPlusScoring">
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
        <div v-if="scoring instanceof AchievementPlusScoring">
          <div class="px-4 flex justify-between">
            <h2>{{ scoring.title }} (+{{ scoring.baseScore }})</h2>
            <ElButton @click="scoringStore.removeScoring(scoring)" size="large"
              >移除</ElButton
            >
          </div>
          <div
            class="flex justify-between"
            v-for="achievement in scoring.achievements"
          >
            <span class="px-4 py-1 text-sm"
              >{{ achievement.indexType }} >={{
                achievement.indexThreadhold
              }}
              (+{{ achievement.score }})</span
            >
            <div class="px-4 py-1">
              <ElInputNumber
                :model-value="
                  scoringStore.globalIndex.get(achievement.indexType)
                "
                @change="
                  (value) => {
                    scoringStore.globalIndex.set(
                      achievement.indexType,
                      value ?? 0
                    )
                  }
                "
                size="large"
              />
            </div>
          </div>
        </div>
        <div v-if="scoring instanceof D005Scoring">
          <div class="px-4 flex justify-between">
            <h2>{{ scoring.title }} (+0)</h2>
            <ElButton @click="scoringStore.removeScoring(scoring)" size="large"
              >移除</ElButton
            >
          </div>
          <span class="px-4 py-1 text-sm"
            >(+min(生活標籤, 商業標籤, 廢品標籤))</span
          >
          <div class="flex justify-between">
            <span class="px-4 py-1 text-sm">生活標籤</span>
            <div class="px-4 py-1">
              <ElInputNumber
                :model-value="scoringStore.globalIndex.get('生活標籤')"
                @change="
                  (value) => {
                    scoringStore.globalIndex.set('生活標籤', value ?? 0)
                  }
                "
                size="large"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <span class="px-4 py-1 text-sm">商業標籤</span>
            <div class="px-4 py-1">
              <ElInputNumber
                :model-value="scoringStore.globalIndex.get('商業標籤')"
                @change="
                  (value) => {
                    scoringStore.globalIndex.set('商業標籤', value ?? 0)
                  }
                "
                size="large"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <span class="px-4 py-1 text-sm">廢品標籤</span>
            <div class="px-4 py-1">
              <ElInputNumber
                :model-value="scoringStore.globalIndex.get('廢品標籤')"
                @change="
                  (value) => {
                    scoringStore.globalIndex.set('廢品標籤', value ?? 0)
                  }
                "
                size="large"
              />
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
      <div class="flex justify-between">
        <h1 class="px-2 py-4 text-2xl">總分</h1>
        <span class="px-2 py-4 text-2xl">{{ scoringStore.totalScore }}</span>
      </div>
    </div>
    <ElButton @click="capture">截圖</ElButton>
    <ElDrawer v-model="showAddScoring" title="新增動態計分項目" direction="btt">
      <div class="flex justify-between">
        <ElSelect
          v-model="selectedScoringCard"
          size="large"
          placeholder="選擇卡片"
        >
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
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { useScoringStore } from "./ScoringStore"
  import { scoringCards, D005Scoring } from "./DynamicScoringMethod"
  import { FixScoring } from "./FixScoring"
  import { IndexPlusScoring } from "./IndexPlusScoring"
  import { AchievementPlusScoring } from "./AchievementPlusScoring"
  import html2canvas from "html2canvas"
  import { ElMessage } from "element-plus"
  import "element-plus/theme-chalk/el-message.css"

  const captureArea = ref<HTMLDivElement>()

  const scoringStore = useScoringStore()
  const selectedScoringCard = ref("")
  const showAddScoring = ref(false)

  async function capture() {
    const canvas = await html2canvas(captureArea.value!)
    canvas.toBlob((blob) => {
      try {
        const item = new ClipboardItem({ "image/png": blob! })
        navigator.clipboard.write([item])
        ElMessage.success("已複製到剪貼簿")
      } catch (error) {
        ElMessage.error("截圖無法複製到剪貼簿")
      }
    })
  }
</script>
