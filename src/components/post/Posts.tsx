import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {Button, Image, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'

import {Post, PreviewPicture} from 'models/Post'
import dateFormater from 'services/dateFormater.ts'

interface PostsProps {
  posts: Post[]
  onEdit: (postId: number) => void
  onDelete: (postId: number) => void
}

const Posts = ({posts, onEdit, onDelete}: PostsProps) => {
  const columns: ColumnsType<Post> = [
    {
      title: 'Изображение',
      dataIndex: 'previewPicture',
      key: 'previewPicture',
      width: '5%',
      render: (previewPicture: PreviewPicture) => <Image alt={previewPicture.name} src={previewPicture.url}
                                                         width={'50px'}/>,
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      width: '5%',
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: 'Автор',
      dataIndex: 'authorName',
      key: 'authorName',
      width: '10%',
    },
    {
      title: 'Тэги',
      dataIndex: 'tagNames',
      key: 'tagNames',
      width: '20%',
      render: (tagNames: string[]) => tagNames?.join(', ') || '-',
    },
    {
      title: 'Обновлён',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
      render: (updatedAt: string) => (dateFormater(updatedAt)),
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (createdAt: string) => (dateFormater(createdAt)),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '10%',
      render: (_, record) => (
        <div style={{display: 'flex', gap: '8px'}}>
          <Button
            type="link"
            icon={<EditOutlined/>}
            onClick={() => onEdit(record.id)}
          >
            Редактировать
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined/>}
            onClick={() => onDelete(record.id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      dataSource={posts}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  )
}

export default Posts
