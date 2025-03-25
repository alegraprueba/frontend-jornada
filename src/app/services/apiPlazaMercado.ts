import React from "react";
import IInventario from "../interfaces/IInventario";

export default async function listarIngredientes(
    setInventarioPlaza: React.Dispatch<React.SetStateAction<IInventario[]>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        const ingredientes: string[] = [
            "tomato",
            "lemon",
            "potato",
            "rice",
            "ketchup",
            "lettuce",
            "onion",
            "cheese",
            "meat",
            "chicken"
        ]
        const inventarioPlazaMercado: IInventario[] = await Promise.all(ingredientes.map(async (item: string) => {
            const inventarioGET: string = `${process.env.NEXT_PUBLIC_API_PLAZA_MERCADO}${item}`
            const response = await fetch(inventarioGET);
            if (!response.ok) {
              throw new Error("Error al obtener los ingredientes");
            }
            const data = await response.json();
            return { producto: item.toUpperCase(), cantidad: data.quantitySold, disponible: data.quantitySold > 0 ? 'SI' : 'NO' }
        }))
        setInventarioPlaza(inventarioPlazaMercado);
    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}