import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Wacthlist from '../../../../libs/models/Wacthlist'
import getUserId from '../../../../middlewares/getUserId'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getUserId)
  .post(async (req, res) => {
    try {
      const updatedWatchlist = await Wacthlist.updateOne(
        { _id: req.body.id },
        { $push: { shows: { id: '769', watchedSeasons: [] } } }
      )
      res.status(200).json({ success: true, data: updatedWatchlist })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  })

export default handler
