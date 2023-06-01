<template>
  <div>
    test
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
      temp: ' ',
    }
  },
  watch: {

  },
  activated() {
    this.load()
    //console.log(11)
  },
  methods: {
    load() {
      axios.get('/api/goods/downloadTemplate', {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then(res => {
        //console.log(res.data)
        //console.log(localStorage.getItem("token"))
        this.temp=res.data
      })
    },

  }
}
</script>

<style scoped>

</style>