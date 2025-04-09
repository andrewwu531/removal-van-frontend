export const getImageUrl = (photoPath) => {
  if (!photoPath) return "/fallback-image.png";

  const baseUrl = import.meta.env.PROD
    ? "https://tradespecialistsmedia.blob.core.windows.net/media-prod"
    : "https://tradespecialistsmedia.blob.core.windows.net/media";

  // if (photoPath.startsWith("https://")) return photoPath;

  const fullUrl = `${baseUrl}/${photoPath}`;

  console.log("Photo path:", photoPath);
  console.log("Full URL:", fullUrl);

  return fullUrl;
};
