<!--
 * @Descripttion: 我的订单页面组件
 * @Author: congz
 * @Date: 2020-07-03 18:01:05
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:55:03
--> 

<template>
  <div class="order" id="order" name="order">
    <div class="order-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="order-content">
            <div class="extra"></div>
            <!--我的订单头部-->
            <div class="order-title">
              <p>我的订单</p>
            </div>
            <div v-if="orders.length>0">
              <!--我的订单头部 end-->
              <!--订单列表-->
              <div class="order-list" v-for="(item,index) in orders" :key="index">
                <div class="order-list-head">
                  <span class="order-pay">已付款</span>
                  <span class="operate">
                      <router-link
                        :to="{ path: '/order/details'}"
                      >
                        <el-button plain class="button-detail" @click='getDetails(item.id)'>订单详情</el-button>
                      </router-link>
                  </span>
                  <div class="order-info">
                    <div style="width:650px;">
                      <span class="info">{{item.createTime}}</span>
                      <span class="cut">|</span>
                      <span class="info">{{item.address}}</span>
                      <span class="cut">|</span>
                      <span class="info">订单号：{{item.id}}</span>
                      <span class="cut">|</span>
                      <span class="info">在线支付</span>
                    </div>
                    <span class="info" style="margin-left:30px">总计金额：</span>
                    <span class="money">{{item.price}}</span>
                    <span class="info">元</span>
                  </div>
                </div>
                <div class="order-list-product" v-for="(item1,index) in item.goodsInfo" :key="index">
                  <div class="pro-img">
                    <router-link
                      :to="{ path: '/goods/details', query: {productID:item1.goods.id} }"
                    >
                      <img :src="item1.goods.picture" />
                    </router-link>
                  </div>
                  <div class="pro-info">
                    <span style="margin-bottom:7px">
                      <router-link
                        class="info-href"
                        :to="{ path: '/goods/details', query: {productID:item1.goods.id} }"
                      >{{item1.goods.name}}</router-link>
                    </span>
                  </div>
                  <div style='margin-left: 110px'>
                    <span>
                      {{item1.goods.price}} 元&nbsp;×
                      {{item1.amount}}
                    </span>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="extra"></div>
              <div class="extra"></div>
            </div>
            <!-- 分页END -->
            <!-- 订单为空的时候显示的内容 -->
            <div v-else class="empty">
              <p>你暂未购买任何商品</p>
              <p>快去购物吧！</p>
            </div>
            <!-- 订单为空的时候显示的内容END -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import { mapActions } from 'vuex'
