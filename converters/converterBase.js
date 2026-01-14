import {PG_TABLE_ARRAY_TYPES} from "../tables.js";

export class ConverterBase {

    toCsv(mongoDocs, pgColumns) {
        return mongoDocs.map(doc => {
            return this.pgColumns.map(col => {
                const mongoField = this.getMongoFieldFromPgColumn(col);
                let value = doc[mongoField];

                return this.toStringValue(value);
            }).join(',');
        }).join('\n');
    }

    getMongoFieldFromPgColumn(pg_column) {
        // snake_case to camelCase
        if (pg_column === 'id') {
            return '_id';
        }

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

        // Handle strings - escape quotes and wrap if contains comma, newline, or quote
        const strValue = String(value);
        if (strValue.includes(',') || strValue.includes('\n') || strValue.includes('"')) {
            return `"${strValue.replace(/"/g, '""')}"`;
        }

        return strValue;
    }

    toArrayValue(value) {
        if (Array.isArray(value)) {
            const quotedValues = value.map(v => `"${String(v).replace(/"/g, '\\"')}"`);
            return `"{${quotedValues.join(',')}}"`;
        } else {
            return '{}';
        }
    }
}