<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import { getRoleInfo } from '@/api/manage.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// uniCloud.callFunction({
			// 	name:"test",
			// 	data: {"userid":35887505 , "server_id": 28},
			// 	success: (e) => {
			// 		this.title = e.result
			// 		console.log('onLoadonLoadonLoad')
			// 	}
			// })
			this.handleGetRoleInfo()
			// this.handleLogin()
		},
		methods: {
			async handleGetRoleInfo() {
				try {
					const params = {
						"userid":35887505,
						"server_id": 28
					}
					const header = {
						"access-token": "xxxfff-111-333"
					}
					const res = await getRoleInfo(params, header)
					this.title = res
				} catch (err) {
					console.log(err)
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
