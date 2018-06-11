import {fetchGet} from "../client";

export async function getOneList() {
    const res = await fetchGet("/shop/manager/top_category/get_all/1/10", "");
    console.log(res);
}