Boss  前端项目结构说明
---------------------

#boss 由 boss,sop,brige 三部分组成

##boss,sop那些人使用
+产品
+开发
+运维
+测试
+客服
+其它


###brige
+测试
+研发

#boss项目将以文件夹形式进行分组

##基础目录结构
*boss : boss项目
    *css  皮肤
    *js   业务代码
        controllers : 业务控制器 控制数据
        services    : 与后端交互的服务 或者 controller之间共享服务
    *tpl  视图
        audit ：审核视图
        home  : 主页视图
        user  ：用户管理视图

*brige : brige项目
    *css  皮肤
    *js   业务代码
    *tpl  模板
*sop   : sop项目
    *同上

*data  : 静态json数据用于 协议测试等
*imgs  : 三个项目公用图片结构
i10n   : 国际化文件
share  : 三个项目 共享部分
lib    : 组件库 UI

