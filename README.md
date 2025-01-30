# Simple URL Shortener API

API sederhana untuk membuat URL pendek menggunakan Node.js, Express, dan SQLite. URL yang diinput akan disimpan di database dan dapat diakses melalui URL pendek yang dihasilkan.

---

## **Fitur**
- Input URL panjang dan dapatkan URL pendek.
- Redirect otomatis ketika mengunjungi URL pendek.
- Penyimpanan data di SQLite.

---

## **Teknologi yang Digunakan**
- **Node.js** - Runtime JavaScript di server.
- **Express** - Framework backend untuk routing.
- **SQLite** - Database ringan untuk penyimpanan data.

---

## **Instalasi**

1. Clone atau download repository ini.
2. Jalankan perintah berikut untuk menginstal dependencies:
   ```sh
   npm install
   ```

---

## **Menjalankan Server**
1. Jalankan server menggunakan perintah:
   ```sh
   nodemon server.js
   ```
2. Server akan berjalan di http://<IP-server>:5000.

---

## **Endpoin API**
###POST `/shorten`
Deskripsi: Membuat URL pendek dari URL panjang.
###Headers:
```
Content-Type: application/json
```
###Body:
```json
{
  "longUrl": "https://www.example.com"
}
```
###Response:
```json
{
  "shortUrl": "http://192.168.1.16:5000/abc123"
}
```
link dapat di akses selama server berjalan
