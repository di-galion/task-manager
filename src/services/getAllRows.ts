import axios from "axios";
import {ID} from "../components/table/Table.tsx";

export const getAllRows = async () => {
    try {
        const response = await axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID}/row/list`,
            method: "GET"
        })
        return response.data
    } catch (e) {
        return console.log(e.message)
    }
}