export const urlApi = (): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.PUBLIC_URL!;
  }
  return "http://localhost:3000/api";
};
