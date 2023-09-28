// components/tabbar/tabbar.js
import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings";
import {
    store
} from "../../utils/store.js";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selected: {
            type: Number,
            value: 0
        }
    },
    /**
     * 组件的初始数据
     */
    behaviors: [storeBindingsBehavior],
    data: {
        // selected: 0,
        color: "#C0BEC9",
        selectedColor: "#52495B",
        borderStyle: "white",
        list: [{
                "pagePath": "/pages/tabbar/home/home",
                "text": "首页",
                "iconPath": "/static/tabbar/home.png",
                "selectedIconPath": "/static/tabbar/home_active.png"
            },
            {
                "pagePath": "/pages/tabbar/sport/sport",
                "text": "运动",
                "iconPath": "/static/tabbar/sport.png",
                "selectedIconPath": "/static/tabbar/sport_active.png"
            },
            {
                "pagePath": "/pages/tabbar/menu/menu",
                "text": "",
                "iconPath": "/static/tabbar/order.png",
                "selectedIconPath": "",
                "isSpecial": true
            },
            {
                "pagePath": "/pages/tabbar/integral/integral",
                "text": "积分",
                "iconPath": "/static/tabbar/integral.png",
                "selectedIconPath": "/static/tabbar/integral_active.png"
            },
            {
                "pagePath": "/pages/tabbar/my/my",
                "text": "我的",
                "iconPath": "/static/tabbar/my.png",
                "selectedIconPath": "/static/tabbar/my_active.png"
            }
        ]
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            //  console.log('我被执行了....')
        },
        moved: function () {},
        detached: function () {},
    },
    storeBindings: {
        store,
        fields: {
            cartList: () => store.testList
        },
        actions: {
            tabbarStatus: "changeTabbar",
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            // console.log('store:', store);
            // console.log('cartList:', this.data.cartList)
            const {
                path: url,
                index
            } = e.currentTarget.dataset;
            // const url = data.path;
            const phone = wx.getStorageSync('phone');
            if (url === '/pages/tabbar/sport/sport' && !phone && phone == '') {
                wx.navigateTo({
                    url: '/page2/login/login' //可以带参数，在登录页面接收
                })
                return;
            }
            this.tabbarStatus(index)
            // console.log('index:',index)
            wx.switchTab({
                url
            });

        }
    }
})