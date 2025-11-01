export const dataProvider = (API_BASE = "/api") => ({
  async _parse(res) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }
    const text = await res.text();
    throw { status: res.status, statusText: res.statusText, body: text };
  },

  async _fetch(url, init) {
    const res = await fetch(url, init);
    if (!res.ok) {
      try {
        const json = await res.json();
        throw { status: res.status, ...json };
      } catch {
        const text = await res.text();
        throw { status: res.status, statusText: res.statusText, body: text };
      }
    }
    return this._parse(res);
  },

  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams();
    if (pagination?.pageSize) params.set("limit", String(pagination.pageSize));
    if (filters?.length) params.set("q", JSON.stringify(filters));
    if (sorters?.length) {
      const s = sorters[0];
      params.set("sort", `${s.field}:${s.order}`);
    }
    const data = await dataProvider()._fetch(`${API_BASE}/${resource}?${params.toString()}`);
    return { data: data.items || [], total: data.total ?? (data.items?.length || 0) };
  },

  getOne: async ({ resource, id }) => {
    const data = await dataProvider()._fetch(`${API_BASE}/${resource}/${id}`);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const data = await dataProvider()._fetch(`${API_BASE}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const data = await dataProvider()._fetch(`${API_BASE}/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const data = await dataProvider()._fetch(`${API_BASE}/${resource}/${id}`, { method: "DELETE" });
    return { data };
  },
});
