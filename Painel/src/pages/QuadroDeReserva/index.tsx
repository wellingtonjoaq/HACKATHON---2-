import { ReactNode, useEffect, useState } from 'react'

import { ProfessorDashboard } from "../../components/ProfessorDashboard";

export default function QuadroDeReserva() {

    return (
        <>

            <ProfessorDashboard children={undefined} />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light border"
            style={{ marginTop: '-699px' }}
            >
                <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                    <h1 className="h2 mt-2" style={{marginLeft: '250px'}}>Quadro de Reserva</h1>
                </div>
            </div>

        </>
    );
}
