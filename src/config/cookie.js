const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 12 * 60 * 60 * 1000
}

module.exports = {
  COOKIE_CONFIG
}
