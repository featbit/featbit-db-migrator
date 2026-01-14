import { ConverterBase } from "./converterBase.js";

export class OrganizationUsersConverter extends ConverterBase {
    pgColumns = ["id", "organization_id", "user_id", "invitor_id", "initial_password", "created_at", "updated_at"];

    toCsv(mongoDocs) {
        return super.toCsv(mongoDocs, this.pgColumns);
    }
}