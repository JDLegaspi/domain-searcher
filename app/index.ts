import axios from "axios";
import dotenv from "dotenv";
import { words } from "./words";

dotenv.config();

const getAvailableDomains: (
  queries: string[],
  zones: string[]
) => Promise<string[]> = async (queries, zones) => {
  let availableDomains: string[] = [];

  for (const query of queries) {
    for (const zone of zones) {
      const options = {
        params: { "mashape-key": "undefined", domain: `${query}.${zone}` },
        headers: {
          "x-rapidapi-host": "domainr.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
        },
      };

      let response = await axios.get(
        "https://domainr.p.rapidapi.com/v2/status",
        options
      );

      let result = response.data;

      let { domain, status } = result.status[0];

      if (status.includes("inactive")) {
        availableDomains.push(domain);
      }
    }
  }

  return availableDomains;
};

const main = async () => {
  try {
    let availableDomains = await getAvailableDomains(words, ["com"]);

    console.log(availableDomains);
  } catch (e) {
    console.error(e);
  }
};

main();
