import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {TableRowProject} from "../table-row/index";
import {NEW_ROW} from "../../data";
import {getAllRows} from "../../services/getAllRows";
import {EnumUpdateRowMode} from "../table-row/index";
import StyledTableRow from "../ui/StyledTableRow";
import StyledTableCell from "../ui/StyledTableCell";
import {TypeNewRow, TypeRowRequest, TypeRowResponse, TypeUpdateRow} from "./TableProject.types";
import {useGetListQuery} from "../../services/api";

export const  TableProject = () => {
    const [isOnLevelHover, setIsOnLevelHover] = useState(false)
    const [data, setData] = useState<any>([])
    const [render, setRender] = useState([])

    console.log("COMPONENT IS RENDERED", data)
    const {data: dataQuery, isLoading: isLoadingM} = useGetListQuery("")

    // useEffect( () => {
    //     getAllRows().then((res) => {
    //         console.log("DATA FROM BACK", res)
    //         setIsLoading(false)
    //         setData(res)
    //         renderRows(res)
    //     })
    //
    // }, [])

    useEffect(() => {
        console.log(data)
        if (data?.length === 0 || !data) {
            console.log(isLoadingM, dataQuery)
            console.log("DATA FROM BACK", dataQuery)
            setData(dataQuery)
            renderRows(dataQuery)
        }
        // if (data && data?.length !== 0) return
    }, [isLoadingM, dataQuery])

    useEffect(() => {
        if (data === undefined) return
        console.log("DATA is UPDATE", data)
        renderRows(data)
    }, [data])

    useEffect(() => {
        if (data && data.length !== 0) renderRows(data)
    }, [isOnLevelHover])

    const updateRows = ({id, rowValues, mode = EnumUpdateRowMode.UPDATE}: TypeUpdateRow) => {
        console.log("DATA updateRows", data)
        console.log("ROW_VALUES", rowValues)
        const go = (rows: (TypeRowResponse | TypeNewRow)[]) => {
            console.log("ROWS", rows)
            if (!rows) return

            let array = rows.map((row) => {
                const rowWritable = {...row}
                console.log("ROW_WRITABLE", rowWritable)
                if (mode === EnumUpdateRowMode.DELETE && rowWritable.id === id) {
                    return
                }

                let isMatched = {}
                rowValues.forEach((item, index) => {
                    if (mode === EnumUpdateRowMode.DELETE && index === 0) return
                    console.log(rowWritable.id === item.id, mode === EnumUpdateRowMode.CREATE && rowWritable.id === 0 && index === 0)
                    if (rowWritable.id === item.id || (mode === EnumUpdateRowMode.CREATE && rowWritable.id === 0 && index === 0)) {
                        console.log("ROW_ID=0",item)
                        isMatched = item
                    }
                })

                if(Object.keys(isMatched).length !== 0) {
                    console.log("IS MATCHED >>>>", isMatched, rowWritable)
                    //@ts-ignore
                    const response  = {
                        ...isMatched,
                        child: rowWritable.child || []
                    }
                    response.child = go(response.child)
                    console.log("ROW_WRITABLE_CHILD", response)
                    return response
                } else {
                    if (rowWritable.child && rowWritable.child.length !== 0) {
                        rowWritable.child = go(rowWritable.child)
                    }
                    return rowWritable
                }
            })
            console.log("ARRAY In GO FIRSt",array)
            if (mode === EnumUpdateRowMode.DELETE) {array = array.filter(i => i !== undefined)}
            console.log("ARRAY In GO SECOND",array)
            return array
        }
        const dataArray = go(data)

        console.log("DATA ARRAY AFTER UPDATE", dataArray)
        // setData([])
        setData(dataArray)
        // renderRows(dataArray)
    }


    const addNewRow = (id: number) => {
        console.log("RENDER_ROWS", data)
        const go = (rows: (TypeRowResponse | TypeNewRow)[]) => {
            if (!rows) return
            return rows.map((row) => {
                const rowWritable = {...row}
                if(row.id === id) {
                    if (row.child === undefined) rowWritable.child = []

                    rowWritable.child = [...row.child, {...NEW_ROW, parentId: row.id}]
                    console.log("Child", rowWritable)
                    // @ts-ignore
                    // rowWritable.child = rowWritable.child.concat([
                    //     {
                    //         ...NEW_ROW,
                    //         parentId: rowWritable.id,
                    //         // total: 0,
                    //         // child: []
                    //     }
                    // ])
                    return rowWritable
                } else {
                    if (row.child && row.child.length !== 0) {
                        console.log("IF IN renderRows")
                        rowWritable.child = go(rowWritable.child)
                    }
                    return rowWritable
                }
            })
        }
        const dataArray = go(data)
        setData(dataArray)
        // renderRows(dataArray)
    }

    const countChildren = (row: (TypeRowResponse | TypeNewRow)) =>  {
        if (!row.child) return

        let count = 0
        const go = (row_: (TypeRowResponse | TypeNewRow)) => {
            row_.child.forEach((item: any) => {
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
        console.log("RENDER_ROWS", rows)
        let startLevel = 0
        const array: any = []

        const go = (rows: (TypeRowResponse | TypeNewRow)[], level: number) => {
            const inTheSameLevel = rows.length

            return rows.map((row, index) => {
                let childCount = countChildren(row)
                const currentLevel = level
                console.log("RENDER ROWS IS NEW ROW", row, row.rowName === '')
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
        <TableContainer component={Paper} sx={{background: "#202124", height: "100vh"}}>
            <Table >
                <TableHead >
                    <StyledTableRow >
                        <StyledTableCell width={"110px"}>Уровень</StyledTableCell>
                        <StyledTableCell width={"757px"} align="left">Наименование работ</StyledTableCell>
                        <StyledTableCell width={"200px"} align="left">Основная з/п</StyledTableCell>
                        <StyledTableCell width={"200px"} align="left">Оборудование</StyledTableCell>
                        <StyledTableCell width={"200px"} align="left">Накладные расходы</StyledTableCell>
                        <StyledTableCell width={"200px"} align="left">Сметная прибыль</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    { !isLoadingM && !!dataQuery && render.length === 0 ?
                       <TableRowProject
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
        </TableContainer>
    );
}
