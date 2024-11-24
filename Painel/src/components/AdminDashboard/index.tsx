import { ReactNode, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IToken } from '../../interfaces/token'

interface IProps {
    children: ReactNode
}

export const LayoutDashboard = (props: IProps) => {
    const [token, setToken] = useState<IToken>()
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        let lsToken = localStorage.getItem('painel.token')

        if (!lsToken) {
            navigate('/')
        } else {
            setToken(JSON.parse(lsToken))
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('painel.token');
        navigate('/');
    };
    
        return (
            <>
                <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                    <div className="d-flex align-items-center">
                        <img
                            src="public/img/AlfaUNI.png"
                            alt="Logo"
                            className="logo"
                            style={{ width: '140px', height: '48px' }}
                        />
                    </div>
    
                    <div className="d-flex align-items-center text-danger ms-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="currentColor"
                            className="bi bi-person-gear me-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074-.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92-.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                        <span className="fw-bold fs-5 text-center">PORTAL DO ADMINISTRADOR</span>
                    </div>
                </header>
    
                <style>
                    {`
                    .nav-link:hover {
                        color: red !important;
                        transition: color 0.3s ease; 
                    }
                        
    
                    @media (max-width: 768px) {
                        #sidebarMenu {
                            position: absolute;
                            z-index: 1000;
                            top: 0;
                            left: -250px;
                            transition: all 0.3s;
                        }
    
                        #sidebarMenu.show {
                            left: 0;
                        }
    
                        .btn-menu-toggle {
                            display: block;
                        }
    
                        .btn-logout {
                            position: absolute;
                            bottom: 10px; 
                            left: 0;
                            width: calc(100% - 20px);
                            margin-left: 10px; 
                        }

                         .btn-menu-toggle {
                            background-color: lightgray;
                            color: darkgray;
                            border: 1px solid black;
                            position: absolute;
                            top: 60px; 
                            left: 10px;
                            z-index: 1050;
                            padding: 10px;
                            border-radius: 4px;
                            font-size: 20px;
                        }

                        .btn-menu-toggle:hover {
                            background-color: red !important; 
                            color: white !important;
                            transition: background-color 0.3s ease, color 1.0s ease; 
                        }
                            
                    `}
                </style>
    
                <div className="container-fluid">
                    <div className="row">
                        <button
                            className="btn btn-primary d-md-none btn-menu-toggle"
                            onClick={toggleMenu}
                            style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1050 }}
                        >
                            ☰
                        </button>

                        <nav
                            id="sidebarMenu"
                            className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-end border-dark ${menuVisible ? 'show' : ''}`}
                            style={{
                                height: "700px"
                            }}
                        >
                            <div className="position-sticky pt-3">
                                <ul className="nav flex-column text-dark">
                                    <li className="nav-item py-2">
                                        <Link
                                            className="nav-link d-flex align-items-center text-dark"
                                            to={'/usuarios'}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-people-fill me-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                            </svg>
                                            Usuários
                                        </Link>
                                    </li>
                                    <li className="nav-item py-2">
                                        <Link
                                            className="nav-link d-flex align-items-center text-dark"
                                            to={'/painelespaco'}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-border-all me-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
                                            </svg>
                                            Painel Espaço
                                        </Link>
                                    </li>
                                    <li className="nav-item py-2">
                                        <Link
                                            className="nav-link d-flex align-items-center text-dark"
                                            to={'/reserva'}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-pencil-square me-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 12h11a1.5 1.5 0 0 0 1.5 1.5v2a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-2z"
                                                />
                                            </svg>
                                            Gerenciar Reserva
                                        </Link>
                                    </li>
                                    <li className="nav-item py-2">
                                        <Link
                                            className="nav-link d-flex align-items-center text-dark"
                                            to={'/dashboard'}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-arrow-clockwise me-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                                                />
                                                <path
                                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
                                                />
                                            </svg>
                                            Histórico
                                        </Link>
                                    </li>
                                    <li className="nav-item py-2">
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-danger py-2 mb-0"
                                            style={{ 
                                                width: '100%',
                                                border: "solid black",
                                                position: "relative",
                                                top: "380px"
                                            }}  
                                        >
                                            Sair
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
    
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {props.children}
                        </main>
                    </div>
                </div>
            </>
        );
    }
