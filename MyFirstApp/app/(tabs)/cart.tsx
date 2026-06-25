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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 my cart</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
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
        </View>

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
    </View>
  );
}

function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 my cart</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Back to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      </Stack.Navigator>
    </NavigationIndependentTree>
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
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#8B0000',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#FAF7F0',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 14,
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
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#8B0000',
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
    color: '#8B0000',
  },
  savedTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});