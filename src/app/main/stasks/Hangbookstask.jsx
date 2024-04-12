import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React, { useState,useEffect } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useNavigation } from '@react-navigation/native'
import AxiosInstance from '../../../helpers/AxiosInstance'

const Hangbookstask = () => {
    const navigation = useNavigation()
    const [listhangbook, setlisthangbook] = useState()
    const [refreshing, setRefreshing] = useState(false);

    const fetchproductstree = async () => {
        const idcategory = '6606b733ccf861171c336d81';
        try {
            setRefreshing(true)
            const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${1}&limit=${8}`);
            if (response.status == true) {
                setlisthangbook(response.data);

            }
            setRefreshing(false)
        } catch (error) {
            console.log("lỗi listtree ---------------", error)
        }
    }

    useEffect(() => {
        fetchproductstree();
    }, []);
  //giới hạn ký tự 
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };
    const renderItem = (item) => {
        const name = truncateString(item.name, 15);
        return (
            <Pressable onPress={() => navigation.navigate('Detalthangbook', _id = item._id)}>
                <View style={myStyle.viewallnotification}>
                    <View style={myStyle.viewnotification}>
                        <View style={[myStyle.backgroundimgsp, myStyle.flex_1, { height: 90, width: 130 }]}>
                            <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: item.images[0] }}/>
                        </View>
                        <View style={[myStyle.flex_3, { marginLeft: '5%' }]}>
                            <View style={myStyle.viewinfornationnotification}>
                                <Text style={myStyle.textnamesuccess}>{name} | </Text>
                                <Text style={myStyle.textnamesuccess}>{item.type}</Text>
                            </View>
                            <Text style={[myStyle.origintext, { marginTop: "3%" }]}>Độ khó 3/5 </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
            <Header
                name={'CẨM NANG TRỒNG CÂY'}
                back={require('../../../resources/img/left.png')} />
            <FlatList
                data={listhangbook}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onRefresh={fetchproductstree}
            />
        </View>
    )
}

export default Hangbookstask

var datahangbook = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet",
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet",
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet",
    }
]