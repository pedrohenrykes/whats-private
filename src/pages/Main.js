import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  TouchableOpacity,
  Keyboard, 
  TouchableWithoutFeedback, 
  Linking,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CountryPicker from '../components/CountryPicker';
import { TextInputMask } from 'react-native-masked-text';
import { AdMobBanner } from 'expo-ads-admob';

function Main ({ navigation }) 
{
  const whatsappApi = 'https://api.whatsapp.com/send?phone=';

  const [countryCode, setCountryCode] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState(null);

  useEffect(() => {

    async function loadApp()
    {
      // await setTestDeviceIDAsync('EMULATOR');
    }

    loadApp();

  });

  async function handleGoToWhatsapp()
  {
    const startChatUrl = whatsappApi + countryCode + phoneNumber;

    await Linking.openURL(startChatUrl);

    setPhoneNumber('');
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
            <CountryPicker  setCountryCode={handleSetCountryCode} />
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
