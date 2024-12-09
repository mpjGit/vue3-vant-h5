<script setup lang="ts">
import $ from 'jquery'
import html2canvas from 'html2canvas'
import { areaList } from '@vant/area-data'
import { showLoadingToast, showToast } from 'vant'
import { isIdCard } from '@/utils/idAuth'
import { base64ToServe, updateTime } from '@/utils/data264'
import { uploadpicA } from '@/utils/ajaxUpload'
import { useUserStore } from '@/stores'
import triple from '@/assets/images/triple.png'
import logo from '@/assets/images/logo.png'
import idbg from '@/assets/images/idbg.png'
import take from '@/assets/images/take.png'
import contract from '@/assets/contract.png'
import contract_z from '@/assets/images/contract-z.png'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

// form 数据
const form = reactive({
  xmFprId: 1,
  xmPhone: userInfo.value.phone,
  xmMoniker: '', // 姓名
  xmIdNo: '', // 身份证号
  xmSex: '男',
  xmSfProvidentFund: '',
  xmSfMortgagingHousing: '',
  xmSfCheckInSalary: '',
  xmSfCreditCard: '',
  xmSfCar: '',
  xmSfWorking: '',
  xmSesameCreditScore: '',
  xmCommonlyUsedBanks: '',
  xmQualification: '',
  xmBankCardNumber: '',
  xmFriendName: '',
  xmFriendPhone: '',
  xmDirectFamilyName: '',
  xmDirectFamilyPhone: '',
  xmProvince: '', // 省
  xmCity: '', // 市
  xmArea: '', // 区
  xmDetailedAddress: '',
  xmFrontOfIDCardImage: '', // 身份证正面
  xmBackOfIDCardImage: '', // 身份证背面
  xmSignatureImage: '', // 合同签署图片
})
const area = ref('')
const showPicker = ref(false)
const showBankPicker = ref(false)
const showArea = ref(false)
const columns = reactive([
  { text: '小学', value: '小学' },
  { text: '初中', value: '初中' },
  { text: '高中', value: '高中' },
  { text: '大专', value: '大专' },
  { text: '本科', value: '本科' },
  { text: '硕士', value: '硕士' },
  { text: '博士', value: '博士' },
  { text: '其他', value: '其他' },
])
const bankColumns = reactive([
  { text: '无', value: '无' },
  { text: '建设银行', value: '建设银行' },
  { text: '农业银行', value: '农业银行' },
  { text: '中国银行', value: '中国银行' },
  { text: '交通银行', value: '交通银行' },
  { text: '工商银行', value: '工商银行' },
  { text: '招商银行', value: '招商银行' },
  { text: '民生银行', value: '民生银行' },
  { text: '中信银行', value: '中信银行' },
  { text: '光大银行', value: '光大银行' },
  { text: '邮政银行', value: '邮政银行' },
  { text: '平安银行', value: '平安银行' },
  { text: '广发银行', value: '广发银行' },
  { text: '浦发银行', value: '浦发银行' },
  { text: '其他银行', value: '其他银行' },
])
const idbgBackImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjoAAADgCAMAAAA9rDySAAABaFBMVEUAAAD/AAD/AAD/gAD/gID/VVX/gID/Zmb/VVX/bW3/trb/YGD/v7//cVX/xsb/Zmb/XV3/dHT/amr/YmL/bVv/bW3/Zmb/d2b/d3f/cHD/aWn/Y2P/cXH/a2v/c3P/bW3/trb/wsL/aGj/dGj/dHT/xcX/b2//amr/cHD/bGz/dmz/cWj/cXH/bW3/amr/cmr/wcH/bmb/bm6UlJT/a2v/dGz/cWn/cXH/bW3/dW3/cWr/bmf/bm7/dW7/cmv/b2n/b2//dm//c2z/cGr/cHD/bW3/c23/cWv/xMT/bm7/dG7/v7//cWz/b2//dG//cm3/cGr/cm3/p6H/xsb/cGv/cHD/o57/wsL/c27/c3P/eHP/eHj/fXj/fX3/gn3/h4L/h4f/jIf/jIz/kYz/kZH/lpH/lpb/m5b/m5v/oJv/oKD/paD/paX/qqX/qqr/r6r/r6//tK//tLT/ubT/ubn/vrn/vr7/w8NHTgN0AAAAeHRSTlMAAQICAgMEBQYHBwgICQkKCwsMDQ4ODw8PEBESEhMUFRUVFhYWFhcYGRoaGxscHR0dHh4fHyEiIiMjJCUlJSYnJycoKSkqKisrLCwsLS4uLzAxMTEyMjIyMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzP+vZ/WAAAJh0lEQVR42u2d+1cTRxSANxUMaltbbWi1Vtuq+KCWviy0pVAqhEqDNBXqggEJCQHikq5xXf79hsBulmQfs8mGY2e+70dOEo93vzNzZ+bOXU2Lz1Dm1g9Tj+ZzS8vLS7n5R1M/3MoMaQChDGRGZ/K6D/mZ0cwA8QF/3rs/s6yHsDxz/z2iBO2kR2Z1AWZH0sQKPAz/uqILsjI5TLzgmE/n9FjMfkrMQNNSNxb02CzcSBE55aeqnN4VC0xbajM04afFerFimK/qlm1b9VemUSmu+31qgoRZ4bnqTucezosd0z7owDZ3XnTu9dxh1lJ1PT7V5sJqcd9HG1cfo7ja9oUpBh4lySyd9KBohHjj2nPyO0sZ4qgeX53cydm2DoSwtk/u8owSScU4M+kVYK0iKE5Tnsqa97s/nyGaKjH4m/fpl2OI05Sn7P32b4PEU6EEOet59BtmgCH1eqA85obnB7Iky8pwzrsNuBeYHJdKIQnzrucncueIqSJjjsecghloR13XX4fMWmbBs7XMuKNGnuOZrYoh6/FSIwkKXalveg5EyXcUIOXJkCthufDhB8Lz54pnc5CNZfn5yZPmhHnRXEWVw5da1dZvjRNZ2RltPW3jIGrQiRp2DozWr7E3KDkftfaQa2FOvC4dfaj0OtydWmtf+bKC4fz+rSXx/+rZxagx501HkUWzBMOOHncWz6KOxOq0jh+q0emLl2rguLPnfmYSdeRV547A2qoazxzvOmsEdWRVJ+1Wdm2Kpb5CCfWBu7+TT6OOpOo8dPeQ7YM47oSbc/DG3Vd+iDpyqpNxXTBFl03RS7HmmYT70UuoI6M6qXmhrcAOd2rRVRhuqjyPOjKqc92tsogsJLW86ggU89huDcZ11JFPnVROcLrqYtRpTVk51JFPnc+cp1uKNsFbjBM9vR0fsx/xGepIp85jpw7ZiiGCoGqNKc6pV36MOrKpc80xYUdAhGbq8rxafd5MjYTqlXec37+KOpKp87sz6HTmyJ25z+HnDgtP7b3GYLLql9t0ZsrOsPM76silzoXgEwi7sN9RWrq2c2yYvbPms8Ta99lTdO9nXUAdqdS5G7zUftkxJf3rvZZlbf/rM6G9DF7Q30UdqdRxeuhstY049dpu4xhhu2oKX8WyzGqjgLCwW6u3jTzOneIF1JFJnQ8DNmlsp3/Fqimqjun0LNi0AzaDPkAdidQZC0qS7a2jvwub03DnKCHesoMS5THUkUgd5/hqO2BlVDuIQS1gpeYkylnUkUedweAzCDuylCugGMwOPI1YGUQdadS54sxXfnc8142Sz2gUwrZeMgq6z4X058f/zBXUkUadB/7rq+ZQ8bIxfNT34qiz27DGfumTHTlrrAcayMKsQIlxAjinprNEXBqcVz/U+6tO3XmZBBGXhXPO5o0tpkAl8g8BFV/Olg9NU2ThY6c8UHTwaDvU2hcdrpxiQdpxy8LN4CzZj2K7Yxt6UeybW8f/0E1iLgnfiZfqWNubh7eGC5vl4xWUWd48vCuzvinS4tQp2vmWmEvCpNh9qhNbws45g70VuBEdfINrkphLwoxwPbu7wi67GbVdFq9QdvaTZ4i5JMzHWZvb7R+tB5w7hKzOs8RcEnLiN6qcx2+0z0JC2lkKluzIzV9x1DHWqrZR8GTUOwWjUaNsxFFniZhLgrOZLDbp2M3qwZA/RE12jZYXxFwS8nHU6QXUkY2lOBNWLzBhycbC6Zx+tlZYpMmykD1tdeaIuYpbgr3AlqBs/Hz8RPf7rc6+83o1Yi4JYzE6FfTEjnrXaSQnZtFF91B0IRvD8Uq9uodSL9kILzA19NgYFJiqQlhZ+67eBbuUtSvCXOATt0t6V5RsLtMogXOFr6PE2O10EZsXNlf4VOBKQKMLa13vmnUrsCfcFSIuDYMrvvvJ5preAx2NVRRsV6AAzs3hst/eb9fs+7wtlFRHMkZ9Zqw9vWf2fOcr3gIqExcDu/ZvdCfNRsjbAS4Sb5mYDzqLSE6dLUXfTiM7gc1vE1NHyea3KuC23N7ulzpuy21OISTjkXOOZfVHHXfQodH//5KQ/2TQ60WSUsd9vcg11JFMHfcKaNuwk5A61iovNZJWnRu67yIrIXW21HyDoxrqpJ74Nk9ORh33BY6LKdSRTh3tju9rYxNRp/Xa2BENdeRTZyCn953cAOpIqI72Sf/VUa3cQhV1tIl+mzOhoY6c6gzl+2tOfgh1JFWnlSn3hxENdWRVx+1l2hcU7FuqkDpnF/tnzuJZ1JFYHe3ySr/MWb6soY7M6rilpoIduAV7bDe4p6GO3Opo462n3fPrsTzlzeMa6siuTmqq9bwrvZlTaf3SVAp1pFdHG5xtPfFiD01N7c3W78wqevVKMXW0tOcwq9B1kziz4MmR0xrqqKCOdmEhsmmF8Hs+j9BQRw11tPSJ+okuBh6zrVYDdVRRR2vreBKzF7fV0VkFdRRVR1+txJDHqqzqqIM6LuXXguKU/baSUUdhdRrl7rXIlbpd2/I/hUAdpdVp9MEoh2bMZjmwHw/qKK7OoT3FXdNn8LHN3WJYHyfUQZ2jXm/FimG+qlu2bdVfmUalGNk3DnVQp0tQB3VQB3VQB3X6ok7CVyPyqKOMOkvJqvMEdZRRZy5ZdeZQRxl1Er4HOoE6yqgzmqw691BHGXUyvgaIHH/6fjGjgSoM5JNUJz9ARNVhPEl1xomnQlxNUh1eYqQUj5NT5zHRVIobyalznWgqRWo+KXXmU0RTLS4lpc4lYqkaD5JR52siqd6UNZ2EOtNMVwoymO1dnSyviFWS9Fyv6syliaKi4850b+pMM+aom+983YM6Kw/Ic5Reo2e7VSfLqlx1brqdmgRafNnui0S+JHKgXf3xqAajHq1O/ajK4uFVogZNzgyP/ZJd/Cdanb8Xs7+MDb9DxOAE7z+LMufZu0QJ/Lgdpc5tYgT+fBE67jz7nAhBEOe/+fOpvzdP//jmPPEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeFv5/tQh5qiDOqiDOvJE9xSfI+qgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDuqgDurwHFEHdVAHdVAHdQB1UAd1UAd1UAd1UAdQB1AHdVAHdVAHdVAHdQB1AHVQB3VQB3Uo9aLUC3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQB3VQ5/T5D6cRBp6As/86AAAAAElFTkSuQmCC'
const fileList_front = ref<any>([
])
const fileList_back = ref([
])

