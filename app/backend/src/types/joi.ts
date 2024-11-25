import { ObjectSchema } from "joi";

export type JoiSchema = ObjectSchema<any>;

export interface ValidationRequest {
  schemas: JoiSchema;
}