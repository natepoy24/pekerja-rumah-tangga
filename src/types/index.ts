export interface User {
  id: string;
  email: string;
  name: string;
  role: "employer" | "agency" | "worker";
  created_at: string;
}

export interface Worker {
  id: string;
  name: string;
  category: "art" | "baby-sitter" | "elder-care";
  age: number;
  gender: "male" | "female";
  experience_years: number;
  salary_expectation: number;
  status: "available" | "placed" | "on-hold";
  medically_cleared: boolean;
  background_checked: boolean;
  photo_url?: string;
  description?: string;
  skills: string[];
}

export interface Booking {
  id: string;
  employer_id: string;
  worker_id: string;
  service_category: "art" | "baby-sitter" | "elder-care";
  start_date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  contract_duration_months: number;
  total_price: number;
  created_at: string;
}
