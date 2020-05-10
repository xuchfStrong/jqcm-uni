<template>
	<view class="content-login">
		<view class="input-group">
		    <view class="input-row border">
		        <text class="title-lang">原辅助ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable focus v-model="transferInfo.oldUserId" placeholder="请输入原辅助ID"></m-input>
		    </view>
		    <view class="input-row border">
		        <text class="title-lang">原辅助密码：</text>
		        <m-input type="password" displayable v-model="transferInfo.oldPassword" placeholder="请输入原辅助密码"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">原服务器ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.oldServerId" placeholder="请输入原服务器ID"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">新辅助ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.newUserId" placeholder="请输入新辅助ID"></m-input>
		    </view>
				<view class="input-row border">
		        <text class="title-lang">新服务器ID：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable v-model="transferInfo.newServerId" placeholder="请输入新服务器ID"></m-input>
		    </view>
		</view>

		<view class="btn-center">
		    <button type="primary" class="primary" size="mini" @tap="handleSubmit">提交</button>
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
import mInput from '../../components/m-input.vue'
import transfer from './transfer.json'
export default {
	components:{
		mInput
	},
	data() {
		return {
			transfer: transfer,
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
	method: {
		handleSubmit() {

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
</style>
