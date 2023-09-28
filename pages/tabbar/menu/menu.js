// pages/tabbar/menu/menu.js
const app = getApp()
import {
    createStoreBindings
} from "mobx-miniprogram-bindings";
import {
    store
} from "../../../utils/store.js";
const api = require('../../../utils/request.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navHeight: 0,
        scrollheight: '',
        chosed_index: 0,
        //选中左边的id
        chosed_cate_id: '',
        toTitle: "",
        scrollTop: 0,
        showDialog: false,
        showCartDetails: false,
        //当前的商品
        good: {},
        cartList: [],
        //所有商品
        goodsList: []
    },
    top: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ["tabSelected"],
            actions: [],
        });
        this.setData({
            windowHeight,
            navHeight: app.globalData.navHeight
        });
        this.getMenuList();
    },
    addCart(e) {
        console.log('11111')
    },
    closeDialog() {
        this.setData({
            showDialog: false,
            good:{}
        })
    },
    choose(e) {
        let fl_id = e.currentTarget.dataset.fl_id,
            mt_id = e.currentTarget.dataset.mt_id,
            index = e.currentTarget.dataset.index;
        // console.log('index:', index);
        // console.log('fl_id:', fl_id);
        let parentId = this.data.goodsList.findIndex(item => item.MT_Id == mt_id)
        let good = this.data.goodsList[parentId].FoodItems[index]
        this.setData({
            showDialog: true,
            good:good
        });
    },
    showCartDialog() {
        this.setData({
            showCartDetails: true
        })
    },
    getMenuList() {
        api.request({
            url: "/FoodListByGym",
            data: {
                GB_ID: wx.getStorageSync('GB_ID'),
                user_token: wx.getStorageSync('token')
            }
        }).then(res => {
            console.log(res)
            // 设置每个分类的开始高度
            var goods_list = res.data.data;
            let top = [];
            this.setData({
                goodsList: goods_list,
                chosed_cate_id: goods_list[0].MT_Id
            });
            for (var i = 0; i < goods_list.length; i++) {
                wx.createSelectorQuery().select('#title-' + goods_list[i].MT_Id).boundingClientRect(function (rect) {
                    //console.log('rect:', rect)
                    var isTop = Number(rect.top);
                    top.push(isTop);
                }).exec(() => {
                   // console.log('top:', top)
                    this.top = top;
                });
            }

        })
    },
    /**
     * 选中分类
     */
    choseCate(e) {
        let {
            id,
            index
        } = e.currentTarget.dataset;
        this.setData({
            chosed_cate_id: id,
            chosed_index: index,
            toTitle: "title-" + id,
        })
    },
    //滚动
    onScroll(e) {
        //
        var srollTop = parseInt(e.detail.scrollTop);
        var length = this.top.length;
        for (var i = 0; i < this.top.length; i++) {
            if (this.top[i] - this.top[0] <= srollTop && (i < length - 1 && this.top[i + 1] - this.top[0] > srollTop)) {
                if (this.data.chosed_index != i) {
                    this.setData({
                        chosed_index: i,
                    });
                }
            }
        }
        if (srollTop >= this.top[length - 1] - this.top[0]) {
            console.log(this.top[length - 1] - this.top[0])
            this.setData({
                chosed_index: length - 1,
            });
        }
    },
    orderFood(e) {
        let food = e.currentTarget.dataset.food;
        console.log(food);
        wx.navigateTo({
            url: '/restaurant/pages/menuDetail/menuDetail',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.setData({
            showCartDetails: false
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})