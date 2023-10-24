export class Gift {
    constructor(data) {
        this.createdAt = data.createdAt || new Date(data.createdAt)
        this.creatorId = data.creatorId
        this.opened = data.opened
        this.updatedAt = data.updatedAt || new Date(data.updatedAt)
        this.url = data.url
        this.tag = data.tag
    }
}