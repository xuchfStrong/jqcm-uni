<template>
	<view class="content-login">
		<view class="input-group">
		    <view class="input-row border">
		        <text class="title-lang">原辅助ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable focus v-model="transferInfo.oldUserId" placeholder="请输入辅助续费ID"></m-input>
		    </view>
		    <view class="input-row border">
		        <text class="title-lang">原辅助密码：</text>
		        <m-input type="password" displayable v-model="transferInfo.oldPassword" placeholder="请输入登录辅助的密码"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">原区服ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.oldServerId" placeholder="请输入原区服ID,如481,60019"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">新辅助ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.newUserId" placeholder="请输入辅助续费ID"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">新区服ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.newServerId" placeholder="请输入新区服ID,如801,70010"></m-input>
		    </view>
		</view>

		<view class="btn-center">
		    <button type="primary" class="primary" size="mini" :disabled="disabledBtn" @tap="handleSubmit">提交</button>
		</view>

		<view v-if="transferSuccess" class="result-wrap content">
			<view class="success-title">{{ result.message }}</view>
			<view class="item-wrap">原帐号：{{ result.oldAccount }}</view>
			<view class="item-wrap">新帐号：{{ result.newAccount }}</view>
		</view>

		<view>
			<view class="content">
				<view class="sub-title">自助转卡规则:</view>
				<view v-for="(item,index) in transfer.rules" :key="index" class="item-wrap">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import CryptoJS from 'crypto-js'
import mInput from '../../components/m-input.vue'
import transfer from './transfer.json'
import { transferTime } from '@/api/game'
export default {
	components:{
		mInput
	},
	data() {
		return {
			transfer: transfer,
			disabledBtn: false,
			transferSuccess: false,
			result: '',
			transferInfo: {
				oldUserId: '',
				oldPassword: '',
				oldServerId: '',
				newUserId: '',
				newServerId: ''
			}
		};
	},
	onLoad() {

	},
	methods: {
		handleSubmit() {
			if (!this.transferInfo.oldUserId ||
				!this.transferInfo.oldPassword ||
				!this.transferInfo.oldServerId ||
				!this.transferInfo.newUserId ||
				!this.transferInfo.newServerId) {
				this.$toast('输入信息不全')
				return
			}
			this.disabledBtn = true
			const params = {
				from_id: this.transferInfo.oldUserId,
				from_server: this.transferInfo.oldServerId,
				from_pwd_md5: CryptoJS.MD5(this.transferInfo.oldPassword),
				to_id: this.transferInfo.newUserId,
				to_server: this.transferInfo.newServerId
			}
			transferTime(params).then(res => {
				this.disabledBtn = false
				const code = res.code
				const message = res.message
				if (code === 200) {
					this.$toast('转移成功')
					this.result = res
					this.transferSuccess = true
				} else {
					uni.showModal({
						title: '转移失败',
						content: message,
					})
				}
			}).catch(() => {
				this.disabledBtn = false
			})
		}
	}
}
</script>

<style lang="css" scoped>
.title-lang {
	width: 30%;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}
.content {
  padding: 10rpx 30rpx;
	user-select: text;
}
.sub-title {
	font-weight: 600;
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
