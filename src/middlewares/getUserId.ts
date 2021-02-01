import nc from 'next-connect'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

const getUserId = nc<NextApiRequest, NextApiResponse>().use(
  async (req, res, next) => {
    const user = await getSession({ req })

    req.body.userId = user.id

    next()
  }
)

export default getUserId
