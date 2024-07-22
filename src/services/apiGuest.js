import supabase from "./supabase";

async function signup ({ fullName, email, nationalID }) {
  const { data, error } = await supabase.from('guests').insert([{ fullName, email, nationalID }])

  if (error) throw new Error(error.message)

  return data;
}

async function login ({ email, nationalID }) {
  const { data, error } = await supabase.from('guests')
    .select().eq('email', email).eq('nationalID', nationalID);

  if (error) throw new Error(error.message)

  return data
}

export { signup, login };