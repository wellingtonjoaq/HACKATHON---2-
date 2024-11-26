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

export default function Historico() {
    const navigate = useNavigate();

    const [loadingReservas, setLoadingReservas] = useState(true);
    const [loadingEspacos, setLoadingEspacos] = useState(true);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);

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

        if (!validaPermissao(["admin"], token?.user.papel)) {
            navigate("/");
        }
        
        axios.get("http://localhost:3001/reservas/")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const reservasCanceladas = response.data.filter((reserva) => reserva.status === "Cancelada");
                    setDadosReservas(reservasCanceladas);
                } else {
                    console.warn("Resposta inesperada ao buscar reservas:", response.data);
                }
            })
            .catch((err) => console.error("Erro ao buscar reservas:", err))
            .finally(() => setLoadingReservas(false));

        // Buscar espaços
        axios.get("http://localhost:3001/espaco/")
            .then((response) => {
                setDadosEspacos(response.data);
            })
            .catch((err) => console.error("Erro ao buscar espaços:", err))
            .finally(() => setLoadingEspacos(false));

        // Buscar usuários
        axios.get("http://localhost:3001/users/")
            .then((response) => {
                setDadosUsuarios(response.data);
            })
            .catch((err) => console.error("Erro ao buscar usuários:", err))
            .finally(() => setLoadingUsuarios(false));
    }, [navigate]);

    const getEspacoNome = (espaco_id: number) => {
        const espaco = dadosEspacos.find((e) => e.id === espaco_id);
        return espaco ? espaco.nome : "Espaço não encontrado";
    };

    const getUsuarioEmail = (usuario_id: number) => {
        const usuario = dadosUsuarios.find((u) => u.id === usuario_id);
        return usuario ? usuario.email : "Usuário não encontrado";
    };

    const localidades = Array.from(new Set(dadosEspacos.map((e) => e.localidade)));

    return (
        <>
            <Loading visible={loadingReservas || loadingEspacos || loadingUsuarios} />
            <LayoutDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <h1 className="h2 mt-2">Histórico de Reservas Canceladas</h1>
                    <div className="dropdown me-3">
                        <button
                            type="button"
                            className="btn btn-dark btn-lg dropdown-toggle"
                            id="dropdownFiltro"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                                width: "200px",
                                textAlign: "center",
                            }}
                        >
                            Filtrar
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownFiltro" style={{ textAlign: "center", width: "200px" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => setFiltro("")}>
                                    Todos
                                </button>
                            </li>
                            {localidades.map((local) => (
                                <li key={local}>
                                    <button className="dropdown-item" onClick={() => setFiltro(local)}>
                                        {local}
                                    </button>
                                </li>
                            ))}
                        </ul>
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
                        {dadosReservas.length === 0 ? (
                            <p className="text-center mt-4">Nenhuma reserva cancelada encontrada.</p>
                        ) : (
                            dadosReservas
                                .filter((reserva) => {
                                    return filtro ? dadosEspacos.find((e) => e.id === reserva.espaco_id)?.localidade === filtro : true;
                                })
                                .map((reserva) => (
                                    <div className="col-12 col-sm-6 col-md-4 mb-4" key={reserva.id}>
                                        <div className="mb-3 p-3 border rounded bg-white h-100 d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-center border p-2">
                                                <h5>{getUsuarioEmail(reserva.usuario_id)} #{reserva.id}</h5>
                                            </div>
                                            <div className="p-2 flex-grow-1">
                                                <p>
                                                    <strong>
                                                        Das {reserva.horario_inicio}h às {reserva.horario_fim}h - {getEspacoNome(reserva.espaco_id)}
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center border-top p-2">
                                                <p><strong>Data:</strong> {reserva.data}</p>
                                                <p><strong>Status:</strong> <span style={{ color: "red" }}>{reserva.status}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </LayoutDashboard>
        </>
    );
}
