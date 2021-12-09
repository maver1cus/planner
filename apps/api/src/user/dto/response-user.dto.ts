export class ResponseUserDto {
  readonly user: {
    login: string,
    id: number,
    token: string
  }
}