module.exports = {
  port: 8080,
  default_lang: 'en',
  baseUrl: "http://localhost:8080",
  apiUrl: "http://localhost:8080/api",
  socketUrl: "http://localhost:8080",
  secret: "REPLACE THIS WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  database: {
    'url' : 'mongodb://localhost:27017/dashboard'
  }
}