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
    behaviors: [storeBindingsBehavior],
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    externalClasses: ['custom-class'],
    properties: {
        showModel: {
            type: Boolean,
            value: false
        },
        food: {
            type: Object,
            value: {},
            observer: function (newValue, oldValue) {
               // console.log(newValue, oldValue)
                let newFoodAdditional = newValue.Additional
                if (newFoodAdditional && Array.isArray(newFoodAdditional)) {
                    newFoodAdditional.forEach(item=>{
                        item.selectIndex = -1;
                    });
                    //console.log(newFoodAdditional)
                    this.setData({
                        'food.Additional': newFoodAdditional
                    })
                }
            }
        }
    },
    observers: {
        'showModel': function (newValue, oldValue) {
            if (newValue && newValue != '') {
                this._getFoodNodes();
            }
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        closePositon: 0,
        dishPostion: 0,
        // categoryList: [{
        //     title: '甜度',
        //     list: ['正常', '七分甜', '三分甜'],
        //     selectIndex: 0
        //   }
        // ]
    },
    ready: function () {},
    lifetimes: {
        attached() {}
    },
    /**
     * 组件的方法列表
     */
    storeBindings: {
        store,
        fields: {
            cartList: () => store.testList
        },
        actions: {
            //tabbarStatus: "changeTabbar",
            addCart:"addCart"
        },
    },
    methods: {
        close() {
            this.triggerEvent('onClose')
        },
        _getFoodNodes() {
            var that = this;
            let query = wx.createSelectorQuery().in(this);
            query.select('.popup-content').boundingClientRect();
            query.select('.popup-title').boundingClientRect();
            query.exec((res) => {
                // 在这里可以处理相邻节点的布局位置信息
                // console.log('node1Info:', res[0]);
                // console.log('node2Info:', res[1]);
                that.setData({
                    closePositon: parseInt(res[0].bottom),
                    dishPostion: parseInt(res[1].height)
                })
            });
        },
        selectItems(e) {
            let {
                id,
                index
            } = e.currentTarget.dataset;
            let additional = this.data.food.Additional;
            additional[id].selectIndex = index;
            //console.log(id, index)
            this.setData({
                "food.Additional":additional
            });
        },
        getGoodsSelectProps(good){
             
        },
        handleAddToCart(){
             console.log('food:',this.data.food)
        }
    }
})