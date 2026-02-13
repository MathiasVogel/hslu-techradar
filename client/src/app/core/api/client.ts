import createClient from "openapi-fetch";
import { paths } from "../../models/schema"; // Deine generierte Datei

export const client = createClient<paths>({
  baseUrl: "http://localhost:3000/"
});
