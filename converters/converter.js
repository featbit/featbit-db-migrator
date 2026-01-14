import { UsersConverter } from "./usersConverter.js";
import { WebhooksConverter } from "./webhooksConverter.js";
import { WorkspacesConverter } from "./workspacesConverter.js";
import { OrganizationsConverter } from "./organizationsConverter.js";
import { OrganizationUsersConverter } from "./organizationUsersConverter.js";
import { ProjectsConverter } from "./projectsConverter.js";
import { EnvironmentsConverter } from "./environmentsConverter.js";
import { EndUserPropertiesConverter } from "./endUserPropertiesConverter.js";

import { GroupConverter } from "./groupConverter.js";
import { PolicyConverter } from "./policyConverter.js";
import { GroupMemberConverter } from "./groupMemberConverter.js";
import { GroupPolicyConverter } from "./groupPolicyConverter.js";
import { MemberPolicyConverter } from "./memberPolicyConverter.js";

import { ExperimentConverter } from "./experimentConverter.js";
import { ExperimentMetricConverter } from "./experimentMetricConverter.js";

import { AccessTokenConverter } from "./accessTokenConverter.js";
import { RelayProxyConverter } from "./relayProxyConverter.js";

export class Converter {
    static getConverter(collection) {
        switch (collection) {
            case "Users":
                return new UsersConverter();

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
                return new EndUserPropertiesConverter();

            case "Groups":
                return new GroupConverter();
            case "Policies":
                return new PolicyConverter();
            case "GroupMembers":
                return new GroupMemberConverter();
            case "GroupPolicies":
                return new GroupPolicyConverter();
            case "MemberPolicies":
                return new MemberPolicyConverter();

            case "Experiments":
                return new ExperimentConverter();
            case "ExperimentMetrics":
                return new ExperimentMetricConverter();

            case "AccessTokens":
                return new AccessTokenConverter();
            case "RelayProxies":
                return new RelayProxyConverter();
            case "Webhooks":
                return new WebhooksConverter();
            default:
                throw new Error(`No converter found for collection: ${collection}`);
        }
    }
}