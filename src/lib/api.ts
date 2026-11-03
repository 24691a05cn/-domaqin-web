import type { AssistantResult, EventResult, Mission, MissionForm, PlanResult, SimulationOut, Telemetry, Algorithm } from '../types';

export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  missions: () => request<Mission[]>('/missions'),
  mission: (id: number) => request<Mission>(`/missions/${id}`),
  createMission: (form: MissionForm) => request<Mission>('/missions', { method: 'POST', body: JSON.stringify({
    name: form.name,
    mission_type: form.mission_type,
    description: form.description,
    start: form.start,
    destination: form.destination,
    area: [],
    constraints: {
      max_distance_km: form.max_distance_km,
      max_flight_time_min: form.max_flight_time_min,
      battery_reserve_pct: form.battery_reserve_pct,
      safety_margin_m: form.safety_margin_m,
      max_speed_mps: form.max_speed_mps,
      max_altitude_m: form.max_altitude_m,
    },
    drone: {
      battery_capacity_mah: form.battery_capacity_mah,
      starting_battery_pct: form.starting_battery_pct,
      max_speed_mps: form.max_speed_mps,
      payload_weight_kg: form.payload_weight_kg,
      power_consumption_w: form.power_consumption_w,
    },
    algorithm: form.algorithm,
  })}),
  plan: (id: number, algorithm: Algorithm) => request<PlanResult>(`/missions/${id}/plan`, { method: 'POST', body: JSON.stringify({ algorithm }) }),
  tick: (id: number) => request<SimulationOut>(`/missions/${id}/simulate`, { method: 'POST' }),
  telemetry: (id: number) => request<Telemetry>(`/missions/${id}/telemetry`),
  event: (id: number, event_type: string, point?: { x: number; y: number }) => request<EventResult>(`/missions/${id}/events`, { method: 'POST', body: JSON.stringify({ event_type, point }) }),
  deleteMission: (id: number) => request<{ deleted: number }>(`/missions/${id}`, { method: 'DELETE' }),
  assistant: (text: string) => request<AssistantResult>('/assistant/parse', { method: 'POST', body: JSON.stringify({ text }) }),
};
