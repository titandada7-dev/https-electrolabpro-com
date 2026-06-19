import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "confirming" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Cancelar suscripción · ElectroLab Pro";
    if (!token) { setState("invalid"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
      headers: { apikey: SUPABASE_ANON },
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (data.valid === true) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const confirm = async () => {
    setState("confirming");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) setState("done");
      else if (data.reason === "already_unsubscribed") setState("already");
      else { setErrorMsg(data.error || "Error"); setState("error"); }
    } catch (e) {
      setErrorMsg((e as Error).message); setState("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full p-8 text-center">
        {state === "loading" && <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />}
        {state === "valid" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Cancelar suscripción a correos</h1>
            <p className="text-muted-foreground mb-6">
              ¿Confirmás que querés dejar de recibir correos de ElectroLab Pro?
            </p>
            <Button onClick={confirm} size="lg" className="w-full">Confirmar baja</Button>
          </>
        )}
        {state === "confirming" && <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />}
        {state === "done" && (
          <>
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">Listo</h1>
            <p className="text-muted-foreground">Ya no recibirás más correos de ElectroLab Pro.</p>
          </>
        )}
        {state === "already" && (
          <>
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">Ya estabas dado de baja</h1>
            <p className="text-muted-foreground">No recibirás más correos de ElectroLab Pro.</p>
          </>
        )}
        {state === "invalid" && (
          <>
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">Enlace inválido</h1>
            <p className="text-muted-foreground">Este enlace de baja no es válido o ya expiró.</p>
          </>
        )}
        {state === "error" && (
          <>
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>
            <p className="text-muted-foreground">{errorMsg}</p>
          </>
        )}
      </Card>
    </div>
  );
}
