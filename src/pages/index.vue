<script setup lang="ts">
import type { PickerColumn } from 'vant'
// import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'
import TopBg from '@/assets/images/home-top-bg.jpg'
import BottomBg from '@/assets/images/bg_bottom.png'

// const appStore = useAppStore()
const checked = ref<boolean>(false)

// form 数据
const form = reactive({
  phone: '',
  verify: '',
})

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
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

function handleLogin() {}

function fetchVerifyCode() {}

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
    <div class="form-item form-verify">
      <div class="input-content">
        <input
          v-model="form.verify"
          class="login-form-input verify-input"
          type="text"
          placeholder="输入验证码"
        >
      </div>
      <div class="input-append" @click.stop="fetchVerifyCode">
        获取验证码
      </div>
    </div>
    <div class="form-submit" @click.stop="handleLogin">
      登录
    </div>
    <div class="user-msg">
      <div class="u-checkbox">
        <van-checkbox v-model="checked" shape="square">
          我已同意
        </van-checkbox>
        <a href="">《注册与居间服务协议》</a>
        和
        <a href="">《隐私政策》</a>
      </div>
      <div class="police">
        备案号：湘ICP备2021004843号-1
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
  background: yellow;

  .top-bg {
    width: 100%;
    height: 100%;
  }

  .top-show {
    width: 80vw;
    height: 25vw;
    position: absolute;
    top: 80%;
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
      height: 20vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;

      .icon {
        height: 10vw;
        border-radius: 50%;
        background-color: #ece24b;
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
