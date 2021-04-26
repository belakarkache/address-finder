import axios from 'axios';

export const getResultsByAddress = (addressData) => axios.get(`https://viacep.com.br/ws/${addressData.state}/${addressData.city}/${addressData.street}/json/`).then((resp) => resp.data);
export const getResultsByCEP = (addressData) => axios.get(`https://viacep.com.br/ws/${addressData.zipcode}/json/`).then((resp) => resp.data);
export const getStates = axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((resp) => resp.data);
export const getCities = (uf) => axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then((resp) => resp.data);