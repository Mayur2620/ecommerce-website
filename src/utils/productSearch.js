export const productMatchesSearch = (product, searchTerm) => {
  const query = searchTerm?.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [
    product.title,
    product.brand,
    product.category,
    product.description,
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(query));
};
