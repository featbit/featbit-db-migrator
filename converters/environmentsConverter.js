import {ConverterBase} from "./converterBase.js";

export class EnvironmentsConverter extends ConverterBase {
    pgColumns = ["id", "project_id", "name", "key", "description", "secrets", "settings", "created_at", "updated_at"];

    toCsv(mongoDocs) {
        return super.toCsv(mongoDocs, this.pgColumns);
    }
}