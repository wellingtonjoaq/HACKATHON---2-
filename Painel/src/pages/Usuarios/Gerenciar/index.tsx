import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { LayoutDashboard } from "../../../components/AdminDashboard";

interface IForm {
    name: string;
    email: string;
    password?: string;
    papel: string;
}

export default function GerenciarUsuarios() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<IForm>();

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
            axios.get(`http://localhost:8000/api/user/${idUser}`)
                .then((response) => {
                    setIsEdit(true);
                    setValue("name", response.data.name);
                    setValue("email", response.data.email);
                    setValue("papel", response.data.papel);
                });
        }
    }, [id, navigate, setValue]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {
            if (isEdit) {
                if (!data.password?.trim()) {
                    delete data.password;
                }

                axios.put(`http://localhost:8000/api/user/${id}`, data)
                    .then(() => {
                        navigate('/usuarios');
                    })
                    .catch((err) => {
                    });
            } else {
                axios.post('http://localhost:8000/api/register', data)
                    .then(() => {
                        navigate('/usuarios');
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response && err.response.data.errors && err.response.data.errors.email) {
                            alert("O email informado já está em uso. Por favor, use outro email.");
                        } else {
                            alert("Houve um erro ao cadastrar o usuário. Tente novamente.");
                        }
                    });
            }
        }, [isEdit, id, navigate]);

    return (
        <LayoutDashboard>
            <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: "-100px" }}>
                <div className="p-4 rounded border border-dark" style={{ backgroundColor: "#dad5d5", width: "100%", maxWidth: "800px" }}>
                    <h1 className="mb-4 text-center">{isEdit ? "Editar Usuário" : "Adicionar Usuário"}</h1>
                    <form
                        className="needs-validation mb-3"
                        noValidate
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    placeholder="Digite seu nome"
                                    {...register('name', { required: 'Nome é obrigatório!' })}
                                />
                                <div className="invalid-feedback">
                                    {errors.name && errors.name.message}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="email"
                                    placeholder="exemplo@gmail.com"
                                    {...register('email', {
                                        required: 'Email é obrigatório!',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
                                            message: 'Email inválido!',
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors.email && errors.email.message}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="papel" className="form-label">Papel</label>
                                <select
                                    className={`form-select ${errors.papel ? "is-invalid" : ""}`}
                                    id="papel"
                                    {...register("papel", { required: 'Selecione o papel' })}
                                >
                                    <option value="">Selecione o tipo</option>
                                    <option value="admin">Admin</option>
                                    <option value="professor">Professor</option>
                                </select>
                                <div className="invalid-feedback">
                                    {errors.papel && errors.papel.message}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    id="password"
                                    placeholder="Insira sua senha"
                                    {...register('password', {
                                        required: !isEdit ? 'Senha é obrigatória!' : false,
                                        minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' },
                                    })}
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
    );
}
