import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IToken } from '../../interfaces/token';

interface IProps {
    children: ReactNode;
}

export const ProfessorDashboard = (props: IProps) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('painel.token');
        navigate('/');
    };

    const [token, setToken] = useState<IToken>();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const lsToken = localStorage.getItem('painel.token');
        if (typeof lsToken === 'string') {
            const token = JSON.parse(lsToken);
            setToken(token);
        }
    }, []);

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
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074-.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92-.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                    <span className="fw-bold fs-5 text-center">PORTAL DO PROFESSOR</span>
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
                        style={{ height: '700px' }}
                    >
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column text-dark">
                                <li className="nav-item py-2">
                                    <Link className="nav-link d-flex align-items-center text-dark" to="/notificacao">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-house-door me-2" viewBox="0 0 16 16">
                                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item py-2">
                                    <Link className="nav-link d-flex align-items-center text-dark" to="/quadrodereserva">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-border-all me-2" viewBox="0 0 16 16">
                                            <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
                                        </svg>
                                        Quadro de Reserva
                                    </Link>
                                </li>
                                <li className="nav-item py-2">
                                    <Link
                                        className="nav-link d-flex align-items-center text-dark"
                                        to={'/dashboard'}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar2-date me-2" viewBox="0 0 16 16">
                                            <path d="M6.445 12.688V7.354h-.633A13 13 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                        Minhas Reservas
                                    </Link>
                                </li>
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
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4">{props.children}</main>
                </div>
            </div>
        </>
    );
};
