export function getAvatarUrl(fullName: string) {
  const name = fullName.trim().split(" ").slice(0, 2).join("+");
  const url = `https://ui-avatars.com/api/?name=${name}`;
  return url;
}
