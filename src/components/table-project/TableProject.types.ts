import {EnumUpdateRowMode} from "../table-row/TableRowProject.types";


export type TypeRowRequest = {
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
    supportCosts: number,
    parentId: number,
    child: any
        // TypeRowRequest[]
}

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
    child: any
        // (TypeRowResponse | TypeNewRow)[]
    total: number
}

export type TypeNewRow = {
    equipmentCosts: string,
    estimatedProfit: string,
    id: number,
    machineOperatorSalary: string,
    mainCosts: string,
    materials: string,
    mimExploitation: string,
    overheads: string,
    rowName:string,
    salary: string,
    parentId: number
    supportCosts: number,
    child: any,
    total: number,
}



export type TypeUpdateRow = {
    id: number,
    rowValues: (TypeRowResponse | TypeNewRow)[],
    mode?: EnumUpdateRowMode
}
