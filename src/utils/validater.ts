export const validateEmail = (_: unknown, value: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !regex.test(value)) {
    return Promise.reject(new Error('Invalid email format'));
  }
  return Promise.resolve();
};

export const validateTel = (_: unknown, value: string) => {
  const regex = /^1\d{10}$/;
  if (value && !regex.test(value)) {
    return Promise.reject(new Error('Invalid phone number format'));
  }
  return Promise.resolve();
};
