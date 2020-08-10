import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import countriesApi from '../services/CountriesApi';
import RNPickerSelect from 'react-native-picker-select';

function CountryPicker ({ setCountryCode })
{
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {

    async function loadCountries()
    {
      const response = await countriesApi.get('/all');

      await fillPicker(response.data);
    }

    loadCountries();

  }, []);

  async function fillPicker(countries)
  {
    let pickerCountries = [];

    countries.map(country => {

      const callingCodes = country.callingCodes;

      callingCodes.map(code => {

        if (code != "") {

          const name = country.name + " (+" + code + ")";

          const pickerCountry = { label: name, value: code };

          pickerCountries = [...pickerCountries, pickerCountry];

        }

      });

    });

    setPickerItems(pickerCountries);
  }

  return (
    <RNPickerSelect
      style={styles}
      useNativeAndroidPickerStyle={false}
      placeholder={{
        label: 'Toque para selecionar o país',
        value: null
      }}
      onValueChange={(value) => setCountryCode(value)}
      items={pickerItems}
    />
  );
}

const styles = StyleSheet.create({
  inputIOS: {
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
  inputAndroid: {
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
  placeholder: {
    color: '#999'
  }
});

export default CountryPicker;