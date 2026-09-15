export function formatPrice(amount: number, currency = "USD") {
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? "";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

export function joinWithDot(values: string[]) {
  return values.join(" · ");
}
