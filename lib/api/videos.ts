import { BASE_URL } from "../BASE_URL";

export interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  views: number;
  category: string;
  publish_date: string;
  author: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  stream_url: string;
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

export interface VideosResponse {
  success: boolean;
  message: string;
  data: {
    data: Video[];
    meta: PaginationMeta;
  };
  timestamp: string;
}

export async function getVideos(page = 1, limit = 10): Promise<VideosResponse> {
  const response = await fetch(BASE_URL + `/video?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch videos");
  return response.json();
}

export async function createVideo(
  data: Omit<any, "id">,
  file: File | any
): Promise<Video> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("publish_date", data.publish_date);
  formData.append("author", data.author);

  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + "/video", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to create video");
  return response.json();
}

export async function updateVideo(
  id: any,
  data: Omit<any, "id">,
  file: File | any
): Promise<Video> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("publish_date", data.publish_date);
  formData.append("author", data.author);

  if (file) formData.append("file", file);

  const response = await fetch(BASE_URL + `/video/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to update video");
  return response.json();
}

export async function deleteVideo(id: string): Promise<void> {
  const response = await fetch(BASE_URL + `/video/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete video");
}
