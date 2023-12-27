import axios from "axios";
import {BASE_URL, eID} from "../data";
import {TypeAxiosResponse} from "./services.types";

export  async function deleteRow(rID: number) {
    try {
        const {data: dataFromBackend} = await axios<TypeAxiosResponse>({
            url: `${BASE_URL}v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
            method: 'DELETE',
        })

        return [dataFromBackend.current].concat(dataFromBackend.changed)
    } catch (e: any) {
        return console.log(e.message)
    }
}