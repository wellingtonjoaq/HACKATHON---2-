import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import PainelEspaco from './pages/PainelEspaco'
import AdicionarEspaco from './pages/PainelEspaco/Gerenciar'

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
                    path='/painelespaco'
                    element={<PainelEspaco />}
                />
                <Route
                    path='/espacos/adicionar'
                    element={<AdicionarEspaco/>}
                />
            </Routes>
        </BrowserRouter>
    )
}