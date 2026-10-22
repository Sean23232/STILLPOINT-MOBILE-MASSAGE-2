import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stillpoint-mobile-massage.example.com";
  const lastModified = new Date();

  const routes = [
    "",
    "/services",
    "/services/in-home-massage",
    "/corporate-wellness",
    "/services/hotel-massage",
    "/services/events-pop-ups",
    "/book",
    "/about",
    "/partnerships",
    "/contact",
    "/policies/privacy",
    "/policies/terms",
    "/policies/booking-cancellation",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/book" ? 0.9 : 0.8,
  }));
}
