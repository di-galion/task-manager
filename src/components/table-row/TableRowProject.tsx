import "./TableRowProject.style.scss"
import {FC, useState, KeyboardEvent} from "react";
import classNames from "classnames";
import {StyledTableRow, StyledTableCell} from "../ui"
import {createRow, deleteRow, updateRow} from "../../services";
import {EnumUpdateRowMode, ITableRow} from "./TableRowProject.types";

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

    const onTrashClickHandler = async () => {
        const rowsArray = await deleteRow(row.id)
        updateRows({id: row.id, rowValues: rowsArray, mode: EnumUpdateRowMode.DELETE})
    }

    const onKeyPressHandler = async (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return
        setIsEditing(false)
        if (isNewRow) {

            const rowArray = await createRow({
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
                parentId: row.parentId,
            })
            console.log("CREATE", rowArray)
            updateRows({id: row.id, rowValues: rowArray, mode: EnumUpdateRowMode.CREATE})
        }
        else {
            console.log(rowName, salary, equipmentCosts, mainCosts, estimatedProfit, row.id)

            const rowsArray = await updateRow(row.id,{
                'machineOperatorSalary': 0,
                'materials': 0,
                'mimExploitation': 0,
                'overheads': 0,
                'supportCosts': 0,
                rowName,
                salary,
                equipmentCosts,
                mainCosts,
                estimatedProfit,
                parentId: row.parentId
            })
            updateRows({id: row.id, rowValues: rowsArray})
        }
    }

    return (
        <>
            <StyledTableRow
                onDoubleClick={() => setIsEditing(true)}
                sx={{'& > td': {height: '60px',}}}
            >
                <StyledTableCell align='left'>
                    <div
                        className={'level-block'}
                        style={{marginLeft: `${level * 20}px`, width: `${20 + 3 * level}px`}}
                        onMouseOver={() => setIsOnLevelHover(true)}
                        onMouseLeave={() => setIsOnLevelHover(false)}
                    >
                        { level !== 0 && level &&
                            <div className={classNames('line-with-prev', {'line-with-prev_long': indexInChildArray !== 0})} ></div>
                        }
                        <div className='icon-block'>
                            <img
                                onClick={() => {if (!isNewRow) addNewRow(row.id)}}
                                className={'level-icon'} src='/tableLevelIcon.svg' alt='level'
                            />
                            {isOnLevelHover && !isEditing &&
                                <img onClick={onTrashClickHandler} className={'level-trash'} src='/trashFillIcon.svg' alt='trash'/>
                            }
                        </div>
                        {level !== 0 && !!childCount  && !isLastInLevel &&
                            <div className={'line-with-next'} style={{height: `${40 + 60 * childCount}px`}}></div>
                        }
                    </div>
                </StyledTableCell>

                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => setRowName(target.value)}
                        name={row.rowName}
                        className={classNames('cell-input', {
                            'cell-input_editing': isEditing
                        })}
                        disabled={!isEditing}
                        defaultValue={row.rowName}
                    />
                </StyledTableCell>
                <StyledTableCell align='left'>
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setSalary(target.value)
                        }}
                        name={row.salary}
                        className={classNames('cell-input', {
                            'cell-input_editing': isEditing
                        })}
                        value={salary}
                        disabled={!isEditing}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setEquipmentCosts(target.value)
                        }}
                        name={row.equipmentCosts}
                        className={classNames('cell-input', {
                            'cell-input_editing': isEditing
                        })}
                        value={equipmentCosts}
                        disabled={!isEditing}
                    />
                </StyledTableCell>
                <StyledTableCell align='left'>
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setMainCosts(target.value)
                        }}
                        name={row.mainCosts}
                        className={classNames('cell-input', {
                            'cell-input_editing': isEditing
                        })}
                        value={mainCosts}
                        disabled={!isEditing}
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <input
                        onKeyPress={onKeyPressHandler}
                        onChange={({target}) => {
                            if (!/\D/g.test(target.value)) setEstimatedProfit(target.value)
                        }}
                        name={row.estimatedProfit}
                        className={classNames('cell-input', {
                            'cell-input_editing': isEditing
                        })}
                        value={estimatedProfit}
                        disabled={!isEditing}
                    />
                </StyledTableCell>

            </StyledTableRow>
        </>
    )
}