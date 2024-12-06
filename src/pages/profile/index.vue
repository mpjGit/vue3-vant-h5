<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import triple from '@/assets/images/triple.png'
import logo from '@/assets/images/logo.png'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const isLogin = computed(() => !!userInfo.value.uid)

function login() {
  if (isLogin.value)
    return

  router.push({ name: 'login', query: { redirect: 'profile' } })
}

function setUserInfo() {
  userStore.setInfo({
    name: '张三',
  })
}
</script>

<template>
  <div class="bg-board">
    <div class="top">
      <div class="top-wx">
        <div class="more-txt">
          了解更多关注公众号
        </div>
        <div class="wx-detail">
          <img :src="triple" class="triple">
          <span class="wx-txt">杏 运 行</span>
          <img :src="triple" class="triple back">
        </div>
      </div>
      <div class="top-logo">
        <img class="logo" :src="logo">
        <div class="logo-txt">
          一站式贷款平台服务
        </div>
      </div>
      <div class="top-slogan">
        <div class="slogans">
          <span class="slogan">信用贷</span>
          <span class="slogan">企业贷</span>
          <span class="slogan">抵押贷</span>
          <span class="slogan">担保贷</span>
        </div>
        <div class="slogan-more">
          面对资金需求，让您不在孤立无援
        </div>
      </div>
    </div>

    <div class="tip-msg">
      <div class="tip-title">
        温馨提示
      </div>
      <div class="tip-body">
        {{
          `一份信任，一份坚守，一个客户，一个朋友，感谢您对我们客服经理的信任和业务支持，杏运行将保证您的资料安全永不泄露！请您保证您申请的资料真实有效，一旦虚假，金融机构平台将会列入黑名单。所有申请需在您本人自愿的情况下申请，如果有人(诱导，冒充，强迫)您申请，可以向我们投诉。在申请过程中有任何问题，微信关注公众号【杏运行】
        寻求帮助。特别提示：本公司无法向在校学生群体，无收入群体等提供服务。` }}
      </div>
      <div class="tip-tail">
        {{ `特别提示：杏运行所有业务均无前期收费，不成功，不收费！如发现有冒充我们业务人员向您收取前期费用请投诉!` }}
      </div>
    </div>

    <VanCellGroup :inset="true">
      <van-cell center :is-link="!isLogin" @click="login">
        <template #title>
          <van-image :src="userInfo.avatar || defaultAvatar" round class="h-56 w-56" />
        </template>

        <template #value>
          <span @click.stop="setUserInfo">{{ userInfo.name || '111111111' }}</span>
          <span>{{ $t('profile.login') }}</span>
        </template>
      </van-cell>
    </VanCellGroup>

    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell :title="$t('profile.settings')" icon="setting-o" is-link to="/settings" />
    </VanCellGroup>
  </div>
</template>

<route lang="json">
{
  "name": "profile",
  "meta": {
    "title": "个人中心",
    "i18n": "menus.profile"
  }
}
</route>

<style lang="less" scoped>
.bg-board {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.top {
  width: 100%;
  height: 350px;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to right, #d3cfc3 0%, #ffffff 35%, #ffffff 65%, #d3cfc3 100%);

  .top-wx {
    width: 90%;
    height: 40px;
    margin-top: 80px;

    .more-txt {
      width: 100%;
      height: 16px;
      font-size: 12px;
      font-weight: bold;
      line-height: 16px;
      text-align: left;
      color: #000;
    }

    .wx-detail {
      width: 100%;
      height: 20px;
      margin-top: 5px;
      padding-left: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;

      .triple {
        width: 8px;
        height: 8px;

        &.back {
          transform: rotate(-180deg);
          transform-origin: center center;
        }
      }

      .wx-txt {
        height: 100%;
        font-size: 16px;
        line-height: 20px;
        width: 60px;
        text-align: center;
        font-weight: bolder;
      }
    }
  }

  .top-logo {
    width: 160px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .logo {
      width: 80px;
      height: 80px;
      transform: scale(1.8) translateX(-4px);
      transform-origin: center center;
    }

    .logo-txt {
      width: 100%;
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #d9b379;
    }
  }

  .top-slogan {
    width: 70%;
    height: 140px;

    .slogans {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .slogan {
        width: 56px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        background-color: #f4f4f4;
        color: #000;
        border-radius: 5px;
      }
    }

    .slogan-more {
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 16px;
      font-weight: bolder;
      color: #d9b379;
    }
  }
}

.tip-msg {
  width: 90%;
  height: auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  margin: auto;
  position: relative;
  top: -16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .tip-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    color: #000;
  }

  .tip-body {
    margin-top: 8px;
    width: 100%;
    height: 140px;
    text-align: left;
    font-size: 12px;
    color: #666;
  }

  .tip-tail {
    width: 100%;
    height: 50px;
    text-align: left;
    font-size: 12px;
    color: #5596ff;
  }
}
</style>
