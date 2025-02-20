DROP POLICY "Enable insert for boulder_admin on boulders" ON "public"."boulders";
DROP POLICY "Enable update for boulder_admin on boulders" ON "public"."boulders";
DROP POLICY "Enable insert for boulder_admin on boulder_grups" ON "public"."boulder_groups";
DROP POLICY "Enable update for boulder_admin on boulder_groups" ON "public"."boulder_groups";
DROP POLICY "Enable insert for boulder_admin on crags" ON "public"."crags";
DROP POLICY "Enable update for boulder_admin on crags" ON "public"."crags";

INSERT INTO grades (grade) VALUES ('UBESTEMT');

DROP ROLE boulder_admin;

CREATE TABLE boulder_admins (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE boulder_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for boulder admins on boulders"
ON "public"."boulders"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;

CREATE POLICY "Enable update for boulder admins on boulders"
ON "public"."boulders"
AS PERMISSIVE
FOR UPDATE
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;

CREATE POLICY "Enable insert for boulder admins on boulder_groups"
ON "public"."boulder_groups"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;

CREATE POLICY "Enable update for boulder admins on boulder_groups"
ON "public"."boulder_groups"
AS PERMISSIVE
FOR UPDATE
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;

CREATE POLICY "Enable insert for boulder admins on crags"
ON "public"."crags"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;

CREATE POLICY "Enable update for boulder admins on crags"
ON "public"."crags"
AS PERMISSIVE
FOR UPDATE
TO authenticated
WITH CHECK (auth.uid() IN (SELECT user_id FROM public.boulder_admins));;
