import supabase from "./supabase";

async function getSettings() {
  // We only have one row of settings in the database, so we can use single()
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
async function updateSetting(newSetting: any) {
  // There is only ONE row of settings in the database, so we can use eq("id", 1)
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}

export { getSettings, updateSetting };
