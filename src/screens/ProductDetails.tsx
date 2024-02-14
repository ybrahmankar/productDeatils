import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Carousel from 'react-native-snap-carousel';
import {scale} from 'react-native-size-matters';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
};

const ProductDetails = ({route, navigation}: Props) => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState<Product | null>();
  const [images, setImages] = useState<[]>([]);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setWindowWidth(window.width);
      },
    );
    return () => subscription?.remove();
  });

  const getProductData = () => {
    setLoader(true);
    let url = 'https://dummyjson.com/products/' + route.params.id;
    axios
      .get(url)
      .then(response => {
        setProductData(response.data);
        setImages(response.data.images);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('error====', error);
        Alert.alert('some thing went wrong please try again later');
      });
  };

  const renderImg = ({item}: {item: string}) => {
    return (
      <View style={styles.slide}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.productListContainer}>
        <Carousel
          data={images}
          renderItem={renderImg}
          sliderWidth={windowWidth}
          itemWidth={scale(300)}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.headerTxt}>{productData?.title}</Text>

          <Text style={styles.txtStyle}>{productData?.description}</Text>
          <View style={styles.rowStyle}>
            <Text style={styles.txtTitleStyle}>Category : </Text>
            <Text style={styles.txtStyle}>{productData?.category}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.txtTitleStyle}>Brand : </Text>
            <Text style={styles.txtStyle}>{productData?.brand}</Text>
          </View>

          <View style={styles.rowCont}>
            <View style={styles.rowStyle}>
              <Text style={styles.txtTitleStyle}>Discount : </Text>
              <Text style={styles.txtStyle}>
                {productData?.discountPercentage} %
              </Text>
            </View>

            <View style={styles.rowStyle}>
              <Text style={styles.txtTitleStyle}>Price : </Text>
              <Text style={styles.txtStyle}>{productData?.price}</Text>
            </View>
          </View>
          <View style={styles.rowCont}>
            <View style={styles.rowStyle}>
              <Text style={styles.txtTitleStyle}>Stock : </Text>
              <Text style={styles.txtStyle}>{productData?.stock}</Text>
            </View>

            <View style={styles.rowStyle}>
              <Text style={styles.txtTitleStyle}>Rating : </Text>
              <Text style={styles.txtStyle}>{productData?.rating}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {loader && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#8735E1" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
  },
  productListContainer: {
    padding: scale(10),
    margin: scale(10),
  },
  txtStyle: {
    color: '#A1A1A1',
    fontSize: 16,
    marginVertical: 5,
  },
  txtTitleStyle: {
    color: '#6E6E6E',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '600',
  },
  headerTxt: {
    color: '#18181E',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slide: {
    height: scale(300), // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
