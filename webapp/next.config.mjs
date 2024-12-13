/** @type {import('next').NextConfig} */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(
  "https://",
  ""
);

const nextConfig = {
  images: {
    domains: [supabaseUrl],
  },
};

export default nextConfig;
