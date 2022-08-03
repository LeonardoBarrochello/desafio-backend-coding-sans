import { Request, Response } from "express";
import { brewerieApi } from "../providers/brewerieApi";


export class BrewerieController {
    async getBreweries(request: Request, response: Response) {
        const { query } = request.query;
        if (!query) {
            var { data } = await brewerieApi.get("/breweries");
            return response.json(data)
        }
        var { data } = await brewerieApi.get(`/breweries/search?query=${query}`)
        return response.json(data);
    }
}