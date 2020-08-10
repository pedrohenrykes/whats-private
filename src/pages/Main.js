import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  TouchableOpacity,
  Keyboard, 
  TouchableWithoutFeedback, 
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import { AdMobBanner } from 'expo-ads-admob';

import CountryPicker from '../components/CountryPicker';
import AlertMessages from '../components/AlertMessages';
import WhatsappApi from '../services/WhatsappApi';

function Main ({ navigation }) 
{
  const [countryCode, setCountryCode] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');

  const WhatsApp = new WhatsappApi;
  const Alerts = new AlertMessages;

  useEffect(() => {

    async function setTestDevice()
    {
      // await setTestDeviceIDAsync('EMULATOR');
    }

    setTestDevice();

  });

  async function handleGoToWhatsapp()
  {
    if (countryCode != 0 && phoneNumber != 0) {
      await WhatsApp.startChat(countryCode, phoneNumber);
    } else {
      Alerts.simpleAlert("Atenção", "Selecione o páis e informe um número de telefone válido.");
    }
  }

  function handleSetCountryCode(code)
  {
    setCountryCode(code);
  }

  function handleSetPhoneNumber(component)
  {
    const number = (component ? component.getRawValue() : null);

    setPhoneNumber(number);
  }
  
  return (
    <>
      <View style={styles.adsBanner}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-7100133666717639/4135609069"
          servePersonalizedAds // true or false
          // onDidFailToReceiveAdWithError={this.bannerError} 
        />
      </View>
      <TouchableWithoutFeedback 
        onPress={() => { Keyboard.dismiss() }}
      >
        <View style={styles.container}>

          <View style={styles.componentsSpacement}>
            <FontAwesome5 
              style={styles.icon} 
              name="whatsapp" 
              size={70} 
              color="green"
            >
            </FontAwesome5>
          </View>
          
          <View style={styles.componentsSpacement}>
            <CountryPicker 
              setCountryCode={handleSetCountryCode} 
              countryCode={countryCode}
            />
          </View>

          <View style={styles.componentsSpacement}>
            <TextInputMask 
              style={styles.numberInput}
              placeholder="WhatsApp (DDD + Número)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              dataDetectorTypes="phoneNumber"
              textContentType="telephoneNumber"
              autoCorrect={false}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              value={maskedPhoneNumber}
              onChangeText={setMaskedPhoneNumber}
              ref={handleSetPhoneNumber}
            />
          </View>

          <View style={styles.componentsSpacement}>
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={() => handleGoToWhatsapp()}
            >
                <Text style={styles.buttonLabel}>Iniciar conversa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.componentsSpacement}>
            <Text style={styles.explainText}>
              Inicie conversas em seu WhatsApp, sem a necessidade de adicionar os números aos contatos.
            </Text>
          </View>

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
    top: 75,
    left: 30,
    right: 30,
  },
  componentsSpacement: {
    marginBottom: 25,
  },
  explainText: {
    alignSelf: 'center',
    color: '#333',
    fontSize: 15,
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
  modalOpenButton: {
    height: 55,
    backgroundColor: "#c0c0c0",
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsBanner: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Main;
