import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Sip Happens Cafe - Last Lecture. June 25, 2026

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://api.npoint.io/41cd5c9345262362eed9')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No internet connection. Please try again.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('coffeeFavorites');
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.log('Failed to load', e);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
      } catch (e) {
        console.log('Failed to save', e);
      }
    };
    saveFavorites();
  }, [favorites]);

  const addToFavorites = (drink: any) => {
    const newFav = {
      id: drink.id || Date.now(),
      name: drink.name,
      price: drink.price,
    };
    setFavorites([...favorites, newFav]);
  };

  const removeFromFavorites = (id: any) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const isFavorite = (id: any) => favorites.some(item => item.id === id);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#8B0000" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>sip happens</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.menuTitleBox}>
          <Text style={styles.menuTitle}>Sip Happens Menu</Text>
        </View>
        <FlatList
          data={menuItems}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Detail', { coffee: item })}
            >
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => isFavorite(item.id) ? removeFromFavorites(item.id) : addToFavorites(item)}
                >
                  <Text style={styles.heartIcon}>
                    {isFavorite(item.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

function DetailScreen({ route, navigation }: any) {
  const { coffee } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailCategory}>{coffee.category}</Text>
      <Text style={styles.detailName}>{coffee.name}</Text>
      <Text style={styles.detailPrice}>{coffee.price}</Text>
      <Text style={styles.detailDesc}>{coffee.desc}</Text>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#8B0000' },
            headerTintColor: '#fff',
            headerTitle: 'Coffee Details',
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8B0000',
  },
  errorText: {
    fontSize: 16,
    color: '#8B0000',
    textAlign: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  menuTitleBox: {
    backgroundColor: '#F0EDE8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#8B0000',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 11,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  cardPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  heartIcon: {
    fontSize: 28,
  },
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#FAF7F0',
    justifyContent: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#8B0000',
    fontWeight: '600',
    marginBottom: 20,
  },
  detailDesc: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});