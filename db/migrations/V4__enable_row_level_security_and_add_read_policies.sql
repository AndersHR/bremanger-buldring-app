ALTER TABLE crags ENABLE ROW LEVEL SECURITY;
ALTER TABLE boulder_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE boulders ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE status ENABLE ROW LEVEL SECURITY;
ALTER TABLE start ENABLE ROW LEVEL SECURITY;

create policy "Enable read access for all users on boulders"
on "public"."boulders"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users on boulder_groups"
on "public"."boulder_groups"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users on crags"
on "public"."crags"
as PERMISSIVE
for SELECT
to public
using (true);