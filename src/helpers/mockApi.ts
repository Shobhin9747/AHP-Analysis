// mockApi.ts
export async function loginMock(username: string) {
  const users = [
    { username: 'employee', role: 'employee' },
    { username: 'admin', role: 'admin' },
    { username: 'director', role: 'director' }
  ];
  return users.find((u) => u.username === username);
}
