import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Thêm signInWithPopup
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase'; // Import googleProvider
import '../assets/styles/AuthStyles.css'; // Đường dẫn đến file CSS của bạn

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Chuyển hướng sau khi đăng ký thành công
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm xử lý đăng ký với Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Chuyển hướng về trang chính sau khi đăng ký/đăng nhập thành công
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
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            // Bạn có thể thêm state cho name nếu cần
          />
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
          <button type="submit">Create Account</button>
          <button type="button" className="google-btn" onClick={signInWithGoogle}>
            <img src="https://www.google.com/favicon.ico" alt="Google Icon" style={{ width: '20px' }} />
            Continue with Google
          </button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;