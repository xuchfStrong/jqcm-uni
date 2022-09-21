<!-- 邀请码 -->
<template>
  <view class="content">
		<view class="section-title" style="padding-top:10px;">邀请码说明</view>
    <view class="desc">1. 邀请新用户使用辅助可以得到奖励,每邀请一个新用户都可以获得一次奖励，被邀请的玩家输入你的邀请码领取奖励时候，他和你都能免费获得 {{days}} 天的辅助时间。</view>
    <view class="desc">2. 同一个账号不同的区服的邀请码不一样，新用户使用那个邀请码就会将时间赠送给对应的区服。</view>
		<view class="desc">3. 新用户只有充值之后才能领取奖励。</view>
    <view class="invite-wrap">
      <view>我的邀请码：</view>
      <view class="code-wrap">
        <text class="invite-code">{{ myInviteCode }}</text>
        <text style="color: #007aff;cursor: pointer;padding-left: 20px;" @tap="doCopy">复制</text>
      </view>
    </view>
    <view>领取奖励：</view>
    <input class="input-border" style="height: 70upx; border-radius: 10upx;" placeholder-class="placeholder" @input="handleInput" v-model="inviteCode" placeholder="请输入别人的邀请码" />
  
    <view class="save-btn">
			<button type="primary" size="mini" :loading="statusLoading" :disabled="statusLoading" @tap="handleSubmit">提交</button>
		</view>
		
<!-- 		<view class="uni-divider">
			<view class="uni-divider__content">邀请记录</view>
			<view class="uni-divider__line"></view>
		</view> -->
		
		<view class="section-title" style="padding-top:10px;">我邀请的用户</view>
		<uni-table border stripe emptyText="暂无更多数据" >
		  <!-- 表头行 -->
		  <uni-tr>
		    <uni-th align="center" width="150">角色名</uni-th>
		    <uni-th align="center" width="90">时间</uni-th>
		    <uni-th align="center" width="70">奖励天数</uni-th>
		    <!-- <uni-th align="center" width="90">推广赠送</uni-th> -->
		  </uni-tr>
		  <!-- 表格数据行 -->
		  <uni-tr v-for="(row, index) in inviteLog" :key="index">
		    <uni-td align="center">{{ row.role_name_dest }}</uni-td>
		    <uni-td align="center">{{ row.create_time | time_filter }}</uni-td>
		    <uni-td align="center">{{ row.days }}</uni-td>
		  </uni-tr>
		</uni-table>
  </view>
</template>

<script>
import save from '@/utils/save'
import { invite,getInviteCode,getInviteLog } from '@/api/game'

export default {
	filters: {
		time_filter(val) {
			return val.substring(0,10)
		}
	},
  data() {
    return {
			statusLoading: false,
      userInfo: {},
      inviteCode: '',
			myInviteCode: '',
			days: 5,
			inviteStatus: undefined,
			inviteLog: []
    }
  },

  components: {},

  computed: {
  },

  watch: {},

  created() {},

  mounted() {},

  onLoad() {
    this.loadLoginInfo()
  },

  methods: {
    handleInput() {
    },

    handleSubmit() {
      if (!this.userInfo.userId || !this.userInfo.server) {
        this.$toast('请检查是否正常登录助手并成功开启云挂机')
        return
      }
      if (!this.inviteCode) {
        this.$toast('请输入邀请码')
        return
      }
      const params = {
        userid: this.userInfo.userId,
        server_id: this.userInfo.server,
        invite_code: this.inviteCode
      }
			this.statusLoading = true
      invite(params).then(res => {
        this.$toast(res.message)
      }).finally(() => {
				this.statusLoading = false
			})
    },

    loadLoginInfo() {
      const gameLoginInfo = save.getGameLoginInfo()
      this.userInfo = gameLoginInfo
			this.handleGetInviteCode()
			this.handleGetInviteLog()
    },
		
		handleGetInviteCode() {
			const params = {
				userid: this.userInfo.userId,
				server_id: this.userInfo.server
			}
			getInviteCode(params).then(res => {
				if (res.code == 200) {
					this.myInviteCode = res.data.invite_code
					this.inviteStatus = res.data.invite_status
					this.days = res.data.days
				} else {
					this.$toast(res.message)
				}
			})
		},
		
		handleGetInviteLog() {
			const params = {
				userid: this.userInfo.userId,
				server_id: this.userInfo.server
			}
			getInviteLog(params).then(res => {
				if (res.code == 200) {
					this.inviteLog = res.data
				} else {
					this.$toast(res.message)
				}
			})
		},

    doCopy() {
			const cpText = this.myInviteCode
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: String(cpText),
				success: function () {
					this.$toast("复制成功")
				}
			})
			// #endif
			// #ifdef H5
			this.$copyText(cpText).then(
        res => {
          this.$toast("复制成功")
        },
        err => {
          this.$toast("复制失败")
        }
			)
			// #endif
		},
  }
}

</script>

<style lang='scss' scoped>
.title {
  font-weight: bold;
}
.desc {
  font-size: 13px;
}
.invite-code {
  font-size: 12px;
}
.invite-wrap {
  padding: 10px 5px;
  margin: 20px 0;
  background: #ebedf0;
  border-radius: 5px;
}
.code-wrap {
  display: flex;
  align-items: center;
}
.input-border {
  border: 1px solid #d5d7d9;
  font-size: 13px;
}
.placeholder {
  font-size: 13px;
}

.save-btn{
	margin: 20upx;
	text-align: center;
}

.section-title {
  padding-bottom: 10rpx;
  font-weight: bold;
}
.section-title:before {
  content:"";
  border-left:4px solid #007aff;
  width:0;
  height:0;
  padding-right: 10px;
}
</style>
