export type TypeAxiosResponse = {
    current: TypeAxiosRowResponse,
    changed: TypeAxiosRowResponse[]
}

export type TypeAxiosRowResponse = {
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
    total: number
}