<template>
	<view class="page">
		<view class="button-wrap">
			<view style="display: inline-block;">
				<text>多选:</text>
				<switch @change="handleMultiSelect" style="transform:scale(0.7)"/>
			</view>
			<evan-checkbox shape="square" @change ="handleSelectAll" v-if="multiSelect" style="transform:scale(0.9)">全选</evan-checkbox>
			<text @click="deleteMultiItem()" v-if="multiSelect" class="delete">删除</text>
		</view>
		<unicloud-db ref="udb" class="content-wrap" v-slot:default="{data,pagination,hasMore, loading, error}"
			collection="game-account,uni-id-users" :where="udbWhere" field="user_id.nickname,game_id,game_name,account,password">
			<view v-if="error">{{error.message}}</view>
			<evan-checkbox-group ref="eCheckGroup" v-else v-model="idList">
				<view v-for="(item,index) in data" :key="index" class="item">
					<view class="main" @click="chooseItem(item)" >
            <view class="info-item">
							<text class="infoname">游戏:</text>
							<text>{{item.game_name}}</text>
						</view>
						<view class="info-item">
							<text class="infoname">账号:</text>
							<text>{{item.account}}</text>
						</view>
            <view class="info-item">
							<text class="infoname">密码:</text>
							<text>{{item.password}}</text>
						</view>
					</view>
					<view class="handle">
						<evan-checkbox v-if="multiSelect" :label="item._id" checked="false" />
						<uni-icons v-else @click="deleteItem(item._id)" type="trash" size="28" color="#c9c3cd" />
					</view>
				</view>
				<uni-load-state :state="{data,pagination,hasMore,loading}"></uni-load-state>
			</evan-checkbox-group>
		</unicloud-db>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const gameAccountTable = db.collection('game-account')
	import {
		mapMutations,mapGetters
	} from 'vuex';
	export default {
		name:'account',
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			}),
			udbWhere(){
				return "user_id._id==$cloudEnv_uid"
			}
		},
		data() {
			return {
				text: "",
				multiSelect: false,
				idList: []
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '账号管理'
			})
		},
		onReachBottom() { //滚动到底翻页
		  this.$refs.udb.loadMore()
		},
		onPullDownRefresh() { //下拉刷新
		  this.$refs.udb.loadData({
		    clear: true //可选参数，是否清空数据
		  }, () => {
		    uni.stopPullDownRefresh()
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
							title:this.$t('game-account.noPermission'),
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
			deleteMultiItem() {
				if (this.idList.length == 0) {
					this.$toast("请选择需要删除的数据")
					return
				}
				this.$refs.udb.remove(this.idList, {
					success: e => {
						uni.showToast({
						  icon: 'success',
						  title: '删除成功'
						}),
						this.idList = []
					},
					complete: e => {
						console.log(e);
					}
				})
			},
			handleMultiSelect(e) {
				this.multiSelect = e.detail.value
				if (!e.detail.value) this.idList = []
			},
			handleSelectAll(val) {
				if (val) {
					this.$refs.eCheckGroup.selectAll()
				} else {
					this.$refs.eCheckGroup.clearAll()
				}
			},
      chooseItem(item) {
				if (this.multiSelect) return
        uni.showModal({
          content: '选择这个账号登录辅助吗？',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              uni.redirectTo({
                url: `/pages/login/login?id=${item.game_id}&u=${item.account}&p=${item.password}`
              });
            }
        }
        })
      },
			send() {
				this.$refs.udb.add({
					game_name: "无尽试炼",
					game_id: "2",
					account: "u03032315046233",
					password: "u206529"
				},{
					toastTitle:'添加成功', // toast提示语
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

	.content-wrap {
		padding-bottom: 110px;
	}
	
	.button-wrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx 10rpx 10rpx 20rpx;
		width: 730rpx;
		margin-bottom: 10px;
		border-bottom: solid 1upx #efecf2
	},
	
	.button-wrap .link {
		font-size: 28rpx;
		color: #04498c;
		padding-left: 20rpx;
	}
	
	.button-wrap .delete {
		font-size: 28rpx;
		color: #F56C6C;
		padding-left: 20rpx;
	}

	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx;
		width: 730rpx;
		/* margin-left: 10rpx; */
		/* border-radius: 10px; */
		margin-bottom: 10px;
    border-bottom: solid 1upx #efecf2
	}
  .item .main {
    flex: 1
  }
  .info-item {
    flex-direction: row;
  }
	.item .handle {
    padding-left: 20upx;
		flex-direction: row;
		align-items: center;
	}

	.item .main text {
		padding: 0 10rpx;
		color: #666666;
		font-size: 24rpx;
	}

	.item .main .infoname {
		font-weight: 600;
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