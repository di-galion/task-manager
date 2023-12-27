import {TypeUpdateRow} from "../table-project";

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


export enum EnumUpdateRowMode {
    UPDATE = 'update',
    DELETE = 'delete',
    CREATE = 'create'
}