import {observable} from 'mobx'

const guideStore = observable({
    //数据
    bannerList: ['卧槽','我日'],

    incrementAsync() {
        setTimeout(() => {
            this.counter++
        }, 1000)
    }
})

export default guideStore