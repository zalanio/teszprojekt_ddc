export class Project {
    constructor({ id = Date.now(), name = '', description = '', startDate = '', budget = 0 }) {
        this.id = id
        this.name = name
        this.description = description
        this.startDate = startDate
        this.budget = budget
    }
}