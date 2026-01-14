import fs from "fs";
import { PG_TABLE_COLUMNS, TABLE_MAPPING, PG_MISSING_COLUMN_DEFAULT_VALUES, pgColumnToMongoField } from "./tables.js";
import { toCsvValue } from "./utils.js";

export class Migrator {
  constructor(mongodb, postgres) {
    this.mongodb = mongodb.db('featbit');
    this.postgres = postgres;
  }

  async generate_csv() {
    // create csvs directory if not exists
    if (!fs.existsSync('./csvs')) {
      fs.mkdirSync('./csvs');
    }

    for (const tableMapping of Object.entries(TABLE_MAPPING)) {
      const [collection, table] = tableMapping;
      await this.#generate_csv_core(collection, table);
    }
  }

  async #generate_csv_core(mongoCollection, pgTable) {
    console.log(`Generating CSV for mongo collection "${mongoCollection}" to pg table "${pgTable}"...`);

    try {
      // get from mongo
      const source = await this.mongodb.collection(mongoCollection).find().toArray();
      console.log(`Found ${source.length} records in mongodb collection ${mongoCollection}.`);

      // exclude existing records in pg
      const mongoIds = source.map(doc => doc._id.toString());

      const existingIdsResult = await this.postgres.query(`SELECT id FROM ${pgTable} WHERE id = ANY($1)`, [mongoIds]);
      const existingIds = existingIdsResult.rows.map(row => row.id);
      if (existingIds.length > 0) {
        console.log(`Found ${existingIds.length} existing records in pg table ${pgTable}. Will exclude them from CSV.`);
      }

      // filter out existing records
      const toInsert = source.filter(doc => !existingIds.includes(doc._id.toString()));
      if (toInsert.length === 0) {
        console.log(`No new records to insert into pg table ${pgTable}.`);
        return;
      }

      const pg_columns = PG_TABLE_COLUMNS[mongoCollection];

      // Generate CSV content
      const csvRows = toInsert.map(doc => {
        const rowValues = [doc._id.toString()]; // id column

        for (const pgColumn of pg_columns.slice(1)) { // skip id
          const mongoField = pgColumnToMongoField(pgColumn);
          let value = doc[mongoField];
          if (value === undefined) {
            // for missing column, use default value
            const defaultValue = PG_MISSING_COLUMN_DEFAULT_VALUES[pgColumn];
            if (defaultValue === undefined) {
              throw new Error(`Missing value for column "${pgColumn}" in collection "${mongoCollection}" and no default value defined.`);
            }

            value = defaultValue;
          }

          const csvValue = toCsvValue(pgTable, pgColumn, value);
          rowValues.push(csvValue);
        }

        return rowValues.join(',');
      });

      const content = csvRows.join('\n');
      const csvPath = `./csvs/${pgTable}.csv`;
      fs.writeFileSync(csvPath, content);
      console.log(`Successfully generated CSV: ${csvPath}`);
    } catch (error) {
      console.error(`Error generating CSV for mongo collection "${mongoCollection}" to pg table "${pgTable}":`, error);
    }
  }
}