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
            borderBottom: "1px solid #414144"
        },
        td: {
            border: "none",
            borderBottom: "1px solid #414144"
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


// const rows = [
//     {
//         parentId: "none",
//         id: 0,
//         values: {
//             level: 1,
//             workName: "Frozen yoghurt",
//             salary: 124124,
//             equipment: 124,
//             costs: 1412343,
//             profit: 124124
//         },
//         children: [
//             {
//                 parentId: 0,
//                 prevLevel: 1,
//                 id: 0,
//                 values: {
//                     level: 2,
//                     workName: "Frozen yoghurt",
//                     salary: 124124,
//                     equipment: 124,
//                     costs: 1412343,
//                     profit: 124124
//                 },
//                 nextLevel: {
//                     prevLevel: 1,
//                     values: {
//                         level: 2,
//                         workName: "Frozen yoghurt",
//                         salary: 124124,
//                         equipment: 124,
//                         costs: 1412343,
//                         profit: 124124
//                     },
//                     nextLevel: 0
//                 }
//             },
//         ]
//     },
//
// ]

const  TableComponent = () => {
    const [isOnLevelHover, setIsOnLevelHover] = useState(false)
    const [data, setData] = useState([])
    const [render, setRender] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // console.log("data", data)

    const dataDeleteRow = (id) => {
        setData((currentValue) => currentValue.filter((row) => row.id !== id))
    }

    useEffect(() => {
        console.log("DATA CHANGED", data)
    }, data)

    useEffect( () => {
        console.log("USE_EFFECT")

        // const send = async () => {
        //     const response = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/${ID}/row/list`, {
        //         method: "GET"
        //     })
        //         .then( async (res) => {
        //             const data = await res.json()
        //             setIsLoading(false)
        //             // setData(data)
        //             console.log("DATA FROM BACK",data)
        //             // return res.json()
        //             setData(data)
        //             return data
        //         }).then((data) => {
        //             renderRows(data)
        //         })
        // }
        // send()

        getAllRows().then((res) => {
            setIsLoading(false)
            console.log("DATA FROM BACK", res)
            // setData(res)
            setData(res)
            renderRows(res)
        })

    }, [])
    useEffect(() => {
        if (data.length !== 0) renderRows(data)
    }, [isOnLevelHover])

    // createRow({
    //     rowName: "child",
    //     salary: 123,
    //     equipmentCosts: 123,
    //     mainCosts: 1234,
    //     estimatedProfit: 10000,
    //     parentId: 68667,
    // })

    const addNewRow = (id) => {
        // const array = []

        console.log("ADD", data)
        const go = (rows) => {
            return rows.map((row) => {
                if(row.id === id) {
                    console.log("IF")
                    if (row.child === undefined) row.child = []
                    // перестать оставлять детей
                    row.child = row.child.concat([
                        {
                            ...NEW_ROW,
                            parentId: row.id
                        }
                    ])
                    // array.push(row)
                    return row
                } else {
                    console.log("ELSE")
                    // array.push(row)
                    if (row.child && row.child.length !== 0) {
                        console.log("ELSE IF")
                        row.child = go(row.child)
                        return row
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

    const renderRows = (rows) => {
        let startLevel = 0
        const array = []
        const go = (rows, level) => {
            return rows.map((row, index) => {
                // console.log(row)
                const currentLevel = level
                array.push((
                    <TableRowComponent
                        addNewRow={addNewRow}
                        level={currentLevel}
                        indexInChildArray={index}
                        dataDeleteRow={dataDeleteRow}
                        key={index + row.salary + row + Math.random()}
                        setIsOnLevelHover={setIsOnLevelHover}
                        isOnLevelHover={isOnLevelHover}
                        row={row}
                        // isEditing={isEditing}
                        // setIsEditing={setIsEditing}
                    />
                ))
                if (row.child && row.child.length !== 0) {
                    // console.log(row.child)
                    go(row.child, currentLevel + 1)
                }
            })
        }
        go(rows, startLevel)
        console.log("RENDER",array)
        console.log("CHECK", data)
        setRender(array)
    }

    // if (data.length !== 0) {
    //     const res = renderRows(data)
    //     // console.log("RS",res)
    // }

    return (
        <TableContainer component={Paper} sx={{background: "#202124", height: "100vh"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
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
                            // isEditing={isEditing}
                            // setIsEditing={setIsEditing}
                        />
                        :
                        // render
                        render
                    //     data.map((row, index) => {
                    //         // console.log("RENDER", data)
                    //         // console.log("RENDER",render)
                    //         // return renderRows(data)
                    //     return (
                    //         <TableRowComponent
                    //             dataDeleteRow={dataDeleteRow}
                    //             key={index}
                    //             setIsOnLevelHover={setIsOnLevelHover}
                    //             isOnLevelHover={isOnLevelHover}
                    //             row={row}
                    //             isNewRow={true}
                    //             addNewRow={addNewRow}
                    //             // isEditing={isEditing}
                    //             // setIsEditing={setIsEditing}
                    //         />
                    //     )
                    // })
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent