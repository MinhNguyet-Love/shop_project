# Getting Started with Create React App

Cấu trúc thư mục

react-shop/
│── public/                      # Chứa các file tĩnh
│   ├── index.html               # File HTML chính
│   ├── favicon.ico              # Icon website
│── src/                         # Mã nguồn chính
│   ├── assets/                  # Chứa hình ảnh, CSS, fonts, v.v.
│   │   ├── images/              # Chứa hình ảnh sản phẩm, logo
│   │   ├── styles/              # Chứa file CSS hoặc SCSS (nếu cần)
│   │   ├── fonts/               # Chứa font chữ tùy chỉnh
│   ├── components/              # Chứa các thành phần dùng chung
│   │   ├── Navbar.js            # Thanh điều hướng chính
│   │   ├── Footer.js            # Footer của ứng dụng
│   │   ├── ProductCard.js       # Component hiển thị sản phẩm
│   │   ├── Button.js            # Component nút bấm dùng chung
│   ├── pages/                   # Chứa các trang chính của app
│   │   ├── Home.js              # Trang chủ
│   │   ├── ProductList.js       # Trang danh sách sản phẩm
│   │   ├── ProductDetail.js     # Trang chi tiết sản phẩm
│   │   ├── Cart.js              # Trang giỏ hàng
│   │   ├── Checkout.js          # Trang thanh toán
│   │   ├── OrderHistory.js      # Trang lịch sử đơn hàng
│   │   ├── OrderDetail.js       # Trang chi tiết đơn hàng
│   │   ├── Login.js             # Trang đăng nhập
│   │   ├── Register.js          # Trang đăng ký tài khoản
│   │   ├── Profile.js           # Trang hồ sơ người dùng
│   │   ├── Contact.js           # Trang liên hệ
│   │   ├── About.js             # Trang giới thiệu
│   │   ├── admin/               # Chứa các trang quản trị
│   │   │   ├── AdminDashboard.js  # Bảng điều khiển admin
│   │   │   ├── ProductManagement.js  # Quản lý sản phẩm
│   │   │   ├── OrderManagement.js    # Quản lý đơn hàng
│   │   │   ├── UserManagement.js     # Quản lý người dùng
│   ├── router/                   # Chứa định nghĩa về routing
│   │   ├── AppRoutes.js          # Định nghĩa các tuyến đường của app
│   ├── context/                   # Chứa các context API (nếu dùng)
│   │   ├── AuthContext.js         # Context xác thực người dùng
│   │   ├── CartContext.js         # Context giỏ hàng
│   ├── hooks/                     # Chứa các custom hooks
│   │   ├── useAuth.js             # Hook kiểm tra đăng nhập
│   │   ├── useCart.js             # Hook quản lý giỏ hàng
│   ├── services/                  # Chứa các file API call
│   │   ├── authService.js         # API xác thực người dùng
│   │   ├── productService.js      # API lấy danh sách sản phẩm
│   │   ├── orderService.js        # API lấy danh sách đơn hàng
│   ├── App.js                     # Component gốc của ứng dụng
│   ├── index.js                   # Điểm vào chính của ứng dụng
│── package.json                   # File cấu hình npm
│── README.md                      # Tài liệu hướng dẫn
│── .gitignore                      # File bỏ qua khi đẩy code lên Git


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
