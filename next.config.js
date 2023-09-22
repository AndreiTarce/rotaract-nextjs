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
    }
}

module.exports = nextConfig
