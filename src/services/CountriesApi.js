import axios from 'axios';

const countriesApi = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2'
});

export default countriesApi;