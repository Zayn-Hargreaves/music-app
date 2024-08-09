import SettingGeneral from "../../model/setting-general.model";
import { Request, Response } from "express";
const SettingGeneral1 = async(req:Request, res:Response, next) =>{
    const settingGeneral = await SettingGeneral.findOne({})
    res.locals.settingGeneral = settingGeneral
    next();
}
export default SettingGeneral1