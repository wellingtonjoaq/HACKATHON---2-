import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LayoutDashboard } from "../../../components/AdminDashboard";
import { Loading } from "../../../components/Loading";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { IToken } from "../../../interfaces/token";

export default function AdicionarEspaco() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("Térreo");
  const [capacidade, setCapacidade] = useState(0);
  const [recursos, setRecursos] = useState<string[]>([]);
  const [horarioInicio, setHorarioInicio] = useState("19:00 PM");
  const [horarioFim, setHorarioFim] = useState("19:45 PM");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let lsStorage = localStorage.getItem("painel.token");
    let token: IToken | null = null;

    if (typeof lsStorage === "string") {
      token = JSON.parse(lsStorage);
    }

    if (!token || verificaTokenExpirado(token.accessToken)) {
      navigate("/");
    }

    if (!validaPermissao(["admin"], token?.user.permissoes)) {
      navigate("/espacos");
    }
  }, []);

  const handleSave = () => {
    if (!nome.trim()) {
      alert("O nome do espaço é obrigatório!");
      return;
    }

    if (capacidade <= 0) {
      alert("A capacidade deve ser maior que 0!");
      return;
    }

    if (horarioInicio >= horarioFim) {
      alert("O horário de início deve ser anterior ao horário de fim!");
      return;
    }

    const novoEspaco = {
      nome,
      localizacao,
      capacidade,
      recursos,
      disponibilidade: { horarioInicio, horarioFim },
    };

    setLoading(true);
    axios
      .post("http://localhost:3001/espacos", novoEspaco)
      .then(() => {
        setLoading(false);
        navigate("/espacos");
      })
      .catch((err) => {
        setLoading(false);
        console.error("Erro ao adicionar espaço", err);
      });
  };

  return (
    <>
      <Loading visible={loading} />
      <LayoutDashboard>
        <div
          className="container d-flex justify-content-center align-items-center min-vh-100"
          style={{ marginTop: "-100px" }}
        >
          <div
            className="p-4 rounded border border-dark"
            style={{ backgroundColor: "#f0f0f0", width: "100%", maxWidth: "800px" }}
          >
            <h1 className="mb-4 text-center">Adicionar Espaço</h1>
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do Espaço"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="localizacao" className="form-label">
                    Localização
                  </label>
                  <select
                    id="localizacao"
                    className="form-select"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                  >
                    <option value="Térreo">Térreo</option>
                    <option value="2ª Andar">2ª Andar</option>
                    <option value="3ª Andar">3ª Andar</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="capacidade" className="form-label">
                    Capacidade
                  </label>
                  <div className="input-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setCapacidade((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      value={capacidade}
                      onChange={(e) =>
                        setCapacidade(
                          /^\d+$/.test(e.target.value) ? parseInt(e.target.value, 10) : 0
                        )
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setCapacidade((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="recursos" className="form-label">
                    Recursos Instalados
                  </label>
                  <div className="d-flex flex-column">
                    {["Microfone", "Projetor", "Lousa", "Computador"].map((recurso) => (
                      <div key={recurso} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={recurso}
                          checked={recursos.includes(recurso)}
                          onChange={() =>
                            setRecursos((prev) =>
                              prev.includes(recurso)
                                ? prev.filter((item) => item !== recurso)
                                : [...prev, recurso]
                            )
                          }
                        />
                        <label className="form-check-label" htmlFor={recurso}>
                          {recurso}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="horarioInicio" className="form-label">
                    Disponibilidade (Início)
                  </label>
                  <select
                    id="horarioInicio"
                    className="form-select"
                    value={horarioInicio}
                    onChange={(e) => setHorarioInicio(e.target.value)}
                  >
                    <option value="19:00 PM">19:00 PM</option>
                    <option value="19:45 PM">19:45 PM</option>
                    <option value="20:50 PM">20:50 PM</option>
                    <option value="21:35 PM">21:35 PM</option>
                  </select>
                  <span className="align-self-center mx-2">até</span>
                  <select
                    id="horarioFim"
                    className="form-select"
                    value={horarioFim}
                    onChange={(e) => setHorarioFim(e.target.value)}
                  >
                    <option value="19:45 PM">19:45 PM</option>
                    <option value="20:50 PM">20:50 PM</option>
                    <option value="21:35 PM">21:35 PM</option>
                    <option value="22:25 PM">22:25 PM</option>
                  </select>
                </div>

                <div className="col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}
