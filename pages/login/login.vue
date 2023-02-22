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
		        <!-- <m-input class="m-input" type="text" :disabled="false"  clearable focus v-model="userInfo.usernamePlatForm" placeholder="请输入账号"></m-input> -->
						<input-autocomplete
								class="unit-item__input"
								v-model="userInfo.usernamePlatForm"
								placeholder="请输入账号"
								highlightColor="#FF0000"
								:stringList="autocompleteStringList"
								v-on:selectItem="selectItemD"/>
		    </view>
		    <view class="input-row">
		        <text class="title">密码：</text>
		        <m-input type="password" displayable v-model="userInfo.passwordPlatForm" placeholder="请输入密码"></m-input>
		    </view>
		</view>

		<view class="btn-row">
		    <button type="primary" class="primary" :loading="statusLoading" :disabled="statusLoading" @tap="handleCheckUserStatus">登录</button>
		</view>

		<!-- <view style="margin-top:10px; color:#1989fa; text-align: center;">
      <a :href="utils.zhushouUrl">
        <text>点击下载登录助手</text>
      </a>
    </view> -->

		<!-- <view>
			<view class="content">
				<view class="sub-title">登录说明:</view>
				<view v-for="(item,index) in loginDescription.description" :key="index" class="item-wrap">{{ item }}</view>
			</view>
		</view> -->

		<uni-popup ref="popup" :mask-click="false">
			<view class="pop-wrap">
				<view style="padding-bottom: 10px;">请选择小号</view>
				<uni-data-checkbox v-model="smallId" mode="list" :localdata="smallList" @change="changeSmallUser"></uni-data-checkbox>
				<view style="display:flex;justify-content: center;">
					<button type="primary" size="mini" class="primary" @tap="chooseSmallUser">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { http } from '@/utils/request.js'
import save from '@/utils/save'
import loginDescription from './loginDescription.json'
// #ifdef H5
import { loginFirstStepShendao } from '@/api/login'
import { loginFirstStep, loginSecondStepByProxy, loginFirstStepWJXL2, loginFirstStepDYDJB, loginSecondStepDYDJB } from '@/api/game'
// #endif
// #ifdef APP-PLUS
import { loginFirstStep, loginFirstStepWJXL2, loginFirstStepShendao, loginFirstStepDYDJB, loginSecondStepDYDJB } from '@/api/loginApp'
// #endif
import { getAction, postAction, postFormAction } from '@/api/manage'
import { loginSecondStep } from '@/api/login'
import { getUtils,getIntUserid,getStrUserid } from '@/api/game'
import { loginThirdStep, loginThirdStepDDJHWJXL1, loginThirdStepWJXL2, loginThirdStepShendao, loginThirdStepDYDJB, loginFirstStepXianfanzhuan, loginThirdStepXianfanzhuan, loginFirstStepRenzhafanpai, loginSedondStepRenzhafanpai } from '@/api/login'
import { loginFirstStepTapTap, loginSecondStepTapTap, loginThirdStepTapTap } from '@/api/login'
import { loginFirstStepZuiqiangxiuxian, loginSecondStepZuiqiangxiuxian } from '@/api/login'
import { loginFirstStepTianyingqiyuan, loginSecondTianyingqiyuan } from '@/api/login'
import { loginFirstStepJHCS, loginSecondStepJHCS, loginFourStepJHCS } from '@/api/login'
import { loginFirstStepXiuzhenguilai, loginSecondStepXiuzhenguilai, loginThirdStepXiuzhenguilai } from '@/api/login'
import { loginThirdStepJHCS } from '@/api/loginApp'
import { loginFirstStepFeixianjueGYY } from '@/api/game'
import { loginFirstStepFeixianjueJiaozishouyou, loginFirstStepJiaozishouyouH5 } from '@/api/game'
import { loginFirstStepBinghuyouxi, 
				 loginFirstStep3011,
				 loginFirstStepYXY,
				 loginFirstStepYXYSzlm,
				 loginFirstStepYXYJqcmWzxz,
				 loginFirstStep3011JqcmWzxz,
				 loginFirstStep3011JqcmH5,
				 loginFirstStepJzsyJqcmWzxz,
				 loginFirstStepGyyJqcmWzxz,
				 loginFirstStepWjxl2Direct,
				 loginFirstStepJiaozishouyouXzgl,
				 loginFirstStepBingHuo,
				 loginFirstStepAjcq,
				 loginFirstStepXXBY,
				 loginFirstStepBatu,
				 loginFirstStepMilu,
				 loginWgzz,
				 loginFirstStepWyqk,
				 loginFirstStepBTZKepan,
				 loginFirstStepBTZBinghuo } from '@/api/game'
import { addUser, checkUserStatus, getRemoteOptions } from '@/api/game'
import { handleGetServerConfig,
		handleGetServerConfigTapTap,
		handleGetServerConfigOther,
		handleGetServerConfigWJXL,
		handleGetServerConfigWJXL2,
		handleGetServerConfigDJJH,
		handleGetServerConfigDJJHWJXL,
		handleGetServerConfigXianfanzhuan,
		handleGetServerConfigZuiqiangxiuxian,
		handleGetServerConfigFeixianjueGYY,
		handleGetServerBTZ
		} from '@/utils/server'
