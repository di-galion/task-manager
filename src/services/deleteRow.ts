import axios from "axios";
import {eID} from "../data";

export const deleteRow = (rID: number) => {
    try {
        return axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
            method: 'DELETE',
        })
    } catch (e: any) {
        return console.log(e.message)
    }
}