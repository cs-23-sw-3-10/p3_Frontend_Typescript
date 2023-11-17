export class BladeTaskHolder {
    bladeTaskCards: any;
    constructor(bladeTaskCards: any) {
        this.bladeTaskCards = bladeTaskCards;
    }
    getBladeTasks() {
        return this.bladeTaskCards;
    }
    setBladeTasks(newBladeTasks: any) {
        this.bladeTaskCards = newBladeTasks;
    }
}
