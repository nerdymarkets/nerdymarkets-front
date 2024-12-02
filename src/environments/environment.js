module.exports = {
  apiUrl: process.env.NEXTAUTH_URL,
  backendBaseUrl:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:4000',
  secretKey: process.env.SECRET_KEY,
};
