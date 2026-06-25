import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Sip Happens Cafe - Favorites. June 25, 2026

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Reload favorites every time this tab is opened
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('coffeeFavorites');
      if (stored) setFavorites(JSON.parse(stored));
      else setFavorites([]);
    } catch (e) {
      console.log('Failed to load favorites', e);
    }
  };

  const removeFromFavorites = async (id: any) => {
    try {
      const updated = favorites.filter(item => item.id !== id);
      setFavorites(updated);
      await AsyncStorage.setItem('coffeeFavorites', JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to remove favorite', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>❤️ my favorites</Text>
      </View>
      <View style={styles.body}>
        {favorites.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No favorites yet!</Text>
            <Text style={styles.emptySubText}>Tap ❤️ on any drinks or food to save it here.</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }: any) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                    <Text style={styles.heartIcon}>❤️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
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
});