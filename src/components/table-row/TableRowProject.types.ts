import {TypeRowResponse, TypeUpdateRow} from "../table-project/TableProject.types";

export interface ITableRow {
    row: any,
    level?: number,
    isNewRow?: boolean,
    addNewRow: (id: number) => void,
    isOnLevelHover: boolean,
    setIsOnLevelHover: (v: boolean) => void,
    indexInChildArray?: number
    isLastInLevel?: boolean,
    childCount?: number,
    updateRows?: ({id, rowValues, mode}: TypeUpdateRow) => void
}

export type TypeAxiosResponse = {
    current: TypeRowResponse,
    changed: TypeRowResponse[]
}

export enum EnumUpdateRowMode {
    UPDATE = "update",
    DELETE = "delete",
    CREATE = "create"
}