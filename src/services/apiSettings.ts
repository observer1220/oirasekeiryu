import supabase from "./supabase";

async function getSettings(): Promise<SettingsResponse> {
  // Only have one row of settings in the database so we use single()
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Settings could not be loaded");

  return data;
}

async function updateSetting(newSetting: SettingsRequest) {
  // There is only ONE row of settings in the database so we use eq("id", 1)
  const { error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) throw new Error("Settings could not be updated");
}

export { getSettings, updateSetting };