function onConfirmArea({ selectedOptions }) {
  showArea.value = false
  area.value = selectedOptions.map(item => item.text).join('/')
};

function onOversize() {
  showToast('文件大小不能超过 10MB!')
}

async function onSubmit() {
  // 必填字段的校验
  const { xmMoniker, xmIdNo, xmPhone } = form
  const idAuth = isIdCard(xmIdNo)
  if (!idAuth.valid) {
    return showToast(idAuth.message)
  }
  if (!xmPhone) {
    return showToast('未获取到您的手机号，请返回登录!')
  }
  if (!xmMoniker && !xmIdNo) {
    return showToast('请检查关键信息是否填写完整!')
  }
  // 使用 jquery的 ajax 发送JSONP请求
  try {
    $.ajax({
      async: false,
      type: 'post',
      url: 'http://47.93.55.40:447/loanonlineapplication/user/addSave',
      data: {
        ...form,
      },
      jsonpCallback: 'successCallback',
      dataType: 'Jsonp',
      beforeSend() {},
      success(data) {
        if (data.result === '00') { // 成功，其他失败
          // 跳转成功页面
          showToast({
            duration: 3000,
            message: '信息提交成功！请耐心等待审核',
          })
        }
        else {
          showToast({
            duration: 3000,
            message: '信息提交失败！请检查网络！',
          })
        }
      },
      complete() {},
      error() {
        return false
      },
    })
  }
  catch (e) {
    console.error('网络错误 ===> ', e)
  }
}

