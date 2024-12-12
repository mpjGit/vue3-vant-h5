<script setup lang="ts">
import $ from 'jquery'
import jweixin from 'weixin-js-sdk'
import { type PickerColumn, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { languageColumns, locale } from '@/utils/i18n'
import TopBg from '@/assets/images/home-top-bg.jpg'
import BottomBg from '@/assets/images/bg_bottom.png'
import indexLogo from '@/assets/images/index-logo.png'
import { validatePhoneNumber } from '@/utils/data264'

const userStore = useUserStore()
const router = useRouter()

// form 数据
const form = reactive({
  phone: '',
  accept: false,
})

// 观测是否是黑夜模式
watch(
  () => isDark.value,
  () => {},
  { immediate: true },
)

// function toggle() {
//   toggleDark()
//   appStore.switchMode(isDark.value ? 'dark' : 'light')
// }

// const { t } = useI18n()

const showLanguagePicker = ref(false)
const languageValues = ref<Array<string>>([locale.value])
// const language = computed(() => languageColumns.find(l => l.value === locale.value).text)

function onLanguageConfirm(event: { selectedOptions: PickerColumn }) {
  locale.value = event.selectedOptions[0].value as string
  showLanguagePicker.value = false
}

function handleLogin() {
  const testPhone = validatePhoneNumber(form.phone)
  if (!form.phone) {
    return showToast('请输入正确的手机号！')
  }
  if (!testPhone.valid) {
    return showToast('请输入正确的手机号！')
  }
  if (!form.accept) {
    return showToast('请勾选同意隐私政策！')
  }
  userStore.setPhone(form.phone)
  router.push('/profile')
}

function previewFile(type) {
  if (type === 'self') {
    router.push('/selfFile')
  }
  else {
    router.push('/serveFile')
  }
}

function getUrlParams() {
  $.ajax({
    async: false,
    type: 'post',
    url: 'https://shryf.com/loanonlineapplication/user/getUrl',
    data: {
      url: 'https://shryf.com/dist/index.html',
    },
    jsonpCallback: 'successCallback',
    dataType: 'Jsonp',
    beforeSend() {},
    success(data) {
      if (data.result === '00') { // 成功，其他失败
        const _data = data.data
        jweixin.config({
          debug: false, // 根据服务端来控制是否开启调试模式
          appId: _data.appId,
          timestamp: _data.timestamp,
          nonceStr: _data.nonceStr,
          signature: _data.signature,
          jsApiList: [],
        })
        weixinInit()
      }
      else {
        console.error('微信设置失败！')
      }
    },
    complete() {},
    error() {
      return false
    },
  })
}

function weixinInit() {
  // 定义设置分享数据方法
  const setShareInfo = (options) => {
    // 分享的触发动作必须写再ready里面
    jweixin.ready(() => {
      // 配置分享数据
      const shareData = {
        title: options.title || '', // 分享的标题
        desc: options.desc || '', // 分享的描述
        link: options.link, // 分享的链接
        imgUrl: options.imgUrl || '', // 分享的图片链接
        success() {
          // 配置成功之后的回调（并不是分享成功之后的回调，这个地方是个坑，要注意下）
          console.warn('成功完成微信配置！')
        },
      }
      // 分享给朋友接口
      jweixin.updateAppMessageShareData(shareData)
      // 分享到朋友圈接口
      jweixin.updateTimelineShareData(shareData)
    })
  }

  // 调用设置分享数据方法
  const options = {
    title: '尚士华融', // 分享的标题
    desc: '正规持牌产品 多年技术沉淀 百万客户信赖 ', // 分享的描述
    link: 'https://shryf.com/dist/index.html',
    imgUrl: 'https://shryf.com/image/sy.png', // 分享的图片链接
  }
  setShareInfo(options)
}

onMounted(() => {
  getUrlParams()
})

// function fetchVerifyCode() {}

// const menuItems = computed(() => [
//   { title: t('menus.mockGuide'), route: 'mock' },
//   { title: t('menus.echartsDemo'), route: 'charts' },
//   { title: t('menus.unocssExample'), route: 'unocss' },
//   { title: t('menus.persistPiniaState'), route: 'counter' },
//   { title: t('menus.keepAlive'), route: 'keepalive' },
//   { title: t('menus.404Demo'), route: 'unknown' },
// ])
</script>

<template>
  <div class="top">
    <img class="top-bg" :src="TopBg">
    <img class="top-logo" :src="indexLogo" alt="">
    <div class="top-txt">
      <div class="up-txt">
        正规持牌产品
      </div>
      <div class="down-txt">
        多年技术沉淀<span style="display: inline-block;width: 40px;" />百万客户信赖
      </div>
    </div>
    <div class="top-show">
      <div class="show-item">
        <div class="icon">
          <img src="@/assets/images/safety-certificate.png" alt="">
        </div>
        <div class="txt">
          安全
        </div>
      </div>
      <div class="show-item">
        <div class="icon">
          <img src="@/assets/images/professional.png" alt="">
        </div>
        <div class="txt">
          专业
        </div>
      </div>
      <div class="show-item">
        <div class="icon">
          <img src="@/assets/images/high.png" alt="">
        </div>
        <div class="txt">
          高效
        </div>
      </div>
    </div>
  </div>

  <!-- <VanCellGroup :title="t('menus.basicSettings')" :border="false" :inset="true">
    <VanCell center :title="t('menus.darkMode')">
      <template #right-icon>
        <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggle()" />
      </template>
</VanCell>

<VanCell is-link :title="t('menus.language')" :value="language" @click="showLanguagePicker = true" />
</VanCellGroup> -->

  <div class="login-form">
    <div class="form-item form-phone">
      <div class="input-prefix">
        +86
      </div>
      <div class="input-content">
        <input
          v-model="form.phone"
          class="login-form-input"
          type="text"
          placeholder="输入手机号"
        >
      </div>
    </div>
    <div class="form-submit" @click.stop="handleLogin">
      登录
    </div>
    <div class="user-msg">
      <div class="u-checkbox">
        <van-checkbox v-model="form.accept" shape="square">
          我已同意
        </van-checkbox>
        <span style="color: #58f;" @click.stop="previewFile('serve')">《注册与居间服务协议》</span>
        和
        <span style="color: #58f;" @click.stop="previewFile('self')">《隐私政策》</span>
      </div>
      <div class="police">
        备案号：辽ICP备2023002972号
      </div>
    </div>
  </div>
  <div class="bottom">
    <img :src="BottomBg" alt="">
  </div>

  <van-popup v-model:show="showLanguagePicker" position="bottom">
    <van-picker
      v-model="languageValues"
      :columns="languageColumns"
      @confirm="onLanguageConfirm"
      @cancel="showLanguagePicker = false"
    />
  </van-popup>
</template>

<route lang="json">
{
  "name": "home",
  "meta": {
    "title": "主页",
    "i18n": "menus.home"
  }
}
</route>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 60vw;
  position: relative;
  background: #fff;

  .top-bg {
    width: 100%;
    height: 100%;
  }

  .top-logo {
    width: 200px;
    height: 190px;
    position: absolute;
    top: -5%;
    left: 50%;
    margin-left: -100px;
    z-index: 9;
  }

  .top-txt {
    width: 300px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -150px;
    color: #fff;
    border-top: 1px solid #fff;
    padding-top: 15px;
    .up-txt {
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
    }
    .down-txt {
      text-align: center;
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      font-weight: bolder;
    }
  }

  .top-show {
    z-index: 8;
    width: 80vw;
    height: 18vw;
    position: absolute;
    top: 90%;
    left: 50%;
    margin-top: -15px;
    margin-left: -40vw;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10vw;

    .show-item {
      width: 10vw;
      height: 18vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: stretch;

      .icon {
        height: 10vw;
        border-radius: 50%;
        background-color: #2b6295;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 7vw;
          height: 7vw;
        }
      }

      .txt {
        height: 6vw;
        line-height: 6vw;
        text-align: center;
        font-size: 12px;
        color: #000;
      }
    }
  }
}
.login-form {
  margin-top: 15vw;
  width: 100%;
  height: auto;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  .form-item {
    width: 300px;
    height: 50px;
    border-radius: 25px;
    background-color: #f4f4f4;
    padding: 2vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:last-child {
      padding: 0 18px;
    }

    .input-prefix {
      border-right: 1px solid #000;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000;
      text-align: center;
      width: 14vw;
    }
    .input-content {
      flex: 1;
      input {
        background: none;
        outline: none;
        border: 0px;
      }
      .verify-input {
        position: relative;
        left: 10px;
      }
    }
    .input-append {
      min-width: 90px;
      padding: 0 10px;
      line-height: 30px;
      text-align: center;
      background: #fff;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666;
      position: relative;
      right: 20px;
    }
  }
  .form-submit {
    width: 300px;
    line-height: 50px;
    background: #2b6295;
    border-radius: 25px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }
  .user-msg {
    width: 350px;
    margin: 20px auto;
    color: rgb(255, 255, 255);
    text-align: center;
    color: #000;

    .u-checkbox {
      width: 100%;
      height: 18px;
      line-height: 18px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .police {
      color: rgb(144, 144, 144);
      padding-top: 10px;
      font-size: 14px;
    }
  }
}
.bottom {
  width: 100%;
  height: 220px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
