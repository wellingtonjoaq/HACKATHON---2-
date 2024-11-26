import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfessorDashboard } from "../../components/ProfessorDashboard";
import axios from "axios";
import { IToken } from "../../interfaces/token";
import { Loading } from "../../components/Loading";
import { verificaTokenExpirado, validaPermissao } from "../../services/token";

interface IReserva {
    id: number;
    espaco_id: number;
    usuario_id: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    status: string;
}

interface IEspaco {
    id: number;
    nome: string;
    capacidade: string;
    localidade: string;
    disponibilidadeInicio: string;
    disponibilidadeFim: string;
    recursosInstalados: string[];
}

export default function MeuCronograma() {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState<IReserva[]>([]);
    const [espacos, setEspacos] = useState<IEspaco[]>([]);
    const [loading, setLoading] = useState(false);
    const [loggedUser, setLoggedUser] = useState<IToken["user"] | null>(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("painel.token") || "{}") as IToken;

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
            return;
        }

        if (!validaPermissao(["professor"], token.user.papel)) {
            navigate("/");
            return;
        }

        setLoggedUser(token.user);
        setLoading(true);

        Promise.all([
            axios.get('http://localhost:8000/api/reservas/'),
            axios.get('http://localhost:8000/api/espacos/')
        ])
            .then(([reservasResponse, espacosResponse]) => {
                setReservas(reservasResponse.data);
                setEspacos(espacosResponse.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar dados", err);
                alert("Erro ao carregar dados. Tente novamente mais tarde.");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const reservasUsuario = reservas.filter((reserva) => reserva.usuario_id === loggedUser?.id);

    return (
        <>
            <Loading visible={loading} />
            <ProfessorDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap"
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "110px",
                            backgroundColor: "#f8f9fa",
                            padding: "20px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="m11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>

                        <div
                            className="ms-3 d-flex flex-column align-items-start"
                            style={{
                                maxWidth: "calc(100% - 80px)",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                flex: 1,
                            }}
                        >
                            <h5 className="mb-0" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                {loggedUser?.name}
                            </h5>
                            <p className="mb-0" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                {loggedUser?.papel}
                            </p>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-bell"
                            viewBox="0 0 16 16"
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "10px",
                            }}
                        >
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <div
                        className="d-flex flex-column justify-content-between"
                        style={{
                            border: "1px solid #ccc",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            padding: "20px",
                            width: "100%",
                            maxWidth: "100%",
                        }}
                    >
                        <h2 className="text-center mb-3">Meu cronograma</h2>

                        <div className="d-flex justify-content-between align-items-center py-2 border-bottom" style={{ fontWeight: "bold" }}>
                            <div className="text-center" style={{ flex: 1 }}>Espaço</div>
                            <div className="text-center" style={{ flex: 1 }}>Data</div>
                            <div className="text-center" style={{ flex: 1 }}>Horário</div>
                            <div className="text-center" style={{ flex: 1 }}>Status</div>
                        </div>

                        {reservasUsuario.length > 0 ? (
                            reservasUsuario.map((reserva) => {
                                const espaco = espacos.find((e) => e.id === reserva.espaco_id);
                                return (
                                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom" key={reserva.id}>
                                        <div className="text-center" style={{ flex: 1 }}>{espaco?.nome || "Espaço não encontrado"}</div>
                                        <div className="text-center" style={{ flex: 1 }}>{reserva.data}</div>
                                        <div className="text-center" style={{ flex: 1 }}>
                                            {reserva.horario_inicio} - {reserva.horario_fim}
                                        </div>
                                        <div className="text-center" style={{ flex: 1 }}>{reserva.status}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center mt-3">Nenhuma reserva encontrada.</p>
                        )}
                    </div>
                </div>
            </ProfessorDashboard>
        </>
    );
}
