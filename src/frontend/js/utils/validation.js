export function validateForm(data, schema) {
  for (const [key, rule] of Object.entries(schema)) {
    if (rule.required && !data[key]) {
      return { valid: false, message: `${key} est requis` };
    }
    if (rule.minLength && data[key].length < rule.minLength) {
      return { valid: false, message: `${key} doit avoir au moins ${rule.minLength} caractères` };
    }
  }
  return { valid: true };
}