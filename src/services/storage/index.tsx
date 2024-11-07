export const save = async (key: string, value: any) => {
  let valueToStore =
    typeof value === "object" ? JSON.stringify(value) : `${value}`;
  return await localStorage.setItem(key, valueToStore);
};

export const fetch = async (key: string, parse?: boolean) => {
  let value = await localStorage.getItem(key);
  return parse && value ? JSON.parse(value) : value;
};

export const clear = async (key: string) => {
  return await localStorage.removeItem(key);
};

export const LocalStorage = { save, fetch, clear };
