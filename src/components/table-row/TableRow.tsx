import * as React from "react";
import {FC, useEffect, useRef, useState} from "react";
import {StyledTableCell, StyledTableRow} from "../table/Table.tsx";
import "./styles.scss"
import * as classNames from "classnames";
import {createRow} from "../../services/createRow.ts";
import {deleteRow} from "../../services/deleteRow.ts";
import {updateRow} from "../../services/updateRow.ts";

export interface ITableRow {
    row: any,
    // isEditing: boolean,
    // setIsEditing: (v: boolean) => void,
    level?: number,
    dataDeleteRow?: (v: number) => void,
    isNewRow?: boolean,
    addNewRow: (id: number) => void,
    isOnLevelHover: boolean,
    setIsOnLevelHover: (v: boolean) => void,
    indexInChildArray?: number
    isLastInLevel?: boolean,
    childCount?: number
}
const TableRowComponent: FC<ITableRow> = (
    {
        dataDeleteRow = () => {},
        addNewRow = () => {},
        row,
        level,
        isNewRow= false,
        // isEditing,
        isOnLevelHover,
        setIsOnLevelHover,
        indexInChildArray,
        isLastInLevel,
        childCount
    }
) => {
    const [isEditing, setIsEditing] = useState(isNewRow)
    const rowRef = useRef(null)
    const [rowName, setRowName] = useState<string>(row.rowName)
    const [salary, setSalary] = useState<string | number>(row.salary)
    const [equipmentCosts, setEquipmentCosts] = useState<string | number>(row.equipmentCosts)
    const [mainCosts, setMainCosts] = useState<string |number>(row.mainCosts)
    const [estimatedProfit, setEstimatedProfit] = useState<string | number>(row.estimatedProfit)

    const onTrashClickHandler = () => {
        deleteRow(row.id)
        dataDeleteRow(row.id)
    }

    useEffect(() => {
        if (isEditing) rowRef.current.addEventListener("keydown", async (e) => {
            if (e.keyCode !== 13 || e.code !== "Enter") return
            console.log("ENTER")
            setIsEditing(false)
            if (isNewRow) {
                createRow({
                    rowName,
                    salary,
                    equipmentCosts,
                    mainCosts,
                    estimatedProfit,
                    parentId: row.parentId,
                })

            }
            else {
                console.log("UPDATE")
                updateRow(row.id,{
                    rowName,
                    salary,
                    equipmentCosts,
                    mainCosts,
                    estimatedProfit,
                    // parentId: 68458,
                })
            }

        })
    }, [])

    // console.log(level, isOnLevelHover)
    console.log(row.rowName, level, childCount)

    return (
        <>
            <StyledTableRow
                ref={rowRef}
                onDoubleClick={() => setIsEditing(true)}
                sx={{
                    '& > td, & > th': {
                        height: "60px",
                        color: "#FFFFFF",
                        // fontFamily: Roboto,
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "18px",
                        letterSpacing: "0.10000000149011612px",
                        textAlign: "left",
                    }
                }}
            >
                <StyledTableCell
                    align="left"
                    // sx={{overflow: "scroll"}}
                >
                    <div
                        className={"level-block"}
                        style={{marginLeft: `${level * 20}px`}}
                        onMouseOver={() => {
                            // console.log("OVER")
                            setIsOnLevelHover(true)
                        }}
                        onMouseLeave={() => {
                            // console.log("LEAVE")
                            setIsOnLevelHover(false)
                        }}
                    >
                        { level !== 0 && level && <div className={classNames("line-first", {"line-first_long": indexInChildArray !== 0})} ></div>}
                        <div className="icon-block">
                            <img
                                onClick={() => {
                                    if (!isNewRow) addNewRow(row.id)
                                }}
                                className={"level-icon"} src="/tableLevelIcon.svg" alt="level"
                            />
                            {isOnLevelHover && !isEditing &&
                                <img onClick={onTrashClickHandler} className={"level-trash"}  src="/TrashFill.svg" alt="trash"/>
                            }
                        </div>
                        {/*{row.prevLevel === 1 && <div className={"line-third"}></div>}*/}
                        {/*{row.prevLevel === 0 && <div className={"line-second"}></div>}*/}
                        {level !== 0 && childCount  && !isLastInLevel &&  <div className={"line-third"} style={{height: `${40 + 60 * childCount}px`}}></div>}
                    </div>
                </StyledTableCell>

                <StyledTableCell align="left">
                    <input
                        onChange={({target}) => setRowName(target.value)}
                        name={row.rowName}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.rowName}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onChange={({target}) => setSalary(target.value)}
                        name={row.salary}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.salary}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onChange={({target}) => setEquipmentCosts(target.value)}
                        name={row.equipmentCosts}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.equipmentCosts}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onChange={({target}) => setMainCosts(target.value)}
                        name={row.mainCosts}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.mainCosts}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onChange={({target}) => setEstimatedProfit(target.value)}
                        name={row.estimatedProfit}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.estimatedProfit}
                    />
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}

export default TableRowComponent







{/*{Object.values(row.values).map((column, index) => {*/}
{/*    return (*/}
{/*        <StyledTableCell key={index}  height={"60px"} component="th" scope="row">*/}
{/*            {index === 0 ?*/}
{/*                <div*/}
{/*                    className={"level-block"}*/}
{/*                    style={{marginLeft: `${20 * (+column - 1)}px`}}*/}
{/*                    onMouseOver={() => setIsOnLevelHover(true)}*/}
{/*                    onMouseLeave={() => setIsOnLevelHover(false)}*/}
{/*                >*/}
{/*                    { row.prevLevel === 1 && <div className={"line-first"}></div>}*/}
{/*                    <div className="icon-block">*/}
{/*                        <img className={"level-icon"} src="/tableLevelIcon.svg" alt="level"/>*/}
{/*                        {isOnLevelHover &&*/}
{/*                            <img className={"level-trash"}  src="/TrashFill.svg" alt="trash"/>*/}
{/*                        }*/}
{/*                    </div>*/}
{/*                    /!*{row.prevLevel === 1 && <div className={"line-third"}></div>}*!/*/}
{/*                    {row.prevLevel === 0 && <div className={"line-second"}></div>}*/}
{/*                </div>*/}
{/*                :*/}
{/*                <input*/}
{/*                    id={column}*/}
{/*                    name={column}*/}
{/*                    className={classNames("cell-input", {*/}
{/*                        "cell-input_editing": isEditing*/}
{/*                    })}*/}
{/*                    disabled={!isEditing}*/}
{/*                    defaultValue={column}*/}
{/*                />*/}
{/*            }*/}
{/*        </StyledTableCell>*/}
{/*    )*/}
{/*})}*/}