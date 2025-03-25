import React from "react";

export default async function ordenarPlato(
    setOrdenGenerada: React.Dispatch<React.SetStateAction<string>>, 
    setMessage: React.Dispatch<React.SetStateAction<string>>,
) {
    try {
        const ordenGenerada: string = Date.now().toString()
        const ordenarPlatoPost: string = `${process.env.NEXT_PUBLIC_API_GESTION_ORDEN}${process.env.NEXT_PUBLIC_API_POST_ORDENAR}`
        const response = await fetch(
          ordenarPlatoPost,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ordenId: ordenGenerada }),
          }
        );
        if (!response.ok) {
          throw new Error("Error al ordenar el plato");
        }
        const result = await response.json();
        setOrdenGenerada(ordenGenerada)
        setMessage(result?.message || "Orden realizada con éxito.");
      } catch (error: any) {
        console.log(error)
        setMessage(`Error: ${error.message}`);
      }
}