import axios from "axios";
import {BASE_URL, eID} from "../data";
import {changeEmptyStringTpZero} from "./services.utils";
import {TypeAxiosResponse} from "./services.types";

export  async function updateRow(rID: number, data: any) {
    try {
        const body = changeEmptyStringTpZero(data)
        const {data: dataFromBackend} = await axios<TypeAxiosResponse>({
            url: `${BASE_URL}v1/outlay-rows/entity/${eID}/row/${rID}/update`,
            method: 'POST',
            data: {
                ...body
            }
        })

        return [dataFromBackend.current].concat(dataFromBackend.changed)
    } catch (e: any) {
        return console.log(e.message)
    }
}