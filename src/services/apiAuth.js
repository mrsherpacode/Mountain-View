import supabase from "./supabase";
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
