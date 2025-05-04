import {useEffect} from 'react'

import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table'

import {Author} from 'models/Author'
import {fetchAuthorsRequest} from 'store/slices/authorsSlice'
import {useAppDispatch, useAppSelector} from 'store/store'

const AuthorsPage = () => {
  const dispatch = useAppDispatch()
  const {authors} = useAppSelector((state) => state.authors)

  useEffect(() => {
    dispatch(fetchAuthorsRequest())
  }, [dispatch])

  const columns: ColumnsType<Author> = [
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Отечество',
      dataIndex: 'secondName',
      key: 'secondName',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'shortDescription',
    },
  ]

  return <Table dataSource={authors} columns={columns}/>
}

export default AuthorsPage
