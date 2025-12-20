import { BASE_URL } from "../BASE_URL";

export interface Methodology {
  id: number;
  title: string;
  author: string;
  description: string;
  file_url: string;
  downloads: number;
  views: number;
  date: string;
  category: string;
  pages: number;
  isdeleted: boolean;
  created_at: string;
  updated_at: string;
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

export interface MethodologiesResponse {
  success: boolean;
  message: string;
  data: {
    data: Methodology[];
    meta: PaginationMeta;
  };
  timestamp: string;
}

export async function getMethodologies(
  page = 1,
  limit = 10
): Promise<MethodologiesResponse> {
  const response = await fetch(
    BASE_URL + `/methodical?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch methodologies");
  return response.json();
}

export async function createMethodology(
  data: Omit<any, "id">,
  file: File | null
): Promise<any> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("category", data.category);
  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + "/methodical", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create methodology");
  return response.json();
}

export async function updateMethodology(
  id: number,
  data: Omit<any, "id">,
  file: File | null
): Promise<Methodology> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("author", data.author);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("category", data.category);
  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + `/methodical/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update methodology");
  return response.json();
}

export async function deleteMethodology(id: number): Promise<void> {
  const response = await fetch(BASE_URL + `/methodical/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete methodology");
}
