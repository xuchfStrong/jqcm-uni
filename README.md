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