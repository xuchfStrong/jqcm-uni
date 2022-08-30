# jqcm-uni
**剑气除魔客户端的uni-app版本**

# 从git上下载代码后使用说明
1. components目录下的以 uni- 开头的组件，是从uni-app插件市场上下载的，所以就没有同步到git上。目前里面有使用的是uni-ui这一套，是创建uni-app采用选择uni-ui项目自带下载的。


# 更新日志
## 2020-5-4, V1.4.0
1. 支持热更新。
2. 支持VIP版本，辅助版本显示：普通版，VIP版。
3. 显示修为、灵币、挑战次数、炼化次数。
4. 炼化增加1个选择，变成2个。
5. 历练增加挑战和进图手动刷精炼石，是在下拉选项中增加选项。
6. 增加日常购买。
7. 魔域那修改为（第几关-名字）的方式，方便选择更直观。

## 2020-5-4, V1.4.1
1. 优化登录平台选择和服务器选择。

## 2020-5-10, V1.4.2
1. 增加辅助账号自助转移功能。

## 2020-5-11， V1.4.3
1. 解决V1.4.2版本中辅助转移按钮切换不成功的问题，是因为HbuilderX更新了SDK。用新的HbuilderX重新打包解决。
2. 增加整包更新。
3. 增加测试更新的功能。

## 2020-6-4， V1.4.4
1. 增加服务器为800开头的剑气除魔渠道服。

## 2020-6-11， V1.4.5
1. APP上不用代理登录.
2. 所有平台checkStatus成功后,直接跳转到主页面。

## 2020-6-12， V1.4.6
1. 添加老用户登录的时候条件编译。checkStatus成功后，如果是APP还是去走登录流程，H5就不走登录流程，直接跳转到主页面。

## 2020-6-28, V1.4.7
1. 去掉两个魔族入侵BOSS选择
2. 增加一个神兽选择
3. 增加位面切换开关
4. 增加魔族入侵开关
5. 增加绿色位面攻击

## 2020-7-20, V1.4.8
1. 增加聚灵阵建造功能。

## 2020-7-21, V1.4.9
1. 增加聚灵阵火袭功能。

## 2020-8-12, V1.4.9
1. 增加剑气除魔客户端登录。
2. 添加渠道6.
3. 将2020-8-6添加的一些新功能屏蔽了。
4. 增加网页版登录的时候通过自己的Proxy代理获取token，这样网页版也可以登录了。

## 2020-8-28, V1.5.0
1. 开关：22点之后刷新完神兽次数；参数名：is_auto_shenshou
2. 开关：自动炼制低级法宝；参数名：is_auto_lianqi
3. 增加下拉：仙路争霸打xx名之后；参数名：xianluzhengba_index
4. 下拉更新：遗迹刷新增加刷新到橙色最多50次，如果40次还没出就会降低到紫色。最后还是不出的话，就刷到啥是啥。
5. 下拉更新：遗迹刷新增加刷到到橙色，不限次数。
6. 增加渠道7。

## 2020-9-8, V1.5.1
1. 增加登陆第二步是否返回userid的判断，如果没有获得userId则登录失败，避免将错误的userId添加到辅助后台。

## 2020-9-16, V1.5.2
1. 增加开关：仙缘购买道侣修炼任务次数，参数名：is_goumai_daolvxiulian。
2. 增加开关：仙缘购买道侣游历四方次数，参数名：is_goumai_daolvyouli。
3. 增加下拉：参数名：daolvxiulian_index。
   - 关闭道侣修炼任务
   - 装备升阶石x10
   - 道侣进阶丹x10(消耗10灵力)
   - 20装备神炼石(消耗15灵力)
4. 增加下拉：下拉：参数名：daolvliwu_index
   - 关闭道侣赠送礼物
   - 道侣普通送礼(288万灵币)
   - 道侣高级送礼(100仙缘)
   - 道侣壕气送礼(288仙缘)

## 2020-9-20, V1.5.3
1. 增加道侣自动拜访的开关。

## 2020-10-8, V1.5.4
1. 增加道友渡劫不平台
2. 增加自动购买精炼石

## 2020-10-8, V1.5.5
1. 修复无法APP无法登录道友渡劫不的bug

## 2020-10-11, V1.5.6
1. 增加仙凡传渠道

## 2020-10-14, V1.5.7
1. 增加蛮荒异世录平台，就是仙凡传的IOS版本。

## 2020-10-16, V1.5.8
1. 增加蜀山剑诀平台，和仙凡传不同点就是 game_key = "hMCYytjybhQrPClg"

## 2020-10-17, V1.5.8
1. 增加渠道8

