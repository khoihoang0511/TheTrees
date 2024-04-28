import { View, Text, Pressable, Image, FlatList, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useNavigation } from '@react-navigation/native'
import { IntlProvider, FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../../../helpers/AxiosInstance'

const Ordersuccess = ({ route }) => {
    const { listprofile, itemExpress, itemPay, pricepay } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const appState = useSelector(state => state.app);
    const [product, setproduct] = useState()
    const id_User = appState.user._id;



    //lấy ra các sản phẩm có checked là true là những sản phẩm được chọn trong giỏ hàng
    // và add product vào thông báo
    const getcart_addnotification = async () => {

        var data = appState.user.carts;
        const orderproduct = data.filter(item => item.checked == true);
        setproduct(orderproduct)

        const date = new Date();
        const dayOfWeekNumber = date.getDay();
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

        const dayOfMonth = date.getDate()
        const month = date.getMonth();
        const year = date.getFullYear()

        const randomId = Math.floor(Math.random() * 1000000000000000);

        const addnotification = async () => {
            try {
                var body = {
                    id_User: id_User,
                    id: randomId,
                    date: dayOfWeekName,
                    day: dayOfMonth,
                    month: month + 1,
                    year: year,
                    status: "Đang giao",
                    profilename: listprofile.name,
                    profileemail: listprofile.email,
                    profileaddress: listprofile.address,
                    profilephone: listprofile.phone,
                    expressname: itemExpress[0].nameexpress,
                    expresstime: itemExpress[0].timeexpress,
                    namepay: itemPay[0].name,
                    pricepaysum: pricepay[0].sum,
                    pricepayExpress: pricepay[0].priceExpress,
                    products: [...orderproduct],
                }
                await AxiosInstance().post(`/notification/addnotification`, body);
            } catch (error) {
                console.log("lỗi addnotification ---------------", error)
            }
        }
        addnotification()

        const deletecart = async () => {
            try {
                // xóa sản phẩm trong cart 
                var listIDproduct = [];
                orderproduct.map((item) => {
                    listIDproduct.push(item.product_id)
                })
                var body = {
                    product_id: listIDproduct,
                }
                const response = await AxiosInstance().post(`/cart/deleteproductcart?id_User=${id_User}`, body);
            } catch (error) {
                console.log("lỗi deletecart ---------------", error)
            }
        }
        deletecart()
    }






    useEffect(() => {
        getcart_addnotification()
    }, [])

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
        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
                <View>
                    <Header
                        name={'THÔNG BÁO'}
                        back={require('../../../resources/img/left.png')} />
                    <View>
                        <Text style={myStyle.texttitleorder}>Bạn đã đặt hàng thành công</Text>
                        <View style={{ marginHorizontal: '8%' }}>
                            <View>
                                <View style={myStyle.viewtitlenextpay}>
                                    <Text style={myStyle.texttitlepay}>Thông tin khách hàng</Text>
                                </View>
                                <Text style={myStyle.textnamenextpay}>{listprofile.name}</Text>
                                <Text style={myStyle.textnamenextpay}>{listprofile.email}</Text>
                                <Text style={myStyle.textnamenextpay}>{listprofile.address}</Text>
                                <Text style={myStyle.textnamenextpay}>{listprofile.phone}</Text>
                            </View>
                            <View>
                                <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                    <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                </View>
                                <Text style={myStyle.textexpected}>{itemExpress[0].nameexpress}</Text>
                                <Text style={[myStyle.textexpected, { marginTop: 5 }]}>({itemExpress[0].timeexpress})</Text>
                            </View>
                            <View>
                                <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                                    <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                                </View>
                                <Text style={myStyle.textexpected}>{itemPay[0].name}</Text>
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
                                    value={parseInt(pricepay[0].sum) + parseInt(pricepay[0].priceExpress)}
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

    )
}

export default Ordersuccess