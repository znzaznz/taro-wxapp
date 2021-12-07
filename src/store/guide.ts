import {observable} from 'mobx'
import {queryGuideBanner} from "../services/guide_api";

const guideStore = observable({
    //数据
    bannerList: ['卧槽', '我日'],

    getGuideUrl: async () => {
        const data = await queryGuideBanner()
        console.log(data);
    }
})

export default guideStore