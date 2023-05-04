import { Gender } from '../enums/gender';

export class Student {
  constructor(
    public id: number | null,
    public name: string,
    public lastName: string,
    public age: number,
    public gender: Gender
  ) {}
}
