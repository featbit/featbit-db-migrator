import {ConverterBase} from "./converterBase.js";

export class FlagRevisionsConverter extends ConverterBase {
    pgColumns = ["id", "flag", "comment"];

    toCsv(mongoDocs) {
      return mongoDocs.map(doc => {
        return pgColumns.map(col => {
          const mongoField = this.getMongoFieldFromPgColumn(col);
          let value = doc[mongoField];

          if (col === 'flag') {
            // replace all _id with id in JSON string
            const normalizedJsonValue = JSON.stringify(value).replace(/"_id":/g, '"id":');
            const normalizedValue = JSON.parse(normalizedJsonValue);

            return this.toStringValue(normalizedValue);
          }

          return this.toStringValue(value);
        }).join(this.DELIMITER);
      }).join('\n');
    }
}