-- Column "updated_at" should be updated automatically when a boulder is updated
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_last_updated_trigger
BEFORE UPDATE ON boulders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Only a set of dedicated boulder admins should have editing permissions on boulders and related tables
CREATE TABLE boulder_admins (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE boulder_admins ENABLE ROW LEVEL SECURITY;

-- Users should be able to check if they have admin permissions
CREATE POLICY "Enable select for authenticated users on boulder_admins"
ON "public"."boulder_admins"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Boulder admins should be able to insert and update boulders, boulder groups and crags
CREATE POLICY "Enable insert for boulder admins on boulders"
ON "public"."boulders"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE (boulder_admins.user_id = ( SELECT auth.uid() AS uid))
  )
);

CREATE POLICY "Enable update for boulder admins on boulders"
ON "public"."boulders"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
);

CREATE POLICY "Enable insert for boulder admins on boulder_groups"
ON "public"."boulder_groups"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE (boulder_admins.user_id = ( SELECT auth.uid() AS uid))
  )
);

CREATE POLICY "Enable update for boulder admins on boulder_groups"
ON "public"."boulder_groups"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
);

CREATE POLICY "Enable insert for boulder admins on crags"
ON "public"."crags"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE (boulder_admins.user_id = ( SELECT auth.uid() AS uid))
  )
);

CREATE POLICY "Enable update for boulder admins on crags"
ON "public"."crags"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM boulder_admins
    WHERE boulder_admins.user_id = auth.uid()
  )
);
