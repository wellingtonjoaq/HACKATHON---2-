import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/AdminDashboard";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 

interface IReserva {
    id: number;
    espaco_id: number;
    usuario_id: number;
    nome: string;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    status: string;
}

interface IEspacos {
    id: number;
    nome: string;
    capacidade: string;
    localidade: string;
}

interface IUsuarios {
    id: number;
    name: string;
    email: string;
    papel: string;
}

export default function Reservas() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dadosEspacos, setDadosEspacos] = useState<Array<IEspacos>>([]);
    const [dadosReservas, setDadosReservas] = useState<Array<IReserva>>([]);
    const [dadosUsuarios, setDadosUsuarios] = useState<Array<IUsuarios>>([]);

    const [filtro, setFiltro] = useState<string>("");

    useEffect(() => {
        let lsStorage = localStorage.getItem("painel.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        if (!validaPermissao(["admin", "professor"], token?.user.papel)) {
            navigate("/reserva");
        }

        setLoading(true);

        axios.get("http://localhost:3001/reservas/")
            .then((response) => {
                console.log(response.data)
                setDadosReservas(response.data);
            })
            .catch((err) => console.error("Erro ao buscar reserva", err));

        axios.get("http://localhost:3001/espacos/")
            .then((response) => {
                console.log(response.data)
                setDadosEspacos(response.data);
            })
            .catch((err) => console.error("Erro ao buscar espaços", err));

        axios.get("http://localhost:3001/user/")
            .then((response) => {
                console.log(response.data)
                setDadosUsuarios(response.data);
            })
            .catch((err) => console.error("Erro ao buscar usuario", err))
            .finally(() => setLoading(false));
    }, [navigate]);

    const getEspacoNome = (espaco_id: number) => {
        const espaco = dadosEspacos.find((e) => e.id === espaco_id);
        return espaco ? espaco.nome : "Espaço não encontrado";
    };

    const getUsuarioEmail = (usuario_id: number) => {
        const usuario = dadosUsuarios.find((u) => u.id === usuario_id);
        return usuario ? usuario.email : "Usuário não encontrado";
    };

    const reservasFiltradas = filtro
        ? dadosReservas.filter((reserva) => {
              const espaco = dadosEspacos.find((e) => e.id === reserva.espaco_id);
              return espaco && espaco.localidade === filtro;
          })
        : dadosReservas;

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                        <h1 className="h2 mt-2">Gerenciar Reservas</h1>
                    </div>

                    <div className="d-flex flex-column flex-md-row align-items-center ms-auto">
                        <div className="dropdown me-3">
                            <button
                                type="button"
                                className="btn btn-dark btn-lg dropdown-toggle"
                                id="dropdownFiltro"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ 
                                    width: "200px",
                                    textAlign: "center" 
                                }}
                            >
                                Filtrar
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down ms-2" viewBox="0 0 16 16" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownFiltro" style={{ textAlign: "center", width: "200px" }}>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("Térreo")}>Térreo</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("2ª Andar")}>2ª Andar</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("3ª Andar")}>3ª Andar</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("")}>Todos</button>
                                </li>
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate("/reserva/criar")}
                            style={{
                                padding: "10px 20px",
                                fontSize: "17px",
                                borderRadius: "5px",
                            }}
                        >
                            Reservar
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        padding: "30px",
                        backgroundColor: "#f8f9fa",
                        marginRight: "10px",
                        marginTop: "30px",
                        height: "auto",
                    }}
                >
                    <div className="row">
                        {reservasFiltradas.map((reserva) => (
                            <div className="col-12 col-sm-6 col-md-4 mb-4" key={reserva.id}>
                                <div
                                    className="mb-3 p-3 border rounded"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        backgroundColor: "white",
                                        height: "100%", 
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            border: "1px solid black",
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginTop: "10px",
                                            }}
                                        >
                                            <h5>{getUsuarioEmail(reserva.usuario_id)} #{reserva.id}</h5>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id={`dropdown-${reserva.id}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{
                                                    backgroundColor: "white",
                                                    border: "solid white",
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-pencil-fill"
                                                    viewBox="0 0 16 16"
                                                    style={{ color: "black" }}
                                                >
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                </svg>
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby={`dropdown-${reserva.id}`}>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => navigate(`/reserva/${reserva.id}`)}
                                                    >
                                                        Editar
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        onClick={() => console.log(`Cancelar reserva ${reserva.id}`)}
                                                    >
                                                        Cancelar Reserva
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div style={{ padding: "10px", flexGrow: 1 }}>
                                        <p className="card-text">
                                            <strong>
                                                As {reserva.horario_inicio}h Até {reserva.horario_fim}h - {getEspacoNome(reserva.espaco_id)}
                                            </strong>
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "10px",
                                            borderTop: "1px solid #ddd",
                                        }}
                                    >
                                        <p className="card-text" style={{ margin: 0 }}>
                                            <strong>Data:</strong> {reserva.data}
                                        </p>
                                        <p className="card-text">
                                            <strong>Status: </strong>
                                            <strong 
                                                style={{
                                                    margin: 0,textAlign: "right",
                                                    color: "green", 
                                                    }}
                                                >
                                                {reserva.status}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </LayoutDashboard>
        </>
    );
}
