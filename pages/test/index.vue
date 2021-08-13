<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import { getRoleInfo, login } from '@/api/api.js'
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
			},
			
			async handleLogin() {
				try {
					const params = {
						"userid":35887505,
						"last_server_id":28,
						"login_type": 1,
						"username":"hangyuhu01",
						"password":"hyh147258",
						"uname_md5":"41b30a4f9854dfb730b0d0d684e1ad03",
						"pwd_md5":"ba3bc34e579bd7fb6ab4df4d8a8fd5cf"
					}
					const res = await login(params)
					this.title = res
				} catch (err) {
					console.error(err)
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
