export const validateName = (name) => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 10) return "Name must be at least 20 characters";
  if (name.trim().length > 60) return "Name must be at most 60 characters";

  return ;
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter a valid email address";
  return null;
};

export const validatePassword = (pass) => {
  if (!pass.trim()) return "Password is required";
  if (pass.length < 8) return "Password must be at least 8 characters";
  if (pass.length > 16) return "Password must be at most 16 characters";
  if (!/[A-Z]/.test(pass))
    return "Password must include at least one uppercase letter";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass))
    return "Password must include at least one special character";
  return null;
};

export const validateAddress = (address) => {
  if (!address.trim()) return "Address is required";
  if (address.length > 400) return "Address must be at most 400 characters";
  return null;
};

export const validateRating = (rating) => {
  if (rating < 1 || rating > 5) return "Rating must be between 1 and 5";
  return null;
};