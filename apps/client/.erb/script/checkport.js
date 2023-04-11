/**
 author: william   email:362661044@qq.com
 create_at:2023-03-23 上午 11:57
 **/
import chalk from 'chalk'
import detectPort from 'detect-port'

const port = process.env.PORT || '1212'

detectPort(port, (err, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
      )
    )
  } else {
    process.exit(0)
  }
})
