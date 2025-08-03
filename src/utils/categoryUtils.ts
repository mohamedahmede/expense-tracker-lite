

// Generate unique category ID
export const generateCategoryId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
}; 