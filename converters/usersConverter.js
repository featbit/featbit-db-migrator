import { ConverterBase } from "./converterBase.js";

export class UsersConverter extends ConverterBase {
    pgColumns = ["id", "workspace_id", "name", "email", "password", "origin", "created_at", "updated_at"];
    
    toCsv(mongoDocs) {
        return mongoDocs.map(doc => {
            return this.pgColumns.map(col => {
                const mongoField = this.getMongoFieldFromPgColumn(col);
                let value = doc[mongoField];

                return this.toStringValue(value);
            }).join(',');
        }).join('\n');
    }
}
