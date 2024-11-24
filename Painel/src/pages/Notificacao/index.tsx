import { Loading } from "../../components/Loading";
import { ProfessorDashboard } from "../../components/ProfessorDashboard";


export default function Notificacao() {




    return (
        <>
            <ProfessorDashboard children={undefined} />
            <div className=" flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border w-100"
                style={{ marginTop: '-699px' }}
            >
                <div className="d-flex flex-column align-items-center mb-3 mb-md-0"
                    style={{ paddingRight: '700px' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48" fill="currentColor"
                        className="bi bi-door-open"
                        viewBox="0 0 16 16">
                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                    </svg>
                    <h1 className="h2 mt-2">Reservas</h1>
                </div>
            </div>


            <div className="container mt-5 " style={{ marginLeft: '275px' }}>
                <div className="row" >

                    <div className="col-md-6">
                        <div className="card" style={{ width: '80%' }}>

                            <div className="card-body">
                                <h4 className="card-title">Meu Cronograma</h4>
                                <p className="card-text">25/05 às 20:00h - Palestra na sala 09 #id01</p>
                                <p className="card-text">25/05 às 20:00h - Palestra na sala 09 #id01</p>
                                <p className="card-text">25/05 às 20:00h - Palestra na sala 09 #id01</p>
                                <p className="card-text">25/05 às 20:00h - Palestra na sala 09 #id01</p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card" style={{ width: '80%' }}>

                            <div className="card-body">
                                <p style={{ fontSize: '20px', margin: '0' }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="currentColor"
                                        className="bi bi-person"
                                        viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                    Danilo Antonio Rosa
                                </p>
                                <p style={{ marginLeft: '30px' }}><b>Professor</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
