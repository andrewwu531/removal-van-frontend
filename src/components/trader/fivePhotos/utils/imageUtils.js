export const getImageUrl = (photoPath) => {
  if (!photoPath) return "/fallback-image.png";

  const baseUrl = import.meta.env.PROD
    ? "https://tradespecialistsmedia.blob.core.windows.net/media-prod"
    : "https://tradespecialistsmedia.blob.core.windows.net/media-prod";

  const fullUrl = `${baseUrl}/${photoPath}`;
  console.log("Environment:", import.meta.env.MODE);
  console.log("Base URL:", baseUrl);
  console.log("Full photo URL:", fullUrl);

  return fullUrl;
};
