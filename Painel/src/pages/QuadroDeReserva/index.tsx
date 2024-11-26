import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfessorDashboard } from "../../components/ProfessorDashboard";

interface IEspacos {
    id: number;
    nome: string;
    capacidade: string;
    localidade: string;
    recursosInstalados: string[];
}

export default function QuadroDeReserva() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dadosEspacos, setDadosEspacos] = useState<Array<IEspacos>>([]);
    const [filtro, setFiltro] = useState<string>("");

    const token = JSON.parse(localStorage.getItem("painel.token") || "{}") as IToken;

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

        axios
            .get("http://localhost:8000/api/espacos/")
            .then((response) => {
                setDadosEspacos(response.data);
            })
            .catch((err) => console.error("Erro ao buscar espaços", err))
            .finally(() => setLoading(false));
    }, [navigate]);

    const espacosFiltrados = filtro
        ? dadosEspacos.filter((espaco) => espaco.localidade.includes(filtro))
        : dadosEspacos;

    return (
        <>
            <Loading visible={loading} />
            <ProfessorDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                        <h1 className="h2 mt-2">Espaços Disponíveis</h1>
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
                                    textAlign: "center",
                                }}
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
                        {espacosFiltrados.map((espaco) => (
                            <div className="col-12 col-sm-6 col-md-4 mb-4" key={espaco.id}>
                                <div className="mb-3 p-3 border rounded">
                                    <h5>{espaco.nome}</h5>
                                    <p>
                                        <strong>Capacidade:</strong> {espaco.capacidade}
                                    </p>
                                    <p>
                                        <strong>Localidade:</strong> {espaco.localidade}
                                    </p>
                                    <p>
                                        <strong>Recursos Instalados:</strong>
                                        <p>{espaco.recursosInstalados || "Não informado"}</p>
                                    </p>
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() =>
                                            navigate(`/quadrodereserva/criar?espacoId=${espaco.id}`)
                                        }
                                    >
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfessorDashboard>
        </>
    );
}
