import {useEffect} from 'react'

import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table'

import {Tag} from 'models/Tag'
import {fetchTagsRequest} from 'store/slices/tagsSlice'
import {useAppDispatch, useAppSelector} from 'store/store'

const TagsPage = () => {
  const dispatch = useAppDispatch()
  const {tags} = useAppSelector((state) => state.tags)

  useEffect(() => {
    dispatch(fetchTagsRequest())
  }, [dispatch])

  const columns: ColumnsType<Tag> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Сортировка',
      dataIndex: 'sort',
      key: 'sort',
    },
  ]

  return <Table dataSource={tags} columns={columns} rowKey="id"/>
}

export default TagsPage
