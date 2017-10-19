import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carTimer : null,
  	//存储购物车中的数据
    carPanelData: [],

    //判断购物车中商品是否达到最大购买数量
    maxOff: false,

    //购物车的显示与隐藏
    carShow: false,

    //小球信息
    ball: {
      show: false,
      el: null,
      img: ''
    },
    //收货人数据
    receiveInfo:[{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true
    },{
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false
    }]
  },
  getters: {
  	//购物车商品数量
  	totleCount (state) {
	      let count = 0;
	      state.carPanelData.forEach((goods) => {
		    count += goods.count
	    })
	    return count
  	},
  	//购物车商品总价格
  	totlePrice (state) {
  	  let price = 0;
	    state.carPanelData.forEach((goods) => {
		    price += goods.price * goods.count
	    })
	  return price
  	},
    //全选状态
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if(!goods.checked){
          allChecked = false
          return 
        }
      })
      return allChecked
    },
    //计算选中商品的总数量
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked) {
          count += goods.count
        }
      })
      return count
    },
    //计算选中商品的总价格
    checkedPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        if(goods.checked) {
          price += goods.count*goods.price
        }
      })
      return price
    },
    //筛选出选中的商品
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if(goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
  	//加入购物车功能
    addCarPanelData (state,data) {
      let bOff = true
      //小球动画结束之后再向购物车中添加商品
      if(!state.ball.show){
        state.carPanelData.forEach((goods) => {
        //遍历购物车中的商品，如果id相等，只加数量
        if(goods.sku_id === data.info.sku_id) {
          goods.count+=data.count
          bOff = false
          //判断超出最大购买数量
          if(goods.count > goods.limit_num){
            goods.count-=data.count
            state.maxOff = true
            return
          }
          //显示购物车
          state.carShow = true
          //设置小球信息
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        } 
      })
      //如果购物车中没有就添加一个商品
      if(bOff){
        let goodsData = data.info
        Vue.set(goodsData,'count',data.count)
        Vue.set(goodsData,'checked',true)
        state.carPanelData.push(goodsData)
        //显示购物车
        state.carShow = true

         //设置小球信息
      state.ball.show = true
      state.ball.img = data.info.ali_image
      state.ball.el = event.path[0]
      }

     
      //console.log(state.ball.el)
      //console.log(state.carPanelData)
    }
      },
      
    //删除购物车中的商品
    delCarPanelData(state,id){
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id) {
          state.carPanelData.splice(index,1)
          return
        }
      })
    },
    //点击+增加结算页面的方法
    plusCarPanelData (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id) {
          if(goods.count >= goods.limit_num) return
          goods.count ++
          return 
        }
      })
    },
    subCarPanelData (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id) {
          if(goods.count <= 1) return
          goods.count --
          return 
        }
      })
    },
    //购物车页面设置选中和取消选中
    checkGoods (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if(goods.sku_id === id) {
         goods.checked = !goods.checked
         return
        }
      })
    },
    //全选 取消全选
    allCheckGoods (state,allChecked) {
      state.carPanelData.forEach((goods,index) => {
        goods.checked = !allChecked
      })
    },
    //删除选中的商品
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i,1)
        }
      }
    },
    //点击确定的时候关闭prompt弹窗
    closePrompt (state) {
      state.maxOff = false
    },
    //显示购物车
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    //隐藏购物车
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      },500)
      
    }
  }
})

export default store
