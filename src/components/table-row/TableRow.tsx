import * as React from "react";
import {FC, useState} from "react";
import {StyledTableCell, StyledTableRow} from "../table/Table.tsx";
import "./styles.scss"
import * as classNames from "classnames";
import {createRow} from "../../services/createRow.ts";
import {deleteRow} from "../../services/deleteRow.ts";
import {updateRow} from "../../services/updateRow.ts";

export interface ITableRow {
    row: any,
    level?: number,
    dataDeleteRow?: (v: number) => void,
    isNewRow?: boolean,
    addNewRow: (id: number) => void,
    isOnLevelHover: boolean,
    setIsOnLevelHover: (v: boolean) => void,
    indexInChildArray?: number
    isLastInLevel?: boolean,
    childCount?: number,
    updateRows?: (id: number, rowValue: any, mode?: string) => void
}
const TableRowComponent: FC<ITableRow> = (
    {
        dataDeleteRow = () => {},
        addNewRow = () => {},
        row,
        level,
        isNewRow= false,
        isOnLevelHover,
        setIsOnLevelHover,
        indexInChildArray,
        isLastInLevel,
        childCount,
        updateRows
    }
) => {
    const [isEditing, setIsEditing] = useState(isNewRow)
    const [rowName, setRowName] = useState<string>(row.rowName)
    const [salary, setSalary] = useState<string | number>(row.salary)
    const [equipmentCosts, setEquipmentCosts] = useState<string | number>(row.equipmentCosts)
    const [mainCosts, setMainCosts] = useState<string |number>(row.mainCosts)
    const [estimatedProfit, setEstimatedProfit] = useState<string | number>(row.estimatedProfit)

    const onTrashClickHandler = async () => {
        const response = await deleteRow(row.id)
        updateRows(row.id, [response.data.current, ...response.data.changed], 'delete')
    }

    const onKeyPressHandler = async (e) => {
        if (e.charCode !== 13 || e.key !== 'Enter') return
        setIsEditing(false)
        if (isNewRow) {
            const response = await createRow({
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
                parentId: row.parentId,
            })
            updateRows(row.id, [response.data.current, ...response.data.changed], 'create')
        }
        else {
            const response = await updateRow(row.id,{
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
            })
            updateRows(row.id, [response.data.current, ...response.data.changed])
        }
    }

    return (
        <>
            <StyledTableRow
                onDoubleClick={() => setIsEditing(true)}
                // sx={{
                //     '& > td, & > th': {
                //         height: "60px",
                //         color: "#FFFFFF",
                //         // fontFamily: Roboto,
                //         fontSize: "14px",
                //         fontWeight: 400,
                //         lineHeight: "18px",
                //         letterSpacing: "0.10000000149011612px",
                //         textAlign: "left",
                //     }
                // }}
            >
                <StyledTableCell align="left">
                    <div
                        className={"level-block"}
                        style={{marginLeft: `${level * 20}px`, width: `${20 + 3 * level}px`}}
                        onMouseOver={() => setIsOnLevelHover(true)}
                        onMouseLeave={() => setIsOnLevelHover(false)}
                    >
                        { level !== 0 && level &&
                            <div className={classNames("line-first", {"line-first_long": indexInChildArray !== 0})} ></div>
                        }
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
                        {level !== 0 && !!childCount  && !isLastInLevel &&
                            <div className={"line-third"} style={{height: `${40 + 60 * childCount}px`}}></div>
                        }
                    </div>
                </StyledTableCell>

                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
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
                        onKeyPress={onKeyPressHandler}
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
                        onKeyPress={onKeyPressHandler}
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
                        onKeyPress={onKeyPressHandler}
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
                        onKeyPress={onKeyPressHandler}
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