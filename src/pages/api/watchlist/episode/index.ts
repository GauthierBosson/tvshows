import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../../libs/db/dbConnect'
import getUserId from '../../../../middlewares/getUserId'
import Watchlist from '../../../../libs/models/Wacthlist'
import { Types } from 'mongoose'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getUserId)
  .post(async (req, res) => {
    try {
      await dbConnect()
      const { userId, showId, seasonNumber, episode } = req.body
      const oId = new Types.ObjectId(userId)
      const epStr = `${seasonNumber}-${episode}`
      const updatedShow = await Watchlist.updateOne(
        { $and: [{ userId: oId }, { 'shows.showId': showId }] },
        { $push: { 'shows.$.watchedEpisodes': epStr } }
      )
      res.status(200).json({ success: true, data: updatedShow })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  })
  .put(async (req, res) => {
    try {
      await dbConnect()
      const { userId, showId, seasonNumber, episode } = req.body
      const oId = new Types.ObjectId(userId)
      const epStr = `${seasonNumber}-${episode}`
      const updatedShow = await Watchlist.updateOne(
        { $and: [{ userId: oId }, { 'shows.showId': showId }] },
        { $pullAll: { 'shows.$.watchedEpisodes': [epStr] } }
      )
      res.status(200).json({ success: true, data: updatedShow })
    } catch (err) {
      res.status(400).json({ success: false, data: err })
    }
  })

export default handler
