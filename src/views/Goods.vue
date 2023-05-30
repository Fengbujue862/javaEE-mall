<!--
 * @Descripttion: 全部商品页面组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-12 20:56:01
--> 

<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->



    <!-- 主要内容区 -->
    <div class="main">
      <div class="product-nav">
<!--        <div class="title">分类</div>-->
        <el-tabs  type="border-card" v-model='activeName'>
          <el-tab-pane label='全部' name='0'>
            <!-- 主要内容区 -->
            <div class="main">
              <div class="list">
                <MyList :list="product" v-if="product.length>0"></MyList>
                <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <!-- 分页END -->
            </div>
            <!-- 主要内容区END -->
          </el-tab-pane>

          <el-tab-pane label='数码' name='1'>
            <!-- 主要内容区 -->
            <div class="main">
              <div class="list">
                <MyList :list="digproduct" v-if="product.length>0"></MyList>
                <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <!-- 分页END -->
            </div>
            <!-- 主要内容区END -->
          </el-tab-pane>
          <el-tab-pane label='服装' name='2'>
            <!-- 主要内容区 -->
            <div class="main">
              <div class="list">
                <MyList :list="clothproduct" v-if="clothproduct.length>0"></MyList>
                <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <!-- 分页END -->
            </div>
            <!-- 主要内容区END -->
          </el-tab-pane>
          <el-tab-pane label='食品' name='3'>
            <!-- 主要内容区 -->
            <div class="main">
              <div class="list">
                <MyList :list="foodproduct" v-if="foodproduct.length>0"></MyList>
                <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <!-- 分页END -->
            </div>
            <!-- 主要内容区END -->
          </el-tab-pane>

          <el-tab-pane label='搜索' name='4'>
            <!-- 主要内容区 -->
            <div class="main">
              <div class="list">
                <MyList :list="searchproduct" v-if="searchproduct.length>0"></MyList>
                <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
              </div>
              <!-- 分页 -->
              <div class="pagination">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
              <!-- 分页END -->
            </div>
            <!-- 主要内容区END -->
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
import * as productAPI from '@/api/products'
import * as categoryAPI from '@/api/categories'
import axios from 'axios'

export default {
  data() {
    return {
      categoryList: ["全部","数码","服装","食品"], //分类列表
      product: [], // 商品列表
      digproduct:[],
      foodproduct:[],
      clothproduct:[],
      searchproduct:[],
      productList: '',
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: '0', // 分类列表当前选中的id
      search: '', // 搜索条件
      start: 0,
      limit: 15
    }
  },
  created() {

  },
  activated() {
    this.activeName = '0' // 初始化分类列表当前选中的id为-1
    this.total = 0 // 初始化商品总量为0
    this.currentPage = 1 //初始化当前页码为1
    this.load()
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search
      this.searchres()
      this.activeName='4'
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function(val) {

    },

  },
  methods: {
    load(){
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: this.currentPage,
          limit: 15,
          type: "数码",
        }
      }).then(res => {
        this.digproduct=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: this.currentPage,
          limit: 15,
          type: "食品",
        }
      }).then(res => {
        this.foodproduct=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: this.currentPage,
          limit: 15,
          type: "服装",
        }
      }).then(res => {
        this.clothproduct=res.data.data.list
      })
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: this.currentPage,
          limit: 15,
        }
      }).then(res => {
        this.product=res.data.data.list
      })
    },

    handleCurrentChange(val) {
      this.start = this.limit * (val - 1) // val 页面
      this.getData()
    },
    searchres(){
      axios.get('/api/goods/list', {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{
          sortField: "VIEW_CNT_DESC",
          page: this.currentPage,
          limit: 15,
          keyword: this.search,
        }
      }).then(res => {
        this.searchproduct=res.data.data.list
      })
    },

  }
}
</script>

<style scoped>
.goods {
  background-color: #f2f2f2;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: #f2f2f2;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: #f2f2f2;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>