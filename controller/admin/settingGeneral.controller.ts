import SettingGeneral from "../../model/setting-general.model"
import { Request, Response } from "express"
export const general = async (req:Request, res:Response) => {
    const settingsGeneral = await SettingGeneral.findOne({})
    res.render("admin/pages/settings/general", {
        pageTitle: "Trang cài đặt chung",
        settingGeneral: settingsGeneral
    })
}
export const generalPatch = async (req:Request, res:Response) => {
    const settingGeneral = await SettingGeneral.findOne({});

    if (settingGeneral) {
        await SettingGeneral.updateOne({
            _id: settingGeneral.id
        }, req.body);
    } else {
        const record = new SettingGeneral(req.body)
        record.save()
    }
    res.redirect("back")
}