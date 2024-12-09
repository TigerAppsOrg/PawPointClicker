export default function formatNumberGenerators(count: number): string {
  if (count < 1_000_000) {
    return count
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const suffixes = [
    "",
    "",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
  ];

  let suffixIndex = 0;
  let formattedCount = count;

  // Determine the appropriate suffix
  while (formattedCount >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedCount /= 1000;
    suffixIndex++;
  }

  // Format the number with two decimals and append the suffix
  return `${Math.round(formattedCount)} ${suffixes[suffixIndex]}`.trim();
}
