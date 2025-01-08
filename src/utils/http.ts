/* eslint-disable @typescript-eslint/no-explicit-any */
const http = {
  get<T = any>(url: string) {
    return fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    }).then(async (res) => {
      if (res.status < 200 || res.status > 300) {
        throw new Error(`HttpStatusCode not supported for url (${url})`);
      }

      if ((window as any)["APPLY_THROTTLE"]) {
        const delay: number = parseInt(url.replace(/\D+/g, ""), 10);
        if (Number.isInteger(delay)) {
          await sleep(delay * 500);
        }
      }

      if ((window as any)["SIMULATE_ERRORS"]) {
        if (url.match(/films\/\d+/)) {
          if (!(parseInt(url.replace(/\D+/g, ""), 10) % 4)) {
            throw new Error("Simulated server error");
          }
        }
      }

      return res.json() as unknown as T;
    });
  },
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default http;
