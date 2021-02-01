import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  return hashedPassword
}

export async function passwordCheck(
  password: string,
  hash: string
): Promise<boolean> {
  const check = await bcrypt.compare(password, hash)

  return check
}
