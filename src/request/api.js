import { get, post, postJson } from './http';
let api = 'https://fx-ht-test.myfastblock.com'

const getMiningList = data => get(api + `/mining/miningListWhole`, data);
const getMarkets = data => post(api + `/api/getMarkets`, data);

const http ={
    getMiningList,
    getMarkets
}

export default http
