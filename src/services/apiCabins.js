//Creating a Service to Query Cabins

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins can't be loaded");
  }
  return data;
}
// Mutations: create a new cabin in the database
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // Links to supabase image
  // https://ondprssalprffqjuxrlf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // create a image name which should be unique
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // create a image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create/edit a cabin
  let query = supabase.from("cabins");

  // A Create a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B Edit a existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins can't be created");
  }
  //2) upload images
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3) delete a cabin if there was error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

// Mutations :deleting a Cabin

export async function deleteCabin(id) {
  console.log("Attempting to delete cabin with ID:", id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Detailed Supabase error:", error);
    throw new Error(
      `Cabin could not be deleted: ${error.message || error.code}`
    );
  }
  console.log("Delete successful, returned data:", data);
  return data;
}