// 文件签署相关
const confirmContract = ref(false)

const container = ref(null)

// 签名画板
const esign = ref<any>(null)
const bgColor = ref(undefined)
const isCrop = ref(undefined)
const lineWidth = ref(6)
const lineColor = ref('#000000')
const resultImg = ref<any>('')
const signTime = ref<string>(updateTime())

function handleReset() {
  esign.value.reset()
  resultImg.value = ''
}

function handleGenerate() {
  const loading = showLoadingToast({
    message: '签署中...',
  })
  esign.value.generate().then((res) => {
    loading.close()
    resultImg.value = res
    savePoster()
  }).catch((err) => {
    loading.close()
    console.error(err)
  })
}

/** html转base64 */
function savePoster() {
  html2canvas(document.querySelector('#container'), { useCORS: true }).then((canvas: any) => {
    // downloadBase64(canvas.toDataURL(), 'contract_sign')
    base64ToServe(canvas.toDataURL()).then((res) => {
      if (res.status === 'ok') {
        const { filePathNew } = res.data
        if (filePathNew && filePathNew.length) {
          form.xmSignatureImage = filePathNew
        }
      }
    })
  })
};

watch(
  () => userInfo,
  (val) => {
    if (val.value && val.value.phone) {
      form.xmPhone = val.value.phone
    }
  },
)

