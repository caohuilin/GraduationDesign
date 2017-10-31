# 2017-毕业设计(基于WEB平台的阅读APP设计与实现)

书籍，承载着人类的文明和智慧，引领着人类的进步和发展。阅读历史，了解文化，让我们站在前人的肩膀上向着美好的生活大步前进。在全面建设小康社会的今天，智能手机已经变得必不可少，手机阅读也逐渐成为了人们学习、工作、生活中的一部分。本项目实现了一款基于WEB平台的阅读APP的设计与实现，该APP采用简洁护眼颜色搭配，简洁舒适的设计风格，集合了现有市场APP的众多功能，采用React、Redux、Webpack、Babel等最新的WEB开发技术，拥有流畅真实的翻书动画、自动记录阅读历史、多平台同步、收藏和分享图书等功能，同时支持智能分析用户阅读和搜索历史，并自动匹配、推荐用户可能喜爱的书籍，给用户一种全新的阅读体验。

  Books are the carrier of human civilization and wisdom. Reading has been a fine tradition of the Chinese race since ancient times. With the rapid development of science and technology and the widespread of smart mobile phones, mobile phone as a new way of reading has gradually entered people's life. This project introduces design and implementation of a reading APP, which is based on the WEB platform. The App uses comfortable color, simple design style. It achieves a number of functions which are in existing market. It uses React, Redux, Webpack, Babel and WEB development of the latest technology. It also achieves smooth animation about reading, recording reading history automatically, multi-platform synchronization, collection and sharing of books and other functions, and intelligent analysis for users' reading and searching history, and automatically recommending books which the user may like. This App gives users a new reading experience.

## 基本功能

- 登录注册
- 图书搜索
- 图书分类
- 图书阅读
- 图书收藏
- 图书分享
- 图书推荐
- 阅读历史查询

## 效果预览

![home](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/home.png)        ![continue](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/continueNote.png)

![login](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/login.png)      ![register](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/register.png)

![read](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/read.png)        ![user](https://raw.githubusercontent.com/caohuilin/GraduationDesign/master/doc/images/user.png)

## 项目特色

- 精心挑选的颜色搭配及个性化的用户设置。
项目主界面采用浅橙色这种既不失重要提示作用，又给用户以舒服感觉的颜色，让用户在使用的过程中，保持愉悦的心情，迅速找到自己所需的书籍。阅读界面分白天、夜间两种模式，实现了在不同灯光下对眼睛的最大保护作用。用户还可以根据自己的阅读需求调节屏幕亮度、字体大小等，让阅读更加逼真，更加流畅。

- 简洁舒服的界面设计。
项目的设计十分简洁，将重要功能，比如搜索、分类、菜单放置在页面最显眼的位置。阅读界面尽可能的实现仅包含阅读功能，这样能更好的让读者专心阅读，身临其境。

- 流畅的翻书动画。
项目尽可能模拟现实物理现象实现动画，并针对手势做了多方面的细节处理，给用户以真实的阅读体验。

- 第三方登录、分享的实现。
项目除了自身的登录功能之外，实现了第三方登录接口，用户可以使用自己常用的社交账号进行登录，减少登录注册的麻烦，方便用户更快、更好的使用。

- 实时自动记录用户阅读历史。
用户在找书，阅读的过程中，应用会自动记录用户的查找、阅读历史，并在用户再次进入应用时智能提醒用户是否回到上次阅读的状态。

- 完美的实现了多平台同步使用。
该应用实现了电脑、手机、平板多平台登录，并自动同步历史数据的功能，使得用户在不同的设备上使用有相同的体验。

-	按需加载，节省流量。
流量的使用情况关系到用户是否放心使用该应用，所以这方面的优化也是必不可少的。在用户使用应用时，会获取用户当前的网络连接方式，如果是在数据流量的情况下，尽可能的减少图片加载，减少无关信息的加载等，在Wifi情况下，对用户最新访问的图书进行附近章节的缓存，以保证用户在无网络情况下仍可正常使用。

-	智能推荐，为用户推荐可能想看的书籍。
项目会根据用户的阅读历史，阅读行为进行智能分析，并在数据库中匹配相应的书籍推荐给用户。
