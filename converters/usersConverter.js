import { ConverterBase } from "./converterBase.js";

export class UsersConverter extends ConverterBase {
    pgColumns = ["id", "workspace_id", "name", "email", "password", "origin", "created_at", "updated_at"];
    
    toCsv(mongoDocs) {
        return super.toCsv(mongoDocs, this.pgColumns);
    }
}
