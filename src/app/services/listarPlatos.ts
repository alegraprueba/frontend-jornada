import React from "react";
import IPlato from "../interfaces/IPlato";

export default async function listarPlatos(
    setPlatos: React.Dispatch<React.SetStateAction<IPlato[]>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const platosGet: string = `${process.env.NEXT_PUBLIC_API_COCINA}${process.env.NEXT_PUBLIC_PATH_GET_PLATOS}`
        const response = await fetch(platosGet);
        if (!response.ok) {
          throw new Error("Error al obtener los platos");
        }
        const data = await response.json();
        setPlatos(data);
    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}