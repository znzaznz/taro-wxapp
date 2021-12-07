import {observable} from 'mobx'

const counterStore = observable({
    //数据
    counter: 0,

    //action
    counterStore() {
        this.counter++
    },
    increment() {
        this.counter++
    },
    decrement() {
        this.counter--
    },
    incrementAsync() {
        setTimeout(() => {
            this.counter++
        }, 1000)
    }
})

export default counterStore