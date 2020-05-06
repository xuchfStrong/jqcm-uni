<template>
	<view class="content-login">
		<!-- <view class="uni-title uni-common-pl"></view> -->
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					选择平台：
				</view>
				<view class="uni-list-cell-db">
					<picker @change="changePlatform" :disabled="false" range-key="text" :value="platformIndex" :range="remoteOptions.platform">
						<view class="uni-input">{{platformName}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="input-group">
		    <view class="input-row border">
		        <text class="title">账号：</text>
		        <m-input class="m-input" type="text" :disabled="false"  clearable focus v-model="userInfo.usernamePlatForm" placeholder="请输入账号"></m-input>
		    </view>
		    <view class="input-row">
		        <text class="title">密码：</text>
		        <m-input type="password" displayable v-model="userInfo.passwordPlatForm" placeholder="请输入密码"></m-input>
		    </view>
		</view>

		<view class="btn-row">
		    <button type="primary" class="primary" @tap="handleCheckUserStatus">登录</button>
		</view>
	</view>
</template>

<script>
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { http } from '@/utils/request.js'
import save from '@/utils/save'
import { loginFirstStep, loginSecondStep, loginThirdStep } from '@/api/login'
import { loginFirstStepTapTap, loginSecondStepTapTap, loginThirdStepTapTap } from '@/api/login'
import { handleGetServerConfig, handleGetServerConfigTapTap, handleGetServerConfigOther, handleGetServerConfigWJXL } from '@/utils/server'
import { addUser, checkUserStatus, getRemoteOptions } from '@/api/login'
import { genRandomNumber, genUUID, genMac, getValueByIndex, getIndexByValue } from '@/utils/index'
import service from '../../service.js';
import {mapState,mapMutations} from 'vuex'
import options from '@/utils/options.json'
import mInput from '../../components/m-input.vue'

export default {
	components:{
		mInput
	},
	data() {
		return {
			array: ['中国', '美国', '巴西', '日本'],
			platformIndex: 0,
			platformName: '',
			account: '',
			password: '',
			current: 0,
			options:options,
			remoteOptions: {},
			configInfo: '',
			flag: {
			    loginFlag: false,
			    logoutFlag: false,
			    newUserFlag: false,
			    showServer: false
			},
			userInfo: {
			  usernamePlatForm: '', // 平台的用户名
			  passwordPlatForm: '', // 平台的密码
			  platform: 1, // 这个platform用在像辅助添加用户的时候
			  server: '',
			  endTime: '', // 辅助到期时间
			  deviceType: 'vivo+x5s+l',
			  site: 'jqcm_android',
			  mac: '',
			  uid: '',
			  sessionid: '',
			  adid: '',
			  udid: '',
			  aid: '',
			  openuidi: '',
			  nickname: '',
			  loginType: 1 // 官方平台：1，taptap：2
			},
			loginInfo: { // 登录过程中需要的数据
				sessionid: '',
				userId: '',
				uid: '', // 渠道登录的时候uid和userId不同
				token: '',
				channelId: '',
				pfId: '',
				time: ''
			},
			serverInfo: { // 服务器列表
        client_ip: '',
        server_list: [],
        last_server_list: []
      }		
		}
	},
	onLoad() {
		this.handleGetRemoteOptions()
	},
	methods: {
		// 获取远程选项
		handleGetRemoteOptions() {
			getRemoteOptions()
			.then(res => {
				this.remoteOptions = res
				this.loadLoginInfo()
			})
			.catch(err => {
				console.log(err)
			})
		},
		
		// 在辅助服务端检查用户状态
		handleCheckUserStatus() {
			if (!this.userInfo.loginType) {
				this.$toast("请选择平台")
				return
			}
			const param = {
				uname_md5: CryptoJS.MD5(this.userInfo.usernamePlatForm).toString(), // 用户名
				pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString(), // 密码
				login_type: this.userInfo.loginType
			}
			checkUserStatus(param).then(res => {
				if (res.code === 200) {
					// 获取用户信息
					this.loginInfo.userId = res.userid
					if (this.userInfo.loginType === 1) { // 官方平台
						this.handleLoginFirstStep() // 去服务端校验
					} else if (this.userInfo.loginType === 2) {
						this.handleLoginFirstStepTapTap() // TapTap平台
					} else if (this.userInfo.loginType === 12) {
						this.handleLoginFirstStep() // 无尽修炼
					} else {
						this.loginInfo.userId = this.userInfo.usernamePlatForm
						handleGetServerConfigOther(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {  // 其他平台只需要在后端检查是否存在，如果不存在就需要提取用户名密码
							this.serverInfo = serverInfo
							this.flag.showServer = true
							this.saveLoginInfo()
							this.toMain()
						})
						uni.showToast({
							title: '登录成功，请选择服务器后，点击开始挂机。',
							duration: 2000,
							icon: 'none'
						})
					}
				} else {
					this.flag.newUserFlag = true
					if (this.userInfo.loginType === 1) { // 官方平台
						this.handleLoginFirstStep() // 去服务端校验
					} else if (this.userInfo.loginType === 2) {
						this.handleLoginFirstStepTapTap() // TapTap平台
					} else if (this.userInfo.loginType === 12) {
						this.handleLoginFirstStep() // 无尽修炼
					} else {
						uni.showToast({
							title: '登录失败，请使用登陆助手提取账号密码后再登录。',
							duration: 2000,
							icon: 'none'
						})
					}
				}
			})
		},
		// 登录第一步
		handleLoginFirstStep() {
		  if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
		  const timeStamp = Date.parse(new Date()) / 1000
		  const key = 'c089208f115b3af91c9016aa863d4a8b'
		  this.userInfo.udid = genRandomNumber(15)
		  const param = {
		    device_type: this.userInfo.deviceType,
		    account: this.userInfo.usernamePlatForm, // 用户名
		    password: this.userInfo.passwordPlatForm, // 密码
		    sign: CryptoJS.MD5(key + 'WX' + this.userInfo.site + 'WX' + timeStamp + timeStamp).toString(),
		    time: timeStamp,
		    mac: this.userInfo.mac || genMac(),
		    site: this.userInfo.site,
		    sessionid: this.userInfo.sessionid,
		    version: '6.0.1',
		    channelid: '',
		    uid: this.userInfo.uid,
		    adid: this.userInfo.adid || genRandomNumber(17),
		    udid: this.userInfo.udid,
		    aid: this.userInfo.aid || genUUID(),
		    openuidi: this.userInfo.udid
		  }
		  this.userInfo.mac = param.mac
		  this.userInfo.adid = param.adid
		  this.userInfo.aid = param.aid
			loginFirstStep(param).then(res => {
		    if (res.result === 0) {
		      this.userInfo.nickname = res.data.nickname
					this.loginInfo.sessionid = res.data.sessionid
					this.loginInfo.userId = res.data.uid
		      this.handleLoginSecondStep()
		    } else {
		      this.flag.showServer = false
					uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: 'none'
					})
		    }
		  }).catch(err => {
		    console.log(err)
		  })
		},

		// TapTap登录第一步
    handleLoginFirstStepTapTap() {
      if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
        return
      }
      this.userInfo.aid = this.userInfo.aid || genUUID()
      const timeStamp = Date.parse(new Date()) / 1000
      const key = '9e2ece875dac4b56b4a05525c471f5a5'
      const signStr = 'gameAppId=' + 12 +
                      '&name=' + this.userInfo.usernamePlatForm +
                      '&passport=' + this.userInfo.passwordPlatForm +
                      '&time=' + timeStamp +
                      '&type=' + 1 +
                      '&key=' + key
      const param = {
        gameAppId: 12,
        name: this.userInfo.usernamePlatForm, // 用户名
        passport: this.userInfo.passwordPlatForm, // 密码
        sign: CryptoJS.MD5(signStr).toString(),
        time: timeStamp,
        type: 1
      }
      loginFirstStepTapTap(param).then(res => {
        if (res.code === 0) {
          this.loginInfo.uid = res.id
          this.loginInfo.token = res.accessToken
          this.handleLoginSecondStepTapTap()
        } else {
          this.flag.showServer = false
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon: 'none'
					})
        }
      }).catch(err => {
        console.log(err)
      })
    },

		// 登录第二步，获取usertoken
		handleLoginSecondStep() {
			const timeStamp = Date.parse(new Date()) / 1000
			const signObj = {
				uid: this.loginInfo.userId,
				sessionid: this.loginInfo.sessionid,
				data: {
					site: 'jqcm_data',
					channel: '116',
					uid: this.loginInfo.userId,
					sessionid: this.loginInfo.sessionid,
					userName: this.userInfo.usernamePlatForm
				}
			}
			const str1 = JSON.stringify(signObj)
			let channelId = ''
			if (this.userInfo.loginType === 1) { // 官方平台
				channelId = 6008
			} else if (this.userInfo.loginType === 12) { // 无尽修炼
				channelId = 6030
			}
			const arr = [6, channelId, str1, this.userInfo.aid, timeStamp, '1.2', 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const param = {
				appId: 6,
				channelId: channelId,
				deviceId: this.userInfo.aid,
				sign: CryptoJS.MD5(singStr).toString(),
				ts: timeStamp,
				version: '1.2',
				data: {
					uid: this.loginInfo.userId,
					sessionid: this.loginInfo.sessionid,
					data: {
						site: 'jqcm_data',
						channel: '116',
						uid: this.loginInfo.userId,
						sessionid: this.loginInfo.sessionid,
						userName: this.userInfo.usernamePlatForm
					}
				}
			}
			loginSecondStep(param).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					if (this.userInfo.loginType === 1) { // 官方平台
						handleGetServerConfig(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 12) { // 无尽修炼
						handleGetServerConfigWJXL(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					}
				}
			}).catch(err => {
				console.log(err)
			})
		},

		// TapTap登录第二步，获取usertoken
    handleLoginSecondStepTapTap() {
			console.log('in taptap 2')
      const timeStamp = Date.parse(new Date()) / 1000
      const signObj = {
        uid: this.loginInfo.uid,
        token: this.loginInfo.token,
        uname: this.userInfo.usernamePlatForm
      }
      const str1 = JSON.stringify(signObj)
      const arr = [6, 6002, str1, this.userInfo.aid, timeStamp, '1.2', 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
      const singStr = arr.join('#')
      const param = {
        appId: 6,
        channelId: 6002,
        deviceId: this.userInfo.aid,
        sign: CryptoJS.MD5(singStr).toString(),
        ts: timeStamp,
        version: '1.2',
        data: {
          uid: this.loginInfo.uid,
          token: this.loginInfo.token,
          uname: this.userInfo.usernamePlatForm
        }
      }
      loginSecondStep(param).then(res => {
        if (res.code === 1) {
          this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
          this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigTapTap(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStepTapTap()
					})
        }
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 登录第三步
    handleLoginThirdStep() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStep(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
    },

    // TapTap登录第三步
    handleLoginThirdStepTapTap() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStepTapTap(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
    },

    // 登录游戏辅助，添加新用户
    handleAddUser() {
			let serverId = ''
      if (this.serverInfo.last_server_list) {
        serverId = this.serverInfo.last_server_list[0].value
      } else {
        serverId = this.serverInfo.server_list[0].value
      }
      const param = {
        userid: this.loginInfo.userId,
        last_server_id: serverId,
        login_type: this.userInfo.loginType,
        username: this.userInfo.usernamePlatForm,
        password: this.userInfo.passwordPlatForm,
        platform: this.userInfo.platform,
        phone_num: '',
        sms_code: '',
        wx_qq_account: '',
        channel_userid: '',
        session_id: '',
        mac: this.userInfo.mac,
        device_id: this.userInfo.aid,
        imei: this.userInfo.udid,
        pfid: this.loginInfo.pfId,
        timestamp: this.loginInfo.time,
        token: this.loginInfo.token,
        uname_md5: CryptoJS.MD5(this.userInfo.usernamePlatForm).toString(),
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
      }
      addUser(param).then(res => {
        if (res.code === 200) {
					this.flag.showServer = true
          this.saveLoginInfo()
          if (this.flag.newUserFlag) {
						uni.showToast({
							title: '新用户登录成功，请选择服务器，然后开始挂机',
							duration: 2000,
							icon: 'none'
						})
          } else {
						uni.showToast({
							title: '登录成功',
							duration: 2000,
							icon: 'none'
						})
					}
					this.toMain()
        }
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 读取记住的登录信息
    loadLoginInfo() {
      const gameLoginInfo = save.getGameLoginInfo()
      if (gameLoginInfo) {
        this.userInfo.platform = gameLoginInfo.platform
        this.userInfo.server = gameLoginInfo.server
        this.userInfo.usernamePlatForm = gameLoginInfo.usernamePlatForm
        this.userInfo.passwordPlatForm = gameLoginInfo.passwordPlatForm
        this.userInfo.username = gameLoginInfo.username
        this.userInfo.uid = gameLoginInfo.uid
        this.userInfo.sessionid = gameLoginInfo.sessionid
        this.userInfo.loginType = gameLoginInfo.loginType
        this.loginInfo.userId = gameLoginInfo.userId
				this.flag.showServer = gameLoginInfo.showServer
				this.platformName = gameLoginInfo.platformName
				this.serverInfo = gameLoginInfo.serverInfo
				this.initSaveData()
        // this.serverInfo = JSON.parse(gameLoginInfo.serverInfo)
        // this.handleGuajiStatus()
      }
    },

    // 存储登录信息到LocalStorage
    saveLoginInfo() {
      const gameLoginInfo = {
        platform: this.userInfo.platform,
        server: '',
        usernamePlatForm: this.userInfo.usernamePlatForm,
        passwordPlatForm: this.userInfo.passwordPlatForm,
        uid: this.userInfo.uid,
        sessionid: this.userInfo.sessionid,
        loginType: this.userInfo.loginType,
        username: this.userInfo.username,
        userId: this.loginInfo.userId,
				showServer: this.flag.showServer,
				platformName: this.platformName,
				serverInfo: this.serverInfo
        // serverInfo: JSON.stringify(this.serverInfo)
			}
      save.setGameLoginInfo(gameLoginInfo)
    },

		// 跳转到主页
		toMain() {
			uni.reLaunch({
        url: '../home/home',
      })
		},
		
		// 选择平台
		changePlatform: function(e) {
			if (e.target.value !== -1) {
				this.platformIndex = e.target.value
			} else {
				this.platformIndex = 0
			}
			this.platformName = this.remoteOptions.platform[this.platformIndex].text
			this.userInfo.loginType = getValueByIndex(this.remoteOptions.platform, this.platformIndex)
		},

		// 加载后将存储的数据显示出来
		initSaveData() {
			this.platformIndex = getIndexByValue(this.remoteOptions.platform, this.userInfo.loginType)
			console.log( this.platformIndex)
			if (this.platformIndex !== -1) {
				this.platformName = this.remoteOptions.platform[this.platformIndex].text
			}
		}
	}
}
</script>

<style lang="css" scoped>
.flex-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.left {
	width: 70%;
}
.server-wrap {
	margin-top: 20upx;
}
.btn-center {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20upx;
}
.attr-flex {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.attr-flex-item {
	flex: 1;
	width: 33.3%;
	min-width: 33.3%;
	max-width: 33.3%;
}
.radio-flex {
	/* width: 100%; */
	display: flex;
}
.radio-flex-item {
	flex: 1;
	width: 32%;
	min-width: 32%;
	max-width: 32%;
}
</style>
