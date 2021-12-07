import {View, Text} from '@tarojs/components'
import {observer, inject} from 'mobx-react'
import {useEffect} from "react";
import './index.scss'
import {uuid} from "../../utils/utils";
import {Store} from "../../common/types";

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
            {
                bannerList.length > 0 && bannerList.map((item)=>(<Text key={uuid()}>{item}</Text>))
            }
        </View>
    )
}

export default inject('store')(observer(Index))
