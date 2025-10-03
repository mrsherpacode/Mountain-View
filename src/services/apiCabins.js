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
export async function createCabin(newCabin) {
  // Links to supabase image
  // https://ondprssalprffqjuxrlf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 1) create a cabin
  // create a image name which should be unique
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // create a image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabins can't be created");
  }
  //2) upload images

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
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
