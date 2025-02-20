CREATE ROLE boulder_admin;

create policy "Enable insert for boulder_admin on boulders"
on "public"."boulders"
as PERMISSIVE
for INSERT
to boulder_admin
with check (true);

create policy "Enable update for boulder_admin on boulders"
on "public"."boulders"
as PERMISSIVE
for UPDATE
to boulder_admin
with check (true);

create policy "Enable insert for boulder_admin on boulder_grups"
on "public"."boulder_groups"
as PERMISSIVE
for INSERT
to boulder_admin
with check (true);

create policy "Enable update for boulder_admin on boulder_groups"
on "public"."boulder_groups"
as PERMISSIVE
for UPDATE
to boulder_admin
with check (true);

create policy "Enable insert for boulder_admin on crags"
on "public"."crags"
as PERMISSIVE
for INSERT
to boulder_admin
with check (true);

create policy "Enable update for boulder_admin on crags"
on "public"."crags"
as PERMISSIVE
for UPDATE
to boulder_admin
with check (true);
