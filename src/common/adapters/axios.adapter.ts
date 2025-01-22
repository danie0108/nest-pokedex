import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

/**
 * El decorador Injectable() nos sirve para que
 * si se desea utilizar el codigo aqui mostrado pueda
 * realizarse desde otro lugar
 */
@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        }
        catch (error) {
            throw new Error(`This is an error - Check logs`);
        }
    }

}