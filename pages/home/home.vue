<template>
	<view class="content">		
		<view v-if="flag.showServer">
		  <view class="list-cell">
		      <view class="uni-list-cell-left">
		          有角色的服务器：
		      </view>
		      <view class="uni-list-cell-db">
		          <picker @change="changeLastServer" :value="lastServerIndex" class="bg-picker-gongfa" range-key="text" :range="serverInfo.last_server_list">
		              <view class="uni-input">{{serverNameLast}}</view>
		          </picker>
		      </view>
		  </view>
			<view class="list-cell">
			    <view class="uni-list-cell-left">
			        所有的服务器：
			    </view>
			    <view class="uni-list-cell-db">
			        <picker @change="changeAllServer" :value="allServerindex" class="bg-picker-gongfa" range-key="text" :range="serverInfo.server_list">
			            <view class="uni-input">{{serverNameAll}}</view>
			        </picker>
			    </view>
			</view>
			<view class="list-cell">
		      <view class="uni-list-cell-left">
		          收藏的角色：
		      </view>
		      <view class="uni-list-cell-db">
		          <picker @change="changeSavedRoleList" :value="roleIndex" class="bg-picker-gongfa" range-key="roleName" :range="roleList">
		              <view class="uni-input">{{selectRoleName}}</view>
		          </picker>
		      </view>
		  </view>
			
		</view>
		<view v-if="!flag.showServer" class="btn-row">
		    <button type="primary" @tap="handleLogin">登录</button>
		</view>
		<view v-else>
			<view class="btn-center btn-center-margin">
				<view>
					<button type="primary" plain="true" size="mini" @tap="transferTime">转移辅助</button>
					<text style="width: 10upx; display: inline-block;"></text>
					<button type="primary" plain="true" size="mini" @tap="loginSwitch">切换账号</button>
					<text style="width: 10upx; display: inline-block;"></text>
					<button type="primary" plain="true" size="mini" @tap="handleGetServerList">更新服务器</button>
				</view>
			</view>
			<view  class="btn-center">
				<view>
					<button type="primary" plain="true" size="mini" @tap="handleSaveRole">收藏角色</button>
					<text style="width: 10upx; display: inline-block;"></text>
					<button type="primary" plain="true" size="mini" @tap="handleRemoveRole">移除收藏</button>
					<text style="width: 10upx; display: inline-block;"></text>
					<button type="primary" plain="true" size="mini" @tap="handleClearSaveRole">清空收藏</button>
				</view>
			</view>
		</view>

		<text v-if="utils.showCommon" class="waring-wrap">{{ utils.common }}</text>
		<text v-if="utils.showContact0&&jqcmSaleChannel === '0'" class="waring-wrap">{{ utils.contact0 }}</text>
		<text v-if="utils.showContact&&jqcmSaleChannel === '1'" class="waring-wrap">{{ utils.contact }}</text>
		<text v-if="utils.showContact2&&jqcmSaleChannel === '2'" class="waring-wrap">{{ utils.contact2 }}</text>
		<text v-if="utils.showContact3&&jqcmSaleChannel === '3'" class="waring-wrap">{{ utils.contact3 }}</text>
		<text v-if="utils.showContact4&&jqcmSaleChannel === '4'" class="waring-wrap">{{ utils.contact4 }}</text>
		<text v-if="utils.showContact5&&jqcmSaleChannel === '5'" class="waring-wrap">{{ utils.contact5 }}</text>
		<text v-if="utils.showContact6&&jqcmSaleChannel === '6'" class="waring-wrap">{{ utils.contact6 }}</text>
		<text v-if="utils.showContact7&&jqcmSaleChannel === '7'" class="waring-wrap">{{ utils.contact7 }}</text>
		<text v-if="utils.showContact8&&jqcmSaleChannel === '8'" class="waring-wrap">{{ utils.contact8 }}</text>
		<text v-if="utils.showContact31&&jqcmSaleChannel === '31'" class="waring-wrap">{{ utils.contact31 }}</text>
		
		
		<view class="uni-divider">
			<view class="uni-divider__content">云挂机</view>
			<view class="uni-divider__line"></view>
		</view>
		
		<view>
			<text>平台：</text>
			<text>{{ this.platformName }}</text>
		</view>
		<!-- <view>
			<text>账号：</text>
			<text>{{ userInfo.usernamePlatForm }}</text>
		</view> -->
		<view>
			<text>角色名：</text>
			<text>{{ roleInfo.role_name }}</text>
		</view>
		<view>
			<text>辅助版本类型：</text>
			<text>{{ configInfo.fuzhu_vip | vipStatus }}</text>
		</view>
		<view>
			<text>辅助到期时间：</text>
			<text :class="{danger: fuzuStatus.isExpired}">{{ fuzuStatus.end_time }}</text>
		</view>
		<view>
			<text>数据更新时间：</text>
			<text :class="{danger: isPassedTwoHours}">{{ roleInfo.update_time }}</text>
		</view>
		<view class="fuzhu-info">
			<text>续费请提供此ID：</text>
			<text class="content-wrap">{{ loginInfo.userId }}</text>
			<button class="copy-button" type="primary" plain="true" size="mini" @tap="doCopy">复制</button>
		</view>
		<view>
			<text>云挂机状态：</text>
			<text>{{ configInfo.on_off | statusFilter }}</text>
		</view>
		
		<view class="btn-center">
			<view>
				<button v-if="configInfo.on_off" type="warn" size="mini" @tap="handleStopguaji">停止云挂机</button>
				<button v-else type="primary" size="mini" @tap="handleStartguaji">开启云挂机</button>
				<text style="width: 10upx; display: inline-block;"></text>
				<button :loading="statusLoading" :disabled="statusLoading" type="primary" size="mini" @tap="handleGuajiStatus">获取最新数据</button>
			</view>
		</view>
		
		<view class="uni-divider">
			<view class="uni-divider__content">角色信息</view>
			<view class="uni-divider__line"></view>
		</view>
		
		<view class="attr-flex">
			<view class="attr-flex-item">
				<text>境界：</text>
				<text>{{ roleInfo.role_level | jingjieFilter }}</text>
			</view>
			<view class="attr-flex-item">
				<text>巅峰排名：</text>
				<text>{{ roleInfo.dianfeng_pos }}</text>
			</view>
			<view class="attr-flex-item">
				<text>VIP等级：</text>
				<text>{{ roleInfo.vip_level }}</text>
			</view>
			<view class="attr-flex-item">
				<text>战力：</text>
				<text>{{ roleInfo.zhanli }}</text>
			</view>
			<view class="attr-flex-item">
				<text>主宰层数：</text>
				<text>{{ roleInfo.zhuzai_level }}</text>
			</view>
			<view class="attr-flex-item">
				<text>关卡通关：</text>
				<text>{{ roleInfo.guanqia }}</text>
			</view>
			<view class="attr-flex-item">
				<text>仙缘：</text>
				<text>{{ roleInfo.xianyuan }}</text>
			</view>
			<view class="attr-flex-item">
				<text>霸主层数：</text>
				<text>{{ roleInfo.bazhu_cengshu }}</text>
			</view>
			<view class="attr-flex-item">
				<text>登录天数：</text>
				<text>{{ roleInfo.login_days }}</text>
			</view>
			<view class="attr-flex-item">
				<text>修为：</text>
				<text>{{ roleInfo.xiuwei | valueFormatFilter }}</text>
			</view>
			<view class="attr-flex-item">
				<text>灵币：</text>
				<text>{{ roleInfo.lingbi | valueFormatFilter }}</text>
			</view>
			<view class="attr-flex-item">
			</view>
