import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import ProductList from '../components/ProductList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = {};

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

const Products = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    setLoader(true);
    axios
      .get('https://dummyjson.com/products')
      .then(response => {
        setProductList(response.data.products);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('error====', error);
        Alert.alert("some thing went wrong please try again later")
      });
  };

  const renderProductList = ({item}: {item: Product}) => {
    return (
      <ProductList
        item={item}
        onPress={() => {
          navigation.navigate('ProductDetails', {id: item.id.toString()});
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{marginHorizontal: 10, marginTop: 10}}>
        <FlatList
          data={productList}
          renderItem={renderProductList}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={10}
        />
      </View>

      {loader && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#8735E1" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Products;

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
});
