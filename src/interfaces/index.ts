export interface CreateUniversity {
  alpha_two_code: string;
  web_pages: string[];
  name: string;
  country: string;
  domains: string[];
  "state-province": string;
}

export interface UpdateUniversity {
  web_pages: string[];
  name: string;
  domains: string[];
}
