import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../../libs/db/dbConnect'
import Wacthlist from '../../../../libs/models/Wacthlist'
import getUserId from '../../../../middlewares/getUserId'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getUserId)
  .post(async (req, res) => {
    try {
      await dbConnect()
      const { userId, id, name, poster } = req.body
      const oId = new Types.ObjectId(userId)
      const updatedWatchlist = await Wacthlist.updateOne(
        { userId: oId },
        { $push: { shows: { showId: id, name, poster, watchedEpisodes: [] } } }
      )
      res.status(200).json({ success: true, data: updatedWatchlist })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  })

export default handler
