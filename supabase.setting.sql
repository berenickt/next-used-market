-- Supabase Database Function 추가
-- @see https://supabase.com/docs/guides/auth/managing-user-data#using-triggers
-- 사용자가 생성되면, 사용자에게 상점명을 자동으로 생성하는 함수
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.shops (id, name)
  values (new.id, CONCAT('새로운상점', floor(1000 + random() * 8999)));
  return new;
end;
$$;

-- Supabase Database Trigger 추가
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();