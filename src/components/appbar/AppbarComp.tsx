import React, { useEffect } from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    Column,
    Subtask,
    addTask,
    chooseBoard,
    selectChosenBoardName,
    setModalOpenState,
} from '../../slices/kanbanBoardSlice'
import ModalComp, { ModalElement } from '../modal/ModalComp'
import { makeStyles } from '@material-ui/core'
import SubTaskListComp from '../subtask/SubTaskListComp'
import BoardMenu from '../board/BoardMenu'
import AddMenu from './AddMenu'
import { useMediaQuery } from '@mui/material'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { KanbanIcon } from './KanbanIcon'
import { useAuth0 } from '@auth0/auth0-react'
import apiClient from '../../api/apiClient'
import {
    getPublicRequest,
    getPrivateRequest,
} from '../../api/services/kanbanService'
import { addAccessTokenInterceptor } from '../../api/apiClient'

const useStyles = makeStyles({
    input: {
        color: 'white',
    },
})

interface SelectPropOption {
    value: number
    label: string
}

function AppbarComp() {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const chosenBoard = useAppSelector((state) => state.kanbanBoard.chosenBoard)
    const chosenBoardName = useAppSelector(selectChosenBoardName)
    const modalOpenState = useAppSelector(
        (state) => state.kanbanBoard.modalOpen
    )
    const columns = useAppSelector((state) => {
        if (chosenBoard != null)
            return state.kanbanBoard.kanbanBoards[chosenBoard].columns
        else return []
    })

    const [newTaskName, setNewTaskName] = React.useState<string>('')
    const [newTaskDescription, setNewTaskDescription] =
        React.useState<string>('')
    const [selectPropOption, setSelectPropOption] =
        React.useState<SelectPropOption>({ value: 0, label: 'To Do' })
    const [subtasks, setSubtasks] = React.useState<string[]>([])
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [errorModalOpen, setErrorModalOpen] = React.useState<boolean>(false)

    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        if (isAuthenticated) {
            addAccessTokenInterceptor(getAccessTokenSilently)
        }
    }, [getAccessTokenSilently, isAuthenticated])

    const matches = useMediaQuery('(min-width:600px)')

    const handleCloseModal = () => {
        setModalOpen(false)
        dispatch(setModalOpenState(false))
        resetState()
    }

    const resetState = () => {
        setNewTaskName('')
        setNewTaskDescription('')
        setSelectPropOption({ value: 0, label: 'To Do' })
        setSubtasks([])
    }

    const handleSelectPropChange = (event: any) => {
        const column = columns.find(
            (column) => column.id === parseInt(event.target.value)
        )
        if (column !== undefined) {
            setSelectPropOption({ value: column.id, label: column.name })
        }
    }

    const handleNewTaskNameInputChange = (event: any) => {
        setNewTaskName(event.target.value)
    }

    const handleNewTaskDescriptionInputChange = (event: any) => {
        setNewTaskDescription(event.target.value)
    }

    const onModalAddTaskButtonClick = (event: any) => {
        event.preventDefault()
        if (chosenBoard != null) {
            dispatch(chooseBoard(chosenBoard))

            const subtaskList: Subtask[] = subtasks.map((subtask, index) => {
                const newSubtask: Subtask = {
                    id: index,
                    name: subtask,
                    done: false,
                }
                return newSubtask
            })

            dispatch(
                addTask({
                    taskName: newTaskName,
                    taskDescription: newTaskDescription,
                    columnId: selectPropOption.value,
                    subtasks: subtaskList,
                })
            )
        }
        handleCloseModal()
    }

    const handleErrorModalClose = () => {
        setErrorModalOpen(false)
    }
    const onTaskButtonClick = () => {
        if (chosenBoard != null) {
            setModalOpen(true)
            dispatch(setModalOpenState('addTask'))
        } else {
            setErrorModalOpen(true)
        }
    }

    const onAddSubtaskButtonClick = () => {
        setSubtasks([...subtasks, ''])
    }

    const callApi = async () => {
        const response1 = await getPublicRequest()
        console.log(response1)
        const response2 = await getPrivateRequest()
        console.log(response2)
    }

    const onSubtaskTextFieldChange = (index: number, value: string) => {
        const newSubtasks = [...subtasks]
        newSubtasks[index] = value
        setSubtasks(newSubtasks)
    }

    const modalElements: ModalElement[] = [
        {
            type: 'textfield',
            label: 'Add New Task',
            props: {
                label: 'New Task Name',
                value: newTaskName,
                onChange: handleNewTaskNameInputChange,
                InputProps: { className: classes.input },
            },
        },
        {
            type: 'textfield',
            label: 'Add Task Description',
            props: {
                label: 'New Task Description',
                value: newTaskDescription,
                onChange: handleNewTaskDescriptionInputChange,
                InputProps: { className: classes.input },
                multiline: true,
                rows: 3,
            },
        },
        {
            type: 'select',
            label: 'Status',
            props: {
                label: 'Status',
                value: selectPropOption.value,
                onChange: handleSelectPropChange,
            },
            selectPropsOptions: columns.map((column: Column) => {
                return { value: column.id.toString(), label: column.name }
            }),
        },
        {
            type: 'custom',
            label: 'subtask',
            props: { value: subtasks },
            customElement: (
                <SubTaskListComp
                    key={'subtask'}
                    subTaskFields={subtasks}
                    addSubTask={onAddSubtaskButtonClick}
                    onSubtaskTextFieldChange={onSubtaskTextFieldChange}
                />
            ),
        },
        {
            type: 'button',
            label: 'Add Task',
            props: {
                sx: {
                    borderRadius: '40px',
                    width: '100%',
                    backgroundColor: '#655DC3',
                },
                variant: 'contained',
                onClick: onModalAddTaskButtonClick,
            },
        },
    ]

    const errorModalElements: ModalElement[] = [
        {
            type: 'typography',
            label: 'Please create a board first',
            props: {
                sx: {
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    color: '#FFFFFF',
                },
            },
        },
        {
            type: 'button',
            label: 'OK',
            props: {
                sx: {
                    borderRadius: '40px',
                    width: '10%',
                    backgroundColor: '#655DC3',
                },
                variant: 'contained',
                onClick: handleErrorModalClose,
            },
        },
    ]

    return (
        <React.Fragment>
            <ModalComp
                modalOpen={modalOpen || modalOpenState === 'addTask'}
                handleCloseModal={handleCloseModal}
                onSubmit={onModalAddTaskButtonClick}
                modalElements={modalElements}
            />
            <ModalComp
                modalOpen={errorModalOpen}
                handleCloseModal={handleErrorModalClose}
                onSubmit={() => {}}
                modalElements={errorModalElements}
            />

            <AppBar
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
                position="sticky"
            >
                {!matches ? (
                    <KanbanIcon />
                ) : (
                    <Box width={matches ? 'max(20%, 220px)' : '0'} />
                )}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        maxWidth: matches ? '100%' : '200px',
                    }}
                >
                    {!matches ? <BoardMenu /> : <></>}
                    <Typography
                        fontWeight="600"
                        fontFamily="sans-serif"
                        variant="h5"
                        component="div"
                        noWrap
                    >
                        {chosenBoardName}
                    </Typography>
                </Box>

                <Toolbar sx={{ flexGrow: 1 }}>
                    <Typography> Welcome {user?.given_name}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={callApi}></Button>
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    {matches ? (
                        <Button onClick={onTaskButtonClick} variant="contained">
                            + Add New Task
                        </Button>
                    ) : (
                        <AddMenu />
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default AppbarComp
