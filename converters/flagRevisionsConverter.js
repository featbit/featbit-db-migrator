import {ConverterBase} from "./converterBase.js";

export class FlagRevisionsConverter extends ConverterBase {
    pgColumns = ["id", "flag", "comment"];

    toCsv(mongoDocs) {
        return super.toCsv(mongoDocs, this.pgColumns);
    }
}