<!-- 			<view>
				<text>VIP经验：</text>
				<text>{{ notGetChargeValue ? '未获取到':roleInfo.charge_value }}，</text>
        <text v-if="!notGetChargeValue">还差{{ vipUpValue }}升级到VIP{{ roleInfo.vip_level + 1 }}</text>
			</view> -->
		</view>
		
		<view class="uni-divider">
			<view class="uni-divider__content">活动次数</view>
			<view class="uni-divider__line"></view>
		</view>
		
		<view class="attr-flex">
			<view class="attr-flex-item">
				<text>魔族入侵：</text>
				<text>{{ roleInfo.mozuruqin_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>历练食物：</text>
				<text>{{ roleInfo.lilianshiwu }}</text>
			</view>
			<view class="attr-flex-item">
				<text>遗迹开采：</text>
				<text>{{ roleInfo.yijikaicai_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>遗迹进攻：</text>
				<text>{{ roleInfo.yijijingong_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>巅峰次数：</text>
				<text>{{ roleInfo.dianfeng_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>仙斗次数：</text>
				<text>{{ roleInfo.xiandou_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>仙盟建设：</text>
				<text>{{ roleInfo.xianmengjianshe_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>仙盟秘境：</text>
				<text>{{ roleInfo.xianmengmijing_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>魔域次数：</text>
				<text>{{ roleInfo.moyu_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>神兽挑战剩余：</text>
				<text>{{ roleInfo.shenshou_tiaozhan_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>神兽炼化剩余：</text>
				<text>{{ roleInfo.shenshou_lianhua_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>聚灵阵建造：</text>
				<text>{{ roleInfo.jlz_jianzao_times }}</text>
			</view>
			<view class="attr-flex-item">
				<text>聚灵阵火袭：</text>
				<text>{{ roleInfo.jlz_fireTimes }}</text>
			</view>
		</view>

		<view class="uni-divider">
			<view class="uni-divider__content">位面信息</view>
			<view class="uni-divider__line"></view>
		</view>

		<view class="attr-flex">
			<view class="attr-flex-item">
				<text>兵力：</text>
				<text>{{ roleInfo.weimian_bingli }}</text>
			</view>
			<view class="attr-flex-item">
				<text>攻击令：</text>
				<text>{{ roleInfo.weimian_gongjiling }}</text>
			</view>
			<view class="attr-flex-item">
				<text>食物：</text>
				<text>{{ roleInfo.weimian_shiwu }}</text>
			</view>
		</view>
		<view>
			<text>位置：</text>
			<text :class="{danger: isNoWeimian}">{{ roleInfo.weimian_weizhi | weimianFilter }}</text>
		</view>
		
		<view class="uni-divider">
			<view class="uni-divider__content">挂机设置</view>
			<view class="uni-divider__line"></view>
		</view>

		<uni-segmented-control :current="currentTab" :values="items" @clickItem="onClickItem" styleType="button" activeColor="#007aff" style="margin-bottom:20upx;"></uni-segmented-control>
		<view v-show="currentTab === 0" class="uni-list-no-border">
				<view class="uni-list-cell uni-list-cell-pd-mini">
		      <view class="uni-list-cell-db">领取离线倍数</view>
		      <radio-group @change="radioChange" class="flex-lixian-item radio-flex">
			      <label class="radio-flex-item" v-for="(item, index) in lixianbeishuList" :key="item.value">
			        <radio :value="item.value" :checked="index === currentLilianebishu" />{{item.name}}
			      </label>
			    </radio-group>
		    </view>
		    <view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">升聚灵碗</view>
		        <switch :checked="!!configInfo.is_shenglingwan" @change="changeSwitchBoolean('is_shenglingwan')"/>
		    </view>
		    <view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动魔君</view>
		        <switch :checked="!!configInfo.is_modi" @change="changeSwitchBoolean('is_modi')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动日常</view>
		        <switch :checked="!!configInfo.is_richang" @change="changeSwitchBoolean('is_richang')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">日常副本购买-灵币</view>
		        <switch :checked="!!configInfo.is_goumai_richang_lingbi" @change="changeSwitchBoolean('is_goumai_richang_lingbi')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">日常副本购买-精炼石</view>
		        <switch :checked="!!configInfo.is_goumai_richang_jinglian" @change="changeSwitchBoolean('is_goumai_richang_jinglian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">日常副本购买-进阶丹</view>
		        <switch :checked="!!configInfo.is_goumai_richang_jinjie" @change="changeSwitchBoolean('is_goumai_richang_jinjie')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">日常副本购买-升星丹</view>
		        <switch :checked="!!configInfo.is_goumai_richang_shengxing" @change="changeSwitchBoolean('is_goumai_richang_shengxing')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">日常副本购买-注灵石</view>
		        <switch :checked="!!configInfo.is_goumai_richang_zhuling" @change="changeSwitchBoolean('is_goumai_richang_zhuling')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动魔族入侵</view>
		        <switch :checked="!!configInfo.is_mozuruqin" @change="changeSwitchBoolean('is_mozuruqin')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动换高收入位面</view>
		        <switch :checked="!!configInfo.is_change_weimian" @change="changeSwitchBoolean('is_change_weimian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动仙斗</view>
		        <switch :checked="!!configInfo.is_xiandou" @change="changeSwitchBoolean('is_xiandou')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动炼丹</view>
		        <switch :checked="!!configInfo.is_liandan" @change="changeSwitchBoolean('is_liandan')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动仙盟秘境</view>
		        <switch :checked="!!configInfo.is_xianmengmijing" @change="changeSwitchBoolean('is_xianmengmijing')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动洞府炼丹/炼器修炼</view>
		        <switch :checked="!!configInfo.is_liandanlianqixiulian" @change="changeSwitchBoolean('is_liandanlianqixiulian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">21:30之后自动巅峰剩余次数</view>
		        <switch :checked="!!configInfo.is_use_dianfeng" @change="changeSwitchBoolean('is_use_dianfeng')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">神兽山挑战次数买满</view>
		        <switch :checked="!!configInfo.is_goumai_tiaozhan" @change="changeSwitchBoolean('is_goumai_tiaozhan')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">神兽山炼化次数逐次购买</view>
		        <switch :checked="!!configInfo.is_goumai_lianhua" @change="changeSwitchBoolean('is_goumai_lianhua')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">22点之后刷新完神兽次数</view>
		        <switch :checked="!!configInfo.is_auto_shenshou" @change="changeSwitchBoolean('is_auto_shenshou')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动炼制低级法宝</view>
		        <switch :checked="!!configInfo.is_auto_lianqi" @change="changeSwitchBoolean('is_auto_lianqi')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">仙缘购买道侣修炼任务次数</view>
		        <switch :checked="!!configInfo.is_goumai_daolvxiulian" @change="changeSwitchBoolean('is_goumai_daolvxiulian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">仙缘购买道侣游历四方次数</view>
		        <switch :checked="!!configInfo.is_goumai_daolvyouli" @change="changeSwitchBoolean('is_goumai_daolvyouli')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动道侣拜访</view>
		        <switch :checked="!!configInfo.is_daolv_baifang" @change="changeSwitchBoolean('is_daolv_baifang')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">道侣自动购买凡级双修丹</view>
		        <switch :checked="!!configInfo.is_goumai_fanjishuangxiudan" @change="changeSwitchBoolean('is_goumai_fanjishuangxiudan')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动仙路争霸(VIP有效)</view>
		        <switch :checked="!!configInfo.is_auto_xianluzhengba" @change="changeSwitchBoolean('is_auto_xianluzhengba')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动三界之战(VIP有效)</view>
		        <switch :checked="!!configInfo.is_auto_sanjiezhizhan" @change="changeSwitchBoolean('is_auto_sanjiezhizhan')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动仙穹星界</view>
		        <switch :checked="!!configInfo.auto_xianqiongxingjie" @change="changeSwitchBoolean('auto_xianqiongxingjie')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动斗魂之巅</view>
		        <switch :checked="!!configInfo.auto_douhunzhidian" @change="changeSwitchBoolean('auto_douhunzhidian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动购买斗魂之巅次数</view>
		        <switch :checked="!!configInfo.is_goumai_douhunzhidian" @change="changeSwitchBoolean('is_goumai_douhunzhidian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">仙盟购买青莲朝心神通</view>
		        <switch :checked="!!configInfo.is_goumai_qinglianchaoxin" @change="changeSwitchBoolean('is_goumai_qinglianchaoxin')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">荣誉购买清风剑碎片</view>
		        <switch :checked="!!configInfo.is_goumai_qingfengjian" @change="changeSwitchBoolean('is_goumai_qingfengjian')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
		        <view class="uni-list-cell-db">自动升级战阵</view>
		        <switch :checked="!!configInfo.is_shengzhanzhen" @change="changeSwitchBoolean('is_shengzhanzhen')"/>
		    </view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">分解绿色法宝</view>
				    <switch :checked="!!configInfo.is_fenjie_fabao" @change="changeSwitchBoolean('is_fenjie_fabao')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动升级观星阁</view>
				    <switch :checked="!!configInfo.is_up_guanxingge" @change="changeSwitchBoolean('is_up_guanxingge')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买仙魂洗练石·主</view>
				    <switch :checked="!!configInfo.is_goumai_xhxls_z" @change="changeSwitchBoolean('is_goumai_xhxls_z')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买仙魂经验石·主</view>
				    <switch :checked="!!configInfo.is_goumai_xhjys_z" @change="changeSwitchBoolean('is_goumai_xhjys_z')"/>
				</view>

				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买琉璃甲·奇珍碎片</view>
				    <switch :checked="!!configInfo.is_goumai_lljia_qzsp" @change="changeSwitchBoolean('is_goumai_lljia_qzsp')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买紫云佩·奇珍碎片</view>
				    <switch :checked="!!configInfo.is_goumai_zyp_qzsp" @change="changeSwitchBoolean('is_goumai_zyp_qzsp')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买紫云衣·奇珍碎片</view>
				    <switch :checked="!!configInfo.is_goumai_zyy_qzsp" @change="changeSwitchBoolean('is_goumai_zyy_qzsp')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买奇珍经验石</view>
				    <switch :checked="!!configInfo.is_goumai_qzjys" @change="changeSwitchBoolean('is_goumai_qzjys')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买琉璃剑·奇珍碎片</view>
				    <switch :checked="!!configInfo.is_goumai_lljian_qzsp" @change="changeSwitchBoolean('is_goumai_lljian_qzsp')"/>
				</view>
				<view class="uni-list-cell uni-list-cell-pd-mini">
				    <view class="uni-list-cell-db">自动购买琉璃戒·奇珍碎片</view>
				    <switch :checked="!!configInfo.is_goumai_lljie_qzsp" @change="changeSwitchBoolean('is_goumai_lljie_qzsp')"/>
				</view>
		</view>

		<view v-show="currentTab === 1" class="uni-list-no-border">
				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLilian" :value="configInfo.lilianfuben" class="background-picker" range-key="text" :range="options.lilian">
											<view class="uni-input">{{options.lilian[configInfo.lilianfuben].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动历练</view>
		        <switch :checked="!!configInfo.lilianfuben" @change="changeSwitchLilian"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerXMJS" :value="configInfo.xianmengjianshe" class="background-picker" range-key="text" :range="options.xianmengjianshe">
											<view class="uni-input">{{options.xianmengjianshe[configInfo.xianmengjianshe].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动仙盟建设</view>
		        <switch :checked="!!configInfo.xianmengjianshe" @change="changeSwitchXMJS"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerBZKW" :value="configInfo.bazhukongwei" class="background-picker" range-key="text" :range="options.bazhukongwei">
											<view class="uni-input">{{options.bazhukongwei[configInfo.bazhukongwei].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">霸主抢空位</view>
		        <switch :checked="!!configInfo.bazhukongwei" @change="changeSwitchBZKW"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerYJKC" :value="configInfo.yijikaicaileixing" class="background-picker" range-key="text" :range="options.yijikaicaileixing">
											<view class="uni-input">{{options.yijikaicaileixing[configInfo.yijikaicaileixing].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动开采遗迹</view>
		        <switch :checked="!!configInfo.yijikaicaileixing" @change="changeSwitchYJKC"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerYJQD" :value="configInfo.yijigongjileixing" class="background-picker" range-key="text" :range="options.yijigongjileixing">
											<view class="uni-input">{{options.yijigongjileixing[configInfo.yijigongjileixing].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动抢夺遗迹</view>
		        <switch :checked="!!configInfo.yijigongjileixing" @change="changeSwitchYJQD"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerMoyu" :value="configInfo.moyuleixing" class="background-picker" range-key="text" :range="options.moyuleixing">
											<view class="uni-input">{{options.moyuleixing[configInfo.moyuleixing].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动打魔域</view>
		        <switch :checked="!!configInfo.moyuleixing" @change="changeSwitchMoyu"/>
					</view>
		    </view>

				<!-- <view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerBOSS1" :value="configInfo.boss_id1" class="background-picker" range-key="text" :range="options.boss_id1">
											<view class="uni-input">{{options.boss_id1[configInfo.boss_id1].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">魔族入侵1</view>
		        <switch :checked="!!configInfo.boss_id1" @change="changeSwitchBOSS1"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerBOSS2" :value="configInfo.boss_id2" class="background-picker" range-key="text" :range="options.boss_id2">
											<view class="uni-input">{{options.boss_id2[configInfo.boss_id2].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">魔族入侵2</view>
		        <switch :checked="!!configInfo.boss_id2" @change="changeSwitchBOSS2"/>
					</view>
		    </view> -->

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLHSS1" :value="configInfo.shenshou_id1" class="background-picker" range-key="text" :range="remoteOptions.shenshou">
											<view class="uni-input">{{remoteOptions.shenshou.length > 0? remoteOptions.shenshou[configInfo.shenshou_id1].text : ''}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">炼化神兽1</view>
		        <switch :checked="!!configInfo.shenshou_id1" @change="changeSwitchLHSS1"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLHSS2" :value="configInfo.shenshou_id2" class="background-picker" range-key="text" :range="remoteOptions.shenshou">
											<view class="uni-input">{{remoteOptions.shenshou.length > 0? remoteOptions.shenshou[configInfo.shenshou_id2].text : ''}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">炼化神兽2</view>
		        <switch :checked="!!configInfo.shenshou_id2" @change="changeSwitchLHSS2"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLHSS3" :value="configInfo.shenshou_id3" class="background-picker" range-key="text" :range="remoteOptions.shenshou">
											<view class="uni-input">{{remoteOptions.shenshou.length > 0? remoteOptions.shenshou[configInfo.shenshou_id3].text : ''}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">炼化神兽3</view>
		        <switch :checked="!!configInfo.shenshou_id3" @change="changeSwitchLHSS3"/>
					</view>
		    </view>

				<!-- <view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLHSS4" :value="configInfo.shenshou_id4" class="background-picker" range-key="text" :range="remoteOptions.shenshou">
											<view class="uni-input">{{remoteOptions.shenshou.length > 0? remoteOptions.shenshou[configInfo.shenshou_id4].text : ''}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">炼化神兽4</view>
		        <switch :checked="!!configInfo.shenshou_id4" @change="changeSwitchLHSS4"/>
					</view>
		    </view> -->

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerJlzJianzao" :value="configInfo.julingzhen_jianzao" class="background-picker" range-key="text" :range="options.julingzhen_jianzao">
											<view class="uni-input">{{options.julingzhen_jianzao[configInfo.julingzhen_jianzao].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">聚灵阵建造</view>
		        <switch :checked="!!configInfo.julingzhen_jianzao" @change="changeSwitchJlzJianzao"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerJlzFire" :value="configInfo.julingzhen_huoxi" class="background-picker" range-key="text" :range="options.julingzhen_huoxi">
											<view class="uni-input">{{options.julingzhen_huoxi[configInfo.julingzhen_huoxi].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">聚灵阵火袭</view>
		        <switch :checked="!!configInfo.julingzhen_huoxi" @change="changeSwitchJlzFire"/>
					</view>
		    </view>

				<!-- <view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerXianluzhengba" :value="configInfo.xianluzhengba_index" class="background-picker" range-key="text" :range="options.xianluzhengba_index">
											<view class="uni-input">{{options.xianluzhengba_index[configInfo.xianluzhengba_index].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动仙路争霸</view>
		        <switch :checked="!!configInfo.xianluzhengba_index" @change="changeSwitchXianluzhengba"/>
					</view>
		    </view> -->

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerDaolvxiulian" :value="configInfo.daolvxiulian_index" class="background-picker" range-key="text" :range="options.daolvxiulian_index">
											<view class="uni-input">{{options.daolvxiulian_index[configInfo.daolvxiulian_index].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">道侣修炼任务</view>
		        <switch :checked="!!configInfo.daolvxiulian_index" @change="changeSwitchDaolvxiulian"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerDaolvliwu" :value="configInfo.daolvliwu_index" class="background-picker" range-key="text" :range="options.daolvliwu_index">
											<view class="uni-input">{{options.daolvliwu_index[configInfo.daolvliwu_index].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">道侣赠送礼物</view>
		        <switch :checked="!!configInfo.daolvliwu_index" @change="changeSwitchDaolvliwu"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerBuyJinglianshi" :value="configInfo.goumai_jinglian_index" class="background-picker" range-key="text" :range="options.goumai_jinglian_index">
											<view class="uni-input">{{options.goumai_jinglian_index[configInfo.goumai_jinglian_index].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动购买精炼石</view>
		        <switch :checked="!!configInfo.goumai_jinglian_index" @change="changeSwitchBuyJinglianshi"/>
					</view>
		    </view>

				<view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerYihuo" :value="configInfo.yihuo_index" class="background-picker" range-key="text" :range="options.yihuo_index">
											<view class="uni-input">{{options.yihuo_index[configInfo.yihuo_index].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动无尽火域</view>
		        <switch :checked="!!configInfo.yihuo_index" @change="changeSwitchYihuo"/>
					</view>
		    </view>

				<!-- <view class="uni-list-cell-no-border uni-list-cell-pd-mini">
					<view class="flex-item-two">
							<view class="uni-list-cell-db">
									<picker @change="changePickerLingshoudao" :value="configInfo.index_lingshoudao_refresh" class="background-picker" range-key="text" :range="options.index_lingshoudao_refresh">
											<view class="uni-input">{{options.index_lingshoudao_refresh[configInfo.index_lingshoudao_refresh].text}}</view>
									</picker>
							</view>
					</view>
					<view class="flex-item-two">
						<view class="uni-list-cell-db">自动刷灵兽岛</view>
		        <switch :checked="!!configInfo.index_lingshoudao_refresh" @change="changeSwitchLingshoudao"/>
					</view>
		    </view> -->

				<view class="uni-divider">
					<view class="uni-divider__content">功法设置</view>
					<view class="uni-divider__line"></view>
				</view>

				<view class="gongfa-wrap">
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							攻击:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeGongji" :value="gongfaIndex.gongji" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.gongji !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.gongji].text}}</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							生命:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeShengming" :value="gongfaIndex.shengming" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.shengming !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.shengming].text}}</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							物防:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeWufang" :value="gongfaIndex.wufang" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.wufang !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.wufang].text}}</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							法防:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeFafang" :value="gongfaIndex.fafang" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.fafang !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.fafang].text}}</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							残页:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeCanye" :value="gongfaIndex.canye" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.canye !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.canye].text}}</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-item-two">
						<view class="gongfa-list-left">
							绝学:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="changeJuexue" :value="gongfaIndex.juexue" class="bg-picker-gongfa"  range-key="text" :range="options.gongfa">
									<view :class="{ active: gongfaObj.juexue !== '10' }" class="uni-input">{{options.gongfa[gongfaIndex.juexue].text}}</view>
							</picker>
						</view>
					</view>
				</view>

		</view>

		

		<view class="save-btn">
			<button type="primary" size="mini" @tap="handleChangeConfigInfo">保存设置</button>
		</view>	
	</view>
</template>

<script>
import CryptoJS from 'crypto-js'
import save from '@/utils/save'
import moment from 'moment'
import {mapState,mapMutations} from 'vuex'
import { getValueByIndex, getIndexByValue, getChannel, toast } from '@/utils/index'
import { startGuaji, stopGuaji } from '@/api/game'
import { getRoleInfo, getConfigInfo, changeConfigInfo, getUtils, getRemoteOptions } from '@/api/game'
import { handleGetServerConfig, 
		handleGetServerConfigTapTap, 
		handleGetServerConfigOther, 
		handleGetServerConfigWJXL, 
		handleGetServerConfigWJXL2, 
		handleGetServerConfigDJJH,
		handleGetServerConfigDJJHWJXL,
		handleGetServerConfigXianfanzhuan,
		handleGetServerConfigZuiqiangxiuxian,
		handleGetServerConfigFeixianjueGYY
		} from '@/utils/server'
import options from '@/utils/options.json'
import { jingjieMap, weimianMap, vipMap } from './mapData.js'
import mInput from '../../components/m-input.vue'

const configInfoDefault = {
  is_richang: 0,
  is_xiandou: 0,
  is_shenglingwan: 0,
  is_modi: 1,
	is_liandan: 0,
	is_mozuruqin: 1,
	is_change_weimian: 1,
  is_xianmengmijing: 0,
  is_liandanlianqixiulian: 0,
  is_use_dianfeng: 0,
  lixianbeishu: 1,
  lilianfuben: 0,
  xianmengjianshe: 0,
  bazhukongwei: 0,
  yijikaicaileixing: 0,
  yijigongjileixing: 0,
  moyuleixing: 0,
  boss_id1: 0,
	boss_id2: 0,
  on_off: 0,
  gongfagoumai: '',
	shenshou_id1: 0,
	shenshou_id2: 0,
	shenshou_id3: 0,
	shenshou_id4: 0,
  is_goumai_tiaozhan: 0,
	is_goumai_lianhua: 0,
	is_goumai_richang_lingbi: 0,
  is_goumai_richang_jinglian: 0,
  is_goumai_richang_jinjie: 0,
  is_goumai_richang_shengxing: 0,
	is_goumai_richang_zhuling: 0,
	fuzhu_vip: 0,
	julingzhen_huoxi: 0,
	julingzhen_jianzao: 0,
	is_auto_shenshou: 0, // 22点之后刷新完神兽次数
	is_auto_lianqi: 0, // 自动炼制低级法宝
	xianluzhengba_index: 0, // 仙路争霸打xx名之后
	is_goumai_daolvxiulian: 0, // 仙缘购买道侣修炼任务次数
	is_goumai_daolvyouli: 0, // 仙缘购买道侣游历四方次数
	is_daolv_baifang: 0, // 是否自动道侣拜访
	daolvxiulian_index: 0, // 关闭道侣修炼任务
	daolvliwu_index: 0, // 关闭道侣赠送礼物
	goumai_jinglian_index: 0, // 自动购买精炼石
	index_lingshoudao_refresh: 0, // 灵兽岛
	is_auto_xianluzhengba: 0, // 自动仙路争霸(VIP有效)
	is_auto_sanjiezhizhan: 0, // 自动三界之战(VIP有效)
	is_goumai_fanjishuangxiudan: 0, //道侣自动购买凡级双修丹
	yihuo_index: 0, // 无尽火域
	auto_xianqiongxingjie: 0, // 自动仙穹星界
	auto_douhunzhidian: 0, // 自动斗魂之巅
	is_goumai_qinglianchaoxin: 0, // 仙盟购买青莲朝心神通
	is_goumai_douhunzhidian: 0, // 自动购买斗魂之巅次数
	is_goumai_qingfengjian: 0, // 荣誉商店购买清风剑碎片
	is_shengzhanzhen: 0, // 是否自动升级战阵
	is_fenjie_fabao: 0, // 是否分解绿色法宝
	is_up_guanxingge: 0, // 自动升级观星阁
	is_goumai_xhxls_z: 0, // 自动购买仙魂洗练石·主
	is_goumai_xhjys_z: 0, // 自动购买仙魂经验石·主
	is_goumai_lljia_qzsp: 0, // 自动购买琉璃甲·奇珍碎片
	is_goumai_zyp_qzsp: 0, // 自动购买紫云佩·奇珍碎片
	is_goumai_zyy_qzsp: 0, // 自动购买紫云衣·奇珍碎片
	is_goumai_qzjys: 0, // 自动购买奇珍经验石
	is_goumai_lljian_qzsp: 0, // 自动购买琉璃剑·奇珍碎片
	is_goumai_lljie_qzsp: 0 // 自动购买琉璃戒·奇珍碎片
}

const gongfaObjDefault = {
  gongji: '10', // 购买攻击
  shengming: '10', // 购买生命
  wufang: '10', // 购买物防
  fafang: '10', // 购买法防
  canye: '10', // 购买残页
  juexue: '10' // 购买绝学
}

const roleInfoDefault =  {
    userid: '',
    server_id: '',
    role_name: '',
    update_time: '',
    role_level: '',
    vip_level: '',
    zhanli: '',
    xianyuan: '',
    guanqia: '',
    zhuzai_level: '',
    bazhu_cengshu: '',
    dianfeng_pos: '',
    mozuruqin_times: '',
    lilianshiwu: '',
    yijikaicai_times: '',
    yijijingong_times: '',
    dianfeng_times: '',
    xiandou_times: '',
    xianmengjianshe_times: '',
    xianmengmijing_times: '',
    moyu_times: '',
		charge_value: '',
		xiuwei: '',
    lingbi: '',
    shenshou_tiaozhan_times: '',
		shenshou_lianhua_times: '',
		jlz_jianzao_times: '',
		jlz_fireTimess: ''
  }

export default {
	components:{
		mInput
	},
	filters: {
    statusFilter(status) {
      const statusMap = {
        0: '关闭',
        1: '开启'
      }
      return statusMap[status]
    },
    jingjieFilter(jingjie) {
      return jingjieMap[jingjie]
    },
    weimianFilter(weimian) {
      return weimianMap[weimian] || '未获取到位面信息'
    },
    vipStatus(isVip) {
      const map = {
        0: '普通版',
        1: 'VIP版'
      }
      return map[isVip]
    },
    // 单位换算
    valueFormatFilter(str) {
      const numVal = Number(str)
			if (isNaN(numVal)) return ''
			if (numVal < 0) return '未获取到'
      if (numVal > 100000000) {
        return (numVal / 100000000).toFixed(1) + '亿'
      } else {
        return (numVal / 10000).toFixed(1) + '万'
      }
    }
  },
	data() {
		return {
			jqcmSaleChannel: '',
			platformName: '',
			serverName: '',
			lastServerIndex: 0,
			allServerindex: 0,
			serverFromAllServer: 0,
			currentTab: 0,
			items: ['开关项','选择项'],
			utils: {},
			remoteOptions: {
				shenshou: []
			},
			index: 0,
			current: 0,
			statusLoading: false,
			yunguaji: false,
			options:options,
			configInfo: Object.assign({}, configInfoDefault),
			gongfaObj: Object.assign({}, gongfaObjDefault), // 功法购买相关的配置
			roleInfo: Object.assign({}, roleInfoDefault),
			gongfaIndex: {
				gongji: 0,
				shengming: 0,
				wufang: 0,
				fafang: 0,
				canye: 0,
				juexue: 0
			},
			flag: {
			    loginFlag: false,
			    logoutFlag: false,
			    newUserFlag: false,
			    showServer: false,
					saveRoleFlag: false
			},
			fuzuStatus: {
        end_time: '',
        on_off: 0,
        isExpired: false
			},
			switchInfo: {
        lilianfuben: false,
        xianmengjianshe: false,
        bazhukongwei: false,
        yijikaicaileixing: false,
        yijigongjileixing: false,
        moyuleixing: false,
        boss_id1: false,
        boss_id2: false,
        gongfagoumai: false

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
				channelId: '',
				pfId: '',
				time: ''
			},
			serverInfo: { // 服务器列表
				client_ip: '',
				server_list: [],
				last_server_list: []
			},
			lixianbeishuList: [
				{value: '1', name: '一倍'},
				{value: '2', name: '两倍'},
				{value: '5', name: '五倍'}
			],
			roleList: [],
			roleIndex: 0,
			selectRoleName: '',
			autocompleteStringList: []
		}
	},
	computed: {
		serverNameLast() {
			return this.serverFromAllServer? '':this.serverName
		},
		serverNameAll() {
			return this.serverFromAllServer? this.serverName:''
		},
		// 更新时间是否超过2小时
    isPassedTwoHours() {
      const a = moment(new Date())
      const b = moment(this.roleInfo.update_time)
      const duration = a.diff(b)
      return duration > 2 * 3600 * 1000
    },
    // 计算位面位置是否未占有
    isNoWeimian() {
      return this.roleInfo.weimian_weizhi === 0
    },

    // 是否获取到充值额度
    notGetChargeValue() {
      return this.roleInfo.charge_value === -1
    },

    // 计算差多少金额升级到下级VIP
    vipUpValue() {
      const netxtVipLevel = this.roleInfo.vip_level + 1
      const netxtVipValue = vipMap[netxtVipLevel]
      return netxtVipValue - this.roleInfo.charge_value
		},
		
		// 当前选中的倍数index
		currentLilianebishu() {
			return this.lixianbeishuList.findIndex(item => {
				return Number(item.value) === this.configInfo.lixianbeishu
			})
		}
	},
	onLoad() {
		this.jqcmSaleChannel = getChannel()
		this.handleGetUtils()
		this.handleGetRemoteOptions()
		this.loadLoginInfo()
	},
	methods: {
		handleLogin() {
			uni.reLaunch({
			    url: '../login/login'
			})
		},
		loginSwitch() {
			uni.navigateTo({
			    url: '../login/login'
			})
		},

		transferTime() {
			uni.navigateTo({
			    url: '../transfer/transfer'
			})
		},

		handleGetUtils() {
      getUtils().then(res => {
				this.utils = res
				if (this.$global.jqcmVersion < res.version) {
					uni.showTabBarRedDot({
						index: 3
					})
				}
      }).catch(err => {
        console.log(err)
      })
		},
		
		// 获取远程选项
		handleGetRemoteOptions() {
			getRemoteOptions()
			.then(res => {
				this.remoteOptions = res
			})
			.catch(err => {
				console.log(err)
			})
		},

		// 收藏角色到本地
		handleSaveRole() {
			if (!this.flag.saveRoleFlag) {
				toast('角色信息错误，收藏失败！')
				return
			}
			const saveRoleObj = {
				roleName: this.roleInfo.role_name + '-' + this.serverName,
				userId: this.loginInfo.userId,
				platformName: this.platformName,
				loginType: this.userInfo.loginType,
				serverId: this.userInfo.server,
				serverName: this.serverName,
				passwordPlatForm: this.userInfo.passwordPlatForm
			}
			const indexRole = this.roleList.findIndex((item) => {
				return item.roleName === saveRoleObj.roleName
			})
			if (indexRole === -1) {
				this.roleList.unshift(saveRoleObj)
			} else {
				this.roleList[indexRole] = saveRoleObj
			}
			this.saveRoleInfo()
			uni.showToast({
				title: '收藏成功',
				duration: 2000,
				icon: 'none'
			})
		},

		// 删除收藏的角色
		handleRemoveRole() {
			const roleName = this.roleInfo.role_name + '-' + this.serverName
			const indexRole = this.roleList.findIndex((item) => {
				return item.roleName === roleName
			})
			if (indexRole === -1) {
				uni.showToast({
					title: '收藏列表无该角色',
					duration: 2000,
					icon: 'none'
				})
			} else {
				this.roleList.splice(indexRole, 1)
				this.saveRoleInfo()
				uni.showToast({
					title: '移除成功',
					duration: 2000,
					icon: 'none'
				})
			}
		},

		// 清空收藏角色
		handleClearSaveRole() {
			this.roleList = []
			this.saveRoleInfo()
			uni.showToast({
				title: '清空成功',
				duration: 2000,
				icon: 'none'
			})
		},

		// 读取记住的登录信息
		loadLoginInfo() {
			uni.setNavigationBarTitle({
					title: '剑气除魔火箭辅助V' + this.$global.jqcmVersionName
			});
			this.roleList = save.getRoleList()
			const gameLoginInfo = save.getGameLoginInfo()
			if (gameLoginInfo.serverInfo) {
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
				this.platformName = gameLoginInfo.platformName
				this.flag.showServer = gameLoginInfo.showServer
				this.serverInfo = gameLoginInfo.serverInfo
				this.serverFromAllServer = gameLoginInfo.serverFromAllServer
				if (Array.isArray(gameLoginInfo.autocompleteStringList)) this.autocompleteStringList = gameLoginInfo.autocompleteStringList
				this.initSaveData()
				this.handleGuajiStatus()
			}
		},
		// 存储登录信息到LocalStorage
		saveLoginInfo() {
			const gameLoginInfo = {
				platform: this.userInfo.platform,
				server: this.userInfo.server,
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
				serverFromAllServer: this.serverFromAllServer,
				autocompleteStringList: this.autocompleteStringList
			}
			save.setGameLoginInfo(gameLoginInfo)
		},

		// 存储收藏的角色
		saveRoleInfo() {
			save.setRoleList(this.roleList)
		},

		// 加载后将存储的数据显示出来
		initSaveData() {
			if (this.serverFromAllServer) {
				const allServerindex = getIndexByValue(this.serverInfo.server_list, this.userInfo.server)
				if (allServerindex !== -1) {
					this.serverName = this.serverInfo.server_list[allServerindex].text
					this.allServerindex = allServerindex
				} else {
					this.serverName = ''
				}
			} else {
				const lastServerIndex = getIndexByValue(this.serverInfo.last_server_list, this.userInfo.server)
				if (lastServerIndex !== -1) {
					this.serverName = this.serverInfo.last_server_list[lastServerIndex].text
					this.lastServerIndex = lastServerIndex
				} else {
					this.serverName = ''
				}
			}
		},

		// 选择保存的角色
		changeSavedRoleList(e) {
			this.selectRoleName = this.roleList[e.target.value]['roleName']
			this.loginInfo.userId = this.roleList[e.target.value]['userId']
			this.userInfo.server = this.roleList[e.target.value]['serverId']
			this.userInfo.loginType = this.roleList[e.target.value]['loginType']
			this.platformName = this.roleList[e.target.value]['platformName']
			this.userInfo.passwordPlatForm = this.roleList[e.target.value]['passwordPlatForm']
			this.handleGetServerList()
			this.handleGuajiStatus()
		},

		// 选择最后登录服务器
		changeLastServer: function(e) {
			this.serverFromAllServer = 0
			this.lastServerIndex = e.target.value
			this.serverName = this.serverInfo.last_server_list[this.lastServerIndex].text
			this.userInfo.server = getValueByIndex(this.serverInfo.last_server_list, e.target.value)
			this.handleGuajiStatus()
		},
		// 选择所以登录服务器
		changeAllServer: function(e) {
			this.serverFromAllServer = 1
			this.allServerindex = e.target.value
			this.serverName = this.serverInfo.server_list[this.allServerindex].text
			this.userInfo.server = getValueByIndex(this.serverInfo.server_list, e.target.value)
			this.handleGuajiStatus()
		},

		// 更新服务器列表
    handleGetServerList() {
      if (this.userInfo.loginType === 1) { // 官方平台
        handleGetServerConfig(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 2) { // TapTap平台
        handleGetServerConfigTapTap(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 12) { // 无尽修炼
        handleGetServerConfigWJXL(6030, this.loginInfo.userId, 7).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 14) { // 无尽修炼2
        handleGetServerConfigWJXL2(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 15) { // 单机江湖-渠道服
        handleGetServerConfigDJJH(6044, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else if (this.userInfo.loginType === 16) { // 单机江湖-无尽1
        handleGetServerConfigDJJHWJXL(6046, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
			}  else if (this.userInfo.loginType === 17) { // 神道
        handleGetServerConfigWJXL(6084, this.loginInfo.userId, 11).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else if (this.userInfo.loginType === 18) { // 道友渡劫不
        handleGetServerConfigWJXL(6109, this.loginInfo.userId, 16).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else if ([19,20,21,22].includes(this.userInfo.loginType)) { // 仙凡传,蛮荒异世录,蜀山剑诀,我要飞升(苹果)
        handleGetServerConfigXianfanzhuan(6090, this.loginInfo.userId, 10).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else if ([23].includes(this.userInfo.loginType)) { // 画江湖盟主
        handleGetServerConfigXianfanzhuan(6106, this.loginInfo.userId, 12).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else if ([24].includes(this.userInfo.loginType)) { // 最强修仙编辑器
        handleGetServerConfigZuiqiangxiuxian(1, this.loginInfo.strUserId, 1).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 25) { // 人渣反派
        handleGetServerConfigWJXL(6102, this.loginInfo.userId, 11).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 26) { // 飞仙诀(羔羊游)
        handleGetServerConfigFeixianjueGYY(270, 'changwei2', this.loginInfo.userId, 2).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 27) { // 江湖传说
        handleGetServerConfigFeixianjueGYY(6152,'changwei2', this.loginInfo.userId, 20).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 28) { // 修真归来
        handleGetServerConfigWJXL(6147, this.loginInfo.userId, 19).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 29) { // 飞仙诀(饺子手游)
        handleGetServerConfigFeixianjueGYY(2005, 'changwei2', this.loginInfo.userId, 2).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 30) { // 冰湖游戏
        handleGetServerConfigTapTap(6196, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      } else if (this.userInfo.loginType === 31) { // (饺子手游)剑气除魔H5
        handleGetServerConfigTapTap(6201, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }  else { // 其他平台
        handleGetServerConfigOther(this.loginInfo.channelId, this.loginInfo.userId).then(serverInfo => {
					this.serverInfo = serverInfo
					// this.saveLoginInfo()
					this.initSaveData()
					this.$toast("服务器更新成功")
				})
      }
		},
		
		// 获取挂机状态
    handleGuajiStatus() {
      if (!this.loginInfo.userId) {
				uni.showToast({
					title: '没有获取到登录的用户信息，请重新登录。',
					duration: 2000,
					icon: 'none'
				})
        return
			}
			if (!this.userInfo.server) {
				uni.showModal({
					title: '提示',
					content: '请选择服务器',
					showCancel: false,
					confirmText: '好的',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
        return
			}
      const param = {
        userid: this.loginInfo.userId,
				server_id: this.userInfo.server,
				t: new Date().getTime()
			}
			this.statusLoading = true
      getRoleInfo(param).then(res => { // 查询角色信息
				const code = res.code
				this.statusLoading = false
        switch (code) {
          case 200:
						this.roleInfo = res.data
						this.flag.saveRoleFlag = true
						this.saveLoginInfo()
            this.yunguaji = true
						uni.showToast({
							title: '查询挂机状态成功',
							duration: 2000,
							icon: 'none'
						})
            break
          case 403:
						this.flag.saveRoleFlag = false
						uni.showToast({
							title: '参数错误',
							duration: 2000,
							icon: 'none'
						})
            break
          case 404:
						this.flag.saveRoleFlag = false
						this.yunguaji = false
						this.roleInfo = Object.assign({}, roleInfoDefault)
						uni.showToast({
							title: '未查询到挂机信息，请开启云挂机',
							duration: 2000,
							icon: 'none'
						})
            break
        }
      }).catch(err => {
				this.flag.saveRoleFlag = false
        console.log(err)
      })
      this.handleGetConfigInfo()
    },

    // 查询配置信息
    handleGetConfigInfo() {
      if (!this.loginInfo.userId || !this.userInfo.server) {
				uni.showToast({
					title: '没有获取到登录的用户信息，请重新登录',
					duration: 2000,
					icon: 'none'
				})
        return
      }
      const param = {
        userid: this.loginInfo.userId,
				server_id: this.userInfo.server,
				t: new Date().getTime()
      }
      getConfigInfo(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.isClickLilianbeishu = false
						this.configInfo = this.correctSetting(res.data)
						// if (!this.configInfo.shenshou_id3) this.$set(this.configInfo, 'shenshou_id3', 0)
						// if (!this.configInfo.shenshou_id4) this.$set(this.configInfo, 'shenshou_id4', 0)
						// if (!this.configInfo.julingzhen_jianzao) this.$set(this.configInfo, 'julingzhen_jianzao', 0)
						// if (!this.configInfo.julingzhen_huoxi) this.$set(this.configInfo, 'julingzhen_huoxi', 0)
						// if (!this.configInfo.is_auto_shenshou) this.$set(this.configInfo, 'is_auto_shenshou', 0)
						// if (!this.configInfo.is_auto_lianqi) this.$set(this.configInfo, 'is_auto_lianqi', 0)
						// if (!this.configInfo.xianluzhengba_index) this.$set(this.configInfo, 'xianluzhengba_index', 0)
            this.calsIsExpired(res.data.end_time)
						this.calcGongfagoumai(String(res.data.gongfagoumai))
						this.calcGongfaIndex()
            // this.calcGongfagoumai(String(111210101013))
            break
          case 403:
						uni.showToast({
							title: '参数错误',
							duration: 2000,
							icon: 'none'
						})
            break
          case 404:
            this.yunguaji = false
						uni.showToast({
							title: '未查询到挂机信息，请开启云挂机',
							duration: 2000,
							icon: 'none'
						})
            this.configInfo = Object.assign({}, configInfoDefault)
            break
        }
      }).catch(err => {
        console.log(err)
      })
		},

		// 将后台没返回的设置想设置默认值
		correctSetting(configInfoBackend) {
			const configInfo = Object.assign({}, configInfoDefault)
      for (const key in configInfo) {
        if (configInfoBackend.hasOwnProperty(key)) {
          configInfo[key] = configInfoBackend[key]
        }
      }
      return configInfo
		},

		// 根据后台返回的功法数据计算功法index
		calcGongfaIndex() {
			for (let item in this.gongfaIndex) {
				this.gongfaIndex[item] = getIndexByValue(this.options.gongfa, this.gongfaObj[item])
			}
		},
		
		// 修改配置项是0和1的情况
		changeSwitchBoolean(item) {
			if (this.configInfo[item]) {
				this.configInfo[item] = 0
			} else {
				this.configInfo[item] = 1
			}
		},

		// 改变picker选项
		changePickerLilian(e) {
			const index = e.target.value
			this.configInfo.lilianfuben = index
		},
		changePickerXMJS(e) {
			const index = e.target.value
			this.configInfo.xianmengjianshe = index
		},
		changePickerBZKW(e) {
			const index = e.target.value
			this.configInfo.bazhukongwei = index
		},
		changePickerYJKC(e) {
			const index = e.target.value
			this.configInfo.yijikaicaileixing = index
		},
		changePickerYJQD(e) {
			const index = e.target.value
			this.configInfo.yijigongjileixing = index
		},
		changePickerMoyu(e) {
			const index = e.target.value
			this.configInfo.moyuleixing = index
		},
		changePickerBOSS1(e) {
			const index = e.target.value
			this.configInfo.boss_id1 = index
		},
		changePickerBOSS2(e) {
			const index = e.target.value
			this.configInfo.boss_id2 = index
		},
		changePickerLHSS1(e) {
			const index = e.target.value
			this.configInfo.shenshou_id1 = index
		},
		changePickerLHSS2(e) {
			const index = e.target.value
			this.configInfo.shenshou_id2 = index
		},
		changePickerLHSS3(e) {
			const index = e.target.value
			this.configInfo.shenshou_id3 = index
		},
		changePickerLHSS4(e) {
			const index = e.target.value
			this.configInfo.shenshou_id4 = index
		},
		changePickerJlzJianzao(e) {
			const index = e.target.value
			this.configInfo.julingzhen_jianzao = index
		},
		changePickerJlzFire(e) {
			const index = e.target.value
			this.configInfo.julingzhen_huoxi = index
		},
		changePickerXianluzhengba(e) {
			const index = e.target.value
			this.configInfo.xianluzhengba_index = index
		},
		changePickerDaolvxiulian(e) {
			const index = e.target.value
			this.configInfo.daolvxiulian_index = index
		},
		changePickerDaolvliwu(e) {
			const index = e.target.value
			this.configInfo.daolvliwu_index = index
		},
		changePickerBuyJinglianshi(e) {
			const index = e.target.value
			this.configInfo.goumai_jinglian_index = index
		},
		changePickerYihuo(e) {
			const index = e.target.value
			this.configInfo.yihuo_index = index
		},
		changePickerLingshoudao(e) {
			const index = e.target.value
			this.configInfo.index_lingshoudao_refresh = index
		},

		// 修改下拉选项后面的开关
		changeSwitchLilian(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.lilianfuben = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchXMJS(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.xianmengjianshe = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchBZKW(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.bazhukongwei = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchYJKC(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.yijikaicaileixing = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchYJQD(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.yijigongjileixing = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchMoyu(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.moyuleixing = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchBOSS1(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.boss_id1 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchBOSS2(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.boss_id2 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchLHSS1(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.shenshou_id1 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchLHSS2(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.shenshou_id2 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchLHSS3(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.shenshou_id3 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchLHSS4(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.shenshou_id4 = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchJlzJianzao(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.julingzhen_jianzao = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchJlzFire(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.julingzhen_huoxi = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchXianluzhengba(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.xianluzhengba_index = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchDaolvxiulian(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.daolvxiulian_index = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchDaolvliwu(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.daolvliwu_index = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchBuyJinglianshi(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.goumai_jinglian_index = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchYihuo(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.yihuo_index = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},
		changeSwitchLingshoudao(e) {
			const checked = e.target.value
			if (!checked) {
				this.configInfo.index_lingshoudao_refresh = 0
			} else {
				this.$toast('请选择左侧列表中选项')
			}
		},


		// 改变功法相关的picker
		changeGongji(e) {
			const index = e.target.value
			this.gongfaIndex.gongji = index
			this.gongfaObj.gongji = getValueByIndex(options.gongfa, index)
		},
		changeShengming(e) {
			const index = e.target.value
			this.gongfaIndex.shengming = index
			this.gongfaObj.shengming = getValueByIndex(options.gongfa, index)
		},
		changeWufang(e) {
			const index = e.target.value
			this.gongfaIndex.wufang = index
			this.gongfaObj.wufang = getValueByIndex(options.gongfa, index)
		},
		changeFafang(e) {
			const index = e.target.value
			this.gongfaIndex.fafang = index
			this.gongfaObj.fafang = getValueByIndex(options.gongfa, index)
		},
		changeCanye(e) {
			const index = e.target.value
			this.gongfaIndex.canye = index
			this.gongfaObj.canye = getValueByIndex(options.gongfa, index)
		},
		changeJuexue(e) {
			const index = e.target.value
			this.gongfaIndex.juexue = index
			this.gongfaObj.juexue = getValueByIndex(options.gongfa, index)
		},

    /**
     * 计算功法购买的各种属性
     * 总共12为数字每两位表示一个属性，从前到后是攻击，生命，物防，法防，残页，绝学
     * 两位数字是10-22之间，表示购买不同价格的功法
     */
    calcGongfagoumai(cfgStr) {
      if (cfgStr.length < 12) {
        uni.showModal({
          title: '提示',
					content: '功法购买功能有变更，请重新设置后保存！',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
        })
        return
      }
      this.gongfaObj.gongji = cfgStr.slice(0, 2)
      this.gongfaObj.shengming = cfgStr.slice(2, 4)
      this.gongfaObj.wufang = cfgStr.slice(4, 6)
      this.gongfaObj.fafang = cfgStr.slice(6, 8)
      this.gongfaObj.canye = cfgStr.slice(8, 10)
      this.gongfaObj.juexue = cfgStr.slice(10, 12)
    },

    // 从购买功法的对象中生成购买功法的配置数据发到后端
    genGongfagoumaiCfg() {
      const gongji = this.gongfaObj.gongji
      const shengming = this.gongfaObj.shengming
      const wufang = this.gongfaObj.wufang
      const fafang = this.gongfaObj.fafang
      const canye = this.gongfaObj.canye
      const juexue = this.gongfaObj.juexue
      return gongji + shengming + wufang + fafang + canye + juexue
    },

    // 计算辅助到期时间
    calsIsExpired(endTime) {
      const isExpired = moment(endTime).isBefore(new Date())
      if (isExpired) {
        this.fuzuStatus.isExpired = true
        this.fuzuStatus.end_time = '已经过期，请购买！'
      } else {
        this.fuzuStatus.isExpired = false
        this.fuzuStatus.end_time = endTime
      }
    },

    // 修改配置信息
    handleChangeConfigInfo() {
      this.configInfo.gongfagoumai = this.genGongfagoumaiCfg()
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server,
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString(),
        ... this.configInfo
      }
      changeConfigInfo(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.handleGetConfigInfo()
						uni.showToast({
							title: '修改成功',
							duration: 2000,
							icon: 'none'
						})
            break
          case 403:
						uni.showToast({
							title: '参数错误',
							duration: 2000,
							icon: 'none'
						})
            break
          case 404:
            this.yunguaji = false
						uni.showToast({
							title: '未查询到挂机信息，请开启云挂机',
							duration: 2000,
							icon: 'none'
						})
            break
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 开始云挂机
    handleStartguaji() {
      if (!this.loginInfo.userId || !this.userInfo.server) {
				uni.showToast({
					title: '没有获取到登录的用户信息，请重新登录',
					duration: 2000,
					icon: 'none'
				})
        return
      }
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server,
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
      }
      startGuaji(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
						uni.showToast({
							title: '挂机成功，请15秒后查询挂机状态',
							duration: 2000,
							icon: 'none'
						})
            this.handleGuajiStatus()
            break
          case 300:
						uni.showToast({
							title: '新用户挂机成功，请15秒后查询挂机状态',
							duration: 2000,
							icon: 'none'
						})
            break
          case 403:
						uni.showToast({
							title: '挂机失败，请重新登录后重试',
							duration: 2000,
							icon: 'none'
						})
            break
        }
        const self = this
        setTimeout(function() {
          self.handleGuajiStatus()
        }, 15000)
      })
    },

    // 停止云挂机
    handleStopguaji() {
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server,
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
      }
      stopGuaji(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.handleGuajiStatus()
						uni.showToast({
							title: '停止挂机成功',
							duration: 2000,
							icon: 'none'
						})
            break
          case 403:
						uni.showToast({
							title: '操作失败',
							duration: 2000,
							icon: 'none'
						})
            break
          case 404:
						uni.showToast({
							title: '操作失败',
							duration: 2000,
							icon: 'none'
						})
            break
        }
      })
		},
		
		doCopy() {
			if (!this.userInfo.server || !this.loginInfo.userId) {
				toast("复制失败,没有选择服务器或者没有登录")
				return
			}
			const cpText = `服务器:${this.userInfo.server},续费ID:${this.loginInfo.userId},游戏:jqcm`
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: String(cpText),
				success: function () {
					toast("复制成功,可用于辅助续费充值")
				}
			})
			// #endif
			// #ifdef H5
			this.$copyText(cpText).then(
        res => {
          toast("复制成功,可用于辅助续费充值")
        },
        err => {
          toast("复制失败")
        }
			)
			// #endif
		},

		onClickItem(e) {
      this.currentTab = e.currentIndex
    },

		radioChange: function(evt) {
			this.configInfo.lixianbeishu = Number(evt.target.value)
			switch (Number(evt.target.value)) {
				case 1:
					uni.showToast({
						title: '选择一倍，免费',
						duration: 2000,
						icon: 'none'
					})
					break
				case 2:
					uni.showToast({
						title: '选择两倍，要仙缘',
						duration: 2000,
						icon: 'none'
					})
					break
				case 5:
					uni.showToast({
						title: '选择五倍，要仙缘',
						duration: 2000,
						icon: 'none'
					})
          break
			}
		  // for (let i = 0; i < this.lixianbeishuList.length; i++) {
		  //     if (this.lixianbeishuList[i].value === evt.target.value) {
		  //         this.current = i;
		  //         break;
		  //     }
		  // }
		}
	}
}
</script>

<style lang="css">
	.background-picker .uni-input{
		background: #ebedf0 !important;
		padding: 5upx 25upx;
		overflow: hidden;
	}
	.bg-picker-gongfa .uni-input{
		background: #ebedf0 !important;
		padding: 5upx 10upx;
		margin: 10upx;
		overflow: hidden;
	}
</style>
<style lang="css" scoped>
.gongfa-wrap {
	background: #ffffff;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
}
.gongfa-list-left {
	font-size:28upx;
}
.active {
	color: #1989fa;
}
.btn-center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn-center-margin {
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
	flex-basis: auto;
	width: 33.3%;
	/* 加入这两个后每个item的宽度就生效了 */
	min-width: 33.3%;
	max-width: 33.3%;
}
.flex-lixian-item {
	flex: 1;
	flex-basis: auto;
	width: 65%;
	min-width: 65%;
	max-width: 65%;
}
.list-cell {
	display: flex;
	flex: 1;
	flex-basis: auto;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.content .uni-list-cell-left {
	width: 35%;
	text-align: right;
}
.flex-item-two {
	display: flex;
	width: 48%;
	min-width: 48%;
	max-width: 48%;
}
.radio-flex {
	display: flex;
}
.radio-flex-item {
	flex: 1;
	flex-basis: auto;
	width: 32%;
	/* 加入这两个后每个item的宽度就生效了 */
	min-width: 32%;
	max-width: 32%;
}
.uni-list-no-border {
	background-color: #FFFFFF;
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
}
.uni-list-cell-no-border {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell-pd-mini {
	padding: 5upx 30upx 5upx 10upx;
}
.danger {
  color: red;
}
.save-btn{
	margin: 50upx;
	text-align: center;
}
.waring-wrap {
  color: red;
  margin-top: 10upx;
  white-space: pre-line;
	user-select: text;
}
.content-wrap {
	user-select: text;
}
.fuzhu-info {
	display: flex;
	align-items: center;
}
.copy-button {
	margin-left:40upx;
}
</style>
