export const evaluatePasswordStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) strength += 2;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 2;

  if (strength < 3) return 'Weak';
  if (strength >= 3 && strength < 6) return 'Medium';
  if (strength >= 6) return 'Strong';

  return 'Weak';
};
