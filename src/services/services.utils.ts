import {TypeNewRow} from "../components/table-project";

export function changeEmptyStringTpZero(obj:  TypeNewRow) {
    const responseObj: any = {...obj}
    Object.keys(obj).forEach((key) => {
        if (obj[key as keyof TypeNewRow] === '') {
            responseObj[key as keyof typeof obj] = 0
        }
    })
    return responseObj
}