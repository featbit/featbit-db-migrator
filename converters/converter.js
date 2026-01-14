import { UsersConverter } from "./usersConverter.js";
import { WebhooksConverter } from "./webhooksConverter.js";
import {WorkspacesConverter} from "./workspacesConverter.js";
import {OrganizationsConverter} from "./organizationsConverter.js";
import {OrganizationUsersConverter} from "./organizationUsersConverter.js";
import {ProjectsConverter} from "./projectsConverter.js";
import {EnvironmentsConverter} from "./environmentsConverter.js";
import {EndUserPropertiesConverterConverter} from "./endUserPropertiesConverter.js";
import {SegmentsConverter} from "./segmentsConverter.js";
import {FeatureFlagsConverter} from "./featureFlagsConverter.js";
import {FlagSchedulesConverter} from "./flagSchedulesConverter.js";
import {FlagChangeRequestsConverter} from "./flagChangeRequestsConverter.js";
import {TriggersConverter} from "./triggersConverter.js";
import {AuditLogsConverter} from "./audditLogsConverter.js";
import {FlagRevisionsConverter} from "./flagRevisionsConverter.js";
import {FlagDraftsConverter} from "./flagDraftsConverter.js";

export class Converter {
    static getConverter(collection) {
        switch (collection) {
            case "Users":
                return new UsersConverter();
            case "Webhooks":
                return new WebhooksConverter();
            case "Workspaces":
                return new WorkspacesConverter();
            case "Organizations":
                return new OrganizationsConverter();
            case "OrganizationUsers":
                return new OrganizationUsersConverter();
            case "Projects":
                return new ProjectsConverter();
            case "Environments":
                return new EnvironmentsConverter();
            case "EndUserProperties":
                return new EndUserPropertiesConverterConverter();
            case "Segments":
                return new SegmentsConverter();
            case "FeatureFlags":
                return new FeatureFlagsConverter();
            case "FlagRevisions":
                return new FlagRevisionsConverter();
            case "FlagDrafts":
                return new FlagDraftsConverter();
            case "FlagSchedules":
                return new FlagSchedulesConverter();
            case "FlagChangeRequests":
                return new FlagChangeRequestsConverter();
            case "Triggers":
                return new TriggersConverter();
            case "AuditLogs":
                return new AuditLogsConverter();
            default:
                throw new Error(`No converter found for collection: ${collection}`);
        }
    }
}