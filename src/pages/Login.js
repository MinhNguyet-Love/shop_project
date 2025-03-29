import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Thêm signInWithPopup
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase'; // Import googleProvider
import '../assets/styles/AuthStyles.css'; // Đường dẫn đến file CSS của bạn

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Chuyển hướng về trang chính sau khi đăng nhập
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm xử lý đăng nhập với Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Chuyển hướng về trang chính sau khi đăng nhập thành công
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="https://www.deco-crystal.com/wp-content/uploads/2023/06/image27.jpg" alt="Phone and Cart" />
      </div>
      <div className="auth-form">
        <h2>Log in to EXCLUSIVE</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          <button type="button" className="google-btn" onClick={signInWithGoogle}>
            <img src="https://www.google.com/favicon.ico" alt="Google Icon" style={{ width: '20px' }} />
            Continue with Google
          </button>
        </form>
        {error && <p>{error}</p>}
        <Link to="/forgot-password">Forgot Password?</Link>
        <p>
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;