## 2020-10-17, V1.6.0
1. 增加仙凡传,蜀山剑诀手机号登录的情况,登录包中的login_type=2
2. 优化多渠道打包。
3. 网页版通过端口判断是那个渠道。

## 2020-10-19, V1.6.1
1. 增加平台：我要飞升(苹果)

## 2020-10-20, V1.6.1
1. 增加保存多个登录成功的用户信息。

## 2020-10-23, V1.6.1
1. 增加画江湖盟主平台，login_type=23

## 2020-10-30， V1.6.2
1. 增加灵兽岛功能
2. 但是由于游戏bug，还未开放

## 2020-11-19， V1.6.2
1. 因为游戏出bug，新区建的角色，从最近登录服务器列表中无法找到，因此增加从所有服务器中选择。

## 2020-11-21， V1.6.4
1. 因为游戏服务器换获取服务器的地址和登录第三步骤的地址，同步更新。

## 2020-11-22， V1.6.5
1. 有些平台的地址没改到。
2. 增加复制辅助ID的功能。

## 2020-12-12， V1.6.6
1. 自动仙路争霸(VIP有效)，参数名：is_auto_xianluzhengba
2. 自动三界之战(VIP有效)，参数名：is_auto_sanjiezhizhan
3. 道侣自动购买凡级双修丹，参数名：is_goumai_fanjishuangxiudan

## 2020-12-20， V1.6.7
1. 增加最强修仙编辑器
2. 增加异火功能，下拉选项。参数名：yihuo_index
3. 增加通关struserid获取intuid的接口
   /jqcm/get_int_uid.php?struid=123471233414
   返回值：
   {"code":200,"userid":"9900004"}
   {"code":403} 参数名不对或者没参数
   这里没有404，库里没有，就插入一条记录

4. 根据int类型userid获取str型userid接口：
   /jqcm/get_str_uid.php?intuid=9900004
   返回值：
   {"code":200,"userid":"123471233414"}
   {"code":403} 参数名不对或者没参数
   {"code":404} 没找到对应的值

## 2020-12-31， V1.6.9
1. 复制辅助信息的时候增加游戏代码，用于充值的时候自动解析

## 2021-1-1， V1.6.9
1. 给渠道3的下线弄一个自己的安装包，端口用9099

## 2021-1-29， V1.7.0, 剑气增加三个开关
1. 自动仙穹星界，字段名：auto_xianqiongxingjie
2. 自动斗魂之巅，字段名：auto_douhunzhidian
3. 自动购买斗魂之巅次数，字段名：is_goumai_douhunzhidian

## 2021-2-28 V1.7.1
1. 增加人渣反派修仙系统渠道。

## 2021-5-28 V1.7.2
1. 增加仙盟购买青莲朝心神通。

## 2021-6-30 V1.7.3
1. 增加飞仙诀(羔羊游)平台。

## 2021-9-1 V1.7.7
1. 增加江湖传说平台。

## 2021-9-14 V1.7.8
1. 增加修真归来平台。
2. 增加自动升级战阵功能。
3. 增加荣誉商店自动购买清风剑剑灵碎片。

## 2021-10-8 V1.7.9
1. 修改获取角色服务器不通过云函数

## 2021-10-8 V1.8.0
1. 增加飞仙诀饺子手游

## 2021-10-21 V1.8.1
1. 增加魔域困难关卡
2. 增加自动分解绿色法宝
3. 增加自动升级观星阁
4. 增加购买仙魂洗练石·主
5. 增加购买仙魂经验石·主

## 2021-11-15 V1.8.2
1. 增加剑气-冰狐狸游戏平台

## 2021-11-27 V1.8.3
1. 增加自动购买琉璃甲·奇珍碎片，字段名:is_goumai_lljia_qzsp
2. 增加自动购买紫云佩·奇珍碎片，字段名:is_goumai_zyp_qzsp
3. 增加自动购买紫云衣·奇珍碎片，字段名:is_goumai_zyy_qzsp
4. 增加自动购买奇珍经验石，字段名:is_goumai_qzjys
5. 增加自动购买琉璃剑·奇珍碎片，字段名:is_goumai_lljian_qzsp
6. 增加自动购买琉璃戒·奇珍碎片，字段名:is_goumai_lljie_qzsp

## 2021-12-2 V1.8.4
1. 将APP上所有接口也都通过云函数访问。

## 2021-12-2 V1.8.5
1. 更新登录第二步获取token的接口。

## 2021-12-2 V1.8.6
1. 将登录第二步获取token的接口修改为不走云函数。

## 2021-12-23 V1.8.8
1. 增加饺子手游剑气除魔H5平台。

