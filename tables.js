// mongodb collection name -> postgres table name
export const TABLE_MAPPING = {
  //Users: "users",

  // Workspaces: "workspaces",

  // Organizations: "organizations",
  // OrganizationUsers: "organization_users",
  // Projects: "projects",
  // Environments: "environments",
  // EndUserProperties: "end_user_properties",
  // Segments: "segments",
  FeatureFlags: "feature_flags",
  // FlagRevisions: "flag_revisions",
  // FlagDrafts: "flag_drafts",
  // FlagSchedules: "flag_schedules",
  // FlagChangeRequests: "flag_change_requests",
  // Triggers: "triggers",
  // AuditLogs: "audit_logs",

  // Groups: "groups",
  // Policies: "policies",
  // GroupMembers: "group_members",
  // GroupPolicies: "group_policies",
  // MemberPolicies: "member_policies",

  // Experiments: "experiments",
  // ExperimentMetrics: "experiment_metrics",

  // AccessTokens: "access_tokens",
  // RelayProxies: "relay_proxies",
  // Webhooks: "webhooks",
  // WebhookDeliveries: "webhook_deliveries",

  // ignore endusers and events for now
  // EndUsers: "end_users",
  // Events: "events",
};

export const PG_TABLE_COLUMNS = {
  Users: ["id", "workspace_id", "name", "email", "password", "origin", "created_at", "updated_at"],

  Workspaces: ["id", "name", "key", "license", "sso", "created_at", "updated_at"],

  Organizations: ["id", "workspace_id", "name", "key", "initialized", "license", "default_permissions", "created_at", "updated_at", "settings"],
  OrganizationUsers: ["id", "organization_id", "user_id", "invitor_id", "initial_password", "created_at", "updated_at"],
  Projects: ["id", "organization_id", "name", "key", "created_at", "updated_at"],
  Environments: ["id", "project_id", "name", "key", "description", "secrets", "settings", "created_at", "updated_at"],
  EndUserProperties: ["id", "env_id", "name", "preset_values", "use_preset_values_only", "is_built_in", "is_digest_field", "remark", "created_at", "updated_at"],
  Segments: ["id", "workspace_id", "env_id", "name", "type", "scopes", "description", "included", "excluded", "rules", "is_archived", "created_at", "updated_at", "tags"],
  FeatureFlags: ["id", "env_id", "revision", "name", "description", "key", "variation_type", "variations", "target_users", "rules", "is_enabled", "disabled_variation_id", "fallthrough", "expt_include_all_targets", "tags", "is_archived", "created_at", "updated_at", "creator_id", "updator_id"],
  FlagRevisions: ["id", "flag", "comment"],
  FlagDrafts: ["id", "env_id", "flag_id", "status", "comment", "data_change", "created_at", "updated_at", "creator_id", "updator_id"],
  FlagSchedules: ["id", "org_id", "env_id", "flag_draft_id", "flag_id", "status", "title", "scheduled_time", "change_request_id", "created_at", "updated_at", "creator_id", "updator_id"],
  FlagChangeRequests: ["id", "org_id", "env_id", "flag_draft_id", "flag_id", "status", "reason", "reviewers", "schedule_id", "created_at", "updated_at", "creator_id", "updator_id"],
  Triggers: ["id", "target_id", "type", "action", "token", "description", "is_enabled", "triggered_times", "last_triggered_at", "created_at", "updated_at"],
  AuditLogs: ["id", "env_id", "ref_id", "ref_type", "keyword", "operation", "data_change", "comment", "creator_id", "created_at"],

  Groups: ["id", "organization_id", "name", "description", "created_at", "updated_at"],
  Policies: ["id", "organization_id", "name", "description", "type", "statements", "created_at", "updated_at"],
  GroupMembers: ["id", "group_id", "organization_id", "member_id", "created_at", "updated_at"],
  GroupPolicies: ["id", "group_id", "policy_id", "created_at", "updated_at"],
  MemberPolicies: ["id", "organization_id", "member_id", "policy_id", "created_at", "updated_at"],

  Experiments: ["id", "env_id", "metric_id", "feature_flag_id", "is_archived", "status", "baseline_variation_id", "iterations", "alpha", "created_at", "updated_at"],
  ExperimentMetrics: ["id", "env_id", "name", "description", "maintainer_user_id", "event_name", "event_type", "custom_event_track_option", "custom_event_unit", "custom_event_success_criteria", "element_targets", "target_urls", "is_arvhived", "created_at", "updated_at"],

  AccessTokens: ["id", "organization_id", "name", "type", "status", "token", "creator_id", "permissions", "last_used_at", "created_at", "updated_at"],
  RelayProxies: ["id", "organization_id", "name", "key", "description", "is_all_envs", "scopes", "agents", "created_at", "updated_at", "auto_agents"],
  Webhooks: ["id", "org_id", "name", "url", "scopes", "events", "headers", "payload_template_type", "payload_template", "secret", "is_active", "prevent_empty_payloads", "last_delivery", "created_at", "updated_at", "creator_id", "updator_id"],
  WebhookDeliveries: ["id", "webhook_id", "success", "events", "request", "response", "error", "started_at", "ended_at"],
};

export const PG_MISSING_COLUMN_DEFAULT_VALUES = {
  'prevent_empty_payloads': false,
}

export const PG_TABLE_ARRAY_TYPES = [
  "feature_flags.tags",
  "segments.tags",
  "segments.scopes",
  "segments.included",
  "segments.excluded",
  "webhooks.scopes",
  "webhooks.events",
]