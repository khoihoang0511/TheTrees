import { View, Text, StatusBar, Image, TextInput, Pressable, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mystyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useDispatch, useSelector } from 'react-redux';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { updateaddress,updatephone  } from '../../../redux/Reducer'


const Updateprofilestask = () => {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [address, setaddress] = useState()
    const [phone, setphone] = useState();
    const appState = useSelector((state) => state.app);
    const dispatch = useDispatch()

    useEffect(() => {
        setname(appState.user.name);
        setemail(appState.user.email);
        setaddress(appState.user.address);
        setphone(appState.user.phone);
    }, [])

    const updateprofile = async () => {
        const body = {
            id_User: appState.user._id,
            name: name,
            email: email,
            address: address,
            phone: phone
        }
        try {
            const response = await AxiosInstance().post(`/users/updateProfile`, body);
            if (response.status == true) {
                dispatch(updateaddress(address));
                dispatch(updatephone(phone));
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.LONG)
            }
        } catch (error) {
            console.log("lỗi updateprofile ---------------", error)
        }
    }


    return (
        <View style={[Mystyle.flex_1, { backgroundColor: "white" }]}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <Header
                name={'CHỈNH SỬA THÔNG TIN'}
                back={require('../../../resources/img/left.png')} />
            <View style={Mystyle.viewallprofileupdate}>

                <View>
                    <View>
                        <Image style={Mystyle.imgavaterupdate} source={require('../../../resources/img/Avatarupdate.png')} />
                        <View>
                            <Text style={Mystyle.texttitleupdate}>Thông tin sẽ được lưu cho lần mua kế tiếp. Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
                            <TextInput
                                placeholder="Họ và tên"
                                value={name}
                                onChangeText={name => setname(name)}
                                style={Mystyle.inputprofile}
                            />
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={email => setemail(email)}
                                style={Mystyle.inputprofile}
                            />
                            <TextInput
                                placeholder="Địa chỉ"
                                value={address}
                                onChangeText={address => setaddress(address)}
                                style={Mystyle.inputprofile}
                            />
                            <TextInput
                                placeholder="Số điện thoại"
                                value={phone}
                                onChangeText={phone => setphone(phone)}
                                style={Mystyle.inputprofile}
                            />
                        </View>
                    </View>
                </View>

                <Pressable style={Mystyle.saveprofile}onPress={() => updateprofile()}>
                    <Text style={Mystyle.textselect} >LƯU THÔNG TIN</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default Updateprofilestask