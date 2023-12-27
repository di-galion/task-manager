import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL, eID, NEW_ROW} from "../data";
import {TypeRowResponse} from "../components/table-project";


export const api = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (build) =>  ({
        getList: build.query<TypeRowResponse, string>({
            query: () => `v1/outlay-rows/entity/${eID}/row/list`
        }),
        createRow: build.mutation({
            query: (data) => ({
                url: `v1/outlay-rows/entity/${eID}/row/create`,
                method: "POST",
                data: {
                    ...NEW_ROW,
                    ...data
                }
            })
        }),
        deleteRow: build.mutation({
            query: (rID) => ({
                url: `v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
                method: 'DELETE',
            })
        }),
        // updateRow: build.mutation({
        //     query: (rID, data) => ({
        //         url: `v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        //         method: 'POST',
        //         data: {
        //             ...data
        //         }
        //     })
        // })
    })
})

export const {useGetListQuery, useCreateRowMutation, useDeleteRowMutation} = api