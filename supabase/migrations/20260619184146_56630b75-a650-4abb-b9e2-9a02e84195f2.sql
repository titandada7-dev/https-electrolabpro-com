create or replace function public.enforce_premium_subscriber_email()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_email text;
begin
  if new.user_id is distinct from auth.uid() then
    raise exception 'user_id must match the authenticated user';
  end if;
  select email into v_email from auth.users where id = new.user_id;
  if v_email is null then
    raise exception 'auth user not found';
  end if;
  new.email := v_email;
  return new;
end;
$$;

drop trigger if exists trg_enforce_premium_subscriber_email on public.premium_content_subscribers;
create trigger trg_enforce_premium_subscriber_email
before insert or update on public.premium_content_subscribers
for each row execute function public.enforce_premium_subscriber_email();

update public.premium_content_subscribers s
set email = u.email
from auth.users u
where u.id = s.user_id and u.email is not null and s.email is distinct from u.email;