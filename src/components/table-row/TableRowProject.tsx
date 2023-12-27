import * as React from "react";
import {FC, useState} from "react";
import "./TableRowProject.style.scss"
import classNames from "classnames";
import {createRow} from "../../services/createRow";
import {deleteRow} from "../../services/deleteRow";
import {updateRow} from "../../services/updateRow";
import {EnumUpdateRowMode, ITableRow, TypeAxiosResponse} from "./TableRowProject.types";
import StyledTableRow from "../ui/StyledTableRow";
import StyledTableCell from "../ui/StyledTableCell";
import {TypeRowResponse} from "../table-project/index";
import {AxiosResponse} from "axios";
import {NEW_ROW} from "../../data";
import {useCreateRowMutation} from "../../services/api";


export const TableRowProject: FC<ITableRow> = (
    {
        addNewRow = () => {},
        row,
        level = 0,
        isNewRow= false,
        isOnLevelHover,
        setIsOnLevelHover,
        indexInChildArray,
        isLastInLevel,
        childCount,
        updateRows = () => {}
    }
) => {
    const [isEditing, setIsEditing] = useState(isNewRow)
    const [rowName, setRowName] = useState<string>(row.rowName)
    const [salary, setSalary] = useState<string | number>(row.salary)
    const [equipmentCosts, setEquipmentCosts] = useState<string | number>(row.equipmentCosts)
    const [mainCosts, setMainCosts] = useState<string |number>(row.mainCosts)
    const [estimatedProfit, setEstimatedProfit] = useState<string | number>(row.estimatedProfit)

    const [createRowMutation,{data: mutationData}] = useCreateRowMutation()
    // console.log("Mutation Data",mutationData)

    const onTrashClickHandler = async () => {
        //@ts-ignore
        const response: AxiosResponse<TypeAxiosResponse> = await deleteRow(row.id)
        updateRows({id: row.id, rowValues: [response.data.current, ...response.data.changed], mode: EnumUpdateRowMode.DELETE})
    }

    const onKeyPressHandler = async (e: React.KeyboardEvent) => {
        if (e.charCode !== 13 || e.key !== 'Enter') return
        setIsEditing(false)
        if (isNewRow) {
            console.log("ROW ID FOR ", row.parentId)
            //@ts-ignore
            const response: AxiosResponse<TypeAxiosResponse> = await createRow({
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
                parentId: row.parentId,
            })
            console.log("CREATE_ROW_DATA", response)

            // const rs = await createRowMutation({
            //     rowName,
            //     salary,
            //     equipmentCosts,
            //     mainCosts,
            //     estimatedProfit,
            //     parentId: row.parentId,
            // })
            // console.log("FROM MUTAT", rs)
            updateRows({id: row.id, rowValues: [response.data.current, ...response.data.changed], mode: EnumUpdateRowMode.CREATE})
        }
        else {
            console.log(rowName, salary, equipmentCosts, mainCosts, estimatedProfit, row.id)
            //@ts-ignore
            const response: AxiosResponse<TypeAxiosResponse> = await updateRow(row.id,{
                // ...NEW_ROW,
                "machineOperatorSalary": 0,
                "materials": 0,
                "mimExploitation": 0,
                "overheads": 0,
                "supportCosts": 0,
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
                // child: row.child,
                // id: row.id,
                parentId: row.parentId
            })
            console.log("RESPONSE UPDATE", response)
            updateRows({id: row.id, rowValues: [response.data.current, ...response.data.changed]})
        }
    }

    return (
        <>
            <StyledTableRow
                onDoubleClick={() => setIsEditing(true)}
                sx={{'& > td': {height: "60px",}}}
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
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setSalary(target.value)
                        }}
                        name={row.salary}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        value={salary}
                        disabled={!isEditing}
                        // defaultValue={row.salary}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setEquipmentCosts(target.value)
                        }}
                        name={row.equipmentCosts}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        value={equipmentCosts}
                        disabled={!isEditing}
                        // defaultValue={row.equipmentCosts}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setMainCosts(target.value)
                        }}
                        name={row.mainCosts}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        value={mainCosts}
                        disabled={!isEditing}
                        // defaultValue={row.mainCosts}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setEstimatedProfit(target.value)
                        }}
                        name={row.estimatedProfit}
                        className={classNames("cell-input", {
                            "cell-input_editing": isEditing
                        })}
                        value={estimatedProfit}
                        disabled={!isEditing}
                        // defaultValue={row.estimatedProfit}
                    />
                </StyledTableCell>

            </StyledTableRow>
        </>
    )
}