
interface obj {
  validatePassword(password: string): boolean;
  name: string,
  email: string,
  contactNumber: number,
  password: string,
  is_Verified: Number,
  token: string
}

export default obj