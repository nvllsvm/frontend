import {
  ActionConfig,
  LovelaceCardConfig,
  LovelaceViewConfig,
  ShowViewConfig,
} from "../../../data/lovelace";
import { EntityConfig } from "../entity-rows/types";
import { optional, string, object, union } from "superstruct";
import { EntityId } from "../common/structs/is-entity-id";
import { Icon } from "../common/structs/is-icon";
import { LovelaceHeaderFooterConfig } from "../header-footer/types";

export interface YamlChangedEvent extends Event {
  detail: {
    yaml: string;
  };
}

export interface GUIModeChangedEvent {
  guiMode: boolean;
  guiModeAvailable: boolean;
}

export interface ViewEditEvent extends Event {
  detail: {
    config: LovelaceViewConfig;
  };
}

export interface ViewVisibilityChangeEvent {
  visible: ShowViewConfig[];
}

export interface ConfigValue {
  format: "json" | "yaml";
  value?: string | LovelaceCardConfig;
}

export interface ConfigError {
  type: string;
  message: string;
}

export interface EntitiesEditorEvent {
  detail?: {
    entities?: EntityConfig[];
    config?: LovelaceHeaderFooterConfig;
  };
  target?: EventTarget;
}

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface Card {
  type: string;
  name?: string;
  description?: string;
  showElement?: boolean;
  isCustom?: boolean;
}

export interface HeaderFooter {
  type: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

export interface CardPickTarget extends EventTarget {
  config: LovelaceCardConfig;
}

export const actionConfigStruct = object({
  action: string(),
  navigation_path: optional(string()),
  url_path: optional(string()),
  service: optional(string()),
  service_data: optional(object()),
});

export const entitiesConfigStruct = union([
  object({
    entity: EntityId,
    name: optional(string()),
    icon: optional(Icon),
  }),
  EntityId,
]);
