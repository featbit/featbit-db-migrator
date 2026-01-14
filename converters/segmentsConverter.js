import {ConverterBase} from "./converterBase.js";

export class SegmentsConverter extends ConverterBase {
    pgColumns = ["id", "workspace_id", "env_id", "name", "type", "scopes", "description", "included", "excluded", "rules", "is_archived", "created_at", "updated_at", "tags"];

    toCsv(mongoDocs) {
        return mongoDocs.map(doc => {
            return this.pgColumns.map(col => {
                const mongoField = this.getMongoFieldFromPgColumn(col);
                let value = doc[mongoField];

                if (col === 'scopes' || col === 'tags' || col === 'included' || col === 'excluded') {
                    return this.toArrayValue(value);
                }

                return this.toStringValue(value);
            }).join(this.DELIMITER);
        }).join('\n');
    }
}