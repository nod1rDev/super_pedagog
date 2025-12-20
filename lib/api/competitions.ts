import { BASE_URL } from "../BASE_URL";

export interface Competition {
  id: number;
  title: string;
  description: string;
  type: string;
  topics: string[];
  prize: string;
  deadline: string;
  participants: number;
  difficulty: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  count: number;
  total_pages: number;
  next_page: number | null;
  back_page: number | null;
  offset: number;
}

export interface CompetitionsResponse {
  success: boolean;
  message: string;
  data: {
    data: Competition[];
    meta: PaginationMeta;
  };
  timestamp: string;
}

export async function getCompetitions(
  page = 1,
  limit = 10
): Promise<CompetitionsResponse> {
  const response = await fetch(
    BASE_URL + `/competition?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch competitions");
  return response.json();
}

export async function createCompetition(
  data: Omit<Competition, "id">
): Promise<Competition> {
  const response = await fetch(BASE_URL + "/competition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create competition");
  return response.json();
}

export async function updateCompetition(
  id: number,
  data: Omit<Competition, "id">
): Promise<Competition> {
  const response = await fetch(BASE_URL + `/competition/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update competition");
  return response.json();
}

export async function deleteCompetition(id: number): Promise<void> {
  const response = await fetch(BASE_URL + `/competition/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete competition");
}
