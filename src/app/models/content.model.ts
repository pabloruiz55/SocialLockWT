export class Content {

  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public unlocksRequired?: number,
    public category?: string,
    public visibleToAll?: boolean,
    public fileURL?: string,
    public unlocks?: string[],
    public unFile?:string
  ) {  }

}
