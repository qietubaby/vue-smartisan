import Vue from 'vue'
import Router from 'vue-router'

import '@/assets/css/reset.css'
import '@/assets/css/header.css'
import Shop from '@/view/shop'
import Item from '@/view/item'
import Cart from '@/view/cart'
import CheckOut from '@/view/checkout'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
    	path:'/',
    	name: 'Shop',
    	component:Shop
    },{
    	path:'/item',
    	name:'Item',
    	component:Item
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
     {
      path:'/checkout',
      name:'CheckOut',
      component:CheckOut
    }
  ]
})
