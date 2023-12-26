import axios from "axios";
import {ID} from "../components/table/Table.tsx";

export const updateRow = async (rID, data) => {
    try {
        axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID}/row/${rID}/update`,
            method: "POST",
            data: {
                "machineOperatorSalary": 0,
                "materials": 0,
                "mimExploitation": 0,
                "overheads": 0,
                "supportCosts": 0,
                ...data
            }
        })
    } catch (e) {
        console.log(e.message)
    }
}