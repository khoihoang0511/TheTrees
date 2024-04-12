import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Mystyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import Swiper from 'react-native-swiper';
import Collapsible from 'react-native-collapsible';
import AxiosInstance from '../../../helpers/AxiosInstance';

const Detalthangbook = () => {
    const [datasteps, setDatasteps] = useState(dataallsteps);
    const [collapsed, setCollapsed] = useState(true);
    const [collapsedstages, setcollapsedstages] = useState(true);
    const [product, setproduct] = useState([])


    const findproduct = async () => {
        try {
            const response = await AxiosInstance().get(`/products/tim-kiem?_id=${_id}`);
            if (response.status == true) {
                setproduct(response.data);

            }
        } catch (error) {
            console.log("lỗi find product ---------------", error)
        }
    }

    useEffect(() => {
        findproduct()

    }, [])

    const toggleCollapsible = () => {
        setCollapsed(!collapsed);
    };

    const [collapsedteps, setcollapsedteps] = useState(Array(datasteps.length).fill(true));

    const toggleCollapsiblesteps = (index) => {
        const newCollapsed = [...collapsedteps];
        newCollapsed[index] = !newCollapsed[index];
        setcollapsedteps(newCollapsed);
    };
    // ---------------------------

    const toggleCollapsiblestages = () => {
        setcollapsedstages(!collapsedstages);
    };

    const [collapsedArrstages, setcollapsedArrstages] = useState(Array(datasteps.length).fill(true));

    const toggleCollapsibleindexstages = (index) => {
        const newCollapsed = [...collapsedArrstages];
        newCollapsed[index] = !newCollapsed[index];
        setcollapsedArrstages(newCollapsed);
    };


    const NextButton = () => (
        <View style={{ height: 24, width: 24 }}>
            <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../resources/img/icright.png')}
            />
        </View>
    );

    const PrevButton = () => (
        <View style={{ height: 24, width: 24 }}>
            <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../resources/img/icleft.png')}
            />
        </View>
    );


    const renderImages = () => {
        if (product.images && product.images.length > 0) {
            return product.images.map((image, index) => (
                <View key={index}>
                    <Image resizeMode='contain' style={{ width: '100%', height: "100%" }} source={{ uri: image }} />
                </View>
            ));
        } else {
            // Trường hợp không có ảnh, bạn có thể render một placeholder hoặc hiển thị thông báo không có ảnh
            return (
                <View>
                    <Text>Không có ảnh</Text>
                </View>
            );
        }
    }
    return (
        <View style={[Mystyle.flex_1, { backgroundColor: 'white' }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View >
                    <Header
                        name={product.name}
                        img={require('../../../resources/img/iccart.png')}
                        back={require('../../../resources/img/left.png')} />
                    <View style={{ backgroundColor: "#F6F6F6", height: 268, marginTop: 20 }}>
                        <Swiper
                            nextButton={<NextButton />}
                            prevButton={<PrevButton />}
                            showsButtons={true}
                        >
                            {renderImages()}
                        </Swiper>
                    </View>
                    <View style={Mystyle.viewdetaltinfornation}>
                        <View style={Mystyle.vieworigin}>
                            <Pressable style={Mystyle.pressableorigin}>
                                <Text style={Mystyle.textorigin}>Cây trồng</Text>
                            </Pressable>
                            <Pressable style={Mystyle.pressableorigin}>
                                <Text style={Mystyle.textorigin}>Ưa bóng</Text>
                            </Pressable>
                        </View>


                        <View style={Mystyle.steps}>
                            <Pressable onPress={() => toggleCollapsible()} style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                <Text style={Mystyle.textCollapsible}>Kiến thức cơ bản</Text>
                                {collapsed ? <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/Collapsible_increase.png')} /> : <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/Collapsible_reduce.png')} />}
                            </Pressable>

                            <Collapsible collapsed={collapsed}>
                                {
                                    datasteps.map((step, index) => (
                                        <View style={{ marginTop: "5%" }} key={index}>
                                            <Pressable onPress={() => toggleCollapsiblesteps(index)} style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                                <Text style={Mystyle.origintext}>{step.title}</Text>
                                                {collapsedteps[index] ? <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/right.png')} /> : <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/bottom.png')} />}
                                            </Pressable>
                                            <Collapsible collapsed={collapsedteps[index]}>
                                                <View>
                                                    <Text style={[Mystyle.origintext, { marginTop: "5%" }]}>Collapsible content goes here</Text>
                                                </View>
                                            </Collapsible>
                                        </View>
                                    ))
                                }
                            </Collapsible>
                        </View>
                        <View style={[Mystyle.steps, { marginBottom: 20 }]}>
                            <Pressable onPress={() => toggleCollapsiblestages()} style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                <Text style={Mystyle.textCollapsible}>Các giai đoạn</Text>
                                {collapsedstages ? <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/Collapsible_increase.png')} /> : <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/Collapsible_reduce.png')} />}
                            </Pressable>

                            <Collapsible collapsed={collapsedstages}>
                                {
                                    datasteps.map((step, index) => (
                                        <View style={{ marginTop: "5%" }} key={index}>
                                            <Pressable onPress={() => toggleCollapsibleindexstages(index)} style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                                <Text style={Mystyle.origintext}>{step.title}</Text>
                                                {collapsedArrstages[index] ? <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/right.png')} /> : <Image style={{ width: 24, height: 24 }} source={require('../../../resources/img/bottom.png')} />}
                                            </Pressable>
                                            <Collapsible collapsed={collapsedArrstages[index]}>
                                                <View>
                                                    <Text style={[Mystyle.origintext, { marginTop: "5%" }]}>Collapsible content goes here</Text>
                                                </View>
                                            </Collapsible>
                                        </View>
                                    ))
                                }
                            </Collapsible>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Detalthangbook

var dataallsteps = [
    {
        idstep: 1,
        title: 'Bước 1: Chuẩn bị vật dụng, chất trồng',
        detailsteps: [
            {
                iddetailsteps: 1,
                description: 'Description for Step 1'
            }
        ]
    },
    {
        idstep: 2,
        title: 'Bước 2: Tiến hành gieo hạt',
        detailsteps: [
            {
                iddetailsteps: 2,
                description: 'Description for Step 2'
            }
        ]
    },
    {
        idstep: 3,
        title: 'Bước 3: Chăm sóc sau khi gieo hạt',
        detailsteps: [
            {
                iddetailsteps: 3,
                description: 'Description for Step 3'
            }
        ]
    },
];
