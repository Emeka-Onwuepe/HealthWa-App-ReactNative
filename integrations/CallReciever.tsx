import { useAppSelector } from '@/integrations/hooks';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function CallReciever(){

    const navigation = useRouter()
    const socketState = useAppSelector(state => state.socket);


useEffect(()=>{

    
    if(socketState.incoming.type === 'video-offer'){
        navigation.navigate({pathname:'/videoCall',params:{calltype:'reciever',id:''}})
    }

},[socketState.incoming])

return (<View></View>)
}