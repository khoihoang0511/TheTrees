import { View, Text, Image, Pressable } from 'react-native'
import React,{useContext} from 'react'
import Header from '../../common/Detaults/Header'
import Mystyle from '../../style/Mystyle'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../../redux/Reducer'
import { useDispatch, useSelector } from 'react-redux';


const Personal = () => {
  const navigation = useNavigation();
  const appState = useSelector(state => state.app);
  const dispatch = useDispatch();

  const email = appState.user.email;
  const name = appState.user.name;

  return (
    <View style={[Mystyle.flex_1, { backgroundColor: 'white' }]}>
      <Header
        name={'Cá nhân'} />
      <View style={Mystyle.viewallprofile}>
        <View style={Mystyle.viewprofile}>
          <Image resizeMode='contain'  source={require('../../../resources/img/avatar.png')} />
          <View style={Mystyle.profileinfornation}>
            <Text style={Mystyle.textname}>{name}</Text>
            <Text style={Mystyle.textemail}>{email}</Text>
          </View>
        </View>
        <View style={Mystyle.viewtextprofile}>
          <Text style={Mystyle.textprofile}>Chung</Text>
        </View>
        <Pressable style={Mystyle.pressableprofile} onPress={()=>navigation.navigate('Updateprofilestask')}>
          <Text style={Mystyle.textpressableprofile}>Chỉnh sửa thông tin</Text>
        </Pressable>
        <Pressable style={Mystyle.pressableprofile} onPress={()=>navigation.navigate('Hangbookstask')}>
          <Text style={Mystyle.textpressableprofile}>Cẩm nang trồng cây</Text>
        </Pressable>
        <Pressable style={Mystyle.pressableprofile} onPress={()=>navigation.navigate("Transactionhistory")}>
          <Text style={Mystyle.textpressableprofile}>Lịch sử đơn hàng</Text>
        </Pressable>
        <Pressable style={Mystyle.pressableprofile}>
          <Text style={Mystyle.textpressableprofile}>Q & A</Text>
        </Pressable>
        <View style={Mystyle.viewtextprofile}>
          <Text style={Mystyle.textprofile}>Bảo mật điều khoản</Text>
        </View>
        <Pressable style={Mystyle.pressableprofile}>
          <Text style={Mystyle.textpressableprofile}>Điều khoản và điều kiện</Text>
        </Pressable>
        <Pressable style={Mystyle.pressableprofile}>
          <Text style={Mystyle.textpressableprofile}>Chính sách quyền riêng tư</Text>
        </Pressable>
        <Pressable style={Mystyle.pressablelogout} onPress={()=>dispatch(logout())}>
          <Text style={Mystyle.textpressablelogout}>Đăng xuất</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Personal