//import axios from 'axios'
export default {
  name: 'Order',
  data() {
    return {
      orders:[],
      list: [
      {
        "address": "address1",
        "createTime": "2023-05-29T13:19:08.422Z",
        "goodsInfo": [
        {
          "amount": "1",
          "goods": {
            "amount": "2",
            "createTime": "2023-05-29T13:19:08.422Z",
            "description": "string",
            "discount": "string",
            "id": "string",
            "modifyTime": "2023-05-29T13:19:08.422Z",
            "name": "good1",
            "originalPrice": "string",
            "picture": "string",
            "price": "2",
            "sales": "string",
            "state": "string",
            "type": "string",
            "viewCnt": "string"
          }
        }],
        "id": "123",
        "modifyTime": "2023-05-29T13:19:08.422Z",
        "price": "100",
        "state": "string",
        "userId": "string"
      },
        {
          "address": "address1",
          "createTime": "2023-05-29T13:19:08.422Z",
          "goodsInfo": [
            {
              "amount": "1",
              "goods": {
                "amount": "2",
                "createTime": "2023-05-29T13:19:08.422Z",
                "description": "string",
                "discount": "string",
                "id": "string",
                "modifyTime": "2023-05-29T13:19:08.422Z",
                "name": "good1",
                "originalPrice": "string",
                "picture": "string",
                "price": "2",
                "sales": "string",
                "state": "string",
                "type": "string",
                "viewCnt": "string"
              }
            },
            {
              "amount": "1",
              "goods": {
                "amount": "2",
                "createTime": "2023-05-29T13:19:08.422Z",
                "description": "string",
                "discount": "string",
                "id": "string",
                "modifyTime": "2023-05-29T13:19:08.422Z",
                "name": "good2",
                "originalPrice": "string",
                "picture": "string",
                "price": "2",
                "sales": "string",
                "state": "string",
                "type": "string",
                "viewCnt": "string"
              }
            }],
          "id": "124",
          "modifyTime": "2023-05-29T13:19:08.422Z",
          "price": "100",
          "state": "string",
          "userId": "string"
        }],// 订单列表
    }
  },
  activated() {
   this.getOrders()
  },
  watch: {
    // 监听订单类型的变化，请求后端获取商品数据
    type: function() {
      this.getOrders()
    }
  },
  methods: {
    ...mapActions(['setOrderid', 'setCreatetime','setPrice','setAddress','setGoodsinfo']),
    getDetails(id){
      let i=0;
      for(i=0;i<this.list.length;i++){
        if(this.list[i].id===id){
          this.setOrderid(this.list[i].id);
          this.setCreatetime(this.list[i].createTime);
          this.setPrice(this.list[i].price);
          this.setAddress(this.list[i].address)
          this.setGoodsinfo(this.list[i].goodsInfo);
          break;
        }
      }
    },
    getOrders() {
      this.orders=this.list;
      /*
      axios.get('http://82.156.143.194:8090/shopping/listOrders', {
        params: {
          state:"PAID",
          page:1,
          limit:100,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then(res => {
          if (res.status === 200) {
            this.orders = res.data.list
            this.total = res.data.total
            if(this.orders.id !== '') this.setUsername(this.form.username)
          } else if (res.status === 401) {
            this.loginExpired(res.message)
          } else {
            this.notifyError('获取订单失败', res.message)
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
.order-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.order-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.order-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.order-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.extra {
  height: 10px;
}
.order-select .cut {
  font-size: 22px;
  color: #c9c7c7;
  margin-right: 15px;
  font-weight: 300;
}
/*订单头部*/
.order-list-head {
  height: 100px;
  background-color: #fffaf7;
  width: 920px;
  margin: 0 auto;
  margin-top: 20px;
  border-left: 1px solid #ff6700;
  border-right: 1px solid #ff6700;
  border-top: 1px solid #ff6700;
  border-bottom: 1px solid #feccac;
}
.order-list-head .order-pay {
  font-size: 19px;
  color: #ff6700;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.order-list-head .order-info {
  width: 860px;
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.order-list-head .order-info .info {
  font-size: 15px;
  color: #757575;
}
.order-list-head .order-info .cut {
  font-size: 17px;
  color: #c9c7c7;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 300;
}
.order-list-head .order-info .money {
  font-size: 25px;
  color: #000000;
  margin-right: 5px;
  margin-left: 10px;
}
/*订单头部END*/
/*订单商品*/
.order-list-product {
  height: 130px;
  background-color: #ffffff;
  width: 920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-left: 1px solid #ff6700;
  border-right: 1px solid #ff6700;
  border-bottom: 1px solid #ff6700;
}
.order-list-product .pro-img {
  margin-left: 30px;
  margin-right: 20px;
}
.order-list-product .pro-img img {
  height: 80px;
  width: 80px;
}
.order-list-product .pro-info {
  width: 500px;
  font-size: 15px;
  color: #333333;
}
.order-list-product .pro-info .info-href {
  font-size: 15px;
  color: #333333;
}
.order-list-product .pro-info .info-href:hover {
  color: #ff6700;
}
.operate {
  margin-left: 630px;
  line-height: 50px;
}

.operate .button-detail {
  width: 100px;
}
/*订单商品END*/
.empty {
  width: 200px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 60px;
  color: #bdbaba;
  font-size: 18px;
}
</style>