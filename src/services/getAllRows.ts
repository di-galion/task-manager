import axios from "axios";
import {BASE_URL, eID} from "../data";

export  async function getAllRows() {
    try {
        const response = await axios({
            url: `${BASE_URL}v1/outlay-rows/entity/${eID}/row/list`,
            method: 'GET'
        })
        return response.data
    } catch (e: any) {
        return console.log(e.message)
    }
}