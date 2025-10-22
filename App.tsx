import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from './src/home';
import ProductDetailsScreen from './src/product-details-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: {
    product: {
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
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
