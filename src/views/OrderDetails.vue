<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-07-22 13:14:57
 * @LastEditors: congz
 * @LastEditTime: 2020-08-13 10:34:49
--> 
<template>
  <div class="order-details" id="order-details" name="order-details">
    <div class="order-details-layout" v-if="orderNum!=-1">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="order-details-content">
            <div class="order-details-title">
              <p>订单详情</p>
            </div>
            <div class="order-operate">
              <span class="order-num">订单号：{{order.id}}</span>
              <span class="order-success-info">已付款:{{order.createTime}}</span>
            </div>

            <div class="order-list-product" v-for="(item,index) in order.goodsInfo" :key="index">
              <div class="pro-img">
                <router-link :to="{ path: '/goods/details', query: {productID:item.goods.id} }">
                  <img :src="item.goods.picture" />
                </router-link>
              </div>
              <div class="pro-info">
                <span style="margin-bottom:7px">
                  <router-link
                    class="info-href"
                    :to="{ path: '/goods/details', query: {productID:item.goods.id} }"
                  >{{item.goods.name}}</router-link>
                </span>
              </div>
              <div class="pro-price">
                <span>
                  {{item.goods.price | numFilter}} 元&nbsp;×
                  {{item.amount}}
                </span>
              </div>
            </div>
            <div class="order-address-title">收货信息</div>
            <div class="order-address">
              <div class="order-address-head">
                <p>姓名：</p>
                <p>收货地址：</p>
              </div>
              <div class="order-address-data">
                <p>{{name}}</p>
                <p>{{order.address}}</p>
              </div>
            </div>
            <!-- 结算列表 -->
            <div class="section-count">
              <div class="money-box">
                <ul>
                  <li>
                    <span class="title">商品总价：</span>
                    <span class="value">{{order.price | numFilter}}元</span>
                  </li>
                  <li>
                    <span class="title">运费：</span>
                    <span class="value">0元</span>
                  </li>
                  <li class="total">
                    <span class="title">订单总额：</span>
                    <span class="value">
                      <span class="total-price">{{order.price | numFilter}}</span>元
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="not-found" v-else>查询不到该订单</div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'OrderDetails',
  data() {
    return {
      orderNum:'',
      order: '',
      name:'',
      form:'',
      orderslist:{
        id:'',
        createTime:'',
        price:'',
        address:'',
        goodsInfo:[]
      },// 订单列表
    }
  },
  activated() {
    if (this.$route.query.orderNum != undefined) {
      this.orderNum = this.$route.query.orderNum
    } else {
      this.orderNum = -1
    }
    this.load();
  },
  filters: {
    numFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  },
  methods: {
    ...mapGetters(['getUsername']),
    load() {
      //this.order=this.orderslist;
      this.name=this.$store.getters.getUsername;
      if(this.orderNum!=-1) {
        axios.get('http://82.156.143.194:8090/shopping/findOrderById', {
          params: {
            orderId: this.orderNum
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then(res => {
          if (res.status === 200) {
            this.order = res.data.data
          } else if (res.status === 401) {
            this.loginExpired(res.message)
          } else {
            this.notifyError('获取订单失败', res.message)
          }
        })
          .catch(err => {
            this.notifyError('获取订单失败', err)
          })
      }
      /*
      ordersAPI
        .showOrder(this.orderNum)
        .then(res => {
          if (res.status === 200) {
            this.order = res.data
          } else if (res.status === 20001) {
            //token过期，需要重新登录
            this.loginExpired(res.msg)
          } else {
            this.notifyError('获取订单失败', res.msg)
          }
        })
        .catch(err => {
          this.notifyError('获取订单失败', err)
        })

       */
    }
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.order-details-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.order-details-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.order-details-title {
  height: 84px;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.order-details-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
/*订单号按钮区域*/
.order-details-content .order-operate {
  width: 920px;
  margin: 0 auto;
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
}
.order-details-content .order-operate .order-num {
  width: 500px;
  font-size: 18px;
  color: #242424;
}

/*订单号按钮区域END*/
/*进度条区域*/
.order-details-content .order-success-info {
  width: 920px;
  margin-left: 470px;
  color: #00a724;
  font-size: 18px;
}
/*进度条区域END*/
/*订单商品区域*/
.order-details-content .order-list-product {
  width: 920px;
  height: 110px;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}
.order-details-content .order-list-product .pro-img {
  margin-right: 20px;
}
.order-details-content .order-list-product .pro-img img {
  height: 80px;
  width: 80px;
}
.order-details-content .order-list-product .pro-info {
  font-size: 15px;
  color: #333333;
}
.order-details-content .order-list-product .pro-info .info-href {
  font-size: 15px;
  color: #333333;
}
.order-details-content .order-list-product .pro-info .info-href:hover {
  color: #ff6700;
}
.order-details-content .order-list-product .pro-price {
  position: absolute;
  margin-left: 720px;
  font-size: 15px;
  color: #333333;
}

/*订单商品区域END*/
/*订单收货信息区域*/
.order-details-content .order-address-title {
  width: 920px;
  margin: 0 auto;
  color: #242424;
  font-size: 18px;
  margin-top: 20px;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
}
.order-details-content .order-address {
  width: 920px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}
.order-details-content .order-address .order-address-head {
  font-size: 15px;
  line-height: 25px;
  font-weight: bold;
  color: #757575;
}
.order-details-content .order-address .order-address-data {
  font-size: 15px;
  line-height: 25px;
  color: #757575;
}
/*订单收货信息区域END*/

/* 结算列表CSS */
.order-details-content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.order-details-content .section-count .money-box {
  float: right;
  text-align: right;
}
.order-details-content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.order-details-content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.order-details-content .section-count .money-box .total .title {
  padding-top: 15px;
}
.order-details-content .section-count .money-box .total .value {
  padding-top: 10px;
}
.order-details-content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/*v-else*/
.order-details .not-found {
  height: 500px;
  text-align: center;
}
/*v-else END*/
</style>