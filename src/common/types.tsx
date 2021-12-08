export interface Store {
    guideStore: {
        bannerList: Array<string>,
        getGuideUrl: Function
    },
    counterStore: {
        counter: number,
        increment: Function,
        decrement: Function,
        incrementAsync: Function
    },
    statusStore:{
        message: string | null,
        type: number | null,
        changeStatus:Function
    }
}