import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {
    Column,
    selectChosenBoardId,
    setTaskStatus,
} from '../../slices/kanbanBoardSlice'
import TaskComp, { TaskCompProps } from '../task/TaskComp'
import { useDrop } from 'react-dnd/dist/hooks'
import { useAppDispatch, useAppSelector } from '../../hooks'

const shapeStyles = {
    minWidth: '10px',
    minHeight: '10px',
    maxWidth: '14px',
    maxHeight: '14px',
    width: '1.5vw',
    height: '1.5vw',
    marginRight: '1vw',
}
const shapeCircleStyles = { borderRadius: '50%' }

const ColumnComp = (props: Column) => {
    const dispatch = useAppDispatch()
    const boardId = useAppSelector(selectChosenBoardId)

    const { name, id, tasks } = props

    useEffect(() => {
        // This code will run every time the `boardId` value changes
    }, [boardId, props])

    const [, drop] = useDrop(
        () => ({
            accept: 'task',
            drop: (item: TaskCompProps) => {
                dispatch(
                    setTaskStatus({
                        taskId: item.id,
                        columnId: item.columnId,
                        newColumnId: id,
                    })
                )
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [props]
    )

    return (
        <Box
            ref={drop}
            sx={{
                transform: 'rotateX(180deg)',
                paddingY: '2vh',
                paddingX: '1vw',
                background: '#21212D',
            }}
        >
            <Box
                component="span"
                sx={{
                    ...shapeStyles,
                    ...shapeCircleStyles,
                    display: 'inline-block',
                    bgcolor:
                        name === 'Doing'
                            ? '#8370EF'
                            : name === 'To Do'
                            ? '#90caf9'
                            : name === 'Done'
                            ? '#1de9b6'
                            : '#e91e63',
                }}
            ></Box>
            <Typography
                fontFamily="sans-serif"
                fontWeight={500}
                textTransform={'capitalize'}
                sx={{ color: '#858995' }}
                variant="body1"
                component="span"
            >
                {name.toLowerCase()}
            </Typography>

            {tasks.map((task) => {
                return (
                    <Grid item>
                        <TaskComp
                            {...task}
                            key={task.id}
                            columnName={name}
                            columnId={id}
                        />
                    </Grid>
                )
            })}
        </Box>
    )
}

export default ColumnComp
