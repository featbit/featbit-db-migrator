import { PG_TABLE_ARRAY_TYPES } from './tables.js';

export const toCsvValue = (pgTable, pgColumn, mongoValue) => {
  const fullColumnName = `${pgTable}.${pgColumn}`;

  // Handle empty string
  if (mongoValue === '') {
    return '""';
  }

  // Handle NULL values
  if (mongoValue === null || mongoValue === undefined) {
    return '';
  }

  // Handle array types for PostgreSQL
  if (PG_TABLE_ARRAY_TYPES.includes(fullColumnName)) {
    if (Array.isArray(mongoValue)) {
      const quotedValues = mongoValue.map(v => `"${String(v).replace(/"/g, '\\"')}"`);
      return `"{${quotedValues.join(',')}}"`;
    } else {
      return '{}';
    }
  }

  // Handle UUID
  if (mongoValue?._bsontype === 'UUID' || mongoValue?.constructor?.name === 'UUID') {
    return mongoValue.toString();
  }

  // Handle Date
  if (mongoValue instanceof Date) {
    return mongoValue.toISOString();
  }

  // Handle boolean
  if (typeof mongoValue === 'boolean') {
    return mongoValue ? 't' : 'f';
  }

  // Handle number
  if (typeof mongoValue === 'number') {
    return String(mongoValue);
  }

  // Handle arrays and objects (JSONB)
  if (Array.isArray(mongoValue) || typeof mongoValue === 'object') {
    const jsonStr = JSON.stringify(mongoValue);
    // Escape quotes and wrap in quotes for CSV
    return `"${jsonStr.replace(/"/g, '""')}"`;
  }

  // Handle strings - escape quotes and wrap if contains comma, newline, or quote
  const strValue = String(mongoValue);
  if (strValue.includes(',') || strValue.includes('\n') || strValue.includes('"')) {
    return `"${strValue.replace(/"/g, '""')}"`;
  }

  return strValue;
}