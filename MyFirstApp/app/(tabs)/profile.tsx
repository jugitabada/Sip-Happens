import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Sip Happens Cafe - Profile. June 22, 2026

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const value = await AsyncStorage.getItem('profile_name');
      if (value) setSavedName(value);
    } catch (e) {
      console.log('Error loading name');
    }
  };

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('profile_name', name);
      setSavedName(name);
      setName('');
    } catch (e) {
      console.log('Error saving name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.name}>{savedName || 'Jugi Tabada'}</Text>
      <Text style={styles.email}>sip_happens@coffee.com</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>June 2026</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Orders</Text>
        <Text style={styles.value}>12</Text>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Update Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your name..."
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={saveName}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#FDF6EE',
  },
  avatar: {
    fontSize: 64,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E1F00',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C1440E',
  },
  inputCard: {
    width: '80%',
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1A4D2E',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3E1F00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});