import Topic from "../../model/topic.model"
import { Request, Response } from "express";

export const topic = async(req:Request, res:Response)=>{
    const topic = await Topic.find({
        deleted:false
    })
    res.render("client/pages/topic/index", {
        pageTitle: "Chủ đề bài hát",
        topics: topic
      });
}