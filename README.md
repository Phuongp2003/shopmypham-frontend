# Shop Mỹ Phẩm Web

- ĐỀ TÀI: Xây dựng hệ thống web bán mỹ phẩm
- GIẢNG VIÊN HƯỚNG DẪN: ThS. Nguyễn Văn Hữu Hoàng

> [Repo backend](https://github.com/Phuongp2003/shopmypham-backend)

## Giới thiệu

Shop Mỹ Phẩm Web là hệ thống quản lý và bán hàng mỹ phẩm hiện đại, xây dựng với Vue 3, Vite, Nuxt UI, Tailwind CSS, TypeScript và kiến trúc module hóa. Dự án hướng tới trải nghiệm người dùng tối ưu, giao diện đẹp, hỗ trợ dark/light mode, tích hợp quản lý sản phẩm, đơn hàng, người dùng, blog, giỏ hàng, thanh toán, v.v.

- **Frontend:** Vue 3, Composition API, TypeScript, Vite
- **UI:** Nuxt UI v3, Tailwind CSS v4
- **Quản lý trạng thái:** Pinia, composables
- **Định tuyến:** Vue Router (file-based)
- **Kiểm thử:** Jest (cấu hình sẵn, chưa có test mẫu)

## Tính năng chính

- Đăng ký/đăng nhập (hỗ trợ Google OAuth, JWT, refresh token)
- Quản lý sản phẩm (CRUD, variant, badge, benefit, shipping, review...)
- Quản lý đơn hàng, giỏ hàng, thanh toán
- Quản lý người dùng, địa chỉ giao hàng
- Blog/tin tức, bình luận
- Quản lý qua trang quản trị (manager)

## Cấu trúc thư mục

```
shopmypham-web/
├── src/
│   ├── assets/         # Ảnh, CSS, font
│   ├── common/         # Component, composable, utils dùng chung
│   ├── layouts/        # Layout giao diện
│   ├── modules/        # Module tính năng (auth, cart, cosmetic, order, ...)
│   ├── plugins/        # Plugin Vue
│   └── router/         # Định tuyến
├── memory-bank/        # Ghi chú kỹ thuật, rule, todo, feature
├── public/             # Tài nguyên tĩnh
├── package.json        # Script, dependency
└── ...
```

## Thiết lập & Chạy dự án

### 1. Cài đặt thư viện

Cài đặt toàn bộ dependency:

```bash
npm install
```

### 2. Chạy môi trường phát triển

Khởi động server phát triển với hot reload:

```bash
npm run dev
```

### 3. Build production

Tạo bản build tối ưu để deploy:

```bash
npm run build
```

### 4. Kiểm tra type (TypeScript)

Kiểm tra lỗi type toàn dự án:

```bash
npm run type-check
```

### 5. Xem thử bản build production

Chạy thử bản build vừa tạo:

```bash
npm run preview
```

### 6. Format code

Tự động format code theo chuẩn Prettier:

```bash
npm run format
```

### 7. Chạy kiểm thử (Jest)

Chạy toàn bộ test (nếu có):

```bash
npm run test
```

## Script trong package.json

- `dev`: Chạy server phát triển với Vite (hot reload)
- `build`: Build production, gồm kiểm tra type (`type-check`) rồi build (`build-only`)
- `preview`: Xem thử bản build production
- `build-only`: Chỉ build (vite build)
- `type-check`: Kiểm tra type với vue-tsc
- `test`: Chạy kiểm thử với Jest (cần thêm test mẫu)
- `format`: Format code trong src/ bằng Prettier
