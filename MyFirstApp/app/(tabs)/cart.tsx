import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();

function CartScreen({ navigation }: any) {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [savedTime, setSavedTime] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const value = await AsyncStorage.getItem('cart_note');
      const time = await AsyncStorage.getItem('cart_note_time');
      if (value) setSavedNote(value);
      if (time) setSavedTime(time);
    } catch (e) {
      console.log('Error loading note');
    }
  };

  const saveNote = async () => {
    try {
      const time = new Date().toLocaleString();
      await AsyncStorage.setItem('cart_note', note);
      await AsyncStorage.setItem('cart_note_time', time);
      setSavedNote(note);
      setSavedTime(time);
      setNote('');
    } catch (e) {
      console.log('Error saving note');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SPECIAL INSTRUCTIONS</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Extra sugar, no ice..."
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>

      {savedNote ? (
        <View style={styles.savedBox}>
          <Text style={styles.savedLabel}>LAST SAVED NOTE</Text>
          <Text style={styles.savedNote}>{savedNote}</Text>
          <Text style={styles.savedTime}>Saved at {savedTime}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.summaryButton}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <Text style={styles.buttonText}>View Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1A4D2E' },
          headerTintColor: '#F5F5F5',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: '🛒 My Cart' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1A4D2E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryButton: {
    backgroundColor: '#1A4D2E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  savedBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  savedLabel: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  savedNote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A4D2E',
  },
  savedTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});