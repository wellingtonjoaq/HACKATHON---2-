import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/AdminDashboard";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

interface IEspaco {
  id: number;
  nome: string;
  localizacao: string;
  capacidade: number;
  recursos: string[];
  disponibilidade: { horarioInicio: string; horarioFim: string };
}

export default function PainelEspaco() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dadosEspacos, setDadosEspacos] = useState<Array<IEspaco>>([]);
  const [filtro, setFiltro] = useState<string>("");

  // Função para carregar espaços do Local Storage
  const carregarEspacos = () => {
    const espacosSalvos = localStorage.getItem("espacos");
    if (espacosSalvos) {
      setDadosEspacos(JSON.parse(espacosSalvos));
    }
  };

  // Função para salvar espaços no Local Storage
  const salvarEspacos = (espacos: IEspaco[]) => {
    localStorage.setItem("espacos", JSON.stringify(espacos));
    setDadosEspacos(espacos);
  };

  useEffect(() => {
    setLoading(true);
    carregarEspacos();
    setLoading(false);
  }, []);

  const espacosFiltrados = dadosEspacos.filter((espaco) => {
    if (!filtro) return true;
    return espaco.localizacao === filtro;
  });

  return (
    <>
      <Loading visible={loading} />
      <LayoutDashboard>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
          <h1 className="h2">Painel Espaço</h1>
          <button
            type="button"
            className="btn btn-success btn-lg mt-3 mt-md-0"
            style={{ width: "180px", marginRight: "10px" }}
            onClick={() => navigate("/espacos/adicionar")}
          >
            Adicionar Espaço
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Localização</th>
                <th scope="col">Capacidade</th>
                <th scope="col">Recursos</th>
                <th scope="col">Disponibilidade</th>
              </tr>
            </thead>
            <tbody>
              {espacosFiltrados.map((espaco) => (
                <tr key={espaco.id}>
                  <th scope="row">{espaco.id}</th>
                  <td>{espaco.nome}</td>
                  <td>{espaco.localizacao}</td>
                  <td>{espaco.capacidade}</td>
                  <td>{espaco.recursos.join(", ")}</td>
                  <td>
                    {espaco.disponibilidade.horarioInicio} até{" "}
                    {espaco.disponibilidade.horarioFim}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate(`/espacos/editar/${espaco.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja excluir este espaço?")) {
                          const espacosAtualizados = dadosEspacos.filter(
                            (item) => item.id !== espaco.id
                          );
                          salvarEspacos(espacosAtualizados);
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LayoutDashboard>
    </>
  );
}
