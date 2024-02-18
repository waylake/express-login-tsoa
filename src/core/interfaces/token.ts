export interface TokenPayload {
  id: string;
  email: string;
}

export interface Token {
  accessToken: string;
  tokenPayload?: TokenPayload;
}
