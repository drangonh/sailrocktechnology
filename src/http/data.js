import {fetchGet} from "../client";

/*获取所有的分类列表*/
export async function getAllList(){
    const res = await fetchGet("/shop/manager/top_category/get_all/1/10", "");
}

/*获取一级分类列表*/
export async function getOneList(callBack) {
    const res = await fetchGet("/shop/manager/top_category/get_all/1/10", "");
    callBack(res);
}

/*获取二级分类列表*/
export async function getTwoList() {
    const res = await fetchGet("/shop/manager/get_all/1/10", "");
    console.log(res);
}

/*获取三级分类列表*/
export async function getThreeList() {
    const res = await fetchGet("shop/manager/second_category/get_all/1/10", "");
    console.log(res);
}

/*获取产品列表*/
export async function getGoodsList() {
    const res = await fetchGet("shop/manager/product/get_all/1/10", "");
    console.log(res);
}

/**/