<template>
  <view class="content">
    <uni-collapse accordion="true">
        <uni-collapse-item v-for="(item, index) in gonglue" :key="index" :title="item.title" :open="index === 0">
            <view class="collapse-content">
                <view v-for="(item1,index1) in item.content" :key="index1" class="item-wrap">{{ item1 }}</view>
            </view>
        </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script>
import { getGonglue } from '@/api/game'
export default {
  data() {
    return {
      activeName: 0,
      gonglue: '',
      desc: {
        summary: []
      }
    }
  },
  onLoad() {
    this.handleGetGonglue()
  },

  methods: {
    async handleGetGonglue() {
      this.gonglue = await getGonglue()
    }
  }
}
</script>

<style lang="css" scoped>
  .uni-collapse-cell--open {
		background-color: #ffffff;
  }
  .collapse-content {
    padding: 10rpx 30rpx;
    user-select: text;
  }
  .item-wrap {
    color: #969799;
    padding-bottom: 20rpx;
  }
</style>
