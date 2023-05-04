export enum Gender {
  M = 'Masculino',
  F = 'Feminino',
}

export const genderKeyFromValue = (gender: Gender) => {
  return Object.keys(Gender)[Object.values(Gender).indexOf(gender)] as
    | 'F'
    | 'M';
};
