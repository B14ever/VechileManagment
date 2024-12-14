import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='home-container'>
      <p>
        WellCome To Vehicle Managment System
      </p>
      <Button  type="primary" className='home-button' 
       onClick={()=>navigate('/dashboard')}>
        Dashboard
      </Button>
    </div>
  )
}

export default Home
