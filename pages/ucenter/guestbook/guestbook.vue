<template>
	<view class="page">
		<unicloud-db ref="udb" class="content" v-slot:default="{data,pagination,hasMore, loading, error}"
			collection="guestbook,uni-id-users" :where="udbWhere" field="user_id.nickname,user_id._id,user_id.avatar_file,text,_id,state">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view v-for="(item,index) in data" :key="index" class="item">
					<view class="main">
						<cloud-image :src="item.user_id[0].avatar_file.url"></cloud-image>
						<view>
							<text class="nickname">{{item.user_id[0].nickname}}</text>
							<text>{{item.text}}</text>
						</view>
					</view>
					<view class="handle">
						<switch :checked="item.state" @change="setState(item,$event)" />
						<uni-icons @click="deleteItem(item._id)" type="trash" size="18" color="#c9c3cd" />
					</view>
				</view>
				<uni-load-state :state="{data,pagination,hasMore,loading}"></uni-load-state>
			</view>
		</unicloud-db>
		<view class="submit-box">
			<cloud-image class="userImg" width="60rpx" height="60rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image>
			<image class="userImg" v-else src="/static/uni-center/grey.png" mode="widthFix"/>
			<input class="input-box" v-model="text" :disabled="!hasLogin" :placeholder="hasLogin?$t('guestbook.msgContent'):$t('guestbook.notAvailable')" />
			<button @click="text?send():''" class="btn" :class="{active:text}">{{$t('guestbook.send')}}</button>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const guestbookTable = db.collection('guestbook')
	import {
		mapMutations,mapGetters
	} from 'vuex';
	export default {
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			}),
			udbWhere(){
				if(this.hasLogin){
					if( this.uniIDHasRole('AUDITOR') ){
						return ''
					}else{
						return 'state==true || user_id._id==$cloudEnv_uid'
					}
				}else{
					return '"state"==true'
				}
			}
		},
		data() {
			return {
				text: ""
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('guestbook.navigationBarTitle')
			})
		},
		methods: {
			setState(item, e) {
				item.state = e.detail.value
				console.log(item, e);
				this.$refs.udb.update(item._id,{
					state: item.state
				},{
					needConfirm:false,
					toastTitle: this.$t('common').updateSucceeded, // toast提示语
					success: (res) => { // 新增成功后的回调
						let {code,message} = res
						console.log(code,message);
					},
					fail: (err) => { // 新增失败后的回调
						let {message} = err
						console.log(err);
						// 判断没有权限
						uni.showToast({
							title:this.$t('guestbook.noPermission'),
							icon: 'none'
						});
						this.$nextTick(() => {
							item.state = !e.detail.value
						})
					},
					complete: () => { // 完成后的回调 
					}
				})
			},
			deleteItem(id) {
				this.$refs.udb.remove(id, {
					complete: e => {
						console.log(e);
					}
				})
			},
			send() {
				this.$refs.udb.add({
					text: this.text
				},{
					toastTitle:this.$t('guestbook.addSucceeded'), // toast提示语
					success: (res) => { // 新增成功后的回调
						let {code,message} = res
						console.log(code,message);
						this.text = ''
						this.$refs.udb.refresh() //{clear:true}
					},
					fail: (err) => { // 新增失败后的回调
						let {message} = err
						console.log(err);
					},
					complete: () => { // 完成后的回调
					}
				})
			},
			...mapMutations({
				logout: 'user/logout'
			}),
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			if(e.index){
				this.logout()
			}else{
				uni.navigateTo({
					url:"/pages/ucenter/login-page/index/index"
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.content {
		padding-bottom: 110px;
	}

	.item {
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx;
		width: 730rpx;
		margin-left: 10rpx;
		border-radius: 10px;
		margin-top: 10px;
	}
	.item .main,
	.item .handle {
		flex-direction: row;
		align-items: center;
	}

	.item .main text {
		padding: 0 10rpx;
		color: #666666;
		font-size: 24rpx;
	}

	.item .main .nickname {
		font-weight: 600;
	}

	.item .handle switch {
		transform: scale(0.6);
	}

	.submit-box {
		position: fixed;
		flex-direction: row;
		align-items: center;
		bottom: 0;
		padding: 20rpx 15rpx;
		width: 750rpx;
		border-top: solid 1px #efecf2;
		background-color: #ffffff;
		height: 56px;
	}

	.userImg {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100px;
		background-color: #f0eef4;
	}

	.submit-box .input-box {
		background-color: #f8f8f8;
		padding: 15rpx;
		flex-grow: 1;
		margin: 20rpx;
		border-radius: 6px;
		font-size: 24rpx;
	}

	.submit-box .btn {
		height: 30px;
		line-height: 30px;
		font-size: 24rpx;
		width: 80rpx;
		padding: 0;
		color: #888888;
	}

	.submit-box .btn::after {
		display: none;
	}

	.submit-box .btn.active {
		background-color: #007aff;
		color: #FFFFFF;
	}
</style>