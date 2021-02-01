import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../../libs/db/dbConnect'
import Wacthlist from '../../../../libs/models/Wacthlist'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    await dbConnect()
    const { id } = req.query
    const watchlist = await Wacthlist.findOne({
      userId: new Types.ObjectId(parseInt(id.toString())),
    })
    res.status(200).json({ success: true, data: watchlist })
  } catch (err) {
    res.status(400).json({ success: false, data: err })
  }
})

export default handler
