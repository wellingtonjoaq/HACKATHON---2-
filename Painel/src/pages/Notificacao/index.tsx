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

            <div style={{ marginLeft: '240px' }}>
                <div  style={{ width: '18rem' }}>
                    <div className="card-body" style={{ 
                        width: '300px', 
                        height: '250px', 
                        border: 'solid 1px solid #cccccc'
                        
                        }}>
                        <h5 className="card-title">Meu Cronograma</h5>
                        <p className="card-text">25/05 as 20:00h - Palestra na sala 09 </p>
                    </div>
                </div>
            </div>

            <div className="card w-25">
                <div className="card-body">
                    <p className="card-text">Danilo Antonio Rosa</p>
                </div>
            </div>
        </>
    );
}
