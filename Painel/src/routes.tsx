import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import PaginaDeExemplo from './pages/PaginaDeExemplo'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Notificacao from './pages/Notificacao'


export const Rotas = () => {
    
    return(
        <BrowserRouter>
            <Routes>

                <Route 
                    path='/'
                    element={<Login />}
                />

                <Route 
                    path='/usuarios'
                    element={<Usuarios />}
                />
                <Route 
                    path='/usuarios/:id'
                    element={<GerenciarUsuarios />}
                />
                <Route
                    path='/notificacao'
                    element={<Notificacao/>}
                />
                

                <Route
                    path='/exemplo'
                    element={<PaginaDeExemplo />}
                />

            </Routes>
        </BrowserRouter>
    )
}