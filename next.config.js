/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< Updated upstream
    i18n: {
        locales: ['en', 'ro'], // Add the locales you want to support
        defaultLocale: 'ro', // Set the default locale
    },
=======
    // i18n: {
    //     locales: ['en', 'ro'], // Add the locales you want to support
    //     defaultLocale: 'ro', // Set the default locale
    // },
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
>>>>>>> Stashed changes
}

module.exports = nextConfig
