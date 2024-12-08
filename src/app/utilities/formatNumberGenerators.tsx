export default function formatNumberGenerators(count: number): string {
  if (count < 1_000_000) {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const suffixes = [
    "",
    "",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quattuordecillion",
    "quindecillion",
    "sexdecillion",
    "septendecillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "unvigintillion",
  ];

  let suffixIndex = 0;
  let formattedCount = count;

  // Determine the appropriate suffix
  while (formattedCount >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedCount /= 1000;
    suffixIndex++;
  }

  // Format the number with two decimals and append the suffix
  return `${formattedCount} ${suffixes[suffixIndex]}`.trim();
}
