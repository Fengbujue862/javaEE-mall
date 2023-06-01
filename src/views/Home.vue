<!--
 * @Descripttion: 首页组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-12 21:20:08
--> 

<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousels" :key="item.id">
          <router-link :to="{ path: '/goods/details', query: {productID:item.id} }">
            <div style='text-align: center'>
              <img style="height:460px; display: inline-block" v-lazy="item.picture" alt="图片" onerror="this.src='默认图片的url地址'" />
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <div class="main-box">
      <div class="main">
        <!-- 数码商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">数码</div>
          </div>
          <div class="box-bd">
            <div class="promo-list" v-for="item in phonesList" :key="item.id">
              <router-link :to="{ path: '/goods/details', query: {productID:item.id} }">
                <img :src="item.picture" alt='商品图片缺失' />
              </router-link>
<!--              <router-link :to="{ path: '/goods/details', query: {productID:30} }">-->
<!--                <img :src="'https://i.postimg.cc/VLrrv3SW/ebb0797a31f1a076.jpg'" alt='test' />-->
<!--              </router-link>-->
            </div>
          </div>
        </div>
        <!-- 数码商品展示区域END -->

        <!-- 食品商品展示区域 -->
        <div class="appliance" id="promo-menu">
          <div class="box-hd">
            <div class="title">食品</div>
          </div>
          <div class="box-bd">
            <div class="promo-list" v-for="item in foodList" :key="item.id">
              <router-link :to="{ path: '/goods/details', query: {productID:item.id} }">
                <img :src="item.picture" alt='商品图片缺失' />
              </router-link>
<!--              <router-link :to="{ path: '/goods/details', query: {productID:14} }">-->
<!--                <img :src="'https://i.postimg.cc/8cVKcqDK/dc7607ad9bb3c012.jpg'" alt='test'/>-->
<!--              </router-link>-->
            </div>
          </div>
        </div>
        <!-- 食品商品展示区域END -->

        <!-- 服装商品展示区域 -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">服装</div>
          </div>
          <div class="box-bd">
            <div class="promo-list" v-for="item in clothList" :key="item.id">
              <router-link :to="{ path: '/goods/details', query: {productID:item.id} }">
                <img :src="item.picture" alt='商品图片缺失' />
              </router-link>
<!--              <router-link :to="{ path: '/goods/details', query: {productID:30} }">-->
<!--                <img :src="'https://i.postimg.cc/kGjQC8pM/7b0f3eac0cd939be.jpg'" alt />-->
<!--              </router-link>-->
            </div>
          </div>
        </div>
        <!-- 服装商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
import * as carouselsAPI from '@/api/carousels/'
import * as productsAPI from '@/api/products/'
import * as rankingAPI from '@/api/ranking/'
import axios from 'axios'

export default {
  data() {
    return {
      goodslist: [],//商品列表
      carousels: [], // 轮播图数据
      phonesList: '', // 数码商品列表
      foodList: '', // 家电商品列表
      clothList: '', //配件商品列表

      televisionsList: '', // 小米电视商品列表
      applianceHotList: '', //热门家电商品列表
      accessoryHotList: '', //热门配件商品列表
      phoneShellsList: '', // 保护套商品列表
      chargersList: '', //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1, // 配件当前选中的商品分类
      start: 0,
      limit: 7
    }
  },
  watch: {
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function(val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList == '') {
        this.applianceHotList = this.applianceList
      }
      if (val == 1) {
        // 1为热门商品
        this.applianceList = this.applianceHotList
        return
      }
      if (val == 2) {
        // 2为电视商品
        this.applianceList = this.televisionsList
        return
      }
    },
    accessoryActive: function(val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList == '') {
        this.accessoryHotList = this.accessoryList
      }
      if (val == 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList
        return
      }
      if (val == 2) {
        // 2为保护套商品
        this.accessoryList = this.phoneShellsList
        return
      }
      if (val == 3) {
        //3 为充电器商品
        this.accessoryList = this.chargersList
        return
      }
    }
  },
  activated() {
    // 获取首页数据
    this.load()
  },
  methods: {
    load() {
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: 1,
          limit: 4,
          type: "数码",
        }
      }).then(res => {
        this.phonesList=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: 1,
          limit: 4,
          type: "服装",
        }
      }).then(res => {
        this.clothList=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: 1,
          limit: 4,
          type: "食品",
        }
      }).then(res => {
        this.foodList=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: 1,
          limit: 5
        }
      }).then(res => {
        this.carousels=res.data.data.list
        //console.log(this.carousels)
      })
      /*carouselsAPI
        .listCarousels()
        .then(res => {
          if (res.status == 200) {
            this.carousels = res.data
          } else {
            this.notifyError('获取轮播图失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取轮播图失败', err)
        })*/

      //获取热门家电
      /*rankingAPI
        .listElecRanking()
        .then(res => {
          if (res.status === 200) {
            this.applianceHotList = res.data
            this.applianceList = res.data
          } else {
            this.notifyError('获取热门家电失败')
          }
        })
        .catch(err => {
          this.notifyError('获取热门家电失败', err)
        })
      //获取热门配件
      rankingAPI
        .listAcceRanking()
        .then(res => {
          if (res.status === 200) {
            this.accessoryHotList = res.data
            this.accessoryList = res.data
          } else {
            this.notifyError('获取热门配件失败')
          }
        })
        .catch(err => {
          this.notifyError('获取热门配件失败', err)
        })
      //获取手机列表
      this.getProduct(1, 'phonesList')
      //获取电视列表
      this.getProduct(2, 'televisionsList')
      //获取保护套列表
      this.getProduct(5, 'phoneShellsList')
      //获取充电器列表
      this.getProduct(7, 'chargersList')*/
    },
    // 获取家电模块子组件传过来的数据
    /*getChildMsg(val) {
      this.applianceActive = val
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.accessoryActive = val
    },
    // 获取各类商品数据方法封装
    getProduct(categoryID, val) {
      productsAPI
        .listProducts(categoryID, this.start, this.limit)
        .then(res => {
          if (res.status === 200) {
            this[val] = res.data.items
          } else {
            this.notifyError('获取失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取失败', err)
        })
    }*/
  },
  beforeRouteEnter(to, from, next) {
    // 添加背景色
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#ffffff')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#f5f5f5')
    next()
  }
}
</script>
<style scoped>
@import '../assets/css/index.css';
</style>