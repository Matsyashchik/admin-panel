import {useEffect, useState} from 'react'

import {Button, Col, Pagination, Spin} from 'antd'

import Posts from 'components/post/Posts.tsx'
import PostModal from 'components/postModal/PostModal.tsx'

import {fetchAuthorsRequest} from 'store/slices/authorsSlice.ts'
import {
  addPostRequest, deletePostRequest,
  editPostRequest, fetchPostDetailRequest,
  fetchPostsRequest, resetAddPostSuccess,
} from 'store/slices/postsSlice.ts'
import {fetchTagsRequest} from 'store/slices/tagsSlice.ts'
import {useAppDispatch, useAppSelector} from 'store/store.ts'

const PostsPage = () => {
  const dispatch = useAppDispatch()
  const {posts, totalPages, success, loading, postDetail} = useAppSelector((state) => state.posts)
  const {tags} = useAppSelector((state) => state.tags)
  const {authors} = useAppSelector((state) => state.authors)

  const [page, setPage] = useState<number>(1)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [editablePost, setEditablePost] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchPostsRequest(page))
    dispatch(fetchTagsRequest())
    dispatch(fetchAuthorsRequest())
  }, [dispatch, page])

  useEffect(() => {
    if (success) {
      setIsModalVisible(false)
      dispatch(resetAddPostSuccess())
    }
  }, [success, dispatch])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleAddClick = () => {
    setEditablePost(null)
    setIsModalVisible(true)
  }

  const handleEditClick = (postId: number) => {
    setEditablePost(postId)
    dispatch(fetchPostDetailRequest(postId))
    setIsModalVisible(true)
  }

  const handleSubmitPost = (formData: FormData) => {
    if (editablePost) {
      dispatch(editPostRequest({id: editablePost, data: formData}))
    } else {
      dispatch(addPostRequest(formData))
    }
    setIsModalVisible(false)
  }

  const handleDeleteClick = (postId: number) => {
    dispatch(deletePostRequest(postId))
  }

  return (
    <div style={{padding: '24px'}}>
      <Button type="primary" onClick={handleAddClick} style={{marginBottom: '16px'}}>
        Добавить пост
      </Button>

      <PostModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleSubmitPost}
        tags={tags}
        authors={authors}
        initialValues={postDetail}

      />

      {loading ? (
        <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <Spin spinning={loading}/>
        </Col>
      ) : (
        <>
          <Posts
            posts={posts}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          <Pagination
            current={page}
            total={totalPages * 9}
            pageSize={10}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{marginTop: '16px', textAlign: 'center'}}
          />
        </>
      )}
    </div>
  )
}

export default PostsPage
