import {Button, Result} from 'antd'
import {useHistory} from 'react-router-dom'

import {RoutesEnum} from 'routes/RoutesEnum'

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница не найдена."
      extra={
        <Button type="primary" onClick={() => history.push(RoutesEnum.Posts)}>
          Вернуться на главную
        </Button>
      }
    />
  )
}

export default NotFoundPage
