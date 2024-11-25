import { useState } from "react";
import { ProfessorDashboard } from "../../components/ProfessorDashboard";
import { Dropdown } from 'react-bootstrap';

export default function Notificacao() {
    const [cronogramas, setCronogramas] = useState([
        { data: "25/05 às 20:00h", evento: "Sala 09", espaco: "Térreo", id: "# 01" },
        { data: "26/05 às 14:00h", evento: "Sala 02", espaco: "2ª Andar", id: "# 02" },
        { data: "27/05 às 18:00h", evento: "Sala 03", espaco: "3ª Andar", id: "# 03" }
    ]);

    const user = {
        nome: "Wellington Joaquim",
        permissoes: "Professor"
    };

    return (
        <>
            <ProfessorDashboard>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border">
                    <div
                        className="d-flex align-items-center justify-content-between flex-wrap"
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "110px",
                            backgroundColor: "#f8f9fa",
                            padding: "20px",
                            position: "relative",
                            overflow: "hidden",  
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="m11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>

                        <div className="ms-3 d-flex flex-column align-items-start" style={{
                            maxWidth: "calc(100% - 80px)", 
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            flex: 1, 
                        }}>
                            <h5 className="mb-0" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.nome}</h5>
                            <p className="mb-0" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.permissoes}</p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16"
                            style={{
                                position: "absolute",
                                right: "10px", 
                                top: "10px",
                            }}
                        >
                             <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                        </svg>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <div
                        className="d-flex flex-column justify-content-between"
                        style={{
                            border: "1px solid #ccc",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            padding: "20px",
                            width: "100%",
                            maxWidth: "100%",
                        }}
                    >
                        <h2 className="text-center mb-3">Meu cronograma</h2>

                        <div className="d-flex justify-content-between align-items-center py-2 border-bottom" style={{ fontWeight: "bold" }}>
                            <div className="text-center" style={{ flex: 1 }}>Localizado</div>
                            <div className="text-center" style={{ flex: 1 }}>Sala</div>
                            <div className="text-center" style={{ flex: 1 }}>Data e Hora</div>
                            <div className="text-center" style={{ flex: 1 }}>ID</div>
                        </div>

                        {cronogramas.map((cronograma) => (
                            <div
                                key={cronograma.id}
                                className="d-flex justify-content-between align-items-center py-2 border-bottom"
                                style={{ position: "relative" }}
                            >
                                <div className="text-center" style={{ flex: 1 }}>
                                    {cronograma.espaco}
                                </div>
                                <div className="text-center" style={{ flex: 1 }}>{cronograma.evento}</div>
                                <div className="text-center" style={{ flex: 1 }}>{cronograma.data}</div>
                                <div className="text-center" style={{ flex: 1 }}>{cronograma.id}</div>

                                <Dropdown align="start" style={{ position: "absolute", right: "10px" }}>
                                    <Dropdown.Toggle 
                                        variant="link"
                                        id="dropdown-custom-components"
                                        style={{
                                            padding: "0",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            color: "black",
                                        }}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="20" 
                                            height="20" 
                                            fill="currentColor" 
                                            className="bi bi-pencil" 
                                            viewBox="0 0 16 16"
                                            style={{ color: "black" }} 
                                        >
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu 
                                        style={{
                                            left: "auto", 
                                            right: "0", 
                                            marginTop: "0", 
                                        }}
                                    >
                                        <Dropdown.Item eventKey="1">Editar</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Cancelar Reserva</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfessorDashboard>
        </>
    );
}
