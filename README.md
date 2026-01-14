## Overview

A NodeJS script to generate csv data from MongoDb for migration to Postgres. Works for FeatBit v5.2.0.

> [!CAUTION]
> Always test with an empty postgres database before running scripts against your production database.

## Setup

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file from `.env.template` in the root directory and fill in your MongoDB and Postgres connection strings.
4. Run `node index.js` to generate CSV files in the `csvs` folder.

## Init your Postgres

## Import to Postgres

To import the generated CSV data into your Postgres database, first connect to the target DB instance using `psql`:

```bash
psql --host=localhost --port=5432 --username=postgres --password mysecretpassword --dbname=featbit
```

You then run `\copy` command with the following parameters to identify the target for the data and its format.

- target_table – The name of the table that should receive the data being copied from the CSV file. That is, the csv file name without the `.csv` extension.
- filename – The complete path to the CSV file on your local workstation.

```sql
 \copy target_table from '/path/to/local/filename.csv' WITH DELIMITER ',' CSV;
```