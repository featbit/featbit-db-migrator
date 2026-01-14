import fs from "fs";
import { TABLE_MAPPING } from "./tables.js";
import { Converter } from "./converters/converter.js";

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

    for (let i = 0; i < TABLE_MAPPING.length; i++) {
      const [collection, table] = Object.entries(TABLE_MAPPING[i])[0];
      await this.#generate_csv_core(i, collection, table)
    }
  }

  async #generate_csv_core(index, mongoCollection, pgTable) {
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

      // Generate CSV content
      const content = Converter.getConverter(mongoCollection).toCsv(toInsert);
      const csvPath = `./csvs/${index}_${pgTable}.csv`;
      fs.writeFileSync(csvPath, content);
      console.log(`Successfully generated CSV: ${csvPath}`);
    } catch (error) {
      console.error(`Error generating CSV for mongo collection "${mongoCollection}" to pg table "${pgTable}":`, error);
    }
  }
}