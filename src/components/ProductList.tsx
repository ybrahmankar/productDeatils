import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

type Props = {
  item: Product;
  onPress: Function;
};

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

const ProductList = ({item, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.productListContainer}>
      <View style={{width: '34%', borderColor: '#DCDCDC', borderRightWidth: 1}}>
        <Image
          source={{uri: item.thumbnail}}
          style={{height: scale(110)}}
          resizeMode="center"
        />
      </View>
      <View style={{width: '62%', marginLeft: 10}}>
        <Text
          style={styles.headerTxt}>
          {item.title}
        </Text>
        <View style={styles.rowStyle}>
          <Text style={styles.txtTitleStyle}>Category : </Text>
          <Text style={styles.txtStyle}>{item.category}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.txtTitleStyle}>Brand : </Text>
          <Text style={styles.txtStyle}>{item.brand}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.rowStyle}>
          <Text style={styles.txtTitleStyle}>Price : </Text>
          <Text style={styles.txtStyle}>{item.price}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.txtTitleStyle}>Rating : </Text>
          <Text style={styles.txtStyle}>{item.rating}</Text>
        </View>

        </View>
       
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  productListContainer: {
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
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
  headerTxt:{
    color: '#18181E',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rowStyle:{
    flexDirection: 'row'}
});
