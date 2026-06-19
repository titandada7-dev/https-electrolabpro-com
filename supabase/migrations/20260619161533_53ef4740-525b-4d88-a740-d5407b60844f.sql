CREATE TABLE public.premium_content_subscribers (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  opted_in boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.premium_content_subscribers TO authenticated;
GRANT ALL ON public.premium_content_subscribers TO service_role;
ALTER TABLE public.premium_content_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own premium notify opt-in"
  ON public.premium_content_subscribers
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());