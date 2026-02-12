import { components } from './schema';

export type TechnologyDTO = components["schemas"]["TechnologyDTO"];
export type CreateTechnologyDTO = components["schemas"]["TechnologyCreateDTO"];
export type UpdateTechnologyDTO = components["schemas"]["TechnologyUpdateDTO"];
export type Category = components["schemas"]["TechnologyDTO"]["category"];
export type Ring = NonNullable<components["schemas"]["TechnologyDTO"]["ring"]>;
