/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'rotaract-visio-bucket.s3.eu-central-1.amazonaws.com'
            }
        ],
        deviceSizes: [320, 640, 768, 1024, 1280, 1920]
    }
}

module.exports = nextConfig
