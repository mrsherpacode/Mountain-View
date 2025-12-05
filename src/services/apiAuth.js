import supabase, { supabaseUrl } from "./supabase";
// signUp function
export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}
//  This function sends the user email and password to Supabase and checks if the credentials are valid in their database and returns either success or error.
export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);

  return data;
}

//this function gets(fetches) user data from supabase

export async function getCurrentUser() {
  // check if data exist in localStorage.
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  console.log(data);
  return data?.user;
}
// This sign out user
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// This function updates the user's name,avatar and password
export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1) update user's fullName or password
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2) unload user's avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3) update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      // This url is from supabase
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return { updatedUser };
}