watch(
  () => fileList_front.value,
  (val) => {
    if (val && val[0]) {
      uploadpicA(val[0].file).then((res) => {
        if (res.status === 'ok') {
          const { filePathNew } = res.data
          if (filePathNew && filePathNew.length) {
            form.xmFrontOfIDCardImage = filePathNew
          }
        }
      })
    }
  },
  { immediate: true },
)

watch(
  () => fileList_back.value,
  (val) => {
    if (val && val[0]) {
      uploadpicA(val[0].file).then((res) => {
        if (res.status === 'ok') {
          const { filePathNew } = res.data
          if (filePathNew && filePathNew.length) {
            form.xmBackOfIDCardImage = filePathNew
          }
        }
      })
    }
  },
  { immediate: true },
)

watch(
  () => confirmContract.value,
  () => {
    signTime.value = updateTime()
  },
  { immediate: true },
)

function onConfirm(evt, type) {
  const value = evt.selectedValues && evt.selectedValues[0]
  switch (type) {
    case 'profile':
      form.xmQualification = value
      showPicker.value = false
      break
    case 'bank':
      form.xmCommonlyUsedBanks = value
      showBankPicker.value = false
      break
  }
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

    <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      基础信息
    </van-divider>
    <div class="user-form">
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="form.xmMoniker" name="姓名" label="姓名" placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
            required
          />
          <van-field
            v-model="form.xmIdNo"
            name="身份证号码" label="身份证号码" placeholder="身份证号码"
            :rules="[{ required: true, message: '请填写身份证号码' }]"
            required
          />
          <van-field name="radio" label="性别" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSex" direction="horizontal">
                <van-radio name="男">
                  男
                </van-radio>
                <van-radio name="女">
                  女
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
    </div>

    <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      评估资质
    </van-divider>
    <div class="user-form">
      <van-form>
        <van-cell-group inset>
          <van-field name="radio" label="是否有公积金" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfProvidentFund" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" label="是否有按揭房" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfMortgagingHousing" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" label="是否有打卡工资" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfCheckInSalary" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" label="是否持有信用卡" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfCreditCard" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" label="是否有车" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfCar" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" label="是否有工作" label-width="130px" required>
            <template #input>
              <van-radio-group v-model="form.xmSfWorking" direction="horizontal">
                <van-radio name="是">
                  是
                </van-radio>
                <van-radio name="否">
                  否
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="form.xmSesameCreditScore" name="支付宝芝麻信用分" label="支付宝芝麻信用分" placeholder="支付宝芝麻信用分" label-width="140px" required
          />
          <van-field
            v-model="form.xmQualification"
            is-link
            readonly
            name="picker"
            label="个人学历"
            placeholder="请选择"
            required
            @click="showPicker = true"
          />
          <van-field
            v-model="form.xmCommonlyUsedBanks"
            is-link
            readonly
            name="picker"
            label="常用银行"
            placeholder="请选择"
            required
            @click="showBankPicker = true"
          />
          <van-field
            v-model="form.xmBankCardNumber" name="银行卡号" label="银行卡号" placeholder="银行卡号" required
          />
        </van-cell-group>
      </van-form>
    </div>

    <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      联系方式
    </van-divider>
    <div class="user-form">
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="form.xmFriendName" name="朋友姓名" label="朋友姓名" placeholder="朋友姓名"
            :rules="[{ required: true, message: '请填写朋友姓名' }]"
            required
          />
          <van-field
            v-model="form.xmFriendPhone" name="朋友电话" label="朋友电话" placeholder="朋友电话"
            :rules="[{ required: true, message: '请填写朋友电话' }]"
            required
          />
          <van-field
            v-model="form.xmDirectFamilyName" name="直属亲属姓名" label="直属亲属姓名" placeholder="直属亲属姓名"
            :rules="[{ required: true, message: '请填写直属亲属姓名' }]"
            required
          />
          <van-field
            v-model="form.xmDirectFamilyPhone" name="直属亲属电话" label="直属亲属电话" placeholder="直属亲属电话"
            :rules="[{ required: true, message: '请填写直属亲属电话' }]"
            required
          />
          <van-field
            v-model="area"
            is-link
            readonly
            name="现居地址"
            label="现居地址"
            placeholder="点击选择省市区"
            @click="showArea = true"
          />
          <van-field
            v-model="form.xmDetailedAddress"
            name="详细地址" placeholder="详细地址"
            :rules="[{ required: true, message: '请输入详细地址' }]"
          />
        </van-cell-group>
      </van-form>
    </div>

    <van-divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      身份证件
    </van-divider>
    <div class="user-form">
      <van-form>
        <van-cell-group inset>
          <van-field>
            <template #input>
              <van-uploader v-model="fileList_front" class="uploader" :max-size="10000 * 1024" :max-count="1" @oversize="onOversize">
                <img class="idbg" :src="idbg" alt="">
                <div class="idbg-take">
                  <img class="take-icon" :src="take" alt="">
                  <span class="idbg-txt">点击拍照/上传人像面</span>
                </div>
              </van-uploader>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group style="margin-top: 8px;" inset>
          <van-field>
            <template #input>
              <van-uploader v-model="fileList_back" class="uploader" :max-size="10000 * 1024" :max-count="1" @oversize="onOversize">
                <img class="idbg" :src="idbgBackImg" alt="">
                <div class="idbg-take">
                  <img class="take-icon" :src="take" alt="">
                  <span class="idbg-txt">点击拍照/上传人像面</span>
                </div>
              </van-uploader>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
    </div>

    <div class="creit-from">
      <div class="serve-title">
        <span style="color: red;">*</span>
        <span>居间服务协议</span>
      </div>
      <van-cell-group inset style="padding: 10px;">
        <van-checkbox v-model="confirmContract" style="font-size: 14px;">
          我已阅读以上申请须知，同意并遵守合同条款
        </van-checkbox>
      </van-cell-group>
      <div v-if="confirmContract" id="container" ref="container" class="pdf-container" @click.stop="savePoster">
        <img class="contract-img" style="width: 100%;height: 700px;" :src="contract" alt="">
        <img v-show="resultImg" class="sign_img" :src="resultImg" alt="">
        <img class="z-img" :src="contract_z" alt="">
        <span class="name">{{ form.xmMoniker }}</span>
        <span class="time">{{ signTime }}</span>
      </div>
      <!-- vue3 -->
      <div v-if="confirmContract" class="sign">
        <vue-esign ref="esign" v-model:bg-color="bgColor" :width="800" :height="300" :is-crop="isCrop" :line-width="lineWidth" :line-color="lineColor" />
        <van-button plain type="danger" size="mini" style="margin: 0 10px" @click="handleReset">
          清空
        </van-button>
        <van-button plain type="success" size="mini" @click="handleGenerate">
          签署
        </van-button>
      </div>
    </div>

    <div class="bottom-from">
      <van-form @submit="onSubmit">
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>

  <!-- 学历选择器 -->
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker
      :columns="columns"
      @confirm="onConfirm($event, 'profile')"
      @cancel="showPicker = false"
    />
  </van-popup>

  <!-- 银行选择器 -->
  <van-popup v-model:show="showBankPicker" position="bottom">
    <van-picker
      :columns="bankColumns"
      @confirm="onConfirm($event, 'bank')"
      @cancel="showBankPicker = false"
    />
  </van-popup>

  <!-- 地区选择器 -->
  <van-popup v-model:show="showArea" position="bottom">
    <van-area
      :area-list="areaList"
      @confirm="onConfirmArea"
      @cancel="showArea = false"
    />
  </van-popup>
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

.user-form {
  width: 90%;
  height: auto;
  margin: auto;

  :deep(.uploader) {
    width: 320px;
    height: 160px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .idbg {
      width: 280px;
      height: 100px;
    }
    .idbg-take {
      width: 200px;
      height: 80px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -40px;
      margin-left: -100px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      .take-icon {
        width: 64px;
        height: 64px;
      }
      .idbg-txt {
        color: #5596ff;
      }
    }
  }

  :deep(.van-uploader__preview) {
    margin: 0;
    position: relative;
    right: 6px;
  }

  :deep(.van-uploader__preview-image) {
    width: 316px;
    height: 180px;
  }
}

.creit-from {
  width: 90%;
  height: auto;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  margin-top: 10px;
  overflow: hidden;

  .serve-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    text-indent: 6px;
    color: #000;
    font-size: 14px;
    border-bottom: 1px solid #f8f8f8;
  }

  .pdf-container {
    position: relative;
    width: 100%;
    height: 670px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 20px;
    .name {
      width: 50px;
      height: 12px;
      line-height: 12px;
      font-size: 9px;
      position: absolute;
      color: #454545;
      @media screen and (min-width: 375px) {
        top: 1vw;
        left: 33px;
      }
      @media screen and (min-width: 390px) {
        top: 1vw;
        left: 33px;
      }
      @media screen and (min-width: 410px) {
        top: 0.5vw;
        left: 33px;
      }
      @media screen and (min-width: 420px) {
        top: 0.3vw;
        left: 33px;
      }
    }
    .z-img {
      width: 60px;
      height: 60px;
      position: absolute;
      z-index: 999;
      bottom: 1vw;
      right: 45px;
      @media screen and (min-width: 375px) {
        bottom: -6vw;
        right: 25px;
      }
      @media screen and (min-width: 390px) {
        bottom: 1vw;
        right: 25px;
      }
      @media screen and (min-width: 410px) {
        bottom: 16vw;
        right: 25px;
      }
      @media screen and (min-width: 420px) {
        bottom: 16vw;
        right: 45px;
      }
    }
    .sign_img {
      width: 80px;
      height: 30px;
      position: absolute;
      z-index: 999;
      bottom: -0.8%;
      left: 25px;
      @media screen and (min-width: 375px) {
        bottom: -1vw;
        left: 25px;
      }
      @media screen and (min-width: 390px) {
        bottom: 6vw;
        left: 25px;
      }
      @media screen and (min-width: 410px) {
        bottom: 16vw;
        left: 25px;
      }
      @media screen and (min-width: 420px) {
        bottom: 23vw;
        left: 25px;
      }
    }
    .time {
      width: 130px;
      height: 12px;
      line-height: 12px;
      font-size: 9px;
      position: absolute;
      color: #454545;
      @media screen and (min-width: 375px) {
        bottom: -6vw;
        left: 35px;
      }
      @media screen and (min-width: 390px) {
        bottom: 1vw;
        left: 35px;
      }
      @media screen and (min-width: 410px) {
        bottom: 11vw;
        left: 35px;
      }
      @media screen and (min-width: 420px) {
        bottom: 17.5vw;
        left: 35px;
      }
    }

    .contract-img {
      width: 100%; /* 设置图片宽度为容器的100% */
      height: auto;
    }
  }

  .sign {
    width: 100%;
    height: auto;
    border: 1px solid #454545;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 30px;
  }
}

.bottom-from {
  width: 90%;
  height: auto;
  margin: auto;
  margin-top: 10px;
}
</style>
