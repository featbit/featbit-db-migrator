## Overview

A NodeJS script to generate csv data from MongoDb for migration to Postgres. Works for FeatBit v5.2.0.

> [!CAUTION]
> Always test with an empty postgres database before running scripts against your production database.

## Setup

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file from `.env.template` in the root directory and fill in your MongoDB and Postgres connection strings.
4. Run `node index.js` to generate CSV files in the `csvs` folder.