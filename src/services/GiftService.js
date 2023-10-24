import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
// import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GiftService {
    async getGifts() {
        const res = await api.get('api/gifts')
        // logger.log(res)
        const gifts = res.data.map(giftPOJO => new Gift(giftPOJO))
        AppState.gifts = gifts
        // logger.log(AppState.gifts)
    }
    async unlockGifts(gift) {
        const unlockedGift = AppState.gifts.find(gift)
        await api.put('api/gifts', unlockedGift)
    }
}

export const giftService = new GiftService()