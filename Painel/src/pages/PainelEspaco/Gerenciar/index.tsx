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
    localizado: string;
    disponibilidadeInicio: string;
    disponibilidadeFim: string;
    recursosInstalados: string[];
}

export default function AdicionarEspaco() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState<string>("");
    const [capacidade, setCapacidade] = useState<string>("");
    const [localizado, setLocalizado] = useState<string>("");
    const [disponibilidadeInicio, setDisponibilidadeInicio] = useState<string>("");
    const [disponibilidadeFim, setDisponibilidadeFim] = useState<string>("");
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

        if (!nome || !capacidade || !localizado || !disponibilidadeInicio || !disponibilidadeFim || recursosInstalados.length === 0) {
            setError("Todos os campos são obrigatórios!");
            return;
        }

        const espacoData: IEspacos = {
            nome,
            capacidade,
            localizado,
            disponibilidadeInicio,
            disponibilidadeFim,
            recursosInstalados,
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

        if (!validaPermissao(["admin", "professor"], token?.user.papel)) {
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

                      <div className="col-12 col-md-6 mb-4">
                          <div className="form-group">
                              <label htmlFor="disponibilidadeInicio">Disponibilidade Início</label>
                              <select
                                  id="disponibilidadeInicio"
                                  className="form-control"
                                  value={disponibilidadeInicio}
                                  onChange={(e) => setDisponibilidadeInicio(e.target.value)}
                              >
                                  <option value="">Selecione o horário de início</option>
                                  <option value="19:00 PM">19:00 PM</option>
                                  <option value="19:45 PM">19:45 PM</option>
                                  <option value="20:55 PM">20:55 PM</option>
                                  <option value="21:40 PM">21:40 PM</option>
                              </select>
                          </div>
                      </div>

                      <div className="col-12 col-md-6 mb-4">
                          <div className="form-group">
                              <label htmlFor="disponibilidadeFim">Disponibilidade Fim</label>
                              <select
                                  id="disponibilidadeFim"
                                  className="form-control"
                                  value={disponibilidadeFim}
                                  onChange={(e) => setDisponibilidadeFim(e.target.value)}
                              >
                                  <option value="">Selecione o horário de fim</option>
                                  <option value="19:45 PM">19:45 PM</option>
                                  <option value="20:40 PM">20:40 PM</option>
                                  <option value="21:40 PM">21:40 PM</option>
                                  <option value="22:25 PM">22:25 PM</option>
                              </select>
                          </div>
                      </div>

                      {error && <div className="alert alert-danger">{error}</div>}

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
  