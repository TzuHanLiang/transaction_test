export type TCode = '00000000' | '99999999';
export type ICodeConstant = { SUCCESS: TCode; FAILURE: TCode };
export const Code: ICodeConstant = {
  SUCCESS: '00000000',
  FAILURE: '99999999',
};
