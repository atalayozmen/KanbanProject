import { Box, CssBaseline } from '@mui/material'
import './App.css'
import SidebarComp from './components/sidebar/SidebarComp'
import AppbarComp from './components/appbar/AppbarComp'
import KanbanBoardComp from './components/board/KanbanBoardComp'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Auth0Provider } from '@auth0/auth0-react'

const theme = createTheme({
    palette: {
        background: {
            default: '#2C2C38', // Dark Grey
            paper: '#2C2C38', // Light Grey
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#655DC3',
                    borderRadius: '40px',
                    '&:hover': {
                        backgroundColor: '#655DC3',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#2C2C38',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    background: '#2C2C38',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: 'white',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& > fieldset': {
                        borderColor: '#404258',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#bdbdbd',
                },
            },
        },
    },
})



function App() {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE

    if (!(domain && clientId && redirectUri)) {
        return null
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri,
            }}
        >
            <Box style={{}}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppbarComp />
                    <SidebarComp />
                    <KanbanBoardComp />
                </ThemeProvider>
            </Box>
        </Auth0Provider>
    )
}

export default App
