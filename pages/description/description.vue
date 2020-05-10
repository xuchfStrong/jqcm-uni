<template>
  <view class="content">
    <uni-collapse accordion="true">
        <uni-collapse-item title="辅助说明" :open="true">
            <view class="collapse-content">
                <view v-for="item in desc.summary" :key="item" class="item-wrap">{{ item }}</view>
            </view>
        </uni-collapse-item>
        <uni-collapse-item title="普通版说明">
            <view class="collapse-content">
                <view class="item-name">价格：</view>
                <view class="item-wrap">{{ desc.normalVersion.price }}</view>
                <view class="item-name">功能：</view>
                <view v-for="item in desc.normalVersion.features" :key="item" class="item-wrap">{{ item }}</view>
                <view v-if="desc.normalVersion.description">
                  <view class="item-name">说明：</view>
                  <view v-for="item in desc.normalVersion.description" :key="item" class="item-wrap">{{ item }}</view>
                </view>
            </view>
        </uni-collapse-item>
        <uni-collapse-item title="VIP版说明">
            <view class="collapse-content">
                <view class="item-name">价格：</view>
                <view class="item-wrap">{{ desc.vipVersion.price }}</view>
                <view class="item-name">功能：</view>
                <view v-for="item in desc.vipVersion.features" :key="item" class="item-wrap">{{ item }}</view>
                <view v-if="desc.vipVersion.description">
                  <view class="item-name">说明：</view>
                  <view v-for="item in desc.vipVersion.description" :key="item" class="item-wrap">{{ item }}</view>
                </view>
            </view>
        </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script>
import { getDescription } from '@/api/game'
export default {
  data() {
    return {
      activeName: '0',
      desc: {
        contact: '',
        summary: {},
        normalVersion: {
          price: '',
          features: [],
          description: ''
        },
        fullVersion: {
          price: '',
          features: [],
          description: ''
        },
        vipVersion: {
          price: '',
          features: [],
          description: ''
        },
        superVipVersion: {
          price: '',
          features: [],
          description: ''
        }
      }
    }
  },
  onLoad() {
    this.handleGetDescription()
  },

  methods: {
    handleGetDescription() {
      getDescription().then(res => {
        this.desc = res
      })
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
  .item-name {
    padding-bottom: 20rpx;
  }
  .item-wrap {
    color: #969799;
    padding-bottom: 20rpx;
  }
</style>
