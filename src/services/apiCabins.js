import supabase, { supabaseUrl } from "./supabase";

export async function getCabins () {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded')
  }

  return data;
}

export async function createEditCabin (newCabin, id) {
  // accept only alphanumeric, hyphens, underscores and dot
  if (!newCabin.image.name.match(/^[a-zA-Z0-9-_.]+$/)) {
    throw new Error('Image name should only contain alphanumeric, hyphens, and underscores.')
  }

  // Check if the image is already uploaded
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create/Edit cabin
  let query = supabase.from('cabins');

  // A) Create
  if (!id)
    query = query.insert([{ ...newCabin, image: imagePath }])

  // B) Edit
  if (id)
    query = query.update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()


  const { data, error } = await query.select().single()

  if (error) {
    throw new Error('Cabin could not be created')
  }

  // 2. Upload image
  // 如有圖片路徑，則不需上傳圖片，代表使用者透過複製的方式來新增項目
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin, if there's an error uploading image
  if (storageError) {
    // console.log(storageError);
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error('Cabin image could not be uploaded and the cabin was not to created')
  }

  return data
}

export async function deleteCabin (id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be deleted')
  }

  return data;
}