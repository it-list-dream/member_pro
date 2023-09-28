// store.js
import {
    observable,
    action
} from "mobx-miniprogram";

export const store = observable({
    cartList: wx.getStorageSync('cart') || [],
    cartTotalPrice: 0,
    tabSelected: 0,
    // 计算属性
    get cartCounts() {
        var count = 0;
        if (this.cartList) {
            this.cartList.forEach(item => {
                count += item.number
            });
            return count;
        }
    },

    // actions
    changeTabbar: action(function (tabIndex) {
        console.log('index:', tabIndex)
        this.tabSelected = tabIndex;
    }),
    addCart: action(function (event) {
        // var food = event.currentTarget.dataset.food,
        //     tasteIndex = '',
        //     tasteDescription = '';
        // var myCartList = wx.getStorageSync('cartList') || [];
        // if (myCartList.length > 0) {
        //     for (let j = 0; j < myCartList.length; j++) {
        //         for (let k = 0; this.cartList.length; k++) {
        //             if (myCartList[j].MT_Id == this.cartList[k].MT_Id) {
        //                 this.cartList[k].number ++;
        //             }else{

        //             }
        //         }
        //     }
        // this.cartList.findIndex(item=>{
        //      if(item.FL_Id == food.FL_Id && ){
        //          return 
        //      }
        // })
        // if (this.cartList.length > 0) {
        //     this.cartList.forEach(item => {
        //         if (item.MT_Id == food.MT_Id) {
        //             item.number++;
        //         } else {
        //             for (var i = 0; i < food.Additional.length; i++) {
        //                 tasteIndex = food.Additional[i].selectIndex;
        //                 if (i !== food.Additional.length - 1) {
        //                     tasteDescription += food.Additional[i].Attributes[tasteIndex].Attribute + '、';
        //                 } else {
        //                     tasteDescription += food.Additional[i].Attributes[tasteIndex].Attribute;
        //                 }
        //             }
        //             food.tasteDesc = tasteDescription;
        //             food.number = 1;
        //             console.log('hahaha')
        //             this.cartList.push(food);
        //         }
        //     });
        // } 
        //wx.setStorageSync('cartList', this.cartList);
    })
});