import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, Layout, Typography } from 'antd'
const { Header, Footer } = Layout;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#001529',
          algorithm: true, // Enable algorithm
         
        },
      }
    }}
     >
      <Layout>
    <Header className='header'>
      <Typography  className='headerText'>
        Vechile Managment
      </Typography>
    </Header>
      <App/>
    <Footer className='footer'>
      <p>natnailgetachew6@gmail.com / 0946027174</p>
    </Footer>
    </Layout>
    </ConfigProvider>
  </StrictMode>
)
