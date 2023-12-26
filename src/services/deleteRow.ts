import axios from "axios";
import {ID} from "../components/table/Table.tsx";

export const deleteRow = (rID) => {
    try {
        axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID}/row/${rID}/delete`,
            method: "DELETE",
        })
    } catch (e) {
        console.log(e.message)
    }
}