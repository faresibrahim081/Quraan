export default function manifest() {
  return {
    name: "القران الكريم",
    short_name: "القران الكريم",
    description: "القران الكريم بقراءات متعددة",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/192.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
