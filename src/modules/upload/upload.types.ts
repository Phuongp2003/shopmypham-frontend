export type UploadResponse = {
  url: string; // Đường dẫn file đã upload
  fileName?: string;
  size?: number;
  mimeType?: string;
  [key: string]: any;
};
