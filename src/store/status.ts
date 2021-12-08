import {observable} from 'mobx'

type ChangeStatusProps = {
    type?: string | null,
    message?: string | null
}

const statusStore = observable({
    //数据
    message: '',
    type: null,

    changeStatus({type, message}: ChangeStatusProps) {
        this.message = message
        this.type = type
    }
})

export default statusStore