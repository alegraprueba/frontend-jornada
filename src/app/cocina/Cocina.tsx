"use client";

import { useEffect, useState } from "react";

export default function PlatosList() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(
          "https://fvo71os756.execute-api.us-east-2.amazonaws.com/platos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los platos");
        }
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatos();
  }, []);

  const ordenarPlato = async () => {
    try {
      setMessage("Procesando orden...");
      setShowPopup(true);
      const response = await fetch(
        "https://ughoye1ib1.execute-api.us-east-2.amazonaws.com/ordenar-plato",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ordenId: "12345789" }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al ordenar el plato");
      }
      const result = await response.json();
      setMessage(result.message || "Orden realizada con éxito.");
      setShowPopup(true);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setShowPopup(true);
    }
  };

  const cerrarPopup = () => {
    setShowPopup(false);
    setMessage("");
  };

  if (loading) return <p>Cargando platos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Platos</h1>
      <ul className="space-y-4">
        {platos.map((plato) => (
          <li key={plato.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{plato.nombre}</h2>
            <p className="text-gray-600">Ingredientes:</p>
            <ul className="list-disc list-inside">
              {plato.ingredientes.map((ing, index) => (
                <li key={index}>{`${ing.cantidad} x ${ing.ingrediente}`}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button
        onClick={ordenarPlato}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Ordenar Plato
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{message}</p>
            <button
              onClick={cerrarPopup}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
