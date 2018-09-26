<template>
  <div style="text-align: left;">
    <el-row style="background: #fff">
      <el-col :span="24">
        <el-tabs v-model="tabActive" type="card" @tab-click="tabClick">
          <el-tab-pane label="Tracking Link" name="first">
            <el-row style="padding: 20px;text-align: left">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="Enter your affiliate/tracking link"
                  v-model="formFirst.link">
                </el-input>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="HTML Tag" name="second">
            <el-row style="padding: 20px;text-align: left">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="Paste your code here: e.g Javascript/iframe and etc"
                  v-model="formFirst.html">
                </el-input>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="24" style="padding: 10px 20px;">
        <el-select class="firstSelect" v-model="formFirst.device" placeholder="please choose">
          <el-option
            v-for="item in options.device"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="firstSelect" filterable v-model="formFirst.country" placeholder="United States">
          <el-option
            v-for="item in options.country"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
<!--        <el-select class="firstSelect" v-model="formFirst.country" placeholder="8 Oreo (Latest)">
          <el-option
            v-for="item in options.country"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="firstSelect" v-model="formFirst.country" placeholder="Random city">
          <el-option
            v-for="item in options.country"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="firstSelect" v-model="formFirst.country" placeholder="Wifi Connection">
          <el-option
            v-for="item in options.country"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="firstSelect" v-model="formFirst.country" placeholder="Select Carrier (3G Connection)">
          <el-option
            v-for="item in options.country"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>-->
        <el-button type="danger" @click="queryLink">SUBMIT</el-button>
<!--        <span style="font-size: 12px;margin-left: 10px;">Show result as:</span>
        <el-radio v-model="formFirst.resultType" label="1">Redirections</el-radio>
        <el-radio v-model="formFirst.resultType" label="2">Screenshot</el-radio>-->
      </el-col>
    </el-row>
    <el-row>
        <ul class="linkLogo">
          <li v-for="(item,index) in logoList">
            <img :src="'http://detect.those1.com'+item">
            <img v-if="index != logoList.length-1" src="../assets/images/arrow-right.png">
          </li>
        </ul>
    </el-row>
    <el-row class="textList">
      <el-col :span="24">
        <h4>Redirections:</h4>
        <p v-for="(item,index) in redirections">
          <span>{{index+1}}. </span> {{item}}
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../api/api';
export default {
  name: 'api',
  data(){
    return{
      tabActive:'first',
      formFirst:{
        device:'1',
        country:'cn',
        link:'',
        html:'',
        resultType:"1",
      },
      options:{
        device:[
          {value:'1',label:'Android'},
          {value:'2',label:'IOS'},
/*          {value:'ipad',label:'iPad'},
          {value:'desktop',label:'Desktop'},
          {value:'windowsPhone',label:'Windows'},
          {value:'blackberry',label:'Blackberry'}*/
        ],
        country:[
          {value:'cn',label:'China'},
          {value:'us',label:'United States'},
          {value:'sg',label:'Singapore'},
          {value:'bd',label:'Bangladesh'},
          {value:'in',label:'India'}
        ]
      },
      logoList:[
        'SSJHsJsag-.PNG',
        'ILGMdSHcnP.png',
        'cpFU1ibQ8m.PNG',
        'SSJHsJsag-.PNG',
        'ILGMdSHcnP.png',
        'H9IobZNfKq.PNG',
        'SSJHsJsag-.PNG',
        'oGr9JLyZa0.PNG',
        'cpFU1ibQ8m.PNG',
      ],
      redirections:[]
    }
  },
  mounted(){
  },
  methods: {
    tabClick(){
    },
    getOptions(){
      let postData = {
        group: '5',
        sign: 'c4d53db8e143cbaa1197a70352e4033b',
        ts: '1537281358'
      }
      api.get('ips/gg')(postData).then((data) => {
        if(data.status == '200'){
          let newList = [];
          data.data.forEach(item =>{
            newList.push({
              value: item.countryCode,
              label: item.countryName
            })
          })
          this.options.country = newList;
        }else{
          this.$message({
            message: data.message?data.message:'server error',
            type: 'error'
          });
        }
      })
    },
    queryLink(){
      if(!this.formFirst.link){
        this.$message({
          message: "please input link first",
          type: 'error'
        });
        return
      }
      let postData = {
        link:this.formFirst.link,
        country_code:this.formFirst.country,
        platform:this.formFirst.device,
        token:"5ce8494043c44e394520ae8f42bd6e53",
        t:"1537277281",
      }
      api.post('detect/creative/detect')(postData).then((data) => {
        if(data.status == '200'){
          this.logoList = data.data.icon_links;
          this.redirections = data.data.redirect_links;
        }else{
          this.$message({
            message: data.msg?data.msg:'server error',
            type: 'error'
          });
        }
      })

    },
  },
  mounted() {
  },
  created (){
    this.getOptions()
  }
}
</script>
<style scoped>
  .linkLogo{
    list-style: none;
    text-align: left;
    padding: 20px;
    margin: 0;
  }
  .linkLogo li{
    display: inline-block;
    margin-bottom: 10px;
  }
  .linkLogo li img{
    height: 40px;
  }
  .firstSelect{
    margin-bottom: 10px;
  }
  .textList{
    background: #fff;
    padding: 10px;
  }
  .textList p{
    color: #aaa;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;
  }
  .textList span{
    color: #555;
  }
</style>
