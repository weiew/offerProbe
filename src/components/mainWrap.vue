<template>
  <el-container>
    <el-header>
      <mainHead></mainHead>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu
          :default-active='activeNav'
          class="el-aside-menu"
          :router="true"
          background-color="#f7fafb"
          text-color="#606978"
          active-text-color="#ffd04b">
<!--
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>Dashboard</span>
            </template>
          </el-submenu>
-->

          <el-menu-item index="dashboard">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>Dashboard</span>
            </template>
          </el-menu-item>
          <el-menu-item index="detect">
              <i class="el-icon-search"></i>
              <span>Detect</span>
          </el-menu-item>
          <el-menu-item index="purchases">
              <i class="el-icon-tickets"></i>
              <span>Purchases</span>
          </el-menu-item>
          <el-menu-item index="packages">
              <i class="el-icon-goods"></i>
              <span>Packages</span>
          </el-menu-item>
          <el-menu-item index="API">
              <i class="el-icon-sort"></i>
              <span>API</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-container>
        <el-main v-bind:style="{ 'height': mainHeight + 'px'}">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" id="middleContainer" mode="out-in" >
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </el-main>
<!--        <el-footer>
          <p>Footer</p>
        </el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import api from '../api/api';
  import mainHead from '@/components/mainHead'
export default {
  components:{mainHead:mainHead},
  name: 'mainWrap',
  data () {
    return {
      activeNav: 'dashboard',
      mainHeight:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getMainHeight (){
      this.mainHeight = window.screen.availHeight-70;
    },
    initProject(){
/*      api.projectInfo().then((data) => {
        if(data.result === "100"){
          debugger
          _this.setToken({token: data.dto.token});
          _this.saveUserInfo(data.dto);
          this.$message("登录成功");
          this.$router.push({path: '/'});
        }else{
          sessionStorage.removeItem("token");
        }
      })*/
    },
    codemirrorChange: function () {

    }
  },
  mounted() {
    let that = this;
    that.getMainHeight();
    window.onresize = that.getMainHeight;
    if(window.location.hash.match(/\//g).length>1){ //解决刷新后没有高亮菜单的问题
      this.activeNav = window.location.hash.match(/\#\/*\/(\S*)\//)[1]
    }else{
      this.activeNav = window.location.hash.match(/\#\/*\/(\S*)/)[1]
    }
  },
  created() {
    this.initProject();
  }
}
</script>
<style type="text/scss">
  .el-aside-menu li.el-menu-item{
    width: 80%;
    margin: auto;
    border-radius: 10px;
    margin-bottom: 5px;
  }
  .el-aside-menu li.el-menu-item.is-active{
    background: #f44236 !important;
    color: #fff !important;
    box-shadow: 2px 2px 2px #ccc;
  }
</style>
<style lang="scss" type="text/scss">
  .el-header{
    position: fixed;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .el-aside {
    text-align: left;
    background: #f7fafb;
    box-shadow: 2px 2px 2px #eee;
    position: absolute;
    z-index: 8;
    top: 60px;
    padding-top: 20px;
    bottom: 0;
  }
  .el-aside-menu{
    border: none;
  }
  .el-aside-menu a{
    color: #606978;
    text-decoration: none;
  }
  .el-main{
    padding: 70px 10px 10px 220px;
    background: #ededed;
  }
  .el-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: #f7fafb;
  }
 /* #mainWrapContainer{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  #middleContainer{
    padding-bottom: 60px;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 30px !important;
    line-height: 30px !important;
  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: #f1f1f1;
  }*/
</style>
