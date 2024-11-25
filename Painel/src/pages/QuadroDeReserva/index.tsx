import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { ProfessorDashboard } from "../../components/ProfessorDashboard";

interface IReserva {
    id: number;
    espaco_id: number;
    usuario_id: number;
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

export default function QuandoDeReserva() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dadosEspacos, setDadosEspacos] = useState<Array<IEspacos>>([]);
    const [dadosReservas, setDadosReservas] = useState<Array<IReserva>>([]);

    const [filtro, setFiltro] = useState<string>("");
    const token = JSON.parse(localStorage.getItem("painel.token") || "{}") as IToken;

    useEffect(() => {
        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        if (!validaPermissao(["admin", "professor"], token?.user.papel)) {
            navigate("/reserva");
        }

        setLoading(true);

        axios.get("http://localhost:3001/reservas/")
            .then((response) => {
                setDadosReservas(response.data);
            })
            .catch((err) => console.error("Erro ao buscar reserva", err));

        axios.get("http://localhost:3001/espacos/")
            .then((response) => {
                setDadosEspacos(response.data);
            })
            .catch((err) => console.error("Erro ao buscar espaços", err))
            .finally(() => setLoading(false));
    }, [navigate]);

    const reservasFiltradas = dadosReservas.filter(
        (reserva) => reserva.usuario_id === token?.user.id
    );

    const getEspacoNome = (espaco_id: number) => {
        const espaco = dadosEspacos.find((e) => e.id === espaco_id);
        return espaco ? espaco.nome : "Espaço não encontrado";
    };

    const cancelarReserva = (id: number) => {
        const confirmCancel = window.confirm("Tem certeza que deseja cancelar a reserva?");
        if (confirmCancel) {
            axios.delete(`http://localhost:3001/reservas/${id}`)
                .then(() => {
                    setDadosReservas((prevState) =>
                        prevState.filter((r) => r.id !== id)
                    );
                })
                .catch((err) => {
                    console.error("Erro ao cancelar reserva", err);
                    alert("Erro ao cancelar a reserva.");
                });
        }
    };


    return (
        <>
            <Loading visible={loading} />
            <ProfessorDashboard>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                        <h1 className="h2 mt-2">Quadro De Reserva</h1>
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
                            onClick={() => navigate("/quadrodereserva/criar")}
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
                                <div className="mb-3 p-3 border rounded">
                                    <h5>{getEspacoNome(reserva.espaco_id)}</h5>
                                    <p>
                                        <strong>Data:</strong> {reserva.data}
                                    </p>
                                    <p>
                                        <strong>Horário:</strong> {reserva.horario_inicio} - {reserva.horario_fim}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {reserva.status}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => navigate(`/quadrodereserva/${reserva.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => cancelarReserva(reserva.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfessorDashboard>
        </>
    );
}
