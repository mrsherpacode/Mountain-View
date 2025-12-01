import supabase from "./supabase";
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
