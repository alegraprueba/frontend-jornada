import React from "react";
import IIngrediente from "../interfaces/IIngrediente";

export default async function listarIngredientes(
    setIngredientes: React.Dispatch<React.SetStateAction<IIngrediente[]>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const ingredientesGet: string = `${process.env.NEXT_PUBLIC_API_BODEGA_ALIMENTO}${process.env.NEXT_PUBLIC_PATH_GET_INGREDIENTES}`
        const response = await fetch(ingredientesGet);
        if (!response.ok) {
          throw new Error("Error al obtener los ingredientes");
        }
        const data = await response.json();
        setIngredientes(data);
    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}