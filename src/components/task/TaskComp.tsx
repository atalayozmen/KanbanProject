import * as React from 'react'
import { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Column, Task, setTaskStatus } from '../../slices/kanbanBoardSlice'
import { useDrag } from 'react-dnd/dist/hooks'
import { CardActionArea } from '@material-ui/core'
import ModalComp, { ModalElement } from '../modal/ModalComp'
import SubTaskListSetDone from '../subtask/SubTaskListSetDone'
import { useAppDispatch } from '../../hooks'
import { useAppSelector } from '../../hooks'

export interface TaskCompProps extends Task {
    columnId: number
    columnName: string
}

interface SelectPropOption {
    value: number
    label: string
}

const TaskComp = (props: TaskCompProps) => {
    const { id, name, description, subtasks, columnId, columnName } = props
    const [, drag] = useDrag(
        () => ({
            type: 'task',
            item: props,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [subtasks]
    )
    const chosenBoard = useAppSelector((state) => state.kanbanBoard.chosenBoard)

    const columns = useAppSelector((state) => {
        if (chosenBoard != null)
            return state.kanbanBoard.kanbanBoards[chosenBoard].columns
        else return []
    })

    const [modalOpen, setModalOpen] = React.useState(false)

    const [selectPropOption, setSelectPropOption] =
        React.useState<SelectPropOption>({
            value: columnId,
            label: columnName,
        })

    useEffect(() => {}, [props])

    const dispatch = useAppDispatch()

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const taskClickHandler = () => {
        setModalOpen(true)
    }

    const handleSelectPropChange = (event: any) => {
        const value: number = parseInt(event.target.value)

        const column = columns.find((option) => option.id === value)

        if (column !== undefined) {
            setSelectPropOption({ value: column.id, label: column.name })
            dispatch(
                setTaskStatus({
                    columnId: columnId,
                    taskId: id,
                    newColumnId: value,
                })
            )
        }
    }

    const modalElements: ModalElement[] = [
        {
            type: 'typography',
            label: name,
            props: {
                fontWeight: 'bold',
                sx: { fontSize: 18, color: '#FFFFFF' },
                gutterBottom: true,
            },
        },
        {
            type: 'typography',
            label: description,
            props: {
                sx: { fontSize: 14, color: '#8C91A1', marginBottom: '4vh' },
            },
        },
        {
            type: 'typography',
            label: 'Subtasks',
            render: subtasks.length > 0,
            props: {
                sx: {
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '2vh',
                },
            },
        },
        {
            type: 'custom',
            label: 'Subtasks',
            props: {},
            customElement: (
                <SubTaskListSetDone
                    columnId={columnId}
                    taskId={id}
                    subTasks={subtasks}
                />
            ),
        },
        {
            type: 'select',
            label: 'Status',
            props: {
                InputLabelProps: {
                    style: {
                        color: 'white', // set the label font color here
                    },
                },
                sx: {
                    '& .MuiInputBase-input': {
                        color: 'white', // set the font color here
                    },
                    width: '100%',
                },
                label: 'Status',
                value: selectPropOption.value,
                onChange: handleSelectPropChange,
                SelectProps: {
                    native: true,
                },
            },
            selectPropsOptions: columns.map((column: Column) => {
                return { value: column.id.toString(), label: column.name }
            }),
        },
    ]

    return (
        <>
            <ModalComp
                modalOpen={modalOpen}
                onSubmit={() => {}}
                handleCloseModal={handleCloseModal}
                modalElements={modalElements}
            />

            <Card
                ref={drag}
                sx={{
                    width: '100%',
                    marginBottom: '2vh',
                    background: '#2C2C38',
                }}
            >
                <CardActionArea onClick={taskClickHandler}>
                    <CardContent>
                        <Typography
                            fontWeight="bold"
                            sx={{ fontSize: 18 }}
                            color="white"
                            gutterBottom
                        >
                            {name}
                        </Typography>
                        <Typography
                            sx={{ fontsize: 12 }}
                            color="#8C91A1"
                            component="div"
                        >
                            {subtasks.length > 0
                                ? subtasks.filter((s) => s.done).length +
                                  ' of ' +
                                  subtasks.length +
                                  ' Subtasks'
                                : ''}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default TaskComp
