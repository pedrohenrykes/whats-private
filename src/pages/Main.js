import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Keyboard, 
  TouchableWithoutFeedback, 
  Linking,
  Modal
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CountryPicker from '../components/CountryPicker';

function Main ({ navigation }) 
{
  const whatsappApi = 'https://api.whatsapp.com/send?phone=';

  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [chatNumber, setChatNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function handleGoToWhatsapp()
  {
    const startChatUrl = whatsappApi + countryCode + chatNumber;

    await Linking.openURL(startChatUrl);

    setChatNumber('');
  }

  function handleSetCountry (code, name)
  {
    setCountryCode(code);
    setCountryName(name);
  }
  
  return (
    <>
      <TouchableWithoutFeedback 
        onPress={() => { Keyboard.dismiss() }}
      >
        <View style={styles.container}>
          <FontAwesome5 style={[styles.componentsSpacement, styles.icon]} name="whatsapp" size={90} color="green"></FontAwesome5>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <TouchableWithoutFeedback 
              onPress={() => { setModalVisible(! modalVisible); }}
            >
              <View style={styles.modalShadow} />
            </TouchableWithoutFeedback>
            <CountryPicker setCountry={handleSetCountry}/>
          </Modal>
          <TouchableOpacity
            style={[styles.componentsSpacement, styles.modalOpenButton]}
            onPress={() => { setModalVisible(true); }}
          >
            <Text style={styles.buttonLabel}>
              {countryName ? countryName : 'Toque para selecionar o país'}
            </Text>
          </TouchableOpacity>
          <TextInput 
            style={[styles.componentsSpacement, styles.numberInput]} 
            placeholder="WhatsApp (DDD + Número)"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            dataDetectorTypes="phoneNumber"
            textContentType="telephoneNumber"
            autoCorrect={false}
            value={chatNumber}
            onChangeText={setChatNumber}
          />
          <TouchableOpacity 
            style={[styles.componentsSpacement, styles.submitButton]} 
            onPress={() => handleGoToWhatsapp()}
          >
              <Text style={styles.buttonLabel}>Iniciar conversa</Text>
          </TouchableOpacity>
          <Text style={[styles.componentsSpacement, styles.explainText]}>
            Inicie conversas em seu WhatsApp, sem a necessidade de adicionar os números aos contatos.
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch', 
    position: 'absolute',
    top: 60,
    left: 30,
    right: 30,
  },
  componentsSpacement: {
    marginBottom: 45,
  },
  explainText: {
    alignSelf: 'center',
    color: '#333',
    fontSize: 17,
  },
  icon: {
    alignSelf: 'center',
  },
  numberInput: {
    height: 55,
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: 12,
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
    height: 55,
    backgroundColor: "green",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalShadow: {
    flex: 1,
    //backgroundColor: "#383838",
    opacity: 0.7,
  },
  modalOpenButton: {
    height: 55,
    backgroundColor: "#c0c0c0",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
