interface obj {
  validatePassword(password: string): boolean;
  name: string,
  email: string,
  contactNumber: number,
  password: string,
  confirmPassword: string,
  is_Verified: Number
}

export default obj