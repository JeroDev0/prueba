import React, { useState, useEffect } from 'react';
import './ListaEquipos.css';

const Planes = () => {
    const [planes, setPlanes] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlanes = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://inv-superlink.online/api/PlanesMongoDB/listar-planes');
            const data = await response.json();
            setPlanes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los planes:', error);
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlanes(); // Llamamos a la API cuando se monta el componente
        const interval = setInterval(fetchPlanes, 30000); // Refrescar cada 30 segundos
        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedEquipos((prevSelected) =>
            prevSelected.includes(id)
            ? prevSelected.filter((equipoId) => equipoId !== id)
            : [...prevSelected, id]
        );
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="tabla-equipos">
            <h1>Lista de Equipos</h1>
            <h2>Todos los equipos se encuentran disponibles</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ASCI</th>
                        <th>ALGORITMO</th>
                        <th>POTENCIA</th>
                        <th>CONSUMO/E</th>
                        <th>GANANCIA</th>
                        <th>PRECIO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {planes.map((equipo) => (
                        <tr key={equipo.id}>
                        <td>
                            <input
                            type="checkbox"
                            checked={selectedEquipos.includes(equipo.id)}
                            onChange={() => handleCheckboxChange(equipo.id)}
                            />
                        </td>
                        <td>
                            <div className="equipo-info">
                            <img src={equipo.urlasci} alt={equipo.nombre} className="equipo-imagen" />
                            <div>
                                <h3>{equipo.nombre}</h3>
                                <p>{equipo.descripcion}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <div className="algoritmo-info">
                            <p>{equipo.tipoCripto}</p>
                            <img src={equipo.iconurl} alt="icono" className="icono" />
                            </div>
                        </td>
                        <td>{equipo.cantidadTh} TH/s</td>
                        <td>{equipo.kwbase} Kw/h</td>
                        <td>
                            <p>Diario: {equipo.dailyIncome}</p>
                            <p>Mensual: {equipo.monthlyIncome}</p>
                            <p>Anual: {equipo.annualIncome}</p>
                        </td>
                        <td>{equipo.precioContratacion} {equipo.moneda}</td>
                        <td>
                            <button className="btn-solicitar">Solicitar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Planes;
