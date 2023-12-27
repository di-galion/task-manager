import {EnumUpdateRowMode} from "../table-row";

export type TypeRowResponse = {
    equipmentCosts: number,
    estimatedProfit: number,
    id: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    rowName: string,
    salary: number,
    parentId: number
    supportCosts: number,
    child: TypeRowInArray[] | []
    total: number
}

export type TypeNewRow = {
    equipmentCosts: string | number,
    estimatedProfit: string | number,
    id: number,
    machineOperatorSalary: string | number,
    mainCosts: string | number,
    materials: string | number,
    mimExploitation: string | number,
    overheads: string | number,
    rowName:string,
    salary: string | number,
    parentId: number
    supportCosts: string | number,
    child?:  [],
    total: string | number,
}

export type TypeRowInArray = TypeNewRow | TypeRowResponse

export type TypeUpdateRow = {
    id: number,
    rowValues: any,
    mode?: EnumUpdateRowMode
}
