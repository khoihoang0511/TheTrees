import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const MySwiper = () => {
  // Define the NextButton component separately
  const NextButton = () => (
    <View style={{ height: 34, width: 34 }}>
      <Image
        style={{ height: 34, width: 34 }}
        source={require('../src/resources/img/icright.png')}
      />
    </View>
  );

  const PrevButton = () => (
    <View style={{ height: 34, width: 34 }}>
      <Image
        style={{ height: 34, width: 34 }}
        source={require('../src/resources/img/icleft.png')}
      />
    </View>
  );

  return (
    <Swiper 
      style={styles.wrapper} 
      nextButton={<NextButton />} 
      prevButton={<PrevButton/>}// Call the NextButton component
      showsButtons={true}
    >
      <View style={styles.slide1}>
        <Text style={styles.text}>Slide 1</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Slide 2</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>Slide 3</Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MySwiper;
