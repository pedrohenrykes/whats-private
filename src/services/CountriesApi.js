import axios from 'axios';

const CountriesApi = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2'
});

export default CountriesApi;