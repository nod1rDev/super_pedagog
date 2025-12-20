import { BASE_URL } from "../BASE_URL";

export interface Article {
  id: number;
  title: string;
  description: string;
  author: string;
  read_time: string;
  category: string;
  pdf_url: string;
  downloads: number;
  views: number;
  page_count: number;
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

export interface ArticlesResponse {
  success: boolean;
  message: string;
  data: {
    data: Article[];
    meta: PaginationMeta;
  };
  timestamp: string;
}

export async function getArticles(
  page = 1,
  limit = 10
): Promise<ArticlesResponse> {
  const response = await fetch(
    BASE_URL + `/article?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch articles");
  return response.json();
}

export async function createArticle(
  data: Omit<any, "id">,
  file: File | null
): Promise<Article> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("read_time", data.read_time);
  formData.append("category", data.category);
  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + "/article", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create article");
  return response.json();
}

export async function updateArticle(
  id: string,
  data: Omit<any, "id">,
  file: File | null
): Promise<Article> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("read_time", data.read_time);
  formData.append("category", data.category);
  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + `/article/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update article");
  return response.json();
}

export async function deleteArticle(id: string): Promise<void> {
  const response = await fetch(BASE_URL + `/article/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete article");
}
