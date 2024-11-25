import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/AdminDashboard";
import { useEffect, useState } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";

interface IUsuarios {
    id: number;
    name: string;
    email: string;
    papel: string;
}

export default function Usuarios() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dadosUsuarios, setDadosUsuarios] = useState<Array<IUsuarios>>([]);
    const [filtro, setFiltro] = useState<string>("");

    const usuariosFiltrados = dadosUsuarios.filter((usuario) => {
        if (!filtro) return true;
        return usuario.papel === filtro;
    });

    const excluirUsuario = (id: number) => {
        if (window.confirm("Você tem certeza que deseja excluir este usuário?")) {
            axios
                .delete(`http://localhost:8000/api/user/${id}`)
                .then(() => {
                    setDadosUsuarios(dadosUsuarios.filter((usuario) => usuario.id !== id));
                })
                .catch((err) => {
                    console.error("Erro ao excluir usuário", err);
                });
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

        if (!validaPermissao(["admin"], token?.user.papel)) {
            navigate("/");
        }

        console.log("Pode desfrutar do sistema :D");

        setLoading(true);
        axios
            .get("http://localhost:8000/api/user/")
            .then((response) => {
                setDadosUsuarios(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <h1 className="h2 mt-2">Usuários</h1>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down ms-2" viewBox="0 0 16 16" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownFiltro" style={{ textAlign: "center", width: "200px" }}>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("admin")}>Admin</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("professor")}>Professor</button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setFiltro("")}>Todos</button>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            className="btn btn-success btn-lg mt-3 mt-md-0"
                            style={{ width: "180px", marginRight: "10px" }}
                            onClick={() => {
                                navigate("/usuarios/criar");
                            }}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Papel</th>
                                <th scope="col" className="text-end">Ações</th>
                            </tr>
                        </thead>
                         <tbody>
                            {usuariosFiltrados.map((usuario, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{usuario.id}</th>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.papel}</td>
                                        <td
                                            className="text-end"
                                            style={{ paddingRight: "20px" }}
                                        >
                                            <button
                                                className="btn btn-warning"
                                                type="button"
                                                style={{ marginRight: "10px" }}
                                                onClick={() => {
                                                    navigate(`/usuarios/${usuario.id}`);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => excluirUsuario(usuario.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </LayoutDashboard>
        </>
    );
}
