import { generateRandomString } from "../utils/helper";
import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function createEditCabin(newCabin: CabinRequest, id?: number) {
  // If image is already uploaded, skip the upload process
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl);

  // If imageName has chinese charactors, replace them with random string
  const chineseRegex = /[\u4E00-\u9FA5]/g;
  let imageName = newCabin.image.name;

  if (chineseRegex.test(imageName)) {
    imageName = imageName
      .replace(chineseRegex, generateRandomString(1))
      .replace("/", "");
  } else {
    imageName = `${Math.random()
      .toString(36)
      .substring(2)}-${imageName}`.replace("/", "");
  }

  // If image is already uploaded, use the image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query: any = supabase.from("cabins");
  console.log("query", query);

  if (!id) {
    // A) Create
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // B) Edit
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  // Execute query
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Return data if image is already uploaded
  if (hasImagePath) {
    return data;
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not to created"
    );
  }
  return data;
}

async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export { getCabins, createEditCabin, deleteCabin };
