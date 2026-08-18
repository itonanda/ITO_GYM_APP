export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const countries: Country[] = [
  {
    name: "Indonesia",
    code: "ID",
    dialCode: "62",
    flag: "🇮🇩",
  },
  {
    name: "Malaysia",
    code: "MY",
    dialCode: "60",
    flag: "🇲🇾",
  },
  {
    name: "Singapore",
    code: "SG",
    dialCode: "65",
    flag: "🇸🇬",
  },
  {
    name: "United States",
    code: "US",
    dialCode: "1",
    flag: "🇺🇸",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "44",
    flag: "🇬🇧",
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "61",
    flag: "🇦🇺",
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "81",
    flag: "🇯🇵",
  },
  {
    name: "South Korea",
    code: "KR",
    dialCode: "82",
    flag: "🇰🇷",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "966",
    flag: "🇸🇦",
  },
];