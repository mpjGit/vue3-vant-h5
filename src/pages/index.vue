<script setup lang="ts">
import type { PickerColumn } from 'vant'
// import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'
import TopBg from '@/assets/images/home-top-bg.jpg'

// const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)

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

const { t } = useI18n()

const showLanguagePicker = ref(false)
const languageValues = ref<Array<string>>([locale.value])
// const language = computed(() => languageColumns.find(l => l.value === locale.value).text)

function onLanguageConfirm(event: { selectedOptions: PickerColumn }) {
  locale.value = event.selectedOptions[0].value as string
  showLanguagePicker.value = false
}

function onSubmit(values) {
  console.log('val ====> ', values)
}

const menuItems = computed(() => ([
  { title: t('menus.mockGuide'), route: 'mock' },
  { title: t('menus.echartsDemo'), route: 'charts' },
  { title: t('menus.unocssExample'), route: 'unocss' },
  { title: t('menus.persistPiniaState'), route: 'counter' },
  { title: t('menus.keepAlive'), route: 'keepalive' },
  { title: t('menus.404Demo'), route: 'unknown' },
]))
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

  <van-form class="login-form" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.phone" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.verify" name="验证码" label="验证码" placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button round plain block native-type="submit">
            获取验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  <VanCellGroup :title="t('menus.exampleComponents')" :border="false" :inset="true">
    <template v-for="item in menuItems" :key="item.route">
      <VanCell :title="item.title" :to="item.route" is-link />
    </template>
  </VanCellGroup>

  <van-popup v-model:show="showLanguagePicker" position="bottom">
    <van-picker
      v-model="languageValues" :columns="languageColumns" @confirm="onLanguageConfirm"
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
  margin-top: 20vw;
}
::v-deep {
  .van-cell__title.van-field__label lable {
    position: relative;
    top: 15px;
  }
}
</style>
