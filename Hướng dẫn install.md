Yêu cầu hệ thống
Node.js >= 16.x

MySQL >= 5.7

Trình soạn thảo code (VS Code khuyến nghị)

1. Cài đặt thư viện
Chạy lệnh: npm install
Lệnh này sẽ cài các thư viện cần thiết được khai báo trong file package.json (ví dụ: Express, Sequelize, dotenv,...)

2. Tạo cơ sở dữ liệu
Chạy Xampp và tạo cơ sở dữ liệu tên "db2"
Sau đó chạy lệnh: npm install --save sequelize sequelize-cli để import các bảng
và chạy: npx sequelize-cli db:migrate để import các bảng
và: npx sequelize-cli db:seed:all để import dữ liệu mẫu

3. Chạy ứng dụng
Chạy lệnh: npm start 
Sau đó truy cập trình duyệt: http://localhost:8081
