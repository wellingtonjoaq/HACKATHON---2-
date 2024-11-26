import { useEffect, useState } from "react";
import axios from "axios";
import { IToken } from "../../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { useNavigate } from "react-router-dom";

interface INotificacao {
    id: number;
    mensagem: string;
    lida: boolean;
    usuario_id: number;
}

export default function Notificacoes() {
    const navigate = useNavigate();


    const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);

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

        axios
            .get("http://localhost:3001/notificacoes")
            .then((response) => setNotificacoes(response.data))
            .catch((err) => console.error("Erro ao buscar notificações", err));
    }, []);

    return (
        <div className="container mt-4">
            <h1>Notificações</h1>
            {notificacoes.length > 0 ? (
                notificacoes.map((notificacao) => (
                    <div key={notificacao.id} className="alert alert-info">
                        {notificacao.mensagem}
                    </div>
                ))
            ) : (
                <p className="text-muted">Nenhuma notificação disponível.</p>
            )}
        </div>
    );
}
