export type Point = { x: number; y: number };
export type Algorithm = 'A*' | 'Dijkstra' | 'RRT*' | 'Hybrid AI Planner';
export type MissionType = 'Mapping' | 'Survey' | 'Inspection' | 'Search & Rescue Simulation' | 'Point-to-Point Navigation';

export type Mission = {
  id: number;
  name: string;
  mission_type: MissionType;
  description: string;
  status: string;
  created_at: string;
  start: Point;
  destination: Point;
  algorithm: Algorithm;
  distance_km: number;
  flight_time_min: number;
  battery_usage_pct: number;
  waypoints: number;
  replans: number;
  obstacles_avoided: number;
  route: Point[];
};

export type PlanResult = {
  mission: Mission;
  nodes_evaluated: number;
  candidate_paths: number;
  obstacles_avoided: number;
  planning_ms: number;
  message: string;
};

export type Telemetry = {
  battery_pct: number;
  speed_mps: number;
  altitude_m: number;
  distance_km: number;
  progress_pct: number;
  eta_sec: number;
  heading: string;
  current_waypoint: number;
  status: string;
  updated_at: string;
};

export type SimulationOut = { mission: Mission; telemetry: Telemetry };
export type EventResult = { mission: Mission; telemetry: Telemetry; event_message: string; replanned: boolean };
export type AssistantResult = {
  mission_type: MissionType;
  optimization: 'Minimum Distance' | 'Minimum Time' | 'Balanced Cost';
  battery_reserve: 'Low' | 'Medium' | 'High';
  priority: 'Safety' | 'Efficiency' | 'Balanced';
  interpreted_text: string;
};

export type MissionForm = {
  name: string;
  mission_type: MissionType;
  description: string;
  start: Point;
  destination: Point;
  algorithm: Algorithm;
  max_distance_km: number;
  max_flight_time_min: number;
  battery_reserve_pct: number;
  safety_margin_m: number;
  max_speed_mps: number;
  max_altitude_m: number;
  battery_capacity_mah: number;
  starting_battery_pct: number;
  payload_weight_kg: number;
  power_consumption_w: number;
};
