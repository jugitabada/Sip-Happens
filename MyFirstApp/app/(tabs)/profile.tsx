import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Sip Happens Cafe - Profile. June 25, 2026

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.name}>{savedName || 'Jugi Tabada'}</Text>
          <Text style={styles.email}>jugitabada20@gmail.com</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>MEMBER SINCE</Text>
          <Text style={styles.value}>June 2026</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>TOTAL ORDERS</Text>
          <Text style={styles.value}>12</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>UPDATE YOUR NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your name..."
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={saveName}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  avatar: {
    fontSize: 64,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
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
  label: {
    fontSize: 11,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});