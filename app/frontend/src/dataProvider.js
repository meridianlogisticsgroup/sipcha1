export const dataProvider = (API_BASE = "/api") => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams();
    if (pagination?.pageSize) params.set("limit", pagination.pageSize);
    if (filters?.length) params.set("q", JSON.stringify(filters));
    if (sorters?.length) {
      const s = sorters[0];
      params.set("sort", `${s.field}:${s.order}`);
    }
    const res = await fetch(`${API_BASE}/${resource}?${params.toString()}`);
    const json = await res.json();
    return { data: json.items || [], total: json.total ?? (json.items?.length || 0) };
  },
  getOne: async ({ resource, id }) => {
    const res = await fetch(`${API_BASE}/${resource}/${id}`);
    return { data: await res.json() };
  },
  create: async ({ resource, variables }) => {
    const res = await fetch(`${API_BASE}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    return { data: await res.json() };
  },
  update: async ({ resource, id, variables }) => {
    const res = await fetch(`${API_BASE}/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    return { data: await res.json() };
  },
  deleteOne: async ({ resource, id }) => {
    const res = await fetch(`${API_BASE}/${resource}/${id}`, { method: "DELETE" });
    return { data: await res.json() };
  },
});
