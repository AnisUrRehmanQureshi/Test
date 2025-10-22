import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { product } = route.params;
    
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.rating}>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default ProductDetailsScreen;