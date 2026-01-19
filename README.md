## Overview

A Node.js utility to migrate data from MongoDB to PostgreSQL for **FeatBit v5.2.0**.

> [!CAUTION]
> Please do test migration with an empty PostgreSQL database first and always review the SQL scripts before executing them against production.

## Prerequisites

- Access to your FeatBit MongoDB database
- Access to your target PostgreSQL database
- FeatBit deployment **upgraded to v5.2.0 before migration**

## Setup

1. Initialize your PostgreSQL database by running the [`init-pg.sql`](init-pg.sql) script. This script will:

   - Create the `featbit` database.
   - Create all necessary tables and indexes.

2. Clone this repository to your local machine and install dependencies:
   ```bash
   git clone <repository-url>
   cd featbit-db-migrator
   npm install
   ```
3. Configure Connection Strings:
   - Create a `.env` file in the root directory based on the `.env.template` file.
   - Fill in your MongoDB and PostgreSQL connection strings in the `.env` file.

Connection String Formats:

- **MongoDB**: Follow the [MongoDB connection string format](https://www.mongodb.com/docs/manual/reference/connection-string/).
- **PostgreSQL**: Follow the [Postgres connection string format](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string).

## Usage

1. Generate CSV Files

    Run the following command to extract data from MongoDB and generate CSV files:
    ```bash
    node index.js
    ```

    This will:
    - Connect to both MongoDB and PostgreSQL
    - Extract data from MongoDB collections
    - Filter out records that already exist in PostgreSQL
    - Generate CSV files for each collection in the `csvs/` directory

2. Generate Import Scripts

    Run the following command to generate SQL import scripts:
    ```bash
    node get-scripts.js
    ```

    This will create a file named `scripts-to-run.sql` containing `\copy` commands to import each CSV file into the corresponding PostgreSQL table.

3. Import Data to PostgreSQL

    For better progress monitoring and error handling, we recommend executing commands one at a time:

    ```bash
    psql -U your_username -d featbit
    # Then run each \copy command from scripts-to-run.sql individually
    ```

    > [!NOTE]
    > The following collections are **not migrated** by this tool:
    >
    > - `EndUsers` - End user data
    > - `Events` - Analytics and insights data
    >
    > These collections typically contain large volumes of data and may require separate migration strategies.

## Troubleshooting

### Connection Errors

- Verify connection strings are correct
- Check network access to both databases
- Ensure MongoDB user has read permissions
- Ensure PostgreSQL user has write permissions

### Import Errors

- Check PostgreSQL logs for detailed error messages
- Verify CSV files in csvs/ directory are not empty
- Ensure file paths in scripts-to-run.sql are absolute paths
- Check for encoding issues (UTF-8 is required)

If you encounter issues not covered here, please open an issue in this repository or join our [Slack community](https://join.slack.com/t/featbit/shared_invite/zt-1ew5e2vbb-x6Apan1xZOaYMnFzqZkGNQ) for assistance.