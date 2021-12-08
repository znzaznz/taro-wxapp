import {View, Text, } from '@tarojs/components'
import {observer, inject} from 'mobx-react'
import {useEffect} from "react";
import {AtButton} from "taro-ui";
import {uuid} from "../../utils/utils";
import {Store} from "../../common/types";

import './index.scss'

type PageStateProps = {
    store:Store
}

const Index = (props:PageStateProps) => {

    const {guideStore} = props.store
    const {bannerList,getGuideUrl} = guideStore

    useEffect(()=>{
        getGuideUrl()
    },[])

    return (
        <View className='index'>
            <AtButton>你好</AtButton>
            {
                bannerList.length > 0 && bannerList.map((item)=>(<Text key={uuid()}>{item}</Text>))
            }
        </View>
    )
}

export default inject('store')(observer(Index))
