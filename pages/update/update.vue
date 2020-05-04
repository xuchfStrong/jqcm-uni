<template>
  <view class="content">
    <view class="summary-wrap">
        <view v-if="hasNewVersion" class="highlight">有新版本，请下载新的版本安装，当前版本为V{{ $global.jqcmVersionName }}</view>
        <view>更新说明：</view>
        <view class="summary-content">
          <view v-for="(item, index) in utils.updateDescription" :key="index">{{ item }}</view>
        </view>

        <view style="margin-top:10px; color:#1989fa;">
          <a v-if="$global.jqcmSaleChannel===1" :href="utils.apkDownloadUrl">
            <text>点击下载辅助APP</text>
          </a>
          <a v-if="$global.jqcmSaleChannel===2" :href="utils.apkDownloadUrl2">
            <text>点击下载辅助APP</text>
          </a>
          <a v-if="$global.jqcmSaleChannel===3" :href="utils.apkDownloadUrl3">
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
      utils: ''
    }
  },
  onLoad() {
    this.handleGetUtils()
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
