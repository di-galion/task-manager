import axios from "axios";
import {eID} from "../data";

export const getAllRows = async () => {
    try {
        const response = await axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/list`,
            method: 'GET'
        })
        return response.data
    } catch (e: any) {
        return console.log(e.message)
    }
}