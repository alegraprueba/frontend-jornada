interface IIngredienteList {
    ingrediente: string
    cantidad: number
}

export default interface IPlato {
    id: string;
    nombre: string;
    ingredientes: IIngredienteList[]
}