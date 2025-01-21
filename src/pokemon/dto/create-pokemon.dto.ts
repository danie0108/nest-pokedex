import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

// import {IsString} from 'class-validator';
export class CreatePokemonDto {
    //isInt, IsPositive, MinLenght 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    //IsString, MinLenght 1
    @IsString()
    @MinLength(1)
    name: string;
}
