<script>
	import { getUpdate } from '@/api/game'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS  
			const that = this
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
					const jqcmSaleChannel = plus.runtime.channel
					getUpdate().then(data => {
						var wgtUrl = ''
						var pkgUrl = ''
						wgtUrl = data.wgtUrl
						if (jqcmSaleChannel === '0') {
							pkgUrl = data.pkgUrl
						} else if (jqcmSaleChannel === '1') {
							pkgUrl = data.pkgUrl1
						} else if (jqcmSaleChannel === '2') {
							pkgUrl = data.pkgUrl2
						} else if (jqcmSaleChannel === '3') {
							pkgUrl = data.pkgUrl3
						} else if (jqcmSaleChannel === '4') {
							pkgUrl = data.pkgUrl4
						} else if (jqcmSaleChannel === '5') {
							pkgUrl = data.pkgUrl5
						} else if (jqcmSaleChannel === '6') {
							pkgUrl = data.pkgUrl6
						} else if (jqcmSaleChannel === '7') {
							pkgUrl = data.pkgUrl7
						} else if (jqcmSaleChannel === '8') {
							pkgUrl = data.pkgUrl8
						} else if (jqcmSaleChannel === '10') {
							pkgUrl = data.pkgUrl10
						} else if (jqcmSaleChannel === '12') {
							pkgUrl = data.pkgUrl12
						} else if (jqcmSaleChannel === '31') {
							pkgUrl = data.pkgUrl31
						}
			      if (data.version > that.$global.jqcmVersion && wgtUrl && data.updateType ===1 ) {  // 热更新
								// uni.showModal({
								//     title: "发现新版本",
								//     content: "确认下载更新",
								//     success: (res) => {
								//         if (res.confirm) {//当用户确定更新，执行更新
								//             that.doUpData();
								//         } else if (res.cancel) {
								//             // console.log('用户点击取消');
								//         }
								//     }
								// })
			          uni.downloadFile({  
			              url: wgtUrl,  
			              success: (downloadResult) => {  
			                  if (downloadResult.statusCode === 200) {  
			                      plus.runtime.install(downloadResult.tempFilePath, {  
			                          force: true  
			                      }, function() {  
			                          console.log('install success...');  
																uni.showToast({
																	title:"辅助更新成功，即将重启",
																	duration:1000,
																	icon:'none'
																})
																setTimeout(function() {
																  plus.runtime.restart();
																}, 1100)
			                      }, function(e) {  
			                          console.error('install fail...'); 
																 uni.showToast({
																 	title:"辅助更新失败",
																	duration:2000,
																	icon:'none'
																 })
			                      });  
			                  }
			              }  
			          }); 
						}
						if (data.version > that.$global.jqcmVersion && pkgUrl && data.updateType === 2 ) { //整包更新
							uni.showModal({ //提醒用户更新  
								title: "更新提示",  
								content: data.note,  
								success: (res) => {  
									if (res.confirm) {  
										plus.runtime.openURL(pkgUrl);  
									}  
								}  
							})  
						}
					})
			});  
			// #endif
		},
		onShow: function() {
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// 	console.log(JSON.stringify(wgtinfo));
			// 	console.log(wgtinfo.version);//应用版本号
			// })
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		},
		methods: {
			doUpData() {
				uni.showToast({
					title:"更新中"
				})
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
	}

	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content-login {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 20upx;
		padding: 20upx;
	}

	.uni-collapse-item__title.is-open {
		background: #dcdfe6;
	}

	.uni-collapse-item__title-text {
		font-weight: 600;
	}

	.uni-collapse-item__title-box {
		background-color: transparent !important;
	}

	button.primary {
		background-color: #0faeff;
	}
	
	uni-switch {
		transform:scale(0.9)
	}
	 /* #endif*/
</style>
