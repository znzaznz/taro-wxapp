//获取引导图的链接
import {requestApi} from "../utils/http";

export const queryGuideBanner = async ()=>{
    return requestApi('/bannesdr',{name:123})
}