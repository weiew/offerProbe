<template>
  <div class="registBg">
    <div class="regist">
      <div class="title">
        <h3>SIGN UP</h3>
      </div>
      <el-form ref="registForm" :model="registForm" status-icon :rules="registRules" label-width="0" class="registForm">
        <el-form-item label="" prop="account">
          <el-input v-model="registForm.account" prefix-icon="el-icon-star-off" placeholder="please input username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="email">
          <el-input v-model="registForm.email" prefix-icon="el-icon-message" placeholder="please input email"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="registForm.password" prefix-icon="el-icon-view" type="password" placeholder="please input a password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="confirmPwd">
          <el-input v-model="registForm.confirmPwd" prefix-icon="el-icon-view" type="password" placeholder="please input the password again"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-col :span="6" class="forget">
            <a class="linkText" href="#/login"><i class="el-icon-question"></i>Already have an account？</a>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="register()" size="small" style="width: 180px">SIGN UP</el-button>
            <a class="linkBtn" href="#/login">LOGIN</a>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
export default {
  data () {
    let checkConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please input the password again'))
      } else if (value !== this.registForm.password) {
        callback(new Error('Please enter the same password.'))
      } else {
        callback()
      }
    };
    return {
      registForm: {
        account: '',
        email: '',
        password: '',
        confirmPwd: '',
        verifyCode: ''
      },
      registRules: {
        account: [
          {required: true, message: 'please input username', trigger: ['blur', 'change']},
          {validator: this.VTools.checkAccount, messageText: 'username'}
        ],
        email: [
          {required: true, message: 'please input email', trigger: 'blur'},
          {validator: this.VTools.checkEmail, messageText: 'email'}
        ],
        password: [
          {required: true, message: 'please input password', trigger: 'blur'},
          {validator: this.VTools.checkPassword, messageText: 'password'}
        ],
        confirmPwd: [
          {required: true, message: 'please input password again', trigger: 'blur'},
          {validator: checkConfirmPwd, messageText: 'password again'}
        ]
      }
    }
  },
  methods: {
    register: function () {
      var _this = this;
      this.$refs.registForm.validate((valid) => {
        if (valid) {
          let postData = {
            account: this.registForm.account,
            email: this.registForm.email,
            password: this.registForm.password
          }
          api.register(postData).then((data) => {
            if(data.result === '100'){
              _this.$message('Sign up success, jumping for login...');
              let number = 5;
              let jumpInterval = setInterval(function () {
                _this.$message('Sign up success, jumping for login' + (--number) + '...');
                if(number <= 1){
                  clearInterval(jumpInterval);
                  setTimeout(function () {
                    _this.$router.push({path: '/login'});
                  }, 2000)
                }
              }, 1000)
            }
          })
        }else{
          console.log('input content error')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .registBg{
    background: url(http://oiy6qbh9k.bkt.clouddn.com/bgImg/seaCity.jpg) no-repeat 100% 100%;
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
  .regist{
    position: absolute;
    top: 25%;
    left: 50%;
    width: 450px;
    margin-left: -225px;
    background: #ffffff;
    opacity: 0.95;
  }
  .regist .title{
    background: #242b31;
    height: 60px;
  }
  .registForm{
    margin: 30px auto;
    width: 80%;
  }
  .regist h3{
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
