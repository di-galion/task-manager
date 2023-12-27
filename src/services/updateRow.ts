import axios from "axios";
import {eID} from "../data";
import {changeEmptyStringTpZero} from "./createRow";

export const updateRow = async (rID: number, data: any) => {
    console.log("UPDATE", data)
    try {
        const body = changeEmptyStringTpZero(data)
        return  axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
            method: 'POST',
            data: {
                ...body
            }
        })
    } catch (e: any) {
        return console.log(e.message)
    }
}