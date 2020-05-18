<template>
  <view class="content">
    <view class="summary-wrap">
        <!-- <view v-if="hasNewVersion" class="highlight">有新版本，请下载新的版本安装，当前版本为V{{ $global.jqcmVersionName }}</view> -->
        <view v-if="showUpdate">
          <button type="primary" plain="true" size="mini" @tap="handleUpdate">更新</button>
				  <text style="width: 10upx; display: inline-block;"></text>
				  <button type="primary" plain="true" size="mini" @tap="hideButton">收起</button>
        </view>
        <view>当前版本为V{{ $global.jqcmVersionName }}</view>
				<view>更新说明：</view>
        <view class="summary-content">
          <view v-for="(item, index) in utils.updateDescription" :key="index">{{ item }}</view>
        </view>

       <view style="margin-top:10px; color:#1989fa;">
          <a v-if="$global.jqcmSaleChannel===1" :href="utils.apkDownloadUrlNew">
            <text>点击下载辅助APP</text>
          </a>
          <a v-if="$global.jqcmSaleChannel===2" :href="utils.apkDownloadUrlNew2">
            <text>点击下载辅助APP</text>
          </a>
          <a v-if="$global.jqcmSaleChannel===3" :href="utils.apkDownloadUrlNew3">
            <text>点击下载辅助APP</text>
          </a>
          <!-- <button type="primary" @tap="downloadImage">下载</button> -->
        </view>
      </view>
  </view>
</template>

<script>
import { getUtils } from '@/api/game'
export default {
  data() {
    return {
      utils: '',
      showUpdate: false
    }
  },
  onLoad() {
    this.handleGetUtils()
  },

  onPullDownRefresh() {
      console.log('refresh');
      this.showUpdate = true
      setTimeout(function () {
          uni.stopPullDownRefresh();
      }, 1000);
  },

  computed: {
    hasNewVersion() {
      // const newVersion = this.$store.getters.newJqcmVersion
      const newVersion = this.utils.version
      const currentVersion = this.$global.jqcmVersion
      return newVersion > currentVersion
    }
  },

  methods: {
    handleGetUtils() {
      getUtils().then(res => {
        this.utils = res
        // this.$store.dispatch('game/changeNewJqcmVersion', res.version)
      }).catch(err => {
        console.log(err)
      })
    },

    downloadImage: function () {
			uni.showLoading({
				title:'下载中'
			})
			var self = this
			uni.downloadFile({
				url: this.utils.apkDownloadUrl,
				success: (res) => {
					console.log('downloadFile success, res is', res)
					self.imageSrc = res.tempFilePath;
					uni.hideLoading();
				},
				fail: (err) => {
					console.log('downloadFile fail, err is:', err)
				}
			})
    },

    hideButton() {
      this.showUpdate = false
    },
    
    handleUpdate() {
      // #ifdef APP-PLUS  
			const that = this
			plus.runtime.getProperty(plus.runtime.appid, function() {  
			    uni.request({  
			        url: 'http://www.huojiangame.com:11658/jqcm/update.php',
			        success: (result) => {  
			          var data = result.data;
                var wgtUrl = data.test.wgtUrl
                var pkgUrl = data.test.pkgUrl
			          if (data.test.version > that.$global.jqcmVersion && wgtUrl && data.test.updateType === 1) { // 热更新
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
                if (data.test.version > that.$global.jqcmVersion && pkgUrl && data.updateType === 2 ) { //整包更新
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
			        }  
			    });  
			});  
			// #endif
    }
  }
}
</script>

<style lang="css" scoped>
  .summary-wrap {
    padding: 0 15upx;
  }
  .summary-content {
    color: #969799;
  }
  .highlight {
    color: red;
  }
</style>
