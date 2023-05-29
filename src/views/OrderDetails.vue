<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-07-22 13:14:57
 * @LastEditors: congz
 * @LastEditTime: 2020-08-13 10:34:49
--> 
<template>
  <div class="order-details" id="order-details" name="order-details">
    <div class="order-details-layout" v-if="order">
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
              <span class="order-num">订单号：{{order.order_id}}</span>
              <span class="order-success-info">已付款:{{order.created_at}}</span>
            </div>

            <div class="order-list-product" v-for="(item,index) in order.orderlistproduct" :key="index">
              <div class="pro-img">
                <router-link :to="{ path: '/goods/details', query: {productID:item.product_id} }">
                  <img :src="item.img_path" />
                </router-link>
              </div>
              <div class="pro-info">
                <span style="margin-bottom:7px">
                  <router-link
                    class="info-href"
                    :to="{ path: '/goods/details', query: {productID:item.product_id} }"
                  >{{item.name}}</router-link>
                </span>
              </div>
              <div class="pro-price">
                <span>
                  {{item.discount_price}} 元&nbsp;×
                  {{item.num}}
                </span>
              </div>
            </div>
            <div class="order-address-title">收货信息</div>
            <div class="order-address">
              <div class="order-address-head">
                <p>姓名：</p>
                <p>联系电话：</p>
                <p>收货地址：</p>
              </div>
              <div class="order-address-data">
                <p>{{order.address_name}}</p>
                <p>{{order.address_phone}}</p>
                <p>{{order.address}}</p>
              </div>
            </div>
            <!-- 结算列表 -->
            <div class="section-count">
              <div class="money-box">
                <ul>
                  <li>
                    <span class="title">商品件数：</span>
                    <span class="value">{{order.num}}件</span>
                  </li>
                  <li>
                    <span class="title">商品总价：</span>
                    <span class="value">{{order.price}}元</span>
                  </li>
                  <li>
                    <span class="title">运费：</span>
                    <span class="value">0元</span>
                  </li>
                  <li class="total">
                    <span class="title">订单总额：</span>
                    <span class="value">
                      <span class="total-price">{{order.price}}</span>元
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
//import * as ordersAPI from '@/api/orders'
export default {
  name: 'OrderDetails',
  data() {
    return {
      orderNum: '', // 订单num,
      order: '',
      address: '',
      orderslist:
        {
          order_id:1,//订单号
          created_at:'2023-5-25 16:07',//订单创建时间
          num:2,
          price:11,
          address_name:'what',//收货人
          address_phone:1,
          address:'11',
          orderlistproduct:[{
            product_id:1,
            name:'product1',//product
            num:1,//product
            img_path:"../assets/imgs/error.png",
            discount_price:2,
          }],
          user_id:1,
        }, // 订单列表
    }
  },
  activated() {
    if (this.$route.query.orderNum != undefined) {
      this.orderNum = this.$route.query.orderNum
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    orderNum: function() {
      this.load()
    }
  },
  methods: {
    load() {
      this.order=this.orderslist;
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
  margin-left: 600px;
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
  margin-left: 620px;
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