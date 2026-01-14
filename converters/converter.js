import { UsersConverter } from "./usersConverter.js";
import {WebhooksConverter} from "./webhooksConverter.js";

export class Converter {
    static getConverter(collection) {
        switch (collection) {
            case "Users":
                return new UsersConverter();
            case "Webhooks":
                return new WebhooksConverter();
            default:
                throw new Error(`No converter found for collection: ${collection}`);
        }
    }
}