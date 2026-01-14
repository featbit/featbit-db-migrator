import {ConverterBase} from "./converterBase.js";

export class FeatureFlagsConverter extends ConverterBase {
    pgColumns = ["id", "env_id", "revision", "name", "description", "key", "variation_type", "variations", "target_users", "rules", "is_enabled", "disabled_variation_id", "fallthrough", "expt_include_all_targets", "tags", "is_archived", "created_at", "updated_at", "creator_id", "updator_id"];

    toCsv(mongoDocs) {
        return mongoDocs.map(doc => {
            return this.pgColumns.map(col => {
                const mongoField = this.getMongoFieldFromPgColumn(col);
                let value = doc[mongoField];

                if (col === 'tags') {
                    return this.toArrayValue(value);
                }

                return this.toStringValue(value);
            }).join(this.DELIMITER);
        }).join('\n');
    }
}