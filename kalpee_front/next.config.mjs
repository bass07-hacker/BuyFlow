/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Autorise l'acces au serveur de dev depuis d'autres appareils du meme reseau
  // (ex: ton telephone via son IP locale) pour tester le mobile-first en conditions reelles.
  allowedDevOrigins: ['192.168.1.15'],
}

export default nextConfig
