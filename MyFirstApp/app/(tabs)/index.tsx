import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Cafe Menu App - Group Task. June 22, 2026

const menuItems = [
  { id: '1', name: 'Americano', category: 'Hot Drinks' },
  { id: '2', name: 'Latte', category: 'Hot Drinks' },
  { id: '3', name: 'Cheesecake', category: 'Desserts' },
  { id: '4', name: 'Brownie', category: 'Desserts' },
  { id: '5', name: 'Sea Salt Latte', category: 'Cold Drinks' },
  { id: '6', name: 'Matcha Latte', category: 'Cold Drinks' },
  { id: '7', name: 'Spanish Latte', category: 'Cold Drinks' },
];

export default function App() {
  const [selected, setSelected] = useState('');

  const renderItem = ({ item }: { item: { id: string; name: string; category: string } }) => (
    <View style={s.item}>
      <Text style={s.category}>{item.category}</Text>
      <Text style={s.name}>{item.name}</Text>
      <TouchableOpacity style={s.btn} onPress={() => setSelected(item.name)}>
        <Text style={s.btnText}>View Item</Text>
      </TouchableOpacity>
      <View style={s.divider} />
    </View>
  );

  return (
    <SafeAreaView style={s.screen}>
      <Text style={s.title}>Sip Happens Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={s.outputBox}>
        <Text style={s.output}>
          {selected ? `— ${selected}` : '— tap a button to see output'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen:    { flex:1, backgroundColor:'#1a1a1a', padding:20, paddingTop:40 },
  title:     { fontSize:24, fontWeight:'bold', color:'#fff', marginBottom:16 },
  item:      { marginBottom:8 },
  category:  { fontSize:12, color:'#888' },
  name:      { fontSize:18, fontWeight:'bold', color:'#fff', marginBottom:6 },
  btn:       { borderWidth:1, borderColor:'#555', borderRadius:6, padding:6, alignSelf:'flex-start' },
  btnText:   { fontSize:14, color:'#fff' },
  divider:   { borderBottomWidth:1, borderBottomColor:'#333', marginTop:10, marginBottom:4 },
  outputBox: { padding:12, backgroundColor:'#111', marginTop:8, borderRadius:8 },
  output:    { fontSize:13, color:'#aaa' }
});