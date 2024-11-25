import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const refForm = useRef<any>();

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [papel, setPapel] = useState<string>('');

    const submitForm = useCallback((event: SyntheticEvent) => {

        event.preventDefault();

        if (refForm.current.checkValidity()) {

            setLoading(true)

            const target = event.target as typeof event.target & {
                email: { value: string },
                senha: { value: string }
            }

            axios.post('http://localhost:8000/api/login',
                {
                    email: target.email.value,
                    password: target.senha.value,
                }
            ).then((resposta) => {

                console.log('Login bem-sucedido');
                console.log(resposta.data);

                localStorage.setItem(
                    'painel.token',
                    JSON.stringify(resposta.data)
                )

                // Redirecionamento baseado no papel selecionado
                if (papel === 'admin') {
                    navigate('/usuarios');
                } else if (papel === 'professor') {
                    navigate('/notificacao');
                }

            }).catch((erro) => {
                console.log('Erro no login');
                console.log(erro);
                setLoading(false);
                setToast(true);
            })

        } else {
            refForm.current.classList.add('was-validated');
        }

    }, [papel]);

    return (
        <>
            <Loading
                visible={loading}
            />
            <Toast
                show={toast}
                message='Dados inválidos'
                colors='danger'
                onClose={() => { setToast(false) }}
            />
            <div
                className={`${styles.main} p-5`}
                style={{ backgroundColor: '#f5f5f5', height: '100vh' }} 
            >
                <div
                    className={`${styles.border} p-4`}
                    style={{ borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                >
                    <div
                        className='d-flex flex-column align-items-center'
                    >
                        <h1 className='text-danger'>Login</h1> 
                        <p
                            className='text-secondary'
                        >
                            Preencha os campos para logar
                        </p>
                    </div>

                    <hr />

                    <form
                        className='needs-validation align-items-center'
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div
                            className='col-md-12'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                E-mail
                            </div>
                        </div>

                        <div className='col-md-12 mt-1'>
                            <label
                                htmlFor='senha'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='senha'
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Senha
                            </div>
                        </div>

                        <div className='col-md-12 mt-1'>
                            <label
                                htmlFor='papel'
                                className='form-label'
                            >
                                Papel
                            </label>
                            <select
                                className='form-select'
                                id='papel'
                                required
                                value={papel}
                                onChange={(e) => setPapel(e.target.value)}
                            >
                                <option value=''>Escolha o papel</option>
                                <option value='admin'>Admin</option>
                                <option value='professor'>Professor</option>
                            </select>
                            <div
                                className='invalid-feedback'
                            >
                                Selecione um papel
                            </div>
                        </div>

                        <div
                            className='col-md-12 mt-3'
                        >
                            <button
                                className='btn btn-danger w-100'
                                type='submit'
                                id='botao'
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
