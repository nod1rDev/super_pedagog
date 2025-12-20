import { BASE_URL } from "../BASE_URL";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  pages: number;
  rating: number;
  downloads: number;
  is_bookmarked: boolean;
  description: string;
  pdf_url: string;
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

export interface BooksResponse {
  success: boolean;
  message: string;
  data: {
    data: Book[];
    meta: PaginationMeta;
  };
  timestamp: string;
}

export async function getBooks(page = 1, limit = 10): Promise<BooksResponse> {
  const response = await fetch(BASE_URL + `/book?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
}

export async function createBook(
  data: Omit<any, "id">,
  file: File | null
): Promise<Book> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("rating", String(data.rating));
  formData.append("category", data.category);
  formData.append("is_bookmarked", String(data.is_bookmarked));
  formData.append("pages", String(data.pages));
  formData.append("downloads", String(data.downloads));
  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + "/book", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create book");
  return response.json();
}

export async function updateBook(
  id: string,
  data: Omit<any, "id">,
  file: File | null
): Promise<Book> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("rating", String(data.rating));
  formData.append("category", data.category);
  formData.append("is_bookmarked", String(data.is_bookmarked));
 



  const response = await fetch(BASE_URL + `/book/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update book");
  return response.json();
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(BASE_URL + `/book/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete book");
}
