import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { LayoutDashboard } from "../../../components/AdminDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IForm {
    nome: string
    email: string
    password?: string
    permissoes: string
}

export default function GerenciarUsuarios() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<IForm>()

    const refForm = useRef<any>();

    const navigate = useNavigate();

    const { id } = useParams()

    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {

        let lsStorage = localStorage.getItem('painel.token')

        let token: IToken | null = null

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage)
        }


        if (!token || verificaTokenExpirado(token.accessToken)) {

            navigate("/")
        }

        const idUser = Number(id)

        console.log(import.meta.env.VITE_URL)
        if (!isNaN(idUser)) {

            axios.get(import.meta.env.VITE_URL +
                '/users?id=' + idUser)
                .then((res) => {
                    setIsEdit(true)


                    setValue("nome", res.data[0].nome)
                    setValue("email", res.data[0].email)
                    setValue("permissoes", res.data[0].permissoes)


                })
        }

    }, [])

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {

            if (isEdit) {

                if (data.password?.trim() === '') {
                    delete data.password
                }

                axios.put(import.meta.env.VITE_URL +
                    '/users/' + id,
                    data
                )
                    .then((res) => {
                        navigate('/usuarios')
                    })
                    .catch((err) => {
                    })
            } else {

                axios.post('http://localhost:3001/users',
                    data
                ).then((res) => {
                    navigate('/usuarios')
                })
                    .catch((err) => {
                        console.log(err)
                    })

            }


        }, [isEdit])

    return (
        <>
            <LayoutDashboard>
                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()

                        refForm.current.classList.add('was-validated')

                        handleSubmit(submitForm)(event)

                    }}
                    ref={refForm}
                >
               <div style={{
                    display: "flex",             
                    justifyContent: "center",     
                    alignItems: "center",         
                    minHeight: "90vh",            
                    padding: "20px",              
                    marginTop: "-10vh"            
                }}>
                    <div style={{
                        border: "1px solid black",
                        backgroundColor: "#f8f9fa", 
                        padding: "20px",
                        borderRadius: "5px",
                        maxWidth: "600px", 
                        width: "100%"      
                    }}>
                        <h1
                            style={{
                                textAlign: "center"
                            }}
                        >
                            {isEdit ? "Editar Usuário" : "Adicionar Usuário"}
                        </h1>

                        <form
                            className="row g-3 needs-validation mb-3"
                            noValidate
                            style={{
                                alignItems: 'center'
                            }}
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                refForm.current.classList.add('was-validated');
                                handleSubmit(submitForm)(event);
                            }}
                            ref={refForm}
                        >
                            <div className="col-md-6">
                                <label htmlFor="nome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Adicione seu nome"
                                    id="nome"
                                    required
                                    {...register('nome', { required: 'Nome é obrigatório!' })}
                                />
                                <div className="invalid-feedback">
                                    {errors.nome && errors.nome.message}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="permissoes" className="form-label">
                                    Papel
                                </label>
                                <select
                                    className="form-select"
                                    defaultValue={''}
                                    id="permissoes"
                                    required
                                    {...register("permissoes", { required: 'Selecione' })}
                                >
                                    <option value="">Selecione o papel</option>
                                    <option value="admin">Admin</option>
                                    <option value="professor">Professor</option>
                                </select>
                                <div className="invalid-feedback">
                                    {errors.permissoes && errors.permissoes.message}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="exemplo@gmail.com"
                                    id="email"
                                    required
                                    {...register('email', { required: 'Email é obrigatório!' })}
                                />
                                <div className="invalid-feedback">
                                    {errors.email && errors.email.message}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    id="password"
                                    required
                                    {...register('password', { required: 'Senha é obrigatória!' })}
                                />
                                <div className="invalid-feedback">
                                    {errors.password && errors.password.message}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{
                                            width: "50%",
                                        }}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                </form>
            </LayoutDashboard>
        </>
    )
}