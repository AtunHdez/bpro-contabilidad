/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        relay: {
            // This should match relay.config.js
            src: './src',
            language: 'typescript',
            artifactDirectory: './src/__generated__',
            eagerEsModules: false,
        },
    },
}

export default nextConfig;
