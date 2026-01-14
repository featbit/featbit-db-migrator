import { ConverterBase } from "./converterBase.js";

export class ExperimentMetricConverter extends ConverterBase {
  pgColumns = ["id", "env_id", "name", "description", "maintainer_user_id", "event_name", "event_type", "custom_event_track_option", "custom_event_unit", "custom_event_success_criteria", "element_targets", "target_urls", "is_arvhived", "created_at", "updated_at"];

  toCsv(mongoDocs) {
    return super.toCsv(mongoDocs, this.pgColumns);
  }
}