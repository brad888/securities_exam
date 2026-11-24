# 考前资料核对记录

## 结论与范围

原资料有金融8章、法规5章及纪法补充的目录框架，49个讲义考点、11卷340题。目录齐不代表逐条讲解齐。已按站内2025版章节结构核对缺口，新增16个考点和60题，现为65考点、15卷400题。页面保留14行覆盖说明和原章末未覆盖提示。

协会2025版大纲的发布与适用时间通过中国投资者网转载公告确认。协会PDF附件工具获取失败，原站镜像PDF也超时，因此没有宣称完成官方大纲逐条审计。纪法范围保留协会来源与“仅高管”区别提示，不把未读取的附件视为已逐条核实。

## 补充与纠错

- 金融：国际债券与汇率方向、政策传导、净价全价、久期与再投资、申赎费、REITs、收益与波动、β/CAPM。计算均用题给假设与费率，不以旧投教文章费率替代现行标准。
- 法规：合伙、决议分母、公开公司债、报告期限、权益变动、收购、信息隔离和责任分类。具体豁免、阈值计算和特殊情形仍提示查专门规则。
- 修正原金融120题模拟卷第45题答案：正确为A、B、D（原为B、C、D，错误包括“保本承诺”）。答案未缓存，旧作答按当前答案重新计算；不清除用户记录。
- 修正期权股息影响笔误，同步速记、导图与讲义中的期限/股息适用条件。
- 修正把退市整理期顺序和摘牌后去向混为一谈的说法，提醒交易类强制退市通常不设整理期。
- 练习结果同时显示正确率，既有模拟评分仍仅作练习用途。

## 公开核对来源

- [2025版大纲发布公告](https://www.investor.org.cn/zczx/qwzx/hyxhfb/202512/t20251204_875461.shtml)
- [证券法现行文本](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_725883cb6dda4fdf965a3d14358e279f.html)：公开债、披露、收购、法律责任。
- [公司法](https://www.samr.gov.cn/xyjgs/flfg/art/2024/art_d4e84936a8a744f8928ac7aec7594345.html)、[合伙企业法](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2023/art_28f19c7b1d204e69a131292d0b793078.html)。
- [券商风控办法](https://www.csrc.gov.cn/csrc/c106256/c1653957/content.shtml)、[合规办法](https://www.csrc.gov.cn/csrc/c106256/c1653949/content.shtml)。
- [REITs指引说明](https://www.csrc.gov.cn/csrc/c100028/c1000722/content.shtml)、[基金费用算法](https://www.csrc.gov.cn/shenzhen/c105614/c1575407/content.shtml)。
- [上交所2026年上市规则](https://www.sse.com.cn/lawandrules/sselawsrules2025/stocks/mainipo/c/c_20260424_10816589.shtml)、[期权投教](https://www.csrc.gov.cn/hunan/c105684/c1293768/content.shtml)。
- [金融公开回忆样本](https://www.233.com/zq/jczhenti/202610/04104523480631.html)、[法规公开回忆样本](https://www.233.com/zq/lawzhenti/202609/18085528669531.html)：仅识别所涉主题，没有复制原卷或独家解析。

新增讲义与每题解析内保留具体来源和讲义回链。本次未获取233网校三色笔记PDF，不以原版名义展示。

## 验证与限制

`node scripts/check-content.cjs`：脚本语法、题型答案索引、旧试卷顺序、65考点/400题、60题来源与对应讲义、股票保本误选回归、HTML id均通过。

`LINKEDOM_PATH=<已有linkedom安装目录> node scripts/check-page.cjs`：离线DOM初始化、筛选、三色模式、四个入口、答题交卷、多选全选判分、全对/漏答/错题、解析回链和内部锚点通过。

浏览器安全策略拒绝file URL，没有改用服务器、其他浏览器或协议绕过。未完成实际浏览器视觉和375px窄屏检查；离线DOM不能证明布局无问题。未推送、发布或改写已有作答数据。
