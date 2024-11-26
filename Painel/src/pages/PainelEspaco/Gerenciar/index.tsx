import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IToken } from "../../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { Loading } from "../../../components/Loading";
import { LayoutDashboard } from "../../../components/AdminDashboard";

interface IEspacos {
    nome: string;
    capacidade: string;
    localidade: string;
    recursosInstalados: string[];
}

export default function AdicionarEspaco() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState<string>("");
    const [capacidade, setCapacidade] = useState<string>("");
    const [localidade, setLocalidade] = useState<string>("");
    const [recursosInstalados, setRecursosInstalados] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const recursos = ["Microfone", "Lousa", "Computador", "Projetor"];

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleRecursoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setRecursosInstalados((prevRecursos) => {
            if (checked) {
                return [...prevRecursos, value];
            } else {
                return prevRecursos.filter((recurso) => recurso !== value);
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !capacidade || !localidade || recursosInstalados.length === 0) {
            setError("Todos os campos são obrigatórios!");
            return;
        }

        const espacoData: IEspacos = {
            nome,
            capacidade,
            localidade,
            recursosInstalados,
        };

        setLoading(true);
        axios
            .post('http://localhost:8000/api/espacos', espacoData)
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

        if (!validaPermissao(["admin"], token?.user.papel)) {
            navigate("/painelespaco/criar");
        }
    }, [navigate]);

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>

            <div className="p-4 rounded border border-dark"
              style={{
                  backgroundColor: "#f8f9fa",
                  margin: "30px auto",
                  maxWidth: "90%",
              }}
            >
              <h1 className="mb-4 text-center">{isEdit ? "Editar Espaço" : "Adicionar Espaço"}</h1>
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
                                  type="number"
                                  id="capacidade"
                                  className="form-control"
                                  placeholder="Capacidade de pessoas"
                                  value={capacidade}
                                  onChange={(e) => {
                                      const valor = e.target.value;
                                      if (!isNaN(Number(valor)) && Number(valor) >= 0) {
                                          setCapacidade(valor);
                                      }
                                  }}
                                  min="0"
                              />
                          </div>
                      </div>

                      <div className="col-12 col-md-6 mb-4">
                          <div className="form-group">
                              <label htmlFor="localidade">Localização</label>
                              <select
                                  id="localidade"
                                  className="form-control"
                                  value={localidade}
                                  onChange={(e) => setLocalidade(e.target.value)}
                              >
                                  <option value="">Selecione a localização</option>
                                  <option value="Térreo">Térreo</option>
                                  <option value="2ª Andar">2ª Andar</option>
                                  <option value="3ª Andar">3ª Andar</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-12 col-md-6 mb-4">
                          <div className="form-group">
                              <label htmlFor="recursosInstalados">Recursos Instalados</label>
                              <div>
                                  {recursos.map((recurso) => (
                                      <div key={recurso} className="form-check">
                                          <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id={recurso}
                                              value={recurso}
                                              onChange={handleRecursoChange}
                                              checked={recursosInstalados.includes(recurso)}
                                          />
                                          <label className="form-check-label" htmlFor={recurso}>
                                              {recurso}
                                          </label>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>

                      <div className="col-12 text-center">
                          <button type="submit" className="btn btn-success w-100">Adicionar</button>
                      </div>
                  </div>
              </form>
          </div>

            </LayoutDashboard>
        </>
    );
}
  