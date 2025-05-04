import {Card, Layout, Typography} from 'antd'

import LoginForm from 'components/loginForm/LoginForm'

const {Title} = Typography

const LoginPage = () => {
  return (
    <Layout style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
    }}>

      <Card style={{padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Title>
          Войдите в систему
        </Title>
        <LoginForm/>
      </Card>
    </Layout>
  )
}

export default LoginPage
