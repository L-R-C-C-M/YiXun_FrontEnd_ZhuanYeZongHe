<!-- @author:刘筱科-志愿者后台管理界面的侧边导航栏 -->
<template>
<!-- 侧边栏 -->
  <el-aside width="200px" style="background-color: #323A52">
    <el-menu
      background-color="#323A52"
        text-color="#fff"
        active-text-color="#2C9EF7"
        router>

      <el-menu-item index="/VolBackstage/VolHomePage">
        <el-icon><User /></el-icon>
        <span>主页</span>
      </el-menu-item>

      <el-menu-item index="/VolBackstage/volManagement">
        <el-icon><Iphone /></el-icon>
        <span>工作人员信息</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Edit />
          </el-icon>
          <span>志愿活动管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/VolBackstage/releasedActivity">已发布志愿活动</el-menu-item>
          <el-menu-item index="/VolBackstage/releaseActivity">发布志愿活动</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/VolBackstage/PersonalInfo">
        <el-icon><setting /></el-icon>
        <span>个人信息</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default{
    name:'UserBackstageSideBar'
}

</script>
