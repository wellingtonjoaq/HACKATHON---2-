import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IToken } from "../../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { Loading } from "../../../components/Loading";
import { LayoutDashboard } from "../../../components/AdminDashboard";

// Definindo a interface para os dados do espaço
interface IEspacos {
    id?: number;  // O campo `id` pode ser opcional ao adicionar um novo espaço
    nome: string;
    capacidade: string;
    localizado: string;
}

export default function AdicionarEspaco() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState<string>("");
    const [capacidade, setCapacidade] = useState<string>("");
    const [localizado, setLocalizado] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !capacidade || !localizado) {
            setError("Todos os campos são obrigatórios!");
            return;
        }

        // Criando o objeto de dados do espaço com base na interface IEspacos
        const espacoData: IEspacos = {
            nome,
            capacidade,
            localizado,
        };

        setLoading(true);
        axios
            .post("http://localhost:3001/espaco", espacoData)
            .then(() => {
                setLoading(false);
                navigate("/painelespaco");
            })
            .catch((err) => {
                setLoading(false);
                console.error("Erro ao adicionar espaço", err);
                setError("Ocorreu um erro ao adicionar o espaço.");
            });
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

        if (!validaPermissao(["admin", "professor"], token?.user.permissoes)) {
            navigate("/espacos");
        }
    }, [navigate]);

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                        <h1 className="h2 mt-2">Adicionar Espaço</h1>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center ms-auto">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/painelespaco")}
                            style={{
                                padding: "10px 20px",
                                fontSize: "17px",
                                borderRadius: "5px",
                            }}
                        >
                            Voltar
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
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        className="form-control"
                                        placeholder="Nome do espaço"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="capacidade">Capacidade</label>
                                    <input
                                        type="text"
                                        id="capacidade"
                                        className="form-control"
                                        placeholder="Capacidade de pessoas"
                                        value={capacidade}
                                        onChange={(e) => setCapacidade(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="localizado">Localização</label>
                                    <select
                                        id="localizado"
                                        className="form-control"
                                        value={localizado}
                                        onChange={(e) => setLocalizado(e.target.value)}
                                    >
                                        <option value="">Selecione a localização</option>
                                        <option value="Térreo">Térreo</option>
                                        <option value="2ª Andar">2ª Andar</option>
                                        <option value="3ª Andar">3ª Andar</option>
                                    </select>
                                </div>
                            </div>

                            {error && (
                                <div className="col-12">
                                    <div className="alert alert-danger">{error}</div>
                                </div>
                            )}

                            <div className="col-12 mb-4">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "17px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Adicionar Espaço
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutDashboard>
        </>
    );
}
