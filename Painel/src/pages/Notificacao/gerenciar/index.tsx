import { useEffect, useState } from "react";
import axios from "axios";

interface INotificacao {
    id: number;
    mensagem: string;
    lida: boolean;
    usuario_id: number;
}

export default function Notificacoes() {
    const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);

    useEffect(() => {
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
