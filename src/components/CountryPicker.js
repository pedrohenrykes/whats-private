import React, { useState, useEffect } from 'react';
import { Picker, StyleSheet, Alert } from 'react-native';
import countriesApi from '../services/CountriesApi';

function CountryPicker ({ setCountry })
{
  const [selectedCountry, setSelectedCountry] = useState('ruby');
  const [countries, setCountries] = useState([]);

  useEffect(() => {

    async function loadCountries()
    {
      try {

        const response = await countriesApi.get('/all');

        setCountries(response.data);

      } catch (error) {
          
        alertMessages("Falha na conexão", "Não foi possível conectar ao servidor de dados.", [
            { text: "Recarregar", onPress: () => setCountries() },
            { text: "Cancelar", onPress: () => console.log(error), style: "cancel" }
        ], false);

      }
    }

    loadCountries();

  }, []);

  async function alertMessages(title, message, buttons, cancelable)
  {
    Alert.alert(title, message, buttons, { cancelable: cancelable });
  }

  async function handleSetCountry(selectedCode)
  {
    setSelectedCountry(selectedCode);

    countries.map(country => {

      const callingCodes = country.callingCodes;

      callingCodes.map(code => {

        if (code === selectedCode) {

          const name = country.nativeName + " (+" + code + ")";

          setCountry(code, name);

        }

      });

    });
  }

  return (
    <Picker
      style={styles.countryInput}
      selectedValue={selectedCountry}
      onValueChange={(itemValue) => handleSetCountry(itemValue)}
    >
      {countries.map(country => {

        const callingCodes = country.callingCodes;

        return callingCodes.map(code => (
          <Picker.Item label={country.nativeName + ' (+' + code + ')'} value={code} />
        ));

      })}
    </Picker>
  );
}

const styles = StyleSheet.create({
  countryInput: {
    backgroundColor: '#fff',
  },
});

export default CountryPicker;