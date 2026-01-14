import {ConverterBase} from "./converterBase.js";

export class EndUserPropertiesConverterConverter extends ConverterBase {
    pgColumns = ["id", "env_id", "name", "preset_values", "use_preset_values_only", "is_built_in", "is_digest_field", "remark", "created_at", "updated_at"];

    toCsv(mongoDocs) {
        return super.toCsv(mongoDocs, this.pgColumns);
    }
}