import axios from "axios";
import {eID, NEW_ROW} from "../data";
import {TypeNewRow, TypeRowRequest} from "../components/table-project/TableProject.types";
import {TypeAxiosResponse} from "../components/table-row";

export const createRow = async (data: any) => {
    try {
        const body = changeEmptyStringTpZero({
            ...NEW_ROW,
            ...data
        })
        console.log("ASDFADFAFADSFAF", body)
        return  axios({
            url: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/create`,
            method: 'POST',
            data: {
                // ...NEW_ROW,
                // ...data
                ...body
            }
        })
    } catch (e: any) {
       return  console.log(e.message)
    }
}

export function changeEmptyStringTpZero(obj:  TypeNewRow) {
    const responseObj: any = {...obj}
    Object.keys(obj).forEach((key) => {
        if (obj[key as keyof TypeNewRow] === "") {
            responseObj[key as keyof typeof obj] = 0
        }
    })
    return responseObj
}

// import {useQuery} from "@tanstack/react-query";
// import {CategoryService} from "@/services/category/category.service";
// import {IUseGetCategories} from "@/hooks/queries/types";
// import {IGetAllCategory} from "@/types/category.types";
// import {NO_FILTER} from "@/constants/order-status.constants";
// import {PER_PAGE} from "@/constants/page.contants";
// import {GET_ALL_CATEGORIES} from "@/constants/query-keys.constants";
// import {EnumSort} from "@/types/enums";
//
// export const useGetCategories = (d: IGetAllCategory): IUseGetCategories => {
//     const {
//         filterSearch = NO_FILTER,
//         page = 1,
//         perPage = PER_PAGE,
//         sort = EnumSort.ASC
//     } = d
//
//     const {data, isLoading} = useQuery({
//         queryKey: [GET_ALL_CATEGORIES, filterSearch, page, perPage, sort],
//         queryFn: () => CategoryService.getAll({filterSearch, sort, page, perPage}),
//         select: ({data}) => data
//     })
//     return {data, isLoading}
// }