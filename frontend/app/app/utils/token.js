export const get = () => localStorage.getItem('token');
export const set = token => localStorage.setItem('token', token);
export const remove = () => localStorage.removeItem('token');
