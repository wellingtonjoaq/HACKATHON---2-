import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../../components/Loading";
import { LayoutDashboard } from "../../../components/AdminDashboard";


interface IEspacos {
    id: number;
    nome: string;
    capacidade: string;
    localizado: string;
}

export default function AdicionarReserva() {
    const navigate = useNavigate();
    const { espacoId } = useParams<{ espacoId: string }>();

    const [loading, setLoading] = useState(false);
    const [espaco, setEspaco] = useState<IEspacos | null>(null);
    const [dataReserva, setDataReserva] = useState<string>("");
    const [horarioInicio, setHorarioInicio] = useState<string>("");
    const [horarioFim, setHorarioFim] = useState<string>("");

    useEffect(() => {
        setLoading(true);

        axios
            .get(`http://localhost:3001/espaco/${espacoId}`)
            .then((res) => {
                setEspaco(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar espaço", err);
                setLoading(false);
            });
    }, [espacoId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!dataReserva || !horarioInicio || !horarioFim) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (horarioInicio >= horarioFim) {
            alert("O horário de início deve ser anterior ao horário de fim.");
            return;
        }

        const usuarioId = 1; // Ajuste conforme o ID do usuário logado.

        setLoading(true);

        axios
            .post("http://localhost:3001/reserva", {
                espacoId: Number(espacoId),
                usuarioId,
                dataReserva,
                horarioInicio,
                horarioFim,
            })
            .then(() => {
                alert("Reserva criada com sucesso!");
                navigate("/reservas");
            })
            .catch((err) => {
                if (err.response?.status === 400) {
                    alert(err.response.data.message);
                } else {
                    console.error("Erro ao criar reserva", err);
                    alert("Erro ao criar reserva.");
                }
                setLoading(false);
            });
    };

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="container mt-5">
                    <h1>Adicionar Reserva</h1>
                    {espaco && (
                        <div className="mb-4">
                            <h3>Espaço: {espaco.nome}</h3>
                            <p>Capacidade: {espaco.capacidade}</p>
                            <p>Localização: {espaco.localizado}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="dataReserva" className="form-label">
                                Data da Reserva
                            </label>
                            <input
                                type="date"
                                id="dataReserva"
                                className="form-control"
                                value={dataReserva}
                                onChange={(e) => setDataReserva(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="horarioInicio" className="form-label">
                                Horário de Início
                            </label>
                            <input
                                type="time"
                                id="horarioInicio"
                                className="form-control"
                                value={horarioInicio}
                                onChange={(e) => setHorarioInicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="horarioFim" className="form-label">
                                Horário de Fim
                            </label>
                            <input
                                type="time"
                                id="horarioFim"
                                className="form-control"
                                value={horarioFim}
                                onChange={(e) => setHorarioFim(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Confirmar Reserva
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate("/reservas")}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            </LayoutDashboard>
        </>
    );
}
