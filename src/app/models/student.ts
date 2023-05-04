import { Gender } from '../enums/gender';

export class Student {
  constructor(
    private id: number | null,
    private name: string,
    private lastName: string,
    private age: number,
    private gender: Gender
  ) {}
}
