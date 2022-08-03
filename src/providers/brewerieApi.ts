import axios from "axios"


export const brewerieApi = axios.create({
    baseURL: "https://api.openbrewerydb.org"
})