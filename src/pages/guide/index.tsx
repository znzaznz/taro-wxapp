import {View, Text} from '@tarojs/components'
import {observer, inject} from 'mobx-react'

import './index.scss'
import {uuid} from "../../utils/utils";

type PageStateProps = {
    store:{
        guideStore: {
            bannerList: Array<string>,
            incrementAsync: Function
        }
    }
}



const Index = (props:PageStateProps) => {

    const {guideStore} = props.store
    const {bannerList} = guideStore

    return (
        <View className='index'>
            {
                bannerList.length > 0 && bannerList.map((item)=>(<Text key={uuid()}>{item}</Text>))
            }
        </View>
    )
}

export default inject('store')(observer(Index))
