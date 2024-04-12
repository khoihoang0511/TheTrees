import { View, Text, Pressable, Image, FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useNavigation } from '@react-navigation/native'
import { IntlProvider, FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../redux/Reducer'
import AxiosInstance from '../../../helpers/AxiosInstance'

const DetailtTransaction = ({ route }) => {
    const navigation = useNavigation()
    const [product, setproduct] = useState()
    const appState = useSelector(state => state.app);
    const dispatch = useDispatch();
    const [listinfornation, setlistinfornation] = useState([])



    const getdata = () => {
        try {
            const data = appState.user.notification;
            const dataproduct = appState.user.notification[0].products
            setlistinfornation(data[0]) //ngày  //data[0] mảng bị bọc ngoài
            setproduct(dataproduct); //sản phẩm  //dataproduct  item.item

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getdata()
    }, [appState.user.notification])

    console.log(listinfornation)
    console.log(product)








    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        }
        return str;
    };

    const renderItem = (item) => {
        const name = truncateString(item.name, 15);
        return (

            <View style={myStyle.viewnotification}>
                <View style={[myStyle.backgroundimgsp, myStyle.flex_1, { height: 90, width: 130 }]}>
                    <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: item.images[0] }} />
                </View>
                <View style={[myStyle.flex_3, { marginLeft: '5%' }]}>

                    <View style={myStyle.viewinfornationnotification}>
                        <Text style={myStyle.textnamesuccess}>{name} |</Text>
                        <Text style={myStyle.texttypesuccess}>{item.type}</Text>
                    </View>
                    <IntlProvider locale="vi">
                        <Text style={myStyle.textpay}>
                            <FormattedNumber
                                value={item.price}
                                style="currency"
                                currency="VND"
                                currencyDisplay="symbol"
                                minimumFractionDigits={0}
                            />
                        </Text>
                    </IntlProvider>
                    <Text style={myStyle.textquantitysuccess}>{item.quantity} sản phẩm</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View >
                    <View>
                        <Header
                            name={'Chi tiết đơn hàng'}
                            back={require('../../../resources/img/left.png')} />
                        <View>
                            <Text style={myStyle.texttitleorder}>Thông tin đơn hàng</Text>
                            <View style={{ marginHorizontal: '8%' }}>
                                <View>
                                    <View style={myStyle.viewtitlenextpay}>
                                        <Text style={myStyle.texttitlepay}>Thông tin khách hàng</Text>
                                    </View>
                                    <Text style={myStyle.textnamenextpay}>{listinfornation.profilename}</Text>
                                    <Text style={myStyle.textnamenextpay}>{listinfornation.profileemail}</Text>
                                    <Text style={myStyle.textnamenextpay}>{listinfornation.profileaddress}</Text>
                                    <Text style={myStyle.textnamenextpay}>{listinfornation.profilephone}</Text>
                                </View>
                                <View>
                                    <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                        <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                    </View>
                                    <Text style={myStyle.textexpected}>{listinfornation.expressname}</Text>
                                    <Text style={[myStyle.textexpected, { marginTop: 5 }]}>({listinfornation.expresstime})</Text>
                                </View>
                                <View>
                                    <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                        <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                    </View>
                                    <Text style={myStyle.textexpected}>{listinfornation.namepay}</Text>
                                </View>
                                <View>
                                    <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                        <Text style={myStyle.texttitlepay}>Đơn hàng đã chọn</Text>
                                    </View>

                                    <FlatList
                                        scrollEnabled={false}
                                        data={product}
                                        renderItem={({ item }) => renderItem(item)}
                                        keyExtractor={(item) => item.product_id}
                                    // style={{marginBottom:"4000"}}
                                    />


                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[myStyle.viewallorder, { marginBottom: 20 }]}>
                        <View style={[myStyle.viewsuccessprice, { marginTop: 20 }]}>
                            <Text style={myStyle.texttitlepay}>Chờ thanh toán</Text>
                            <IntlProvider locale="vi">
                                <Text style={myStyle.texttitlepay}>
                                    <FormattedNumber
                                        value={parseInt(listinfornation.pricepaysum) + parseInt(listinfornation.pricepayExpress)}
                                        style="currency"
                                        currency="VND"
                                        currencyDisplay="symbol"
                                        minimumFractionDigits={0}
                                    />
                                </Text>
                            </IntlProvider>
                        </View>
                        <Pressable style={myStyle.pressableyes} onPress={() => navigation.navigate("Hangbookstask")}>
                            <Text style={myStyle.textpressableyes}>Xem cẩm nang trồng cây</Text>
                        </Pressable>
                        <Pressable style={myStyle.viewcancelcart} onPress={() => navigation.navigate('Home')}>
                            <Text style={myStyle.textnamesuccess}>Quay về trang chủ</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default DetailtTransaction