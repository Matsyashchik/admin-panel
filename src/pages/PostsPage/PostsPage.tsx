import {useEffect, useState} from 'react'

import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Card, Empty, Modal, Pagination, Space, Spin, Table, Tag} from 'antd'
import {useHistory} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from 'store/store'
import {fetchPostsRequest, deletePostRequest} from 'store/slices/postsSlice'
import {RoutesEnum} from 'routes/RoutesEnum'
import {Post} from 'models/Post'

const PostsPage = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const {posts, totalPages, loading} = useAppSelector((state) => state.posts)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)

    useEffect(() => {
        dispatch(fetchPostsRequest(currentPage))
    }, [dispatch, currentPage])

    const handleAddPost = () => {
        history.push(`${RoutesEnum.Posts}/add`)
    }

    const handleEditPost = (post: Post) => {
        history.push(`${RoutesEnum.Posts}/edit/${post.id}`)
    }

    const handleDeletePost = (post: Post) => {
        setPostToDelete(post)
        setIsDeleteModalVisible(true)
    }

    const confirmDelete = async () => {
        if (postToDelete) {
            await dispatch(deletePostRequest(postToDelete.id))
            setIsDeleteModalVisible(false)
            setPostToDelete(null)
            if (posts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                dispatch(fetchPostsRequest(currentPage))
            }
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
            width: 300,
        },
        {
            title: 'Автор',
            dataIndex: 'authorName',
            key: 'authorName',
            width: 200,
        },
        {
            title: 'Теги',
            dataIndex: 'tagNames',
            key: 'tagNames',
            width: 300,
            render: (tags: string[]) => (
                <Space size={[0, 8]} wrap>
                    {tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 120,
            render: (_: any, record: Post) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditPost(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeletePost(record)}
                    />
                </Space>
            ),
        },
    ]

    return (
        <div style={{padding: '24px'}}>
            <Card
                title="Посты"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddPost}
                        style={{marginBottom: '16px'}}
                    >
                        Добавить пост
                    </Button>
                }
            >
                <Spin spinning={loading} tip="Загрузка...">
                    <Table
                        columns={columns}
                        dataSource={posts}
                        rowKey="id"
                        pagination={false}
                        locale={{
                            emptyText: (
                                <Empty
                                    description="Нет данных"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ),
                        }}
                    />
                </Spin>
                <div style={{marginTop: '16px', textAlign: 'right'}}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalPages * pageSize}
                        onChange={(page, size) => {
                            setCurrentPage(page)
                            setPageSize(size)
                        }}
                        showSizeChanger
                        showQuickJumper
                    />
                </div>
            </Card>

            <Modal
                title="Подтверждение удаления"
                open={isDeleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => {
                    setIsDeleteModalVisible(false)
                    setPostToDelete(null)
                }}
                okText="Удалить"
                cancelText="Отмена"
            >
                <p>Вы уверены, что хотите удалить пост "{postToDelete?.title}"?</p>
            </Modal>
        </div>
    )
}

export default PostsPage 