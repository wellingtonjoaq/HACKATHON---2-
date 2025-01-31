import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../../components/Loading";
import { IToken } from "../../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { ProfessorDashboard } from "../../../components/ProfessorDashboard";

interface IReserva {
    espaco_id: number;
    usuario_id: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    status: string;
}

export default function ReservaEspaco() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [nomeEspaco, setNomeEspaco] = useState<string>("");
    const [formData, setFormData] = useState<IReserva>({
        espaco_id: 0,
        usuario_id: 0,
        data: "",
        horario_inicio: "",
        horario_fim: "",
        status: "ativa",
    });
    const [nomeUsuarioLogado, setNomeUsuarioLogado] = useState<string>("");

    useEffect(() => {
        let lsStorage = localStorage.getItem("painel.token");

        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        if (!validaPermissao(["professor"], token?.user.papel)) {
            navigate("/");
        }

        setLoading(true);

        // Define o ID e o nome do usuário logado no estado
        if (token) {
            setFormData((prev) => ({
                ...prev,
                usuario_id: token.user.id,
            }));
            setNomeUsuarioLogado(token.user.name);
        }

        // Obtém o ID do espaço da URL e busca o nome do espaço
        const params = new URLSearchParams(location.search);
        const espacoId = Number(params.get("espacoId"));

        if (espacoId) {
            axios
                .get(`http://localhost:8000/api/espacos/${espacoId}`)
                .then((response) => {
                    setNomeEspaco(response.data.nome);
                    setFormData((prev) => ({
                        ...prev,
                        espaco_id: espacoId,
                    }));
                })
                .catch((err) => console.error("Erro ao buscar espaço", err))
                .finally(() => setLoading(false));
        } else {
            navigate("/quadrodereserva"); // Redireciona se nenhum espaço for selecionado
        }
    }, [navigate, location]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        axios
            .post("http://localhost:8000/api/reservas", formData)
            .then(() => {
                alert("Reserva adicionada com sucesso!");
                navigate("/quadrodereserva");
            })
            .catch((err) => {
                console.error("Erro ao adicionar reserva", err);
                alert("Erro ao adicionar reserva!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Loading visible={loading} />
            <ProfessorDashboard>
                <div
                    className="p-4 rounded border border-dark"
                    style={{
                        backgroundColor: "#f8f9fa",
                        margin: "30px auto",
                        maxWidth: "90%",
                    }}
                >
                    <h1 className="mb-4 text-center">Adicionar Reserva</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="form-group">
                                    <label>Usuário</label>
                                    <p className="form-control" style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}>
                                        {nomeUsuarioLogado}
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 mb-4">
                                <div className="form-group">
                                    <label>Espaço</label>
                                    <p className="form-control" style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}>
                                        {nomeEspaco || "Carregando..."}
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 mb-4">
                                <div className="form-group">
                                    <label htmlFor="data">Data</label>
                                    <input
                                        type="date"
                                        id="data"
                                        name="data"
                                        className="form-control"
                                        value={formData.data}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="horario_inicio">Horário de Início</label>
                                    <select
                                        id="horario_inicio"
                                        name="horario_inicio"
                                        className="form-select"
                                        value={formData.horario_inicio}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione um horário de início</option>
                                        <option value="19:00">19:00</option>
                                        <option value="21:00">21:00</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="horario_fim">Horário de Fim</label>
                                    <select
                                        id="horario_fim"
                                        name="horario_fim"
                                        className="form-select"
                                        value={formData.horario_fim}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione um horário de fim</option>
                                        <option value="20:40">20:40</option>
                                        <option value="22:00">22:00</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
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
                    </form>
                </div>
            </ProfessorDashboard>
        </>
    );
}
