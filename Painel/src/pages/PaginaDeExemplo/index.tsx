import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styles from './styles.module.css'

export default function PaginaDeExemplo() {

    let variavel = 1
    const refForm = useRef<any>();
    const refContador = useRef(0);

    // get and seters
    const [estado, setEstado] = useState(0)

    function formulario() {

    }

    // const funcaoForm = useCallback(() => {}, [])
    

    // HOOKS DO REACT - É TUDO QUE COMEÇA COM USE
    // REACT É UMA BILIOTECA!!! NÃO É UM FRAMEOWRK
    const submitForm = useCallback((event: SyntheticEvent) => {

        event.preventDefault();

        console.log('ESTADO DO PARANA enviou formulario')
        console.log(estado) 
        console.log('refContador.current') 
        console.log(refContador.current)

    }, [estado])

    return (
        <>
            <div
                className={styles.main}
            >
                <div
                    className={styles.border}
                >
                    <div
                        className='d-flex flex-column align-items-center'
                    >
                        {/*  hooks React */ }
                        <h1 className='text-primary'>Estado {estado}</h1>
                        <h1 className='text-primary'>REF {refContador.current}</h1>
                        <h1 className='text-primary'>Login</h1>
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
                                Por favor digite seu email
                            </div>
                        </div>

                        <div className='col-md-12 mt-1'>
                            {/* comentario */}
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
                                Por favor digite sua senha
                            </div>
                        </div>

                        <div
                            className='col-md-12 mt-3'
                        >
                            <button
                                className='btn btn-primary w-100'
                                type='submit'
                                id='botao'
                            >
                                Enviar
                            </button>
                            <button
                                className='btn btn-warning w-100'
                                type='button'
                                id='botao'
                                onClick={() => {
                                    setEstado(estado+1)
                                }}
                            >
                                Estado
                            </button>
                            <button
                                className='btn btn-warning w-100'
                                type='button'
                                id='botao'
                                onClick={() => {
                                    refContador.current = refContador.current + 1
                                }}
                            >
                                Ref
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}