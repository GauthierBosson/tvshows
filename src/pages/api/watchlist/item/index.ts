import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Wacthlist from '../../../../libs/models/Wacthlist'
import getUserId from '../../../../middlewares/getUserId'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getUserId)
  .post(async (req, res) => {
    const { userId, id, name, poster } = req.body
    const oId = new Types.ObjectId(userId)
    try {
      const updatedWatchlist = await Wacthlist.updateOne(
        { userId: oId },
        { $push: { shows: { showId: id, name, poster, watchedSeasons: [] } } }
      )
      res.status(200).json({ success: true, data: updatedWatchlist })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  })

export default handler
