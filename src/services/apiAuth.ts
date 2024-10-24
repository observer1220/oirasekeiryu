import { AuthTokenResponse, User, UserResponse } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

async function signup({
  fullName,
  email,
  password,
}: AdminSignupRequest): Promise<User | null> {
  // toString(36)，包含數字 0-9 和字母 a-z，前幾個字符通常是 0. 開頭，因此從第 7 個字符開始擷取
  const robotID = Math.random().toString(36).substring(7);
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: `https://robohash.org/${robotID}?size=200x200`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return user;
}

async function login({
  email,
  password,
}: AdminLoginRequest): Promise<AuthTokenResponse["data"]> {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

async function getCurrentUser(): Promise<User | null> {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

async function updateCurrentUser({
  fullName,
  password,
  avatar,
}: UpdateCurrentUserRequest): Promise<UserResponse["data"]> {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData!);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export { signup, login, getCurrentUser, logout, updateCurrentUser };
