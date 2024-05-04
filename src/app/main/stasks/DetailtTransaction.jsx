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
    const { item } = route.params
    const navigation = useNavigation()
    const [product, setproduct] = useState()
    const [status, setstatus] = useState(item.status)
    const appState = useSelector((state) => state.app);
    const id_User = appState.user._id;

    useEffect(() => {
        setproduct(item.products)
    })


    const deleteorder = async () => {
        try {
            if (status == "Đang giao") {
                const body = {
                    id_User: id_User,
                    id: item.id,
                    status: "Đã hủy"
                }

                const response = await AxiosInstance().post(`/notification/update_status`, body);
                if (response.status == true) {
                    setstatus("Đã hủy")
                    ToastAndroid.show("Hủy đơn thành công", ToastAndroid.LONG)
                }
            }
        } catch (error) {
            console.log("lỗi deleteorder ---------------", error)
        }
    }







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

            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
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
                                    <Text style={myStyle.textnamenextpay}>{item.profilename}</Text>
                                    <Text style={myStyle.textnamenextpay}>{item.profileemail}</Text>
                                    <Text style={myStyle.textnamenextpay}>{item.profileaddress}</Text>
                                    <Text style={myStyle.textnamenextpay}>{item.profilephone}</Text>
                                </View>
                                <View>
                                    <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                        <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                    </View>
                                    <Text style={myStyle.textexpected}>{item.expressname}</Text>
                                    <Text style={[myStyle.textexpected, { marginTop: 5 }]}>({item.expresstime})</Text>
                                </View>
                                <View>
                                    <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                        <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                    </View>
                                    <Text style={myStyle.textexpected}>{item.namepay}</Text>
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
                                        style={{ marginBottom: '40%' }}
                                    />


                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[myStyle.viewallorder, { position: "absolute", bottom: 0, marginBottom: 0 }]}>
                    <View style={[myStyle.viewsuccessprice, { marginTop: 20 }]}>
                        <Text style={myStyle.texttitlepay}>Thanh toán</Text>
                        <IntlProvider locale="vi">
                            <Text style={myStyle.texttitlepay}>
                                <FormattedNumber
                                    value={parseInt(item.pricepaysum) + parseInt(item.pricepayExpress)}
                                    style="currency"
                                    currency="VND"
                                    currencyDisplay="symbol"
                                    minimumFractionDigits={0}
                                />
                            </Text>
                        </IntlProvider>
                    </View>
                    <View style={[myStyle.viewsuccessprice, { marginTop: 20 }]}>
                        <Text style={myStyle.texttitlepay}>Trạng thái</Text>
                        {
                            status == "Đang giao"
                                ?
                                <Text style={[myStyle.texttitlepay, { color: 'green', fontWeight: 'bold' }]}>{status}</Text>
                                :
                                <Text style={[myStyle.texttitlepay, { color: 'red', fontWeight: 'bold' }]}>{status}</Text>
                        }
                    </View>

                    <Pressable style={myStyle.viewcancelcart} onPress={() => deleteorder()}>
                        <Text style={myStyle.textnamesuccess}>Hủy đơn</Text>
                    </Pressable>
                </View>
            </View>

        </View>

    )
}

export default DetailtTransaction