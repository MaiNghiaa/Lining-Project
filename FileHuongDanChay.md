1. Đầu tiền kéo cả project này vào trong vscode.

---- Chạy Backend 
2. ấn chuột phải -> Backend_Bom => Open in intergrated Terminal 
3, khởi động docker => docker compose up -d ( Thấy nó ghi running là được)
4. Test bằng cách truy cập localhost:8055/admin 
(ADMIN_EMAIL: "admin@example.com"
ADMIN_PASSWORD: "d1r3ctu5")

-------- Chạy FrontEnd
5. Ấn chuột phải =>  FrontEnd  => Open in intergranted Terminal
6. Nhấn npm i ( Cài Node Package Module )
7. chạy npm run dev 
=> nó sẽ gửi ra 1 cái địa chỉ như này ( http://localhost:5173/)