## 2022-1-20 V1.8.9
1. 增加灵路试炼。
2. 最强修仙编辑器增加自动购买火凤凰魂骨
3. 最强修仙编辑器增加自动购买火凤凰碎片
4. 最强修仙编辑器增加自动购买九心海棠魂骨
5. 最强修仙编辑器增加自动购买九心海棠碎片

## 2022-1-21 V1.9.0
1. 修复无法设置的历练的问题。

## 2022-2-8 V1.9.2
1. 增加3011平台。
2. 增加法身法宝自动炼制分解。
3. 去掉自动炼制低级法宝（法身法宝自动炼制分解替代）。
4. 去掉自动分解绿色法宝（法身法宝自动炼制分解替代）。
5. 增加探宝灯购买。
6. 增加寻仙令购买。
7. 增加铸炼石购买。
8. 增加淬灵丹购买。

## 2022-2-8 V1.9.3
1. 去掉上次更新没有去掉的自动炼制低级法宝
2. 增加在V1.8.9更新中被错误去掉的几个功能
   - is_goumai_lljia_qzsp: 0, // 自动购买琉璃甲·奇珍碎片
	- is_goumai_zyp_qzsp: 0, // 自动购买紫云佩·奇珍碎片
	- is_goumai_zyy_qzsp: 0, // 自动购买紫云衣·奇珍碎片
	- is_goumai_qzjys: 0, // 自动购买奇珍经验石
	- is_goumai_lljian_qzsp: 0, // 自动购买琉璃剑·奇珍碎片
	- is_goumai_lljie_qzsp: 0, // 自动购买琉璃戒·奇珍碎片

## 2022-2-17 V1.9.4
1. 增加自动仙路争霸竞猜功能。

## 2022-2-17 V1.9.5
1. 增加游戏鸭平台。

## 2022-2-18 V1.9.6
1. 增加游戏鸭神之六面平台。

## 2022-3-2 V1.9.7
1. 增加游戏鸭-剑气除魔(纯文字修真)H5平台。

## 2022-3-2 V1.9.8
1. 增加自动购买占命石
2. 增加仙缘商店买地兽天·山河图
3. 增加仙盟坊市买地兽天·山河图
4. 隐藏探宝灯8000和2000以及2个寻仙令

## 2022-3-3 V1.9.9
1. 增加3011-剑气除魔(纯文字修真)H5平台。

## 2022-3-4 V2.0.0
1. 增加剑气除魔H5-3011平台。

# 2022-3-5 V2.0.1
1. 修改转移策略，只能同一个用户ID转。
2. 增加用户羔羊游-剑气除魔(纯文字修真)
3. 增加饺子手游-剑气除魔(纯文字修真)

# 2022-3-16 V2.0.2
1. 将饺子手游-剑气除魔H5分开成饺子手游-剑气除魔(loginType=31)和饺子手游-修真归来(loginType=40)

# 2022-4-14 V2.0.4
1. 增加冰火游戏(loginType=41)

# 2022-4-21 V2.0.5
1. 增加傲剑苍穹(loginType=42)

# 2022-4-30 V2.0.6
1. 傲剑苍穹从前端登录莫名奇妙报错“账号信息异常”，改成通过Python接口登录。

# 2022-5-6 V2.0.7
1. 增加炼制法宝法身不分解的选项。

# 2022-5-12 V2.0.8
1. 将LoginType为31以后的都改成check_user成功就不登录。

# 2022-5-14 V2.0.9
1. 增加修仙霸业平台。

# 2022-5-15 V2.0.10
1. 增加巴兔-剑气除魔(纯文字修真)。

# 2022-5-28 V2.0.11
1. 修复探宝灯不购买的BUG
2. 道侣修炼任务增加：道侣升级丹x8(消耗5灵力)
3. 增加自动打次元裂缝(5+3*8=29星，介意勿开)
4. 增加次元商店购买孙悟空碎片
5. 增加次元商店购买少年哪吒碎片
6. 增加次元商店购买杨戬碎片
7. 增加次元商店购买月光宝匣

# 2022-5-29 V2.0.12
1. 修复无法开启仙盟坊市买地兽天·山河图的bug

# 2022-6-7 V2.0.14
1. 增加咪噜平台
2. 增加游戏辅助反馈

# 2022-7-23 V2.0.15
1. 增加万古至尊(不能注册账号的这个)

# 2022-7-31 V2.0.16
增加如下参数
1. is_buy_myjh 仙缘商店买命元精华(每日500仙缘)
2. is_buy_jhs 仙盟买聚魂石(每日5000贡献)
3. is_buy_zhs 仙盟买造化石(每日8000贡献)
4. is_buy_tyy 仙盟二层买天衍玉(每周500仙贝)
5. is_buy_dzjt 荣誉商店买锻造精铁(每日500荣誉)

# 2022-8-30 V2.0.18
1. 增加五岳乾坤平台