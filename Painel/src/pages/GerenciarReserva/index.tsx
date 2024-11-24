import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/AdminDashboard";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";

interface IEspacos {
    id: number;
    nome: string;
    capacidade: string;
    localizado: string;
}

interface IReserva {
    id: number;
    espacoId: number;
    usuarioId: number;
    nome: string;
    dataReserva: string;
    horarioInicio: string;
}

export default function Reservas() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dadosEspacos, setDadosEspacos] = useState<Array<IEspacos>>([]);
    const [dadosReservas, setDadosReservas] = useState<Array<IReserva>>([]);
    const [filtro, setFiltro] = useState<string>("");

    const espacosFiltrados = dadosEspacos.filter((espaco) => {
        if (!filtro) return true;
        return espaco.localizado.toLowerCase().includes(filtro.toLowerCase());
    });

    const excluirReserva = (id: number) => {
        if (window.confirm("Você tem certeza que deseja cancelar esta reserva?")) {
            axios
                .delete(`http://localhost:3001/reserva/${id}`)
                .then(() => {
                    setDadosReservas(dadosReservas.filter((reserva) => reserva.id !== id));
                })
                .catch((err) => {
                    console.error("Erro ao cancelar reserva", err);
                    alert("Erro ao cancelar reserva. Tente novamente.");
                });
        }
    };

    const criarReserva = (espacoId: number) => {
        const usuarioId = 1; // ID do usuário autenticado (ajuste conforme necessário)
        const nome = prompt("Informe seu nome:");
        const dataReserva = prompt("Informe a data da reserva (ex: 2024-12-01):");
        const horarioInicio = prompt("Informe o horário de início (ex: 14:00):");

        if (nome && dataReserva && horarioInicio) {
            setLoading(true);
            axios
                .post("http://localhost:3001/reserva", {
                    espacoId,
                    usuarioId,
                    nome,
                    dataReserva,
                    horarioInicio,
                })
                .then((res) => {
                    setDadosReservas([...dadosReservas, res.data]);
                    alert("Reserva criada com sucesso!");
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Erro ao criar reserva", err);
                    alert("Erro ao criar reserva. Tente novamente.");
                    setLoading(false);
                });
        } else {
            alert("Todos os campos são obrigatórios!");
        }
    };

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
            navigate("/gerenciareserva");
        }

        setLoading(true);
        axios
            .get("http://localhost:3001/espaco")
            .then((res) => {
                setDadosEspacos(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Erro ao buscar espaços", err);
            });

        axios
            .get("http://localhost:3001/reserva")
            .then((res) => {
                setDadosReservas(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar reservas", err);
            });
    }, [navigate]);

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
                                style={{ width: "200px", textAlign: "center" }}
                            >
                                Filtrar
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-caret-down ms-2"
                                    viewBox="0 0 16 16"
                                />
                            </button>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownFiltro"
                                style={{ textAlign: "center", width: "200px" }}
                            >
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("Térreo")}>
                                        Térreo
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("2ª Andar")}>
                                        2ª Andar
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("3ª Andar")}>
                                        3ª Andar
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("")}>
                                        Todos
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Atualizando o botão de Reservar para navegar para a página de criação */}
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate("/reserva/criar")}
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
                        {espacosFiltrados.map((espaco) => {
                            // Find reservation for each space
                            const reserva = dadosReservas.find(
                                (reserva) => reserva.espacoId === espaco.id
                            );
                            return (
                                <div className="col-12 col-sm-6 col-md-4 mb-4" key={espaco.id}>
                                    <div
                                        className="mb-3 p-3 border rounded"
                                        style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}
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
                                            <h5>{espaco.nome}</h5>
                                        </div>

                                        <div style={{ padding: "10px" }}>
                                            {reserva ? (
                                                <>
                                                    <p><strong>Reservado por:</strong> {reserva.nome}</p>
                                                    <p><strong>Data:</strong> {reserva.dataReserva}</p>
                                                    <p><strong>Horário:</strong> {reserva.horarioInicio}</p>
                                                </>
                                            ) : (
                                                <p><strong>Espaço disponível!</strong></p>
                                            )}
                                            <p><strong>Capacidade:</strong> {espaco.capacidade} Pessoas</p>
                                            <p><strong>Localização:</strong> {espaco.localizado}</p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-danger" onClick={() => excluirReserva(reserva?.id || 0)}>
                                                Cancelar
                                            </button>
                                            {!reserva && (
                                                <button className="btn btn-success" onClick={() => criarReserva(espaco.id)}>
                                                    Reservar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </LayoutDashboard>
        </>
    );
}
