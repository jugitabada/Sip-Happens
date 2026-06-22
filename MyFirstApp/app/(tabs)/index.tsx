import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Sip Happens Cafe - Lab 4. June 22, 2026

const menuItems = [
  { id: '1', category: 'Hot Drinks', name: 'Americano', price: '₱120', desc: 'Bold and strong black coffee brewed with espresso shots.' },
  { id: '2', category: 'Hot Drinks', name: 'Cappuccino', price: '₱150', desc: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam.' },
  { id: '3', category: 'Hot Drinks', name: 'Latte', price: '₱160', desc: 'Smooth espresso blended with creamy steamed milk.' },
  { id: '4', category: 'Cold Drinks', name: 'Iced Coffee', price: '₱130', desc: 'Chilled brewed coffee served over ice for a refreshing kick.' },
  { id: '5', category: 'Cold Drinks', name: 'Frappuccino', price: '₱175', desc: 'Blended iced coffee drink topped with whipped cream.' },
  { id: '6', category: 'Cold Drinks', name: 'Sea Salt Latte', price: '₱160', desc: 'Sweet and salty cold latte with a creamy finish.' },
  { id: '7', category: 'Cold Drinks', name: 'Matcha Latte', price: '₱160', desc: 'Premium matcha blended with cold milk.' },
  { id: '8', category: 'Desserts', name: 'Cheesecake', price: '₱180', desc: 'Creamy and rich cheesecake with a graham cracker crust.' },
  { id: '9', category: 'Desserts', name: 'Brownie', price: '₱130', desc: 'Fudgy chocolate brownie with a crispy top.' },
  { id: '10', category: 'Desserts', name: 'Tiramisu', price: '₱200', desc: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.' },
];

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>☕ Sip Happens Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity
              style={styles.viewBtn}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Detail', { coffee: item })}
            >
              <Text style={styles.viewBtnText}>View Item</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3E1F00' },
          headerTintColor: '#F5E6D3',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Menu" component={HomeScreen} options={{ title: '☕ Sip Happens' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Coffee Details', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EE',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3E1F00',
  },
  item: {
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C1440E',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
  },
  price: {
    fontSize: 14,
    color: '#C1440E',
    marginTop: 4,
  },
  viewBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3E1F00',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  viewBtnText: {
    fontSize: 13,
    color: '#3E1F00',
    fontWeight: '600',
  },
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#FDF6EE',
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
    color: '#3E1F00',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#C1440E',
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
    backgroundColor: '#3E1F00',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FDF6EE',
    fontSize: 16,
    fontWeight: '600',
  },
});