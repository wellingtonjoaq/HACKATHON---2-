import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/AdminDashboard";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Certifique-se de importar o CSS do Bootstrap

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

        // Fetch data for reservas, espacos, and usuarios
        axios.get("http://localhost:8000/api/reservas/")
            .then((response) => {
                console.log(response.data)
                setDadosReservas(response.data);
            })
            .catch((err) => console.error("Erro ao buscar reserva", err));

        axios.get("http://localhost:8000/api/espacos/")
            .then((response) => {
                console.log(response.data)
                setDadosEspacos(response.data);
            })
            .catch((err) => console.error("Erro ao buscar espaços", err));

        axios.get("http://localhost:8000/api/user/")
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

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="container">
                    <div className="row align-items-center mb-4">
                        <div className="col-md-6">
                            <h1>Gerenciar Reservas</h1>
                        </div>
                        <div className="col-md-6 text-end">
                            <button 
                                className="btn btn-primary" 
                                onClick={() => navigate("/reserva/criar")}
                            >
                                Adicionar Reserva
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {dadosReservas.map((reserva) => (
                            <div key={reserva.id} className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{reserva.nome}</h5>
                                        <p className="card-text">
                                            <strong>Espaço:</strong> {getEspacoNome(reserva.espaco_id)}
                                        </p>
                                        <p className="card-text">
                                            <strong>Usuário:</strong> {getUsuarioEmail(reserva.usuario_id)}
                                        </p>
                                        <p className="card-text">
                                            <strong>Data:</strong> {reserva.data}
                                        </p>
                                        <p className="card-text">
                                            <strong>Horário:</strong> {reserva.horario_inicio} - {reserva.horario_fim}
                                        </p>
                                        <p className="card-text">
                                            <strong>Status:</strong> {reserva.status}
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
