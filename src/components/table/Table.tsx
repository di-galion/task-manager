import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled, tableCellClasses} from "@mui/material";
import TableRowComponent from "../table-row/TableRow.tsx";
import {useEffect, useState} from "react";
import {NEW_ROW} from "../navbar/data.ts";
import {createRow} from "../../services/createRow.ts";
import {getAllRows} from "../../services/getAllRows.ts";

export const ID = 114666

const EMPTY_ROW = {
    "equipmentCosts": 0,
    "estimatedProfit": 0,
    "machineOperatorSalary": 0,
    "mainCosts": 0,
    "materials": 0,
    "mimExploitation": 0,
    "overheads": 0,
    "parentId": 0,
    "rowName": "string",
    "salary": 0,
    "supportCosts": 0
}

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&': {
        backgroundColor: "#202124",

        th: {
            border: "none",
            borderBottom: "1px solid #414144",

            height: "60px",
            color: "#FFFFFF",
            // fontFamily: Roboto,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "18px",
            letterSpacing: "0.10000000149011612px",
            textAlign: "left",
            },
        td: {
            border: "none",
            borderBottom: "1px solid #414144",

            height: "60px",
            color: "#FFFFFF",
            // fontFamily: Roboto,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "18px",
            letterSpacing: "0.10000000149011612px",
            textAlign: "left",
        }
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:  "#202124",
        height: "41px",
        color: "#A1A1AA",
        // font-family: Roboto;
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "18px",
        letterSpacing: "0.10000000149011612px",
        textAlign: "left",
        minWidth: "110px"

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: "0 0 0 12px"
    },
}));


const  TableComponent = () => {
    const [isOnLevelHover, setIsOnLevelHover] = useState(false)
    const [data, setData] = useState([])
    const [render, setRender] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        getAllRows().then((res) => {
            setIsLoading(false)
            setData(res)
            renderRows(res)
        })

    }, [])

    useEffect(() => {
        if (data.length !== 0) renderRows(data)
    }, [isOnLevelHover])

    const updateRows = (id, rowValues, mode = "update") => {
        const go = (rows) => {
            let array = rows.map((row) => {

                if (mode === "delete" && row.id === id) {
                    return
                }

                let isMatched = {}
                rowValues.forEach((item, index) => {
                    if (mode === "delete" && index === 0) return

                    if (row.id === item.id || (mode === "create" && row.id === 0)) {
                        console.log("IS MATCHED >>>>>>>>>>>>>", mode, row.id)
                        isMatched = item
                    }
                })

                if(Object.keys(isMatched).length !== 0) {
                    console.log("IF")
                    row = {
                        ...isMatched,
                        child: row.child || []
                    }
                    row.child = go(row.child)
                    return row
                } else {
                    console.log("ELSE")
                    if (row.child && row.child.length !== 0) {
                        console.log("ELSE IF")
                        row.child = go(row.child)
                    }
                    return row
                }
            })

            if (mode === "delete") {array = array.filter(i => i !== undefined)}
            return array
        }
        const dataArray = go(data)
        console.log("GO",dataArray)
        console.log("NEW DATA", dataArray, data)
        setData(dataArray)
        renderRows(dataArray)
    }

    const addNewRow = (id) => {
        console.log("ADD", data)
        const go = (rows) => {
            return rows.map((row) => {
                if(row.id === id) {
                    console.log("IF")
                    if (row.child === undefined) row.child = []
                    row.child = row.child.concat([
                        {
                            ...NEW_ROW,
                            parentId: row.id
                        }
                    ])
                    return row
                } else {
                    console.log("ELSE")
                    if (row.child && row.child.length !== 0) {
                        console.log("ELSE IF")
                        row.child = go(row.child)
                    }
                    return row
                }
            })
        }
        const r = go(data)
        console.log("GO",r)
        console.log("NEW DATA", r, data)
        setData(r)
        renderRows(r)
    }

    const countChildren = (row) =>  {
        if (!row.child) return
        let count = 0
        const go = (row_) => {
            row_.child.forEach((item) => {
                count = count + 1
                if (!item.child) return
                go(item)
            })
        }
        go(row)
        return count
    }
    const renderRows = (rows) => {
        if (!rows) return
        let startLevel = 0
        const array = []
        const go = (rows, level) => {
            let inTheSameLevel = rows.length
            return rows.map((row, index) => {
                let childCount = countChildren(row)
                const currentLevel = level
                array.push((
                    <TableRowComponent
                        updateRows={updateRows}
                        addNewRow={addNewRow}
                        level={currentLevel}
                        indexInChildArray={index}
                        childCount={childCount}
                        isLastInLevel={index === inTheSameLevel - 1}
                        key={index + row.salary + row + Math.random()}
                        setIsOnLevelHover={setIsOnLevelHover}
                        isOnLevelHover={isOnLevelHover}
                        row={row}
                        isNewRow={row.child === undefined}
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
                <TableHead sx={{height: "41px"}}>
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
                    { !isLoading && render.length === 0 ?
                        <TableRowComponent
                            setIsOnLevelHover={setIsOnLevelHover}
                            isOnLevelHover={isOnLevelHover}
                            row={EMPTY_ROW}
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

export default TableComponent