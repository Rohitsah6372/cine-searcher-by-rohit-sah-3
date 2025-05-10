//Converts a string to camelCase.
function toCamelCase(str) {
  return str
    .replace(/([A-Z]+)(?=[A-Z][a-z]|$)/g, " $1")
    .replace(/[_-\s]+/g, " ")
    .trim()
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

export function keysToCamelCase(input) {
  if (Array.isArray(input)) {
    return input.map(keysToCamelCase);
  }

  if (input !== null && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        toCamelCase(key),
        keysToCamelCase(value),
      ])
    );
  }

  return input;
}
