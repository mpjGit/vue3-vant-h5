<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import html2canvas from 'html2canvas'
import { isEmpty } from 'lodash-es'
import _pdf from '@/assets/template.pdf'
import hetong from '@/assets/images/hetong.jpg'
import contract from '@/assets/contract.png'
import { downloadBase64, updateTime } from '@/utils/data264'

const container = ref(null)

// 签名画板
const esign = ref<any>(null)
const bgColor = ref(undefined)
const isCrop = ref(undefined)
const lineWidth = ref(6)
const lineColor = ref('#000000')
const resultImg = ref<any>('')

function handleReset() {
  esign.value.reset()
  resultImg.value = ''
}

function handleGenerate() {
  esign.value.generate().then((res) => {
    resultImg.value = res
  }).catch((err) => {
    console.error(err)
  })
}

/** html转base64 */
function savePoster() {
  nextTick(() => {
    html2canvas(document.querySelector('#container'), { useCORS: true }).then((canvas: any) => {
      downloadBase64(canvas.toDataURL(), 'contract_sign')
    })
  })
};
</script>

<template>
  <div id="container" ref="container" class="pdf-container" @click.stop="savePoster">
    <img class="contract-img" style="width: 100%;height: 600px;" :src="contract" alt="">
    <img v-show="resultImg" class="sign_img" :src="resultImg" alt="">
    <span class="name">道楽</span>
    <span class="time">{{ updateTime() }}</span>
  </div>
  <!-- vue3 -->
  <div class="sign">
    <vue-esign ref="esign" v-model:bg-color="bgColor" :width="800" :height="300" :is-crop="isCrop" :line-width="lineWidth" :line-color="lineColor" />
    <button @click="handleReset">
      清空
    </button>
    <button @click="handleGenerate">
      签署
    </button>
  </div>
</template>

<route lang="json">
{
  "name": "counter",
  "meta": {
    "title": "🍍 持久化 Pinia 状态",
    "i18n": "menus.persistPiniaState"
  }
}
</route>

<style lang="less" scoped>
.over-pdf {
  width: 100%;
  height: auto;
}
.pdf-container {
  position: relative;
  width: 100%;
  height: 670px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  canvas {
    width: 80%;
    height: 100%;
    transform: rotateX(180deg);
  }
  .name {
    width: 30px;
    height: 12px;
    line-height: 12px;
    font-size: 9px;
    position: absolute;
    top: 23px;
    left: 35px;
    color: #454545;
  }
  .sign_img {
    width: 80px;
    height: 30px;
    position: absolute;
    bottom: 35px;
    right: 240px;
  }
  .time {
    width: 130px;
    height: 12px;
    line-height: 12px;
    font-size: 9px;
    position: absolute;
    bottom: 16px;
    left: 40px;
    color: #8a8a8a;
  }

  .contract-img {
    transform: scale(1.4) translateY(55px);
    transition: transform 0.5s ease; /* 添加过渡效果 */
    transform-origin: center center; /* 设置缩放的中心为图片的中心 */
    width: 100%; /* 设置图片宽度为容器的100% */
    height: auto;
  }
}

.sign {
  width: 100%;
  height: auto;
}
</style>
