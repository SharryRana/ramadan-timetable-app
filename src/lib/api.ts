export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: Timings;
    date: {
      readable: string;
      timestamp: string;
      gregorian: any;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: { id: number; name: string };
    };
  };
}

export interface AladhanCalendarResponse {
  code: number;
  status: string;
  data: Array<AladhanResponse['data']>;
}

export interface FetchParams {
  city: string;
  country: string;
  method?: number;
  school?: number;
}

export async function getTimingsByCity({ city, country, method = 2, school = 0 }: FetchParams): Promise<AladhanResponse['data'] | null> {
  try {
    const url = new URL("https://api.aladhan.com/v1/timingsByCity");
    url.searchParams.append("city", city);
    url.searchParams.append("country", country);
    url.searchParams.append("method", method.toString());
    url.searchParams.append("school", school.toString());

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch timings");
    const json = await res.json() as AladhanResponse;
    return json.data;
  } catch (error) {
    console.error("Aladhan API Error:", error);
    return null;
  }
}

export async function getCalendarByCity({ city, country, method = 2, school = 0, year, month }: FetchParams & { year?: number; month?: number }): Promise<AladhanCalendarResponse['data'] | null> {
  try {
    const d = new Date();
    const y = year || d.getFullYear();
    const m = month || (d.getMonth() + 1);

    const url = new URL(`https://api.aladhan.com/v1/calendarByCity/${y}/${m}`);
    url.searchParams.append("city", city);
    url.searchParams.append("country", country);
    url.searchParams.append("method", method.toString());
    url.searchParams.append("school", school.toString());

    const res = await fetch(url.toString(), { next: { revalidate: 3600 * 12 } });
    if (!res.ok) throw new Error("Failed to fetch calendar");
    const json = await res.json() as AladhanCalendarResponse;
    return json.data;
  } catch (error) {
    console.error("Aladhan API Calendar Error:", error);
    return null;
  }
}
