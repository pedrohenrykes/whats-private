import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function HelloWorldApp ({ navigation }) {

  const [chatNumber, setChatNumber] = useState(null);
  
  return (
    <View style={styles.container}>
      <FontAwesome5 style={styles.icon} name="whatsapp" size={90} color="green"></FontAwesome5>
      <TextInput 
        style={styles.numberInput} 
        placeholder="Número do WhatsApp"
        placeholderTextColor="#999"
        autoCorrect={false}
        value={chatNumber}
        onChangeText={setChatNumber}
      />
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={() => navigation.navigate('RecentNumbers')}
      >
          <Text style={styles.buttonLabel}>Iniciar conversa</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  icon: {
    marginBottom: 30,
  },
  numberInput: {
    height: 55,
    width: 310,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 40,
    paddingHorizontal: 28,
    fontSize: 18,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2,
  },
  submitButton: {
    width: 150,
    height: 55,
    backgroundColor: "#8e4dff",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18
  }
});

export default HelloWorldApp;
