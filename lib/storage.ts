export type DemoAppointment = {
  id: string;
  serviceId: string;
  specialistId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

const KEY = "evo-demo-appointments-v2";

export function readAppointments(): DemoAppointment[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function writeAppointments(items: DemoAppointment[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("evo-appointments-change"));
}

export function addAppointment(item: DemoAppointment) {
  writeAppointments([item, ...readAppointments()]);
}

export function removeAppointment(id: string) {
  writeAppointments(readAppointments().filter(item => item.id !== id));
}

export function makeAppointmentId() {
  return `evo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
