// As respostas viram a chave (PBKDF2 + AES-GCM). Sem as respostas certas não há como decifrar.
const normalizar = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("msg");
  const btn = document.getElementById("btn");
  btn.disabled = true;
  btn.textContent = "Verificando...";
  const senha = ["q1", "q2", "q3"].map((id) => normalizar(document.getElementById(id).value)).join("|");
  try {
    const { salt, iv, ct, iter } = window.RECOVERY;
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(senha), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: fromB64(salt), iterations: iter, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
    );
    const flag = new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(iv) }, key, fromB64(ct)));
    msg.className = "msg ok";
    msg.textContent = "Identidade confirmada. Token de redefinição: " + flag;
  } catch {
    msg.className = "msg err";
    msg.textContent = "Uma ou mais respostas estão incorretas.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Verificar respostas";
  }
});
