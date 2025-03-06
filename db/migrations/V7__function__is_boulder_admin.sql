CREATE OR REPLACE FUNCTION is_boulder_admin() 
RETURNS BOOLEAN 
SECURITY INVOKER
LANGUAGE sql STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM boulder_admins 
    WHERE user_id = auth.uid()
  );
$$;
