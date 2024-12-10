<script setup>
import * as PDF from 'pdfjs-dist'
import { useRoute } from 'vue-router'

// 路径环境变量
const PB_PATH = import.meta.env.VITE_APP_PUBLIC_PATH
PDF.GlobalWorkerOptions.workerSrc = `${PB_PATH}pdf.worker.js`
let pdfDoc = null
const pdfPages = ref(0)
// const pdfScale = ref(0.63)

function renderPdf(num = 1) {
  pdfDoc.getPage(num).then((page) => {
    const canvas = document.getElementById(`pdf-canvas-${num}`)
    const ctx = canvas.getContext('2d')
    const viewport = page.getViewport({ scale: 1 })
    // 画布大小
    canvas.height = viewport.height
    canvas.width = viewport.width
    // 画布的dom大小, 设置移动端,宽度设置铺满整个屏幕
    const clientWidth = document.body.clientWidth
    canvas.style.width = `${clientWidth}px`
    // 根据pdf每页的宽高比例设置canvas的高度
    canvas.style.height = `${clientWidth * (viewport.height / viewport.width)}px`
    page.render({
      canvasContext: ctx,
      viewport,
    })
    if (num < pdfPages.value) {
      renderPdf(num + 1)
    }
  })
}
async function resolvePdf(url) {
  const loadingTask = PDF.getDocument({
    url,
    cMapUrl: '/cmaps/',
    cMapPacked: true,
  })
  loadingTask.promise.then((pdf) => {
    pdfDoc = pdf
    pdfPages.value = pdf.numPages
    nextTick(() => {
      renderPdf()
    })
  })
}

onMounted(() => {
  nextTick(() => {
    const filePath = `${PB_PATH}pdfs/self.pdf`
    resolvePdf(filePath)
  })
})
</script>

<template>
  <div id="pdfRef" class="pdf-container">
    <canvas v-for="pageIndex in pdfPages" :id="`pdf-canvas-${pageIndex}`" :key="pageIndex" class="canvas-x" />
  </div>
</template>

<style lang="less" scoped>
.pdf-container {
  width: 100%;
  height: 100%;
  .canvas-x {
    border: 1px solid #ddd;
  }
}

.img-wrapper {
  width: 222px;
  height: 80px;
  display: none;
  background: rgba(230, 54, 51, 0.2);

  .sign-picture {
    width: 222px;
    height: 80px;
  }
}
</style>

<route lang="json">
{
    "name": "selfFile"
}
</route>
