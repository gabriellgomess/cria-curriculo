import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Routes, Route, useNavigate } from 'react-router-dom';



// Ant Design
import { ConfigProvider, Card, Space } from 'antd';
const { Meta } = Card;
import pt_BR from "antd/locale/pt_BR";
import moment from 'moment';
import 'moment/locale/pt-br';

// Components
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Curriculos from './pages/Curriculos';

// Imgem
import logo from './assets/img/logo_login.jpg';

moment.locale('pt-br');

function App() {
  // Definindo tokens de design personalizados
  const theme = {
    components: {
      Button: {
        colorPrimary: '#26A69A',
        colorPrimaryHover: '#80CBC4',
        colorPrimaryActive: '#43A49B',
        colorPrimaryFocus: '#26A69A',

      },
      Typography: {
        colorTextHeading: '#263339',
        colorText: '#263339',
      },
      Input: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      },
      InputNumber: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      },
      DatePicker: {
        activeBg: '#E0F2F1',
        activeBorderColor: '#26A69A',
        hoverBorderColor: '#26A69A',

      }
    },
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para verificar se há um usuário armazenado no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    // set in localStorage
    console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
  };

  const handleLogout = () => {
    setUser(null); // Limpa os dados do usuário ao fazer logout
    // remove from localStorage
    localStorage.removeItem('user');
    // Navigate to home page after logout
    navigate('/');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };


  return (
    <ConfigProvider theme={theme} locale={pt_BR}>
      <div className={user ? 'color-bg-light' : 'color-bg-gradient'} style={{ width: '100vw', minHeight: '100vh', border: '1px solid #fff'}}>
        {!user ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card
              hoverable
              bordered={false}
              style={{ width: '300px', marginTop: '80px' }}
              cover={
                <img
                  alt="sistema de geração de arquivos de remessa bancária"
                  src={logo}
                />
              }
            >
              <Meta
                title="Gerador currículos"
                description="Sistema para geração e gerenciamento de currículos"
                style={{ margin: '10px 0' }}
              />
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </Card>
          </div>
        ) : (
          <div>
            <Header handleLogout={handleLogout} user={user} />
            <div style={{width: '80%', margin: '20px auto 0 auto'}}>
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/curriculos" element={<Curriculos user={user} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
