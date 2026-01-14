export class ConverterBase {
    DELIMITER = '|';

    toCsv(mongoDocs, pgColumns) {
        return mongoDocs.map(doc => {
            return this.pgColumns.map(col => {
                const mongoField = this.getMongoFieldFromPgColumn(col);
                let value = doc[mongoField];

                return this.toStringValue(value);
            }).join(this.DELIMITER);
        }).join('\n');
    }

    getMongoFieldFromPgColumn(pg_column) {
        if (pg_column === 'id') {
            return '_id';
        }

        // snake_case to camelCase
        return pg_column.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    }

    toStringValue(value) {
        // Handle empty string
        if (value === '') {
            return '""';
        }

        // Handle NULL values
        if (value === null || value === undefined) {
            return '';
        }

        // Handle UUID
        if (value?._bsontype === 'UUID' || value?.constructor?.name === 'UUID') {
            return value.toString();
        }

        // Handle Date
        if (value instanceof Date) {
            return value.toISOString();
        }

        // Handle boolean
        if (typeof value === 'boolean') {
            return value ? 't' : 'f';
        }

        // Handle number
        if (typeof value === 'number') {
            return String(value);
        }

        // Handle arrays and objects (JSONB)
        if (typeof value === 'object') {
            const jsonStr = JSON.stringify(value);
            // Escape quotes and wrap in quotes for CSV
            return `"${jsonStr.replace(/"/g, '""')}"`;
        }

        // Handle strings - escape quotes and wrap if contains delimiter, newline, or quote
        const strValue = String(value);
        if (strValue.includes(this.DELIMITER) || strValue.includes('\n') || strValue.includes('"')) {
            return `"${strValue.replace(/"/g, '""')}"`;
        }

        return strValue;
    }

    toObjectArrayValue(value) {
        if (Array.isArray(value)) {
            const escapedValues = value.map(v => {
                const jsonStr = JSON.stringify(v);
                return `{${jsonStr.replace(/"/g, '""')}}`;
            });
            return `"[${escapedValues.join(',')}]"`;
            } else {
            return '"[]"';
        }
    }

    toStringArrayValue(value) {
        if (Array.isArray(value)) {
            const escapedValues = [];

            for (const v of value) {
                if (v === null || v === undefined) {
                    escapedValues.push('');
                }

                if (v === '') {
                    escapedValues.push('""');
                }

                // escape commas
                const escaped = String(v).replace(/,/g, '\\,');
                escapedValues.push(`""${escaped}""`);
            }

            return `"{${escapedValues.join(',')}}"`;
        } else {
            return '"{}"';
        }
    }
}