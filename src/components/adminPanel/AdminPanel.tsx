import {ReactNode} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import {FileTextOutlined, LogoutOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Flex, Layout, Space} from 'antd'
import Cookies from 'js-cookie'

import {RoutesEnum} from 'routes/RoutesEnum'
import {logout} from 'store/slices/authSlice'
import {useAppDispatch} from 'store/store'

const {Header, Content} = Layout

type DashboardProps = {
    children: ReactNode
}

const AdminPanel = ({children}: DashboardProps) => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')

        dispatch(logout())
    }

    const handleNavigation = (path: string) => {
        history.push(path)
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header>
                <Flex justify={'space-between'} flex={'fit-content'} align={'center'}>
                    <Space size="middle">
                        <Button
                            type="text"
                            icon={<FileTextOutlined/>}
                            onClick={() => handleNavigation(RoutesEnum.Posts)}
                            style={{
                                color: location.pathname === RoutesEnum.Posts ? '#1890ff' : 'white',
                            }}
                        >
                            Посты
                        </Button>
                        <Button
                            type="text"
                            icon={<UserOutlined/>}
                            onClick={() => handleNavigation(RoutesEnum.Authors)}
                            style={{
                                color: location.pathname === RoutesEnum.Authors ? '#1890ff' : 'white',
                            }}
                        >
                            Авторы
                        </Button>
                        <Button
                            type="text"
                            icon={<TagsOutlined/>}
                            onClick={() => handleNavigation(RoutesEnum.Tags)}
                            style={{
                                color: location.pathname === RoutesEnum.Tags ? '#1890ff' : 'white',
                            }}
                        >
                            Тэги
                        </Button>
                    </Space>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined/>}
                        onClick={handleLogout}
                        style={{marginLeft: '16px'}}
                    >
                        Выйти
                    </Button>
                </Flex>
            </Header>

            <Content style={{
                padding: '24px',
                background: '#f0f2f5',
            }}>
                <div style={{
                    background: 'white',
                    padding: '24px',
                    minHeight: '280px',
                    borderRadius: '8px',
                }}>
                    {children}
                </div>
            </Content>
        </Layout>
    )
}

export default AdminPanel
