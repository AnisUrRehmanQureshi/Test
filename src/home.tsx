import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Product {
  image: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const HomeScreen = () => {
  const [data, setData] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigation = useNavigation();

  const FAVORITES_KEY = '@favorites';

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: number[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = async (productId: number) => {
    let newFavorites: number[];
    
    if (favorites.includes(productId)) {
      newFavorites = favorites.filter(id => id !== productId);
    } else {
      newFavorites = [...favorites, productId];
    }
    
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  const getData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/1');
      const data = await response.json();
      setData([data]);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadFavorites();
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product</Text>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <View style={styles.flatlistView}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Text style={[
                  styles.favoriteIcon, 
                  { color: isFavorite(item.id) ? '#ff6b6b' : '#ccc' }
                ]}>
                  ❤️
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: { 
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  flatlistView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '90%',
  },
  itemDetails: {
    marginLeft: 10,
    flexDirection: 'column',
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
  },
  favoriteButton: {
    padding: 10,
  },
  favoriteIcon: {
    fontSize: 24,
  },
});

export default HomeScreen;