drop policy if exists "Users can view own subscription" on public.subscriptions;
drop policy if exists "Service role can manage subscriptions" on public.subscriptions;
create policy "Users can view own subscription" on public.subscriptions for select to authenticated using (auth.uid() = user_id);
create policy "Service role can manage subscriptions" on public.subscriptions for all to service_role using (true) with check (true);
revoke execute on function public.has_active_subscription(uuid, text) from public, anon;
grant execute on function public.has_active_subscription(uuid, text) to authenticated, service_role;