export interface HttpAdapter {
    /** <T> -- Esto indica que es un tipo generico y
     * deberá devolver algo de tipo generico
    */
    get<T>(url: string): Promise<T>;
}