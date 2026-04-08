"use server";

import { createServerSupabaseAdminClient } from "../utils/supabase/server";

export async function getAllUsers() {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return [];
  }

  return data.users;
}