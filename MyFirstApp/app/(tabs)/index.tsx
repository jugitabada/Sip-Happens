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
      <Text style={s.name}>Jugi Tabada</Text>
      <Text style={s.bio}>BMMA - 2023150572</Text>
      <Text style={s.bioText}>Multimedia Arts student at Mapúa Malayan Colleges of Mindanao with a passion for art, design, and visual storytelling.</Text>

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
  name:     { fontSize:22, fontWeight:'bold', marginTop:12 },
  bio:      { fontSize:14, color:'#888', marginTop:4 },
  bioText:  { fontSize:14, color:'#888', marginTop:8, textAlign:'center', alignSelf:'center', width:'80%' },
  input:    { height:40, borderColor:'gray', borderWidth:1, marginTop:20, paddingHorizontal:10, width:'80%' },
  greeting: { fontSize:18, marginTop:12 }
});