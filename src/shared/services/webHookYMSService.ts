export async function sendWebhookYMS(payload: any) {
  try {
    const response = await fetch("https://SEU-YMS/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origem: "yard-checklist",
        ...payload,
      }),
    });

    return await response.json();
  } catch (e) {
    console.error("Erro webhook", e);
  }
}
