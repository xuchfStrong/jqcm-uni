<!--  -->
<template>
  <view class="content-login">
    <view class="desc">
      如果您有在玩的其他游戏，也需要辅助的，可以将相关信息反馈给我们！因为我们做的是云挂机模式，所以我们选择的游戏是类似剑气这种放置类的。
    </view>
    <view class="desc">
      可以将您的联系方式也留下，方便我们联系您！如果我们做该游戏的辅助，您可以成为优先使用的玩家！
    </view>

    <view class="form-wrap">
      <uni-forms :modelValue="formData" label-width="80" label-align="right">
        <uni-forms-item label="游戏名称:" name="gameName">
          <uni-easyinput type="text" v-model="formData.gameName" placeholder="请输入游戏名称" />
        </uni-forms-item>
        <uni-forms-item label="下载平台:" name="platform">
          <uni-easyinput type="text" v-model="formData.platform" placeholder="请输入游戏下载平台" />
        </uni-forms-item>
        <uni-forms-item label="游戏类型:" name="gameType">
          <uni-easyinput type="text" v-model="formData.gameType" placeholder="请输入游戏类型，比如放置修仙" />
        </uni-forms-item>
        <uni-forms-item label="联系方式:" name="contact">
          <uni-easyinput type="text" v-model="formData.contact" placeholder="请填入你的QQ或者微信方便我们联系您" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" :disabled="disabledBtn" @click="submitForm">提交</button>
    </view>
  </view>
</template>

<script>
import mInput from '../../components/m-input.vue'
import { feedback } from '@/api/game'

export default {
  components:{
		mInput
	},
  data() {
    return {
      disabledBtn: false,
      formData: {
        gameName: '',
        platform: '',
        gameType: '',
        contact: ''
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    submitForm() {
      this.disabledBtn = true
      feedback(this.formData).then(res => {
				this.disabledBtn = false
				const code = res.code
				const message = res.message
				if (code === 200) {
					this.$toast('提交成功')
				} else {
					this.$toast('提交失败')
				}
			}).catch(() => {
				this.disabledBtn = false
			})
    }
  }
}

</script>

<style lang="scss" scoped>
.form-wrap {
  background: #fff;
  margin-top: 20upx;
  padding: 10upx 10upx 10upx 20upx;
}

.desc {
  font-size: 12px;
  user-select: text;
}
.item-wrap {
  color: #969799;
  padding-bottom: 20rpx;
}
.btn-center {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20upx 0;
}
.result-wrap {
	margin-bottom: 40upx;
}
.success-title {
	color: #0B9422;
	/* font-size: 36px; */
	font-weight: 600;
}
</style>

