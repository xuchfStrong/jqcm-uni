<template>
	<view class="content-login">
		<!-- <view class="uni-title uni-common-pl"></view> -->
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					选择平台：
				</view>
				<view class="uni-list-cell-db">
					<picker @change="changePlatform" :disabled="false" range-key="text" :value="platformIndex" :range="platformList">
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

		<view style="margin-top:10px; color:#1989fa; text-align: center;">
      <a :href="utils.zhushouUrl">
        <text>点击下载登录助手</text>
      </a>
    </view>

		<view>
			<view class="content">
				<view class="sub-title">登录说明:</view>
				<view v-for="(item,index) in loginDescription.description" :key="index" class="item-wrap">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { http } from '@/utils/request.js'
import save from '@/utils/save'
import loginDescription from './loginDescription.json'
// #ifdef H5
import { loginFirstStep, loginSecondStep,loginSecondStepByProxy, loginFirstStepWJXL2, loginFirstStepShendao } from '@/api/login'
// #endif
// #ifdef APP-PLUS
import { loginFirstStep, loginSecondStep, loginFirstStepWJXL2, loginFirstStepShendao } from '@/api/loginApp'
// #endif
import { getUtils } from '@/api/game'
import { loginThirdStep, loginThirdStepDDJHWJXL1, loginThirdStepWJXL2, loginThirdStepShendao } from '@/api/login'
import { loginFirstStepTapTap, loginSecondStepTapTap, loginThirdStepTapTap } from '@/api/login'
import { handleGetServerConfig,
		handleGetServerConfigTapTap,
		handleGetServerConfigOther,
		handleGetServerConfigWJXL,
		handleGetServerConfigWJXL2,
		handleGetServerConfigDJJH,
		handleGetServerConfigDJJHWJXL} from '@/utils/server'
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
			loginDescription: loginDescription,
			platformIndex: 0,
			platformName: '',
			account: '',
			password: '',
			current: 0,
			options:options,
			remoteOptions: {},
			platformList: [], // 平台信息
			configInfo: '',
			utils: '',
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
		this.handleGetUtils()
	},
	methods: {
		// 获取远程选项
		handleGetRemoteOptions() {
			getRemoteOptions()
			.then(res => {
				this.remoteOptions = res
				if (this.$global.jqcmSaleChannel===6) {
					this.platformList = res.platformShendao
				} else {
					this.platformList = res.platform
				}
				this.loadLoginInfo()
			})
			.catch(err => {
				console.log(err)
			})
		},

		// 获取Utils
		handleGetUtils() {
      getUtils().then(res => {
        this.utils = res
      }).catch(err => {
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
						// #ifdef APP-PLUS
						this.handleLoginFirstStep() // 去服务端校验
						// #endif
						// #ifdef H5
						handleGetServerConfig(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else if (this.userInfo.loginType === 2) {
						// #ifdef APP-PLUS
						this.handleLoginFirstStepTapTap() // TapTap平台
						// #endif
						// #ifdef H5
						handleGetServerConfigTapTap(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else if (this.userInfo.loginType === 12) {
						// #ifdef APP-PLUS
						this.handleLoginFirstStep() // 无尽修炼
						// #endif
						// #ifdef H5
						handleGetServerConfigOther(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else if (this.userInfo.loginType === 14) {
						// #ifdef APP-PLUS
						this.handleLoginFirstStepWJXL2() // 无尽修炼2
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else if (this.userInfo.loginType === 15) { // 单机江湖-渠道服
						// #ifdef APP-PLUS
						this.handleLoginFirstStepDJJH()
						// #endif
						// #ifdef H5
						handleGetServerConfigDJJH(6044, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else if (this.userInfo.loginType === 16) { // 单机江湖-无尽1
						// #ifdef APP-PLUS
						this.handleLoginFirstStepDJJH()
						// #endif
						// #ifdef H5
						handleGetServerConfigDJJHWJXL(6046, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					}  else if (this.userInfo.loginType === 17) { // 剑气除魔
						// #ifdef APP-PLUS
						this.handleLoginFirstStepShendao()
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(6084, this.loginInfo.userId).then(serverInfo => {
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
						// #endif
					} else {
						this.loginInfo.userId = this.userInfo.usernamePlatForm
						handleGetServerConfigOther(this.userInfo.channelid, this.loginInfo.userId).then(serverInfo => {  // 其他平台只需要在后端检查是否存在，如果不存在就需要提取用户名密码
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
					} else if (this.userInfo.loginType === 14) {
						this.handleLoginFirstStepWJXL2() // 无尽修炼2
					} else if (this.userInfo.loginType === 15) {
						this.handleLoginFirstStepDJJH() // 单机江湖-渠道服
					} else if (this.userInfo.loginType === 16) {
						this.handleLoginFirstStepDJJH() // 单机江湖-无尽1
					} else if (this.userInfo.loginType === 17) {
						this.handleLoginFirstStepShendao() // 剑气除魔
					}  else {
						uni.showToast({
							title: '登录失败。',
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
          this.handleLoginSecondStep()
        } else {
          this.flag.showServer = false
					uni.showToast({
						title: res.reason,
						duration: 2000,
						icon: 'none'
					})
        }
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 无尽修炼2登录第一步
		handleLoginFirstStepWJXL2() {
		  if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
		  const timeStamp = Date.parse(new Date()) / 1000
		  const key = '3c6e72643280b10219ea43b9d06c30c6'
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
			loginFirstStepWJXL2(param).then(res => {
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

		// 单机江湖登录第一步
		handleLoginFirstStepDJJH() {
		  if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
		  const timeStamp = Date.parse(new Date()) / 1000
		  const key = 'd42b5fca3c3ce4328c302bb9ffe06443'
		  this.userInfo.udid = genRandomNumber(15)
		  const param = {
		    device_type: this.userInfo.deviceType,
		    account: this.userInfo.usernamePlatForm, // 用户名
		    password: this.userInfo.passwordPlatForm, // 密码
		    sign: CryptoJS.MD5(key + 'WX' + 'jqcmwjxl_android' + 'WX' + timeStamp + timeStamp).toString(),
		    time: timeStamp,
		    mac: this.userInfo.mac || genMac(),
		    site: 'jqcmwjxl_android',
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

		// 剑气除魔登录第一步
		handleLoginFirstStepShendao() {
			if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
			const params = {
				r: 'auth/authorize',
				UnallowToke: true,
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm,
				game_id: 1408,
				package_id: 'sd_gdt_31'
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepShendao(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.sessionid = res.result.access_token
					this.loginInfo.userId = res.result.user_id
					this.handleLoginSecondStep()
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		/* url参数处理*/
    parseParams(data) {
      const paramsArr = []
      for (const i in data) {
        var key = encodeURIComponent(i)
        var value = data[i] ? encodeURIComponent(data[i]) : ''
        if (data[i]) {
          paramsArr.push(key + '=' + value)
        }
      }
      return paramsArr.join('&')
    },

		// 登录第二步，获取usertoken
		async handleLoginSecondStep() {
			let site = 'jqcm_data'
			let channelId = ''
			let version = '1.4'
			let signObj = {
				uid: this.loginInfo.userId,
				sessionid: this.loginInfo.sessionid,
				data: {
					site: site,
					channel: '116',
					uid: this.loginInfo.userId,
					sessionid: this.loginInfo.sessionid,
					userName: this.userInfo.usernamePlatForm
				}
			}
			if (this.userInfo.loginType === 1) { // 官方平台
				channelId = 6008
				version = '1.2'
			} else if (this.userInfo.loginType === 2) { // TapTap
				channelId = 6002
				version = '1.2'
				signObj = {
					uid: this.loginInfo.uid,
					token: this.loginInfo.token,
					uname: this.userInfo.usernamePlatForm
				}
			} else if (this.userInfo.loginType === 12) { // 无尽修炼
				channelId = 6030
			} else if (this.userInfo.loginType === 14) { // 无尽修炼2
				channelId = 6041
			} else if (this.userInfo.loginType === 15) { // 单机江湖-渠道服
				channelId = 6044
				site = 'jqcmwjxl_data'
			} else if (this.userInfo.loginType === 16) { // 单机江湖-无尽1
				channelId = 6046
				site = 'jqcmwjxl_data'
			} else if (this.userInfo.loginType === 17) { // 剑气除魔
				channelId = 6084
				signObj = {
					userId: this.loginInfo.userId,
					token: this.loginInfo.sessionid
				}
			}
			const timeStamp = Date.parse(new Date()) / 1000
			const str1 = JSON.stringify(signObj)
			const arr = [6, channelId, str1, this.userInfo.aid, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const param = {
				appId: 6,
				channelId: channelId,
				deviceId: this.userInfo.aid,
				sign: CryptoJS.MD5(singStr).toString(),
				ts: timeStamp,
				version: version,
				data: str1
			}
			try {
				// #ifdef APP-PLUS
				const res = await loginSecondStep(param)
				// #endif
				// #ifdef H5
				const uriParams = this.parseParams(param)
				const getTokenUrl = `http://ufo.66hjh.com/user/v1/token?${uriParams}`
				const paramProxy = {
					url: getTokenUrl
				}
				const res = await loginSecondStepByProxy(paramProxy)
				// #endif
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					if (this.userInfo.loginType === 1) { // 官方平台
						handleGetServerConfig(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 2) { // TapTap
						handleGetServerConfigTapTap(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepTapTap()
						})
					}  else if (this.userInfo.loginType === 12) { // 无尽修炼
						handleGetServerConfigWJXL(6030, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 14) { // 无尽修炼2
						handleGetServerConfigWJXL2(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepWJXL2()
						})
					} else if (this.userInfo.loginType === 15) { // 单机江湖-渠道服
						handleGetServerConfigDJJH(6044, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 16) { // 单机江湖-无尽1
						handleGetServerConfigDJJHWJXL(6046, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepDJJHWJXL1()
						})
					} else if (this.userInfo.loginType === 17) { // 剑气除魔
						handleGetServerConfigWJXL(6084, this.loginInfo.userId).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					}
				}
			} catch(e) {
				console.error(e)
			}
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
		
	// 登录第三步
    handleLoginThirdStepWJXL2() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStepWJXL2(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
	},
	
	// 登录第三步-单机江湖无尽修炼1
    handleLoginThirdStepDJJHWJXL1() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStepDDJHWJXL1(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 登录第三步-剑气除魔
    handleLoginThirdStepShendao() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStepDDJHWJXL1(param).then(res => {
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
			this.platformName = this.platformList[this.platformIndex].text
			this.userInfo.loginType = getValueByIndex(this.platformList, this.platformIndex)
		},

		// 加载后将存储的数据显示出来
		initSaveData() {
			this.platformIndex = getIndexByValue(this.platformList, this.userInfo.loginType)
			console.log( this.platformIndex)
			if (this.platformIndex !== -1) {
				this.platformName = this.platformList[this.platformIndex].text
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
</style>
