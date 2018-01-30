import { schema } from 'normalizr';
import { getAPIResourceGuid } from '../selectors/api.selectors';


export const AppSummarySchema = new schema.Entity('summary', {}, { idAttribute: getAPIResourceGuid });

export interface AppSummary {
  guid: string;
  running_instances: number;
  service: any[];
}

export const AppStatSchema = new schema.Entity('stats', {}, { idAttribute: getAPIResourceGuid });
export const AppStatsSchema = new schema.Array(AppStatSchema);

export interface AppStats {
  [key: string]: AppStat;
}

export interface AppStat {
  state: string;
  stats: AppInstanceStats;
}

export interface AppInstanceStats {
  disk_quota: number;
  fds_quota: number;
  host: string;
  mem_quota: number;
  name: string;
  port: number;
  uptime: number;
  uris: string[];
  usage: AppInstanceUsage;
}

export interface AppInstanceUsage {
  cpu: number;
  disk: number;
  mem: number;
  time: string;
}

export const AppEnvVarSchema = new schema.Entity('environmentVars', {}, { idAttribute: getAPIResourceGuid });
export const AppEnvVarsSchema = new schema.Array(AppEnvVarSchema);

export interface AppEnvVarsState {
  application_env_json?: any;
  environment_json?: {
    STRATOS_PROJECT?: any;
  };
  running_env_json?: any;
  staging_env_json?: any;
  system_env_json?: any;
  name?: any;
}


export interface AppEnvVarStratosProject {
  deploySource: {
    type: string;
    timestamp: number;
    project: string;
    branch: string;
    url: string;
    commit: string;
  };
}
