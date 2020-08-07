import React, { useState, useEffect } from 'react';
import { Picker, StyleSheet, Alert } from 'react-native';
import countriesApi from '../services/CountriesApi';
import RNPickerSelect from 'react-native-picker-select';

function CountryPicker ({ setCountryCode })
{
  const [countries, setCountries] = useState([]);
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {

    async function loadCountries()
    {
      const response = await countriesApi.get('/all');

      // TODO: countries não está sendo preenchida no state
      setCountries(response.data);

      fillPicker();
    }

    loadCountries();

  }, []);

  async function fillPicker()
  {
    let pickerCountries = [];

    countries.map(country => {

      let callingCodes = country.callingCodes;

      callingCodes.map(code => {

        if (code != "") {

          let name = country.name + " (+" + code + ")";

          let pickerCountry = { label: name, value: code };

          pickerCountries = [...pickerCountries, pickerCountry];

        }

      });

    });

    setPickerItems(pickerCountries);
  }

  async function alertMessages(title, message, buttons, cancelable)
  {
    Alert.alert(title, message, buttons, { cancelable: cancelable });
  }

  return (
    <RNPickerSelect
      style={styles.countryInput}
      onValueChange={(value) => setCountryCode(value)}
      items={pickerItems}
    />
  );
}

const styles = StyleSheet.create({
  countryInput: {
    backgroundColor: '#fff',
  },
});

export default CountryPicker;