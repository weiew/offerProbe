<template>
  <div class="loginBg">
    <div class="login">
      <div class="title">
        <h3>Sign In</h3>
      </div>
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="loginRules" label-width="0" class="loginForm">
        <el-form-item label="" prop="account">
          <el-input v-model="loginForm.account" prefix-icon="el-icon-message" placeholder="Username / Email"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-view" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-col :span="6" class="forget">
            <a class="linkText" href="#/forget"><i class="el-icon-question"></i>Forgot Password？</a>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="login()" size="small" style="width: 180px">LOGIN</el-button>
            <a class="linkBtn" href="#/register">register</a>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      loginForm:{
        account:"",
        password:""
      },
      loginRules: {
        account: [
          {required: true, message: 'please input username', trigger: 'blur'},
          // { validator: this.VTools.checkMobile, messageText:'登录账号' }
        ],
        password: [
          {required: true, message: 'please input password', trigger: 'blur'},
          {validator: this.VTools.checkPassword, messageText: 'login password'}
        ]
      },
    }
  },
  methods:{
    login:function () {
      var _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let postData = {
            account:this.loginForm.account,
            password:this.loginForm.password,
            media:"mobile"
          }
          this.$router.push({path: '/'});
/*          api.login(postData).then((data) => {
            debugger
            if(data.result === "100"){
              sessionStorage.setItem("token",data.dto.token);
              api.userInfoByToken().then((dataA) => {
                if(dataA.result === "100"){
                  _this.setToken({token: data.dto.token});
                  _this.saveUserInfo(dataA.dto);
                  this.$message("登录成功");
                  this.$router.push({path: '/'});
                }else{
                  sessionStorage.removeItem("token");
                }
              })
            }
          })*/
        }else{
          console.log("录入内容格式错误")
        }
      })
    },
    register:function () {

    },
    ...mapActions([
      'saveUserInfo',
      'setToken'
    ])
  },
  mounted() {
    sessionStorage.removeItem("token");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBg{
  background: url(http://oiy6qbh9k.bkt.clouddn.com/bgImg/bgbuilding.jpg) no-repeat 100% 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  display: block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.linkBtn{
  border-radius: 3px;
  padding: 9px 10px;
  background: #dedede;
  color: #2f363c;
  text-decoration: none;
  font-size: 12px;
}
.linkText{
  color: #525252;
  text-decoration: none;
  font-size: 12px;
}
.login{
  position: absolute;
  top: 30%;
  left: 50%;
  width: 450px;
  margin-left: -225px;
  background: #ffffff;
  opacity: 0.95;
}
.login .title{
  background: #242b31;
  height: 60px;
}
.loginForm{
  margin: 30px auto;
  width: 80%;
}
.login h3{
  color: #c9b89a;
  line-height: 60px;
  margin: 0;
  text-align: left;
  padding-left: 15px;
  font-weight: normal;
  font-size: 33px;
}
.forget{
  font-size: 12px;
  color: #5d6de2;
  text-align: left;
}
</style>
