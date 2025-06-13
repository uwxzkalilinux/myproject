export default async function handler(req, res) {
  const unique = req.query.unique;

  if (!unique) {
    return res.status(400).json({ error: "unique ID مطلوب" });
  }

  try {
    const response = await fetch(`http://176.241.95.201:8092/id?unique=${unique}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + Buffer.from("admin:241067890").toString("base64")
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "فشل في جلب البيانات من API" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "حدث خطأ داخلي في الخادم" });
  }
}
