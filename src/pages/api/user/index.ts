import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import dbConnect from '../../../libs/db/dbConnect'
import User from '../../../libs/models/User'
import Wacthlist from '../../../libs/models/Wacthlist'
import { hashPassword } from '../../../libs/password'

function onError(err, _, res) {
  res.status(500).end(err.toString())
}

const handler = nc<NextApiRequest, NextApiResponse>({ onError }).post(
  async (req, res) => {
    try {
      await dbConnect()
      const { email, password } = req.body
      const hashedPassword = await hashPassword(password)
      // @ts-ignore
      const user = await User.create({ email, password: hashedPassword })
      const userId = new Types.ObjectId(user._id)
      await Wacthlist.create({ userId, shows: [] })
      res.status(200).json({ success: true, data: user })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  }
)

export default handler
