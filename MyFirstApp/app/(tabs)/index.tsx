import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// I updated index.tsx to make the profile card interactive using useState. June 05, 2026

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={s.screen}>
      <Image
        source={{ uri: 'https://i.imgur.com/5kB7zLM.jpeg' }}
        style={s.photo}
      />
      <TextInput
        placeholder="Type your name..."
        onChangeText={setName}
        style={s.input}
      />
      <Text style={s.greeting}>Hello, {name}!</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen:   { flex:1, alignItems:'center', justifyContent:'center' },
  photo:    { width:120, height:120, borderRadius:60 },
  input:    { height:40, borderWidth:1, borderColor:'#ccc', borderRadius:8, marginTop:20, padding:10, width:200 },
  greeting: { fontSize:18, fontWeight:'bold', marginTop:12 }
});