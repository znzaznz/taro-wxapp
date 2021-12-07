//获取引导图的链接
import {get} from "../utils/http";

export const queryGuideBanner = async ()=>{
    return get('/banner')
}