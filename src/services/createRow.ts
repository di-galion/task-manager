import axios from "axios";
import {eID, NEW_ROW} from "../data";
import {changeEmptyStringTpZero} from "./services.utils";
import {TypeAxiosResponse} from "./services.types";

export  async function createRow(data: any) {
    try {
        const body = changeEmptyStringTpZero({
            ...NEW_ROW,
            ...data
        })
        const {data: dataFromBackend} = await axios<TypeAxiosResponse>({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/create`,
            method: 'POST',
            data: body
        })

        if (data.changed === undefined) return [dataFromBackend.current]
        return [dataFromBackend.current].concat(data.changed)
    } catch (e: any) {
       return  console.log(e.message)
    }
}