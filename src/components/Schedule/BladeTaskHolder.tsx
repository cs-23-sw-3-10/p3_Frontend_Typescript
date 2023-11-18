export class BladeTaskHolder {
    bladeTaskCards: React.ReactNode[];
    constructor(bladeTaskCards: React.ReactNode[]) {
        this.bladeTaskCards = bladeTaskCards;
    }
    getBladeTasks() {
        return this.bladeTaskCards;
    }
    setBladeTasks(newBladeTasks: React.ReactNode[]) {
        this.bladeTaskCards = newBladeTasks;
    }
}
