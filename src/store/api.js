import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {eID, NEW_ROW} from "../data";


export const api = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://185.244.172.108:8081/'
    }),
    endpoints: (build) =>  ({
        getList: build.query({
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
        updateRow: build.mutation({
            query: (rID, data) => ({
                url: `v1/outlay-rows/entity/${eID}/row/${rID}/update`,
                method: 'POST',
                data: {
                    ...data
                }
            })
        })
    })
})




export const {useGetListQuery, useCreateRowMutation, useDeleteRowMutation, useUpdateRowMutation} = api