import { genRandomNumber, randomString, genUUID, genMac, getValueByIndex, getIndexByValue, parseSearchArgs, genMultipartFormData } from '@/utils/index'
import { encryptByDESModeCBC, decryptByDESModeCBC } from '@/utils/encrypt'
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
			statusLoading: false,
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
			autocompleteStringList: [],
			smallId: undefined,
			smallList: [{"value": 0,"text": "篮球"	},{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}],
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
				strUserId: '', // 字符串形式的userid，最强修仙编辑器这才是真实的userid
				uid: '', // 渠道登录的时候uid和userId不同
				token: '',
				token_type: '',
				channelId: '',
				pfId: '',
				time: '',
				PHPSESSID: ''
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
		//响应选择事件，接收选中的数据
    selectItemD(data) {
				this.userInfo.passwordPlatForm = data.password
    },

		openPop() {
			this.smallId = undefined
			this.$refs.popup.open()
		},

		closePop() {
			this.$refs.popup.close()
		},

		changeSmallUser(e){
			this.loginInfo.userId = this.smallId
		},

		chooseSmallUser() {
			this.closePop()
			if ([48,49,51].includes(this.userInfo.loginType)) {
				handleGetServerBTZ(2,'jwbt', this.loginInfo.userId, 3).then(serverInfo => {
					this.serverInfo = serverInfo
					this.handleAddUser()
				})
			}
			if ([36].includes(this.userInfo.loginType)) {
				this.handleLoginCwzxz3011Step2()
			}
			if ([41].includes(this.userInfo.loginType)) {
				this.handleLoginCwzxzBinghuoStep2()
			}
			if ([52].includes(this.userInfo.loginType)) {
				this.handleLoginXzmnqBinghuoStep2()
			}
		},

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
			this.statusLoading = true
			const self = this
			setTimeout(function() { self.statusLoading = false }, 5000)
			checkUserStatus(param).then(res => {
				if (res.code === 200) {
					// 获取用户信息
					this.saveAccountList(this.userInfo.usernamePlatForm, this.userInfo.passwordPlatForm)
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
						handleGetServerConfigWJXL(this.loginInfo.channelId, this.loginInfo.userId, 7).then(serverInfo => {
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
						handleGetServerConfigWJXL(this.loginInfo.channelId, this.loginInfo.userId, 8).then(serverInfo => {
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
					} else if (this.userInfo.loginType === 17) { // 神道
						// #ifdef APP-PLUS
						this.handleLoginFirstStepShendao()
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(6084, this.loginInfo.userId, 11).then(serverInfo => {
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
					} else if (this.userInfo.loginType === 18) { // 道友渡劫不
						// #ifdef APP-PLUS
						this.handleLoginFirstStepDYDJB()
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(6109, this.loginInfo.userId, 16).then(serverInfo => {
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
					} else if ([19,20,21,22].includes(this.userInfo.loginType)) { // 仙凡传,蛮荒异世录,蜀山剑诀,我要飞升(苹果)
						// #ifdef APP-PLUS
						this.handleLoginFirstStepXianfanzhuan()
						// #endif
						// #ifdef H5
						handleGetServerConfigXianfanzhuan(6090, this.loginInfo.userId, 10).then(serverInfo => {
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
					} else if ([23].includes(this.userInfo.loginType)) { // 画江湖盟主
						// #ifdef APP-PLUS
						this.handleLoginFirstStepXianfanzhuan()
						// #endif
						// #ifdef H5
						handleGetServerConfigXianfanzhuan(6106, this.loginInfo.userId, 12).then(serverInfo => {
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
					} else if ([24].includes(this.userInfo.loginType)) { // 最强修仙编辑器
						// #ifdef APP-PLUS
						this.handleLoginFirstStepZuiqiangxiuxian()
						// #endif
						// #ifdef H5
						this.handleGetStrUid(res.userid)
						uni.showToast({
							title: '登录成功，请选择服务器后，点击开始挂机。',
							duration: 2000,
							icon: 'none'
						})
						// #endif
					} else if ([25].includes(this.userInfo.loginType)) { // 人渣反派修仙
						// #ifdef APP-PLUS
						this.handleLoginFirstStepRenzhafanpai()
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(6102, this.loginInfo.userId, 11).then(serverInfo => {
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
					}  else if ([26].includes(this.userInfo.loginType)) { // 飞仙诀(羔羊游)
						// #ifdef APP-PLUS
						this.handleLoginFirstStepFeixianjueGYY()
						// #endif
						// #ifdef H5
						handleGetServerConfigFeixianjueGYY(270,'changwei2', this.loginInfo.userId, 2).then(serverInfo => {
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
					} else if ([27].includes(this.userInfo.loginType)) { // 江湖传说
						// #ifdef APP-PLUS
						this.handleLoginFirstStepJHCS()
						// #endif
						// #ifdef H5
						handleGetServerConfigWJXL(6152, this.loginInfo.userId, 20).then(serverInfo => {
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
					} else if ([28].includes(this.userInfo.loginType)) { // 修真归来)
						handleGetServerConfigWJXL(6147, this.loginInfo.userId,19).then(serverInfo => {
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
					} else if ([29].includes(this.userInfo.loginType)) { // 飞仙诀(饺子手游))
						handleGetServerConfigFeixianjueGYY(2005, 'changwei2', this.loginInfo.userId,2).then(serverInfo => {
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
					} else if ([30].includes(this.userInfo.loginType)) { // 冰湖游戏)
						handleGetServerConfigTapTap(6196, this.loginInfo.userId).then(serverInfo => {
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
					} else if ([31].includes(this.userInfo.loginType)) { // 饺子手游剑气除魔H5)
						handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
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
					} else if ([32].includes(this.userInfo.loginType)) { // 3011游戏)
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
					} else if ([33].includes(this.userInfo.loginType)) { // 游戏鸭)
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
					} else if ([34].includes(this.userInfo.loginType)) { // 游戏鸭神之六面)
						handleGetServerConfigXianfanzhuan(this.loginInfo.channelId, this.loginInfo.userId, 21).then(serverInfo => {
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
					} else if ([35].includes(this.userInfo.loginType)) { // 游戏鸭剑气除魔文字修真)
						handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
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
					} else if ([36].includes(this.userInfo.loginType)) { // 3011剑气除魔文字修真)
						this.handleLoginCwzxz3011Step1()
					} else if ([37].includes(this.userInfo.loginType)) { // 3011剑气除魔H5)
						handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
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
					} else if ([38].includes(this.userInfo.loginType)) { // 饺子手游-剑气除魔(纯文字修真)
						handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
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
					} else if ([39].includes(this.userInfo.loginType)) { // 羔羊游-剑气除魔(纯文字修真)
						handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
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
					} else if ([40].includes(this.userInfo.loginType)) { // 饺子手游-修真归来
						handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
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
					} else if ([41].includes(this.userInfo.loginType)) { // 冰火游戏
						// handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						// 	this.serverInfo = serverInfo
						// 	this.flag.showServer = true
						// 	this.saveLoginInfo()
						// 	this.toMain()
						// })
						this.handleLoginCwzxzBinghuoStep1()
					} else if ([42].includes(this.userInfo.loginType)) { // 傲剑苍穹
						handleGetServerConfigWJXL(6194, this.loginInfo.userId, 12).then(serverInfo => {
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
					} else if ([43].includes(this.userInfo.loginType)) { // 修仙霸业
						handleGetServerConfigWJXL(6230, this.loginInfo.userId, 12).then(serverInfo => {
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
					} else if ([44].includes(this.userInfo.loginType)) { // 巴兔
						handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
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
					} else if ([45].includes(this.userInfo.loginType)) { // 咪噜
						handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
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
					} else if ([46].includes(this.userInfo.loginType)) { // 万古至尊
						handleGetServerConfigWJXL(6238, this.loginInfo.userId, 12).then(serverInfo => {
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
					} else if ([47].includes(this.userInfo.loginType)) { // 五岳乾坤
						handleGetServerConfigWJXL(6157, this.loginInfo.userId, 18).then(serverInfo => {
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
					} else if ([48].includes(this.userInfo.loginType)) { // 补天志可盘
						this.handleLoginBTZKepanStep1()
					} else if ([49].includes(this.userInfo.loginType)) { // 补天志冰火
						this.handleLoginBTZBinghuoStep1()
					} else if ([50].includes(this.userInfo.loginType)) { // 补天志游戏鸭
						handleGetServerBTZ(2,'jwbt', this.loginInfo.userId, 3).then(serverInfo => {
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
					} else if ([51].includes(this.userInfo.loginType)) { // 补天志BTGO
						this.handleLoginBTZBTGOStep1()
					} else if ([52].includes(this.userInfo.loginType)) { // 冰火-修真模拟器
						this.handleLoginXzmnqBinghuoStep1()
					} else if ([53].includes(this.userInfo.loginType)) { // 28纯文字修真
						this.handleLogin28CwzxzStep1()
					} else if ([54].includes(this.userInfo.loginType)) { // 游戏鸭-天子令-修真模拟器
						this.handleLoginYxyTzlXzmnqStep1()
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
						this.handleLoginFirstStepShendao() // 神道
					} else if (this.userInfo.loginType === 18) {
						this.handleLoginFirstStepDYDJB() // 道友渡劫不
					} else if ([19,20,21,22,23].includes(this.userInfo.loginType)) { // 仙凡传,蛮荒异世录,蜀山剑诀,我要飞升(苹果)
						this.handleLoginFirstStepXianfanzhuan()
					} else if (this.userInfo.loginType === 24) {
						this.handleLoginFirstStepZuiqiangxiuxian() // 最强修仙编辑器 
					}	else if (this.userInfo.loginType === 25) {
						this.handleLoginFirstStepRenzhafanpai() // 人渣反派 
					}	else if (this.userInfo.loginType === 26) {
						this.handleLoginFirstStepFeixianjueGYY() // 飞仙诀(羔羊游)
					}	else if (this.userInfo.loginType === 27) {
						this.handleLoginFirstStepJHCS() // 江湖传说
					} else if (this.userInfo.loginType === 28) {
						this.handleLoginFirstStepXiuzhenguilai() // 修真归来
					} else if (this.userInfo.loginType === 29) {
						this.handleLoginFirstStepFeixianjueJiaozishouyou() // 飞仙诀(饺子手游)
					} else if (this.userInfo.loginType === 99) {
						this.handleLoginFirstStepTianyingqiyuan() // 天影奇缘
					} else if (this.userInfo.loginType === 30) {
						this.handleLoginFirstStepBinghuyouxi() // 冰湖游戏天
					}	else if (this.userInfo.loginType === 31) {
						this.handleLoginFirstStepJiaozishouyouH5() // 饺子手游-剑气除魔
					} else if (this.userInfo.loginType === 32) {
						this.handleLoginFirstStep3011() // 3011游戏
					} else if (this.userInfo.loginType === 33) {
						this.handleLoginFirstStepYXY() // 游戏鸭
					} else if (this.userInfo.loginType === 34) {
						this.handleLoginFirstStepYXYSzlm() // 游戏鸭神之六面
					} else if (this.userInfo.loginType === 35) {
						this.handleLoginFirstStepYXYJqcmWzxz() // 游戏鸭剑气除魔文字修真
					} else if (this.userInfo.loginType === 36) {
						this.handleLoginCwzxz3011Step1() // 3011剑气除魔文字修真
					} else if (this.userInfo.loginType === 37) {
						this.handleLoginFirstStep3011JqcmH5() // 3011剑气除魔H5登录
					} else if ([38].includes(this.userInfo.loginType)) { // 饺子手游-剑气除魔(纯文字修真)
						this.handleLoginFirstStepJzsyJqcmCwzxz()
					} else if ([39].includes(this.userInfo.loginType)) { // 羔羊游-剑气除魔(纯文字修真)
						this.handleLoginFirstStepGyyJqcmCwzxz()
					} else if (this.userInfo.loginType === 40) { // 饺子手游修真归来
						this.handleLoginFirstStepJiaozishouyouXzgl()
					} else if (this.userInfo.loginType === 41) { // 冰火游戏
						this.handleLoginCwzxzBinghuoStep1()
					} else if (this.userInfo.loginType === 42) { // 傲剑苍穹
						this.handleLoginFirstStepAojianCangQiong()
					} else if (this.userInfo.loginType === 43) { // 修仙霸业
						this.handleLoginFirstStepXiuxianbaye()
					} else if (this.userInfo.loginType === 44) { // 巴兔平台
						this.handleLoginFirstStepBatu()
					} else if (this.userInfo.loginType === 45) { // 咪噜平台
						this.handleLoginFirstStepMilu()
					} else if (this.userInfo.loginType === 46) { // 万古至尊
						this.handleLoginFirstStepWGZZ()
					} else if (this.userInfo.loginType === 47) { // 五岳乾坤
						this.handleLoginFirstStepWYQK()
					} else if (this.userInfo.loginType === 48) { // 补天志-可盘
						this.handleLoginBTZKepanStep1()
					} else if (this.userInfo.loginType === 49) { // 补天志-冰火
						this.handleLoginBTZBinghuoStep1()
					} else if (this.userInfo.loginType === 50) { // 补天志-游戏鸭
						this.handleLoginBTZYXYStep1()
					} else if (this.userInfo.loginType === 51) { // 补天志-BTGO
						this.handleLoginBTZBTGOStep1()
					} else if (this.userInfo.loginType === 52) { // 冰火修真模拟器
						this.handleLoginXzmnqBinghuoStep1()
					} else if (this.userInfo.loginType === 53) { // 28手游纯文字修真
						this.handleLogin28CwzxzStep1()
					} else if (this.userInfo.loginType === 54) { // 游戏鸭-天子令-修真模拟器
						this.handleLoginYxyTzlXzmnqStep1()
					} else {
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
		
		
		handleLoginFirstStepWJXL2Old() {
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

		// 无尽修炼2登录第一步
		handleLoginFirstStepWJXL2() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepWjxl2Direct(params).then(res => {
				if (res.code == 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.token = res.token
					this.loginInfo.channelId = res.channelId
					handleGetServerConfigWJXL2(6072, this.loginInfo.userId, 8).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
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

		// shendao登录第一步
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

		// 道友渡劫不登录第一步
		handleLoginFirstStepDYDJB() {
			if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
			}
			const md5Pwd = CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
			const params = {
				package_id: 38,
				name: this.userInfo.usernamePlatForm,
				password: md5Pwd
			}
			const md5Str = this.userInfo.usernamePlatForm + "38" + md5Pwd
			const md5Key = '.0b5d6f6f7b1ecbf7ceeaddbc81c11ebb'
			const md5Sign = CryptoJS.MD5(md5Str + md5Key).toString()
			const signLoginObj = {
				package_id: 38,
				name: this.userInfo.usernamePlatForm,
				password: md5Pwd,
				md5_sign: md5Sign
			}
			const signLogin = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(signLoginObj)))
			const header = {
				sign: signLogin,
				sdkversion: '2.0',
				processid: 0,
				deviceType: 'ANDROID',
				version: '1.4',
				actionid: 0,
				channel: 'ZH_CN',
				product: 'SDK_ZH_CN'
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepDYDJB(params, header).then(res => {
				if (res.code === 200) {
          this.loginInfo.token_type = res.data.token_type
          this.loginInfo.token = res.data.access_token
          this.handleLoginSecondStepDYDJB()
        } else {
          this.flag.showServer = false
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
        }
			}).catch(err => {
        console.log(err)
      })
		},

		// 道友渡劫不登录第二步
		handleLoginSecondStepDYDJB() {
			const params = {}
			const header = {
				sdkversion: '2.0',
				processid: 0,
				deviceType: 'ANDROID',
				version: '1.4',
				actionid: 0,
				channel: 'ZH_CN',
				product: 'SDK_ZH_CN',
				Authorization: this.loginInfo.token_type + ' ' + this.loginInfo.token
			}
			loginSecondStepDYDJB(params, header).then(res => {
				if (res.code === 200) {
          this.loginInfo.userId = res.data.id
          this.handleLoginSecondStep()
        } else {
          this.flag.showServer = false
					uni.showToast({
						title: res.message,
						duration: 2000,
						icon: 'none'
					})
        }
			}).catch(err => {
        console.log(err)
      })
		},

		// 仙凡传登录第一步
		handleLoginFirstStepXianfanzhuan() {
		  if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
		  this.userInfo.udid = genRandomNumber(15)
		  let loginData = {
				imei: '',
				androidid: '',
				imsi: '',
				uuid: this.userInfo.aid || genUUID(),
				os: 1,
				gamekey: 'vQhKJMvaYEHwmvFb',
				fenbaoid: '',
				gamepkgname: 'com.cxgame.xfz',
				gamepkgversion: '0.0.1',
				gamebuildversion: '0.0.1',
				osversion: '9',
				carrier: '中国电信',
				devicemodel: 'HUAWEI LYA-AL00',
				screensize: '1080x2145',
				scene: 'unknown',
				mac_address: this.userInfo.mac || genMac(),
				sdkversion: '1.0.0',
				batterylevel: '94%',
				batterystate: 'charging',
				netstate: '4G',
				game_key: 'vQhKJMvaYEHwmvFb',
				sdk_type: 'js-h5',
				login_type: '1',
				account: this.userInfo.usernamePlatForm, // 用户名
				password: this.userInfo.passwordPlatForm, // 密码
				agree_agreement: false
			}
			if (this.userInfo.loginType == 21) { //蜀山剑诀
				loginData.gamekey = 'hMCYytjybhQrPClg'
				loginData.game_key = 'hMCYytjybhQrPClg'
			}
			if (this.userInfo.loginType == 22) { //我要飞升(苹果)
				loginData.gamekey = 'ptFztWrZANurZdhj'
				loginData.game_key = 'ptFztWrZANurZdhj'
			}
			if (this.userInfo.loginType == 23) { //画江湖盟主
				loginData.gamekey = 'bNIArCSJRRFcRzQH'
				loginData.game_key = 'bNIArCSJRRFcRzQH'
			}
			if (this.userInfo.loginType == 20) { // 蛮荒异世录
				loginData = {
					idfa: 'unknown',
					idfv: 'unknown',
					devicename: 'unknown',
					uuid: this.userInfo.aid || genUUID(),
					os: 0,
					gamekey: 'mYuyiprgumiVhEYL',
					fenbaoid: '',
					gamepkgname: 'browser',
					gamepkgversion: '1.0.0',
					gamebuildversion: '1.0.0',
					osversion: '12.4.7',
					carrier: 'unknown',
					devicemodel: 'unknown',
					screensize: '736x414',
					scene: 'unknown',
					mac_address: this.userInfo.mac || genMac(),
					sdkversion: '1.0.0',
					batterylevel: 'unknown',
					batterystate: 'unknown',
					netstate: '未知',
					localInfo: '',
					game_key: 'mYuyiprgumiVhEYL',
					sdk_type: 'js-h5',
					login_type: 1,
					account: this.userInfo.usernamePlatForm, // 用户名
					password: this.userInfo.passwordPlatForm, // 密码
					agree_agreement: false
				}
			}
			if (!isNaN(this.userInfo.usernamePlatForm)) { // 手机号码登录
				loginData.login_type = 2
			}
			console.log('loginData.login_type', loginData.login_type)
			const DESKey = 'f9drs5uy'
			const param = {
				data: encryptByDESModeCBC(JSON.stringify(loginData), DESKey)
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepXianfanzhuan(param).then(res => {
		    if (res.code === 200) {
					const data = decryptByDESModeCBC(res.data, DESKey)
					const dataObj = JSON.parse(data)
					this.loginInfo.userId = dataObj.uid
					this.loginInfo.token = dataObj.token
		      this.handleLoginSecondStep()
		    } else {
		      this.flag.showServer = false
					uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
					})
		    }
		  }).catch(err => {
		    console.log(err)
		  })
		},

		// 最强修仙编辑器登录第一步
		handleLoginFirstStepZuiqiangxiuxian() {
			if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
			}
			const md5pwassword = CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
			let loginData = {
				user_name: this.userInfo.usernamePlatForm, // 用户名
				password: CryptoJS.MD5(this.userInfo.passwordPlatForm + md5pwassword).toString(), // 密码
				time: Date.parse(new Date()) / 1000,
				app_id: 110001432,
				and_id: 'ab819ae90275647c',
				oaid: 'eccb27ae5bfc808d',
				os: 'android',
				ad_id: 'null',
				device_id: 'ffffffff-9f7d-ffff-0033-c5870033c587',
				imei: '',
				login_type: 1,
				sdk_version: '3.2.9.0',
				device_name: 'Xiaomi M2006J10C',
				game_version: '1.6.8',
				os_version: 10,
				channel: 'ibn_zqxxbjq_and_xjy_150'
			}
			const keyArray = ['ad_id', 'and_id', 'app_id', 'channel', 'device_id',
												'device_name', 'game_version', 'imei', 'login_type', 'oaid',
												'os', 'os_version', 'password', 'sdk_version', 'time', 'user_name']
			let signStr = ''
			keyArray.forEach(key => {
				const onekv = `${key}=${loginData[key]}`
				signStr += onekv
			})
			signStr = signStr + '7d02437ff9eaaa33577d7e33e66d942e'
			const sign = CryptoJS.MD5(signStr).toString()
			loginData.sign = sign
			loginFirstStepZuiqiangxiuxian(loginData).then(res => {
				if (res.ret === '1') {
					const authorize_code = res.content.authorize_code
					this.handleLoginSecondStepZuiqiangxiuxian(authorize_code)
				} else {
					this.$toast(res.msg)
				}
			})
		},

		// 最强修仙编辑器登录第二步
		handleLoginSecondStepZuiqiangxiuxian(sid) {
			const params = {
				gameId: 120000143,
				channelId: 2,
				appId: 110001432,
				sid: sid,
				extra: 'bn'
			}
			loginSecondStepZuiqiangxiuxian(params).then(res => {
				this.loginInfo.strUserId = res.userid
				handleGetServerConfigZuiqiangxiuxian(1, this.loginInfo.strUserId, 1).then(serverInfo => {
					this.serverInfo = serverInfo
					this.handleGetIntUid(this.loginInfo.strUserId)
				})
			})
		},

		// 人渣反派登录第一步
		handleLoginFirstStepRenzhafanpai() {
			if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
			const signObj = {
				ad_id: '0',
				android_id: '9b2272b3e1f2e0d6',
				app_id: 10033,
				app_secret: 'dTAmr9M2DicEtsi6',
				bundle_id: 'com.jingxiagame.android.jqcm.rzfpxxxt',
				imei: '',
				imsi: 'f93c578b-c306-4af8-9cd2-922aa1fd1080',
				m_id: '0',
				oaid: 'eccb27ae5bfc808d',
				os: 2,
				package_version: '1.1.20',
				password: this.userInfo.passwordPlatForm,
				sdk_version: '2.1.19',
				timestamp: Date.parse(new Date()) / 1000,
				username: this.userInfo.usernamePlatForm
			}
			const singStr = this.parseParams(signObj)
			const params = {
				ad_id: '0',
				android_id: '9b2272b3e1f2e0d6',
				app_id: 10033,
				app_secret: 'dTAmr9M2DicEtsi6',
				bundle_id: 'com.jingxiagame.android.jqcm.rzfpxxxt',
				imei: '',
				imsi: 'f93c578b-c306-4af8-9cd2-922aa1fd1080',
				m_id: '0',
				oaid: 'eccb27ae5bfc808d',
				os: 2,
				package_version: '1.1.20',
				password: this.userInfo.passwordPlatForm,
				sdk_version: '2.1.19',
				timestamp: Date.parse(new Date()) / 1000,
				username: this.userInfo.usernamePlatForm,
				sign: CryptoJS.MD5(singStr).toString()
			}
			loginFirstStepRenzhafanpai(params).then(res => {
				if (res.err_code === 0) {
					this.handleLoginSecondStepRenzhafanpai(res.result.uid)
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: res.err_msg,
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 人渣反派登录第二步
		handleLoginSecondStepRenzhafanpai(uid) {
			if (!uid) {
				uni.showToast({
					title: '未成功获取到uid',
					duration: 2000,
					icon: 'none'
				})
		    return
		  }
			const params = {
				r: 'auth/authorize',
				game_id: 1440,
				package_id: 'sd_h5jx_02',
				idfa: '',
				identif: '',
				UnallowToke: true,
				username: 'KFGame' + uid,
				password: uid,	
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginSedondStepRenzhafanpai(params).then(res => {
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

		// 修真归来登录第一步
		handleLoginFirstStepXiuzhenguilai() {
			if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
				uni.showToast({
					title: '请输入用户名和密码',
					duration: 2000,
					icon: 'none'
				})
		    return
			}
			const timeStamp = Date.parse(new Date()) / 1000
			const boundary = randomString(20)
			let loginData = {
				androidid: '',
				duid: 'ebfc5e1b2fe59617bb217690f81bce3e',
				gid: 1000559,
				htid: '',
				idfa: '00000000-0000-0000-0000-000000000000',
				idfv: '',
				imei: '',
				mac: '',
				oaid: '',
				pid: '45',
				refer: '45_1000559_10164_1',
				sdkver: '1.0.3',
				time: timeStamp,
				uname: this.userInfo.usernamePlatForm,
				upwd: this.userInfo.passwordPlatForm,
				utm: '',
				version: 'junshanggame20200202'
			}
			const keyArray = ['androidid', 'duid', 'gid', 'htid', 'idfa',
												'idfv', 'imei', 'mac', 'oaid', 'pid', 'refer',
												'sdkver', 'time', 'uname', 'upwd', 'utm', 'version']
			let signStr = ''
			keyArray.forEach((key, index) => {
				let onekv = ''
				if (index > 0) {
					onekv = `&${key}=${loginData[key]}`
				} else {
					onekv = `${key}=${loginData[key]}`
				}
				signStr += onekv
			})
			const sign = CryptoJS.MD5(signStr).toString()
			loginData.sign = sign
			loginData.version = ''
			const multipart = genMultipartFormData(loginData, boundary)
			loginFirstStepXiuzhenguilai(multipart, boundary).then(res => {
				if (res.state === 1) {
					const token = res.data.token
					this.handleLoginSecondStepXiuzhenguilai(token)
				} else {
					this.$toast(res.msg)
				}
			})
		},

		//修真归来登录第二步获取token
		handleLoginSecondStepXiuzhenguilai(token) {
			const appId = 6
			const channelId = 6147
			const version = '1.0'
			const timeStamp = Date.parse(new Date()) / 1000
			const signObj = {
				token: token
			}
			const str1 = JSON.stringify(signObj)
			const arr = [appId, channelId, str1, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			const params = {
				appId: appId,
				channelId: channelId,
				deviceId: '',
				sign: CryptoJS.MD5(singStr).toString(),
				ts: timeStamp,
				version: version,
				data: str1
			}
			loginSecondStepXiuzhenguilai(params).then(res => {
				if (res.code === 1) {
					if (!res.data.userId) {
						uni.showToast({
							title: '获取userID失败，请重新登录',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6147, this.loginInfo.userId, 19).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					uni.showToast({
						title: res.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			})
		},

		//修真归来登录第三步
		handleLoginThirdStepXiuzhenguilai() {

		},

		// 天影奇缘登录第一步
		handleLoginFirstStepTianyingqiyuan() {
			const params = {
				r: 'auth/authorize',
				game_id: 1526,
				package_id: 'sdel_and_02',
				imei: '',
				UnallowToke: true,
				username: 'eLang' + this.userInfo.usernamePlatForm,
				password: this.userInfo.usernamePlatForm,	
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepTianyingqiyuan(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.token = res.result.access_token
					this.loginInfo.userId = res.result.user_id
					this.handleLoginSecondStepTianyingqiyuan()
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

		// 天影奇缘登录第二步获取token
		handleLoginSecondStepTianyingqiyuan() {
			const appId = 6
			const channelId = 6142
			const subChannelId = 6142
			const version = '1.5.0'
			const timeStamp = Date.parse(new Date()) / 1000
			const signObj = {
				token: this.loginInfo.token,
				userId: this.loginInfo.userId
			}
			const str1 = JSON.stringify(signObj)
			const arr = [appId, channelId, str1, this.userInfo.aid, subChannelId, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const params = {
				appId: appId,
				channelId: channelId,
				subChannelId: subChannelId,
				deviceId: this.userInfo.aid,
				sign: CryptoJS.MD5(singStr).toString(),
				ts: timeStamp,
				version: version,
				data: str1
			}
			loginSecondTianyingqiyuan(params).then(res => {
				if (res.code === 1) {
					if (!res.data.userId) {
						uni.showToast({
							title: '获取userID失败，请重新登录',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6142, this.loginInfo.userId, 9).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					uni.showToast({
						title: res.msg,
						duration: 2000,
						icon: 'none'
					})
				}
			})
		},

		// 飞仙诀(羔羊游)登录第一步
		handleLoginFirstStepFeixianjueGYY() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepFeixianjueGYY(params).then(res => {
				if (res.code === 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.time = res.time
					this.loginInfo.token = res.token
					handleGetServerConfigFeixianjueGYY(270,'changwei2', this.loginInfo.userId,2).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 飞仙诀(饺子手游)登录第一步
		handleLoginFirstStepFeixianjueJiaozishouyou() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepFeixianjueJiaozishouyou(params).then(res => {
				if (res.code === 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.time = res.time
					this.loginInfo.token = res.token
					handleGetServerConfigFeixianjueGYY(2005, 'changwei2', this.loginInfo.userId,2).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// (饺子手游)剑气除魔H5登录第一步
		handleLoginFirstStepJiaozishouyouH5() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepJiaozishouyouH5(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// (饺子手游)修真归来登录第一步
		handleLoginFirstStepJiaozishouyouXzgl() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepJiaozishouyouXzgl(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 冰火游戏登录第一步
		handleLoginFirstStepBingHuo() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepBingHuo(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 28纯文字修真
		handleLogin28CwzxzStep1() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			const url = '/login/28cwzxz/step1.py'
			postFormAction(url,params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.smallId = res.data.channelUserId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 游戏鸭-天子令-修真模拟器
		handleLoginYxyTzlXzmnqStep1() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			const url = '/login/yxyTzlXzmnq/step1.py'
			postFormAction(url,params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.smallId = res.data.channelUserId
					handleGetServerConfigWJXL(6246, this.loginInfo.userId,35).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 纯文字修真-冰火登录-获取小号
		handleLoginCwzxzBinghuoStep1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/cwzxzBh/step1.py'
			postFormAction(url, params).then(res => {
				if (res.code == 200) {
					this.smallList = []
					this.loginInfo.token = res.data.token
					res.data.small_list.forEach(item => {
						const oneItem = {
							text: item.nickname,
							value: item.small_id
						}
						this.smallList.push(oneItem)
						this.openPop()
					})
				} else {
					this.$toast('获取小号失败')
				}
			})
		},

		// 纯文字修真-冰火登录-第二步
		handleLoginCwzxzBinghuoStep2() {
			const params = {
				user_id: this.smallId,
				token: this.loginInfo.token
			}
			const url = '/login/cwzxzBh/step2.py'
			postFormAction(url, params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},


		// 纯文字修真-冰火登录-获取小号
		handleLoginXzmnqBinghuoStep1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/bhXzmnq/step1.py'
			postFormAction(url, params).then(res => {
				if (res.code == 200) {
					this.smallList = []
					this.loginInfo.token = res.data.token
					res.data.small_list.forEach(item => {
						const oneItem = {
							text: item.nickname,
							value: item.small_id
						}
						this.smallList.push(oneItem)
						this.openPop()
					})
				} else {
					this.$toast('获取小号失败')
				}
			})
		},

		// 修真模拟器-冰火登录-第二步
		handleLoginXzmnqBinghuoStep2() {
			const params = {
				user_id: this.smallId,
				token: this.loginInfo.token
			}
			const url = '/login/bhXzmnq/step2.py'
			postFormAction(url, params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6246, this.loginInfo.userId,35).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 傲剑苍穹登录第一步
		handleLoginFirstStepAojianCangQiong() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm,
				appid: '2391849227',
				sdkver: 13,
				remember: 1,
				imei: '',
				oaid: '',
				idfa: ''
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepAjcq(params).then(res => {
				console.log('res', res)
				if (res.code === 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.token = res.token
					this.handleLoginSecondStep()
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 修仙霸业登录第一步
		handleLoginFirstStepXiuxianbaye() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm,
				appid: '4046410912',
				remember: 1,
				imei: '',
				idfa: ''
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepXXBY(params).then(res => {
				console.log('res', res)
				if (res.code === 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.token = res.token
					this.handleLoginSecondStep()
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 巴兔登录第一步
		handleLoginFirstStepBatu() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepBatu(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 巴兔登录第一步
		handleLoginFirstStepMilu() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepMilu(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6215, this.loginInfo.userId,26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 万古至尊登录第一步
		handleLoginFirstStepWGZZ() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginWgzz(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6238, this.loginInfo.userId,12).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 五岳乾坤登录第一步
		handleLoginFirstStepWYQK() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepWyqk(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					handleGetServerConfigWJXL(6157, this.loginInfo.userId,18).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 补天志-可盘登录第一步
		handleLoginFirstStepBTZKepan() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepBTZKepan(params).then(res => {
				if (res.result == true) {
					this.loginInfo.userId = res.data.uid
					this.loginInfo.token = res.data.token
					handleGetServerBTZ(2,'jwbt', this.loginInfo.userId, 3).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 补天志-冰火登录第一步
		handleLoginFirstStepBTZBinghuo() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepBTZBinghuo(params).then(res => {
				if (res.result == true) {
					this.loginInfo.userId = res.data.uid
					this.loginInfo.token = res.data.token
					handleGetServerBTZ(2,'jwbt', this.loginInfo.userId, 3).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 补天志-游戏鸭登录第一步
		handleLoginBTZYXYStep1() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			const url = '/login/btzYXY/btzYxyLogin.py'
			postFormAction(url, params).then(res => {
				if (res.userData) {
					this.loginInfo.userId = res.userData.uid
					this.loginInfo.token = res.userData.token
					handleGetServerBTZ(2,'jwbt', this.loginInfo.userId, 3).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 补天志-冰火登录-获取小号
		handleLoginBTZBinghuoStep1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/btzBinghuo/step1.py'
			postFormAction(url, params).then(res => {
				if (res.code == 200) {
					this.smallList = []
					res.data.small_list.forEach(item => {
						const oneItem = {
							text: item.nickname,
							value: item.small_id
						}
						this.smallList.push(oneItem)
						this.openPop()
					})
				} else {
					this.$toast('获取小号失败')
				}
			})
		},

		// 补天志-可盘登录-获取小号
		handleLoginBTZKepanStep1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/btzKepan/step1.py'
			postFormAction(url, params).then(res => {
				if (res.accounts) {
					this.smallList = []
					res.accounts.forEach(item => {
						const oneItem = {
							text: item.name,
							value: item.id
						}
						this.smallList.push(oneItem)
						this.openPop()
					})
				} else {
					this.$toast('获取小号失败')
				}
			})
		},

		// 补天志-BT狗登录-获取小号
		handleLoginBTZBTGOStep1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/btzBTGO/step1.py'
			postFormAction(url, params).then(res => {
				if (res.length > 0) {
					const userdata = res.find(item => item.cmd == 102)
					if (userdata && userdata.code == 1) {
						this.smallList = []
						userdata.data.altlist.forEach(item => {
							const oneItem = {
								text: item.nickname,
								value: item.altid
							}
							this.smallList.push(oneItem)
							this.openPop()
						})
					} else {
						this.$toast('获取小号失败1')
					}
				} else {
					this.$toast('获取小号失败2')
				}
			})
		},


		// 冰湖游戏登录第一步
		handleLoginFirstStepBinghuyouxi() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepBinghuyouxi(params).then(res => {
				if (res.code === 200) {
					this.loginInfo.userId = res.userid
					this.loginInfo.token = res.token
					this.handleLoginSecondStepBinghuyouxi({userid: res.userid, token: res.token})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 冰湖游戏登录第二步
		handleLoginSecondStepBinghuyouxi(urlParams) {
			const appId = 6
			const channelId = 6196
			const version = '2.0.2'
			const timeStamp = Date.parse(new Date()) / 1000
			const data = {
				uid: urlParams.userid,
				token: urlParams.token,
			}
			const dataStr = JSON.stringify(data)
			const arr = [appId, channelId, dataStr, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const sign = CryptoJS.MD5(singStr).toString()
			const params = {
				deviceId: '',
				data: data,
				appId: 6,
				channelId: 6196,
				version: version,
				ts: timeStamp,
				sign: sign
			}
			loginThirdStepJHCS(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					// handleGetServerConfigWJXL(6152, this.loginInfo.userId, 20).then(serverInfo => {
					handleGetServerConfigTapTap(6196, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 3011登录第一步
		handleLoginFirstStep3011() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStep3011(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfig(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 游戏鸭登录第一步
		handleLoginFirstStepYXY() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepYXY(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigTapTap(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 游戏鸭登神之六面录第一步
		handleLoginFirstStepYXYSzlm() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepYXYSzlm(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigXianfanzhuan(this.loginInfo.channelId, this.loginInfo.userId, 21).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 游戏鸭剑气除魔文字修真登录第一步
		handleLoginFirstStepYXYJqcmWzxz() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepYXYJqcmWzxz(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 3011剑气除魔文字修真登录第一步
		handleLoginFirstStep3011JqcmWzxz() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStep3011JqcmWzxz(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 纯文字修真-3011登录-获取小号
		handleLoginCwzxz3011Step1() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			const url = '/login/cwzxz3011/step1.py'
			postFormAction(url, params).then(res => {
				if (res.code == 200) {
					this.smallList = []
					this.loginInfo.token = res.data.token
					this.loginInfo.timeStamp = res.data.timeStamp
					res.data.subList.forEach(item => {
						const oneItem = {
							text: item.nickname,
							value: item.uid
						}
						this.smallList.push(oneItem)
						this.openPop()
					})
				} else {
					this.$toast('获取小号失败')
				}
			})
		},

		// 纯文字修真-3011登录-第二步
		handleLoginCwzxz3011Step2() {
			const params = {
				uid: this.smallId,
				token: this.loginInfo.token,
				timestamp: this.loginInfo.timestamp,
			}
			const url = '/login/cwzxz3011/step2.py'
			postFormAction(url, params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 3011剑气除魔H5登录第一步
		handleLoginFirstStep3011JqcmH5() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStep3011JqcmH5(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 饺子手游-剑气除魔(纯文字修真)登录第一步
		handleLoginFirstStepJzsyJqcmCwzxz() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepJzsyJqcmWzxz(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 羔羊游-剑气除魔(纯文字修真)登录第一步
		handleLoginFirstStepGyyJqcmCwzxz() {
			this.loginInfo.PHPSESSID = randomString(26)
			const params = {
				username: this.userInfo.usernamePlatForm,
				password: this.userInfo.passwordPlatForm
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepGyyJqcmWzxz(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6215, this.loginInfo.userId, 26).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleLoginThirdStep()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 江湖传说登录第一步
		handleLoginFirstStepJHCS() {
			const params = {
				username: this.userInfo.usernamePlatForm,
				pass: this.userInfo.passwordPlatForm,
				client: 0,
				aid: 2680,
				mob: 'ios',
				appkey: '9d30375ebd0242aeb3da84ad2fc53158'
			}
			if (!this.userInfo.aid ) this.userInfo.aid = genUUID()
			loginFirstStepJHCS(params).then(res => {
				if (res.code === '0') {
					this.loginInfo.userId = res.data.userid
					this.loginInfo.token = res.data.token
					const tokenPart2 = res.data.token.split('.')[1]
					const plainStr = CryptoJS.enc.Base64.parse(tokenPart2).toString(CryptoJS.enc.Utf8)
					const tokenPart2Obj = JSON.parse(plainStr)
					this.handleLoginSecondStepJHCS(this.loginInfo.token, tokenPart2Obj.uid)
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 江湖传说登录第二步
		handleLoginSecondStepJHCS(token, uid) {
			const params = {
				client: 'ios',
				appkey: '9d30375ebd0242aeb3da84ad2fc53158',
				token: token,
				account: uid
			}
			console.log('uid', uid)
			loginSecondStepJHCS(params).then(res => {
				if (res.status === 1) {
					const urlParams = parseSearchArgs(res.url)
					this.handleLoginThirdStepJHCS(urlParams)
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},

		// 江湖传说登录第三步
		handleLoginThirdStepJHCS(urlParams) {
			const appId = 6
			const channelId = 6152
			const version = '1.0'
			const timeStamp = Date.parse(new Date()) / 1000
			const data = {
				username: urlParams.username,
				userId: urlParams.userid,
				isAdult: "1",
				avatar: urlParams.avatar,
				sex: "",
				vaildCode: urlParams.vaildCode,
				time: urlParams.time,
				sign: urlParams.sign
			}
			const dataStr = JSON.stringify(data)
			const arr = [appId, channelId, dataStr, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const sign = CryptoJS.MD5(singStr).toString()
			const params = {
				deviceId: '',
				appId: 6,
				channelId: 6152,
				version: version,
				ts: timeStamp,
				data: data,
				sign: sign
			}
			loginThirdStepJHCS(params).then(res => {
				if (res.code === 1) {
					this.loginInfo.userId = res.data.userId
					this.loginInfo.token = res.data.token
					this.loginInfo.channelId = res.data.channelId
					handleGetServerConfigWJXL(6152, this.loginInfo.userId, 20).then(serverInfo => {
						this.serverInfo = serverInfo
						this.handleAddUser()
					})
				} else {
					this.flag.showServer = false
					uni.showToast({
							title: '登录失败',
							duration: 2000,
							icon: 'none'
					})
				}
			})
		},


		// 获取后台生成的intUid
		handleGetIntUid(struid) {
			const params = {
				struid: struid
			}
			getIntUserid(params).then(res => {
				if (res.code == 200) {
					this.loginInfo.userId = res.userid
					this.handleAddUser()
				}else {
					this.$toast('获取intuid参数错误')
				}
			})
		},

		// 获取后台的struid
		handleGetStrUid(intuid) {
			const params = {
				intuid: intuid
			}
			getStrUserid(params).then(res => {
				if (res.code == 200) {
					this.loginInfo.strUserId = res.userid
					handleGetServerConfigZuiqiangxiuxian(1, this.loginInfo.strUserId, 1).then(serverInfo => {
						this.serverInfo = serverInfo
						this.flag.showServer = true
						this.saveLoginInfo()
						this.toMain()
					})
				} else if (res.code == 403) {
					this.$toast('获取struid参数错误')
				} else if (res.code == 404){
					this.$toast('没有获取到struid')
				}
			})
		},


		/* url参数处理*/
    parseParams(data) {
      const paramsArr = []
      for (const i in data) {
        var key = encodeURIComponent(i)
        var value = data[i] ? encodeURIComponent(data[i]) : ''
        paramsArr.push(key + '=' + value)
      }
      return paramsArr.join('&')
    },

		// 登录第二步，获取usertoken
		async handleLoginSecondStep() {
			let site = 'jqcm_data'
			let appId = 6
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
			} else if (this.userInfo.loginType === 17) { // 神道
				channelId = 6084
				signObj = {
					userId: this.loginInfo.userId,
					token: this.loginInfo.sessionid
				}
			} else if (this.userInfo.loginType === 18) { // 道友渡劫不
				channelId = 6109
				signObj = {
					userId: this.loginInfo.userId,
					token: this.loginInfo.token
				}
			} else if ([19,20,21,22].includes(this.userInfo.loginType)) { // 仙凡传,蛮荒异世录,蜀山剑诀,我要飞升(苹果)
				channelId = 6090
				version = '1.0'
				signObj = {
					uid: this.loginInfo.userId,
					token: this.loginInfo.token
				}
			} else if ([23].includes(this.userInfo.loginType)) { // 画江湖盟主
				channelId = 6106
				version = '1.0'
				signObj = {
					uid: this.loginInfo.userId,
					token: this.loginInfo.token
				}
			} else if (this.userInfo.loginType === 25) { // 人渣反派
				channelId = 6102
				signObj = {
					token: this.loginInfo.sessionid,
					userId: this.loginInfo.userId
				}
			} else if (this.userInfo.loginType === 42) { // 傲剑苍穹
				channelId = 6194
				version = '1.0'
				signObj = {
					token: this.loginInfo.token,
					uid: this.loginInfo.userId
				}
			} else if (this.userInfo.loginType === 43) { // 修仙霸业
				channelId = 6230
				version = '1.0'
				signObj = {
					token: this.loginInfo.token,
					uid: this.loginInfo.userId
				}
			}
			const timeStamp = Date.parse(new Date()) / 1000
			const str1 = JSON.stringify(signObj)
			const arr = [appId, channelId, str1, this.userInfo.aid, timeStamp, version, 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
			const singStr = arr.join('#')
			const param = {
				appId: appId,
				channelId: channelId,
				deviceId: this.userInfo.aid,
				sign: CryptoJS.MD5(singStr).toString(),
				ts: timeStamp,
				version: version,
				data: str1
			}
			try {
				// // #ifdef APP-PLUS
				// const res = await loginSecondStep(param)
				// // #endif
				// // #ifdef H5
				// const uriParams = this.parseParams(param)
				// const getTokenUrl = `http://ufo.66hjh.com/user/v1/token?${uriParams}`
				// const paramProxy = {
				// 	url: getTokenUrl
				// }
				// const res = await loginSecondStepByProxy(paramProxy)
				// // #endif
				const res = await loginSecondStep(param)
				if (res.code === 1) {
					if (!res.data.userId) {
						uni.showToast({
							title: '获取userID失败，请重新登录',
							duration: 2000,
							icon: 'none'
						})
						return
					}
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
						handleGetServerConfigWJXL(6030, this.loginInfo.userId, 7).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 14) { // 无尽修炼2
						handleGetServerConfigWJXL2(6072, this.loginInfo.userId).then(serverInfo => {
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
					} else if (this.userInfo.loginType === 17) { // 神道
						handleGetServerConfigWJXL(6084, this.loginInfo.userId, 11).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if (this.userInfo.loginType === 18) { // 道友渡劫不
						handleGetServerConfigWJXL(6109, this.loginInfo.userId, 16).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepDYDJB()
						})
					} else if ([19,20,21,22].includes(this.userInfo.loginType)) { // 仙凡传,蛮荒异世录,蜀山剑诀,我要飞升(苹果)
						handleGetServerConfigXianfanzhuan(6090, this.loginInfo.userId, 10).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepXianfanzhuan()
						})
					} else if ([23].includes(this.userInfo.loginType)) { // 画江湖盟主
						handleGetServerConfigXianfanzhuan(6106, this.loginInfo.userId, 12).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStepXianfanzhuan()
						})
					} else if ([25].includes(this.userInfo.loginType)) { // 人渣反派
						handleGetServerConfigWJXL(6102, this.loginInfo.userId, 11).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if ([42].includes(this.userInfo.loginType)) { // 傲剑苍穹
						handleGetServerConfigWJXL(6194, this.loginInfo.userId, 12).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					} else if ([43].includes(this.userInfo.loginType)) { // 修仙霸业
						handleGetServerConfigWJXL(6230, this.loginInfo.userId, 12).then(serverInfo => {
							this.serverInfo = serverInfo
							this.handleLoginThirdStep()
						})
					}
				} else {
					uni.showToast({
						title: '获取token失败',
						duration: 2000,
						icon: 'none'
					})
				}
			} catch(e) {
				console.error(e)
				uni.showToast({
					title: '获取token失败，请重新登录',
					duration: 2000,
					icon: 'none'
				})
			}
		},

		
		// 登录第三步
    handleLoginThirdStep() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
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
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
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
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
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
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
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
		
		// 登录第三步-神道
    handleLoginThirdStepShendao() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
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
		
		// 登录第三步-道友渡劫不
    handleLoginThirdStepDYDJB() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
      }
      loginThirdStepDYDJB(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 登录第三步-仙凡传
    handleLoginThirdStepXianfanzhuan() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
				channelId: this.loginInfo.channelId,
				version: '1.5.0'
      }
      loginThirdStepXianfanzhuan(param).then(res => {
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
				small_id: this.smallId,
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
        mac: this.userInfo.mac || '',
        device_id: this.userInfo.aid || '',
        imei: this.userInfo.udid || '',
        pfid: this.loginInfo.pfId || '',
        timestamp: this.loginInfo.time || '',
        token: this.loginInfo.token || '',
        uname_md5: CryptoJS.MD5(this.userInfo.usernamePlatForm).toString(),
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
      }
      addUser(param).then(res => {
        if (res.code === 200) {
					this.flag.showServer = true
					this.saveAccountList(this.userInfo.usernamePlatForm, this.userInfo.passwordPlatForm)
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

		// 将登录成功的用户名密码添加到autocompleteStringList中
		saveAccountList(username,password) {
			const indexUsername = this.autocompleteStringList.findIndex((item) => {
				return item.text === username
			})
			if (indexUsername === -1) {
				if (this.autocompleteStringList.length >= 5) {
					this.autocompleteStringList.pop()
				}
				const userObj = {
					text: username,
					password: password
				}
				this.autocompleteStringList.unshift(userObj)
			} else {
				this.autocompleteStringList[indexUsername].password = password
			}
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
				this.loginInfo.strUserId = gameLoginInfo.strUserId
				this.flag.showServer = gameLoginInfo.showServer
				this.platformName = gameLoginInfo.platformName
				this.serverInfo = gameLoginInfo.serverInfo
				if (Array.isArray(gameLoginInfo.autocompleteStringList)) this.autocompleteStringList = gameLoginInfo.autocompleteStringList
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
				strUserId: this.loginInfo.strUserId,
				showServer: this.flag.showServer,
				platformName: this.platformName,
				serverInfo: this.serverInfo,
				autocompleteStringList: this.autocompleteStringList
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
.unit-item__input {
	text-align: left;
	flex:1;
	padding: 0 10upx;
	min-height: 50upx;
	line-height: 50upx;
	z-index: 1;
}
.pop-wrap {
	background-color: #FFFFFF;
	border-radius: 5px;
	min-height: 150px;
	min-width: 200px;
	padding: 10px;
}
</style>
