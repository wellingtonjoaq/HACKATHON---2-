import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { LayoutDashboard } from "../../../components/AdminDashboard";

interface IForm {
    nome: string;
    email: string;
    password?: string;
    permissoes: string;
}

export default function GerenciarUsuarios() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<IForm>();

    const refForm = useRef<any>();

    const navigate = useNavigate();

    const { id } = useParams();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        let lsStorage = localStorage.getItem('painel.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        const idUser = Number(id);

        if (!isNaN(idUser)) {
            axios.get(import.meta.env.VITE_URL + '/users?id=' + idUser)
                .then((res) => {
                    setIsEdit(true);
                    setValue("nome", res.data[0].nome);
                    setValue("email", res.data[0].email);
                    setValue("permissoes", res.data[0].permissoes);
                });
        }

    }, []);

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {
            if (isEdit) {
                if (data.password?.trim() === '') {
                    delete data.password;
                }

                axios.put(import.meta.env.VITE_URL + '/users/' + id, data)
                    .then(() => {
                        navigate('/usuarios');
                    })
                    .catch((err) => {
                        // handle error
                    });
            } else {
                axios.post('http://localhost:3001/users', data)
                    .then(() => {
                        navigate('/usuarios');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }, [isEdit]);

    return (
        <>
            <LayoutDashboard>
                <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: "-100px" }}>
                    <div className="p-4 rounded border border-dark" style={{ backgroundColor: "#f0f0f0", width: "100%", maxWidth: "800px", border: "2px solid black" }}>
                        <h1 className="mb-4 text-center">{isEdit ? "Editar Usuário" : "Adicionar Usuário"}</h1>
                        <form
                            className="needs-validation mb-3"
                            noValidate
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                refForm.current.classList.add('was-validated');
                                handleSubmit(submitForm)(event);
                            }}
                            ref={refForm}
                        >
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        placeholder="Yuri"
                                        required
                                        {...register('nome', { required: 'Nome é obrigatório!' })}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.nome && errors.nome.message}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Yuri"
                                        required
                                        {...register('email', { required: 'Email é obrigatório!' })}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email && errors.email.message}
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="permissoes" className="form-label">Perfil</label>
                                    <select
                                        className="form-select"
                                        id="permissoes"
                                        required
                                        defaultValue=""
                                        {...register("permissoes", { required: 'Selecione' })}
                                    >
                                        <option value="">Selecione o tipo</option>
                                        <option value="admin">Admin</option>
                                        <option value="colaborador">Colaborador</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.permissoes && errors.permissoes.message}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Senha"
                                        required
                                        {...register('password', { required: 'Senha é obrigatória!' })}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password && errors.password.message}
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-success w-100">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutDashboard>
        </>
    );
}
