import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/*hacen referencia a como grabar en la base de datos
 se relacionan con la base de datos
 */
@Schema()
export class Pokemon extends Document {
    // Extiende de Document, permite acceder a varias propiedades
    //id: string //Mongo lo proporciona
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    /*
    El decorador @Prop() con las propiedades que se mencionan
        - unique - Determina que el nombre no puede repetirse, sera unico.
        - index - Sirve para saber en donde especificamene se encuenrta el registro
    */

    @Prop({
        unique: true,
        index: true
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
