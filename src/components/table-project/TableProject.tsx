import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {TableRowProject} from "../table-row";
import {StyledTableRow, StyledTableCell, StyledTableContainer} from "../ui"
import {EnumUpdateRowMode} from "../table-row";
import {TypeNewRow, TypeRowInArray, TypeRowResponse, TypeUpdateRow} from "./TableProject.types";
import {NEW_ROW} from "../../data";
import {useGetListQuery} from "../../store";

export const  TableProject = () => {
    const [isOnLevelHover, setIsOnLevelHover] = useState(false)
    const [data, setData] = useState<any>([])
    const [render, setRender] = useState([])

    const {data: dataQuery, isLoading: isLoadingM} = useGetListQuery('')

    useEffect(() => {
        if (data?.length === 0 || !data) {
            if (!isLoadingM && dataQuery?.length === 0) {
                setData([NEW_ROW])
                renderRows([NEW_ROW])
                return
            }
            setData(dataQuery)
            renderRows(dataQuery)
        }
    }, [isLoadingM, dataQuery])

    useEffect(() => {
        if (!data) return
        renderRows(data)
    }, [data])

    useEffect(() => {
        if (data && data.length !== 0) renderRows(data)
    }, [isOnLevelHover])

    const updateRows = ({id = -1, rowValues, mode = EnumUpdateRowMode.UPDATE}: TypeUpdateRow) => {
        const go = (rows: TypeRowInArray[]): TypeRowInArray[] => {
            let array = rows.map((row) => {
                const rowWritable = {...row}

                if (mode === EnumUpdateRowMode.DELETE && rowWritable.id === id) return

                let isMatched = {}
                rowValues.forEach((item: TypeRowInArray, index: number) => {
                    if (mode === EnumUpdateRowMode.DELETE && index === 0) return
                    if (rowWritable.id === item.id
                        || (mode === EnumUpdateRowMode.CREATE && rowWritable.id === 0 && index === 0)) {
                        isMatched = item
                    }
                })

                if(Object.keys(isMatched).length !== 0) {
                    const response  = {
                        ...isMatched,
                        child: rowWritable.child || []
                    }

                    response.child = go(response.child)

                    return response
                } else {
                    if (rowWritable.child && rowWritable.child.length !== 0) {
                        rowWritable.child = go(rowWritable.child)
                    }
                    return rowWritable
                }
            })
            if (mode === EnumUpdateRowMode.DELETE) {array = array.filter(i => i !== undefined)}
            //@ts-ignore
            return array
        }
        let dataArray = go(data)

        if(dataArray.length === 0) dataArray = [NEW_ROW]

        setData(dataArray)
    }

    const addNewRow = (id: number) => {
        const go = (rows: (TypeRowResponse | TypeNewRow)[] | undefined) => {
            if (!rows) return
            return rows.map((row) => {
                const rowWritable = {...row}

                if(row.id === id) {
                    if (row.child === undefined) rowWritable.child = []
                    //@ts-ignore
                    rowWritable.child = [...row.child, {...NEW_ROW, parentId: row.id}]

                    return rowWritable
                } else {
                    if (row.child && row.child.length !== 0) {

                        rowWritable.child = go(rowWritable.child)
                    }
                    return rowWritable
                }
            })
        }
        const dataArray = go(data)
        setData(dataArray)
    }

    const countChildren = (row: (TypeRowResponse | TypeNewRow)) =>  {
        if (!row.child) return

        let count = 0
        const go = (row_: (TypeRowResponse | TypeNewRow)) => {
            if (!row_.child) return
            row_.child.forEach((item) => {
                count = count + 1
                if (!item.child) return
                go(item)
            })
        }
        go(row)

        return count
    }
    const renderRows = (rows: any) => {
        if (!rows) return
        let startLevel = 0
        const array: any = []

        const go = (rows: (TypeRowResponse | TypeNewRow)[], level: number) => {
            const inTheSameLevel = rows.length

            return rows.map((row, index) => {
                let childCount = countChildren(row)
                const currentLevel = level
                array.push((
                    <TableRowProject
                        updateRows={updateRows}
                        addNewRow={addNewRow}
                        level={currentLevel}
                        indexInChildArray={index}
                        childCount={childCount}
                        isLastInLevel={index === inTheSameLevel - 1}
                        key={index + (+row.salary) + Math.random()}
                        setIsOnLevelHover={setIsOnLevelHover}
                        isOnLevelHover={isOnLevelHover}
                        row={row}
                        isNewRow={row.rowName === '' && row.id === 0}
                    />
                ))

                if (row.child && row.child.length !== 0) {
                    go(row.child, currentLevel + 1)
                }
            })
        }
        go(rows, startLevel)

        setRender(array)
    }

    return (
        <StyledTableContainer>
            <Table >
                <TableHead >
                    <StyledTableRow >
                        <StyledTableCell width={'110px'}>Уровень</StyledTableCell>
                        <StyledTableCell width={'757px'} align='left'>Наименование работ</StyledTableCell>
                        <StyledTableCell width={'200px'} align='left'>Основная з/п</StyledTableCell>
                        <StyledTableCell width={'200px'} align='left'>Оборудование</StyledTableCell>
                        <StyledTableCell width={'200px'} align='left'>Накладные расходы</StyledTableCell>
                        <StyledTableCell width={'200px'} align='left'>Сметная прибыль</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    { !isLoadingM && !!dataQuery && render.length === 0 ?
                       <TableRowProject
                            updateRows={updateRows}
                            setIsOnLevelHover={setIsOnLevelHover}
                            isOnLevelHover={isOnLevelHover}
                            row={NEW_ROW}
                            isNewRow={true}
                            addNewRow={addNewRow}
                        />
                        :
                        render
                    }
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
