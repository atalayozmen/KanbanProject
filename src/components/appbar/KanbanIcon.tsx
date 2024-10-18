import { Box } from '@mui/material'

export const KanbanIcon = () => {
    return (
        <Box
            key={'menu'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingLeft={'8%'}
            maxWidth={'5%'}
        >
            <img
                style={{ maxWidth: '100%', minWidth: '40px', height: 'auto' }}
                src={require('../../icons/icons8-kanban-96.png')}
                alt="knban"
            ></img>
        </Box>
    )
}
