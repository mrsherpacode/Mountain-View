import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  // useForm hook is from react-hook-form. This hook gives us a few functions to use. The most fundamental ones are the register function and the handleSubmit function and reset.
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // getting all the errors from formState.
  const { errors } = formState;
  // If you need to use queryClient, import useQueryClient from react-query and uncomment the next line:
  // React Query automatically refetches → Fresh cabin list with new cabin
  // // ✅ Table automatically refreshes and shows new cabin

  const queryClient = useQueryClient();
  // For creating
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // For editing
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const isWorking = isCreating || isEditing;

  // In this function the data is object created by useForm hook and Contains all values from registered form inputs
  function onSubmit(data) {
    // selecting the type of image
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // Edit cabin
    if (isEditSession)
      editCabin({
        newCabinData: {
          ...data,
          image,
        },
        id: editId,
      });
    // This actually calls createCabin(data)
    else createCabin({ ...data, image: image });
  }
  // returns this function if there is errors
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",

            min: {
              value: 1,
              message: "capacity should be at aleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "capacity should be at aleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const discount = Number(value);
              const regularPrice = Number(getValues().regularPrice);

              if (discount < 0) {
                return "Discount cannot be negative";
              }

              if (!regularPrice) {
                return "Please enter regular price first";
              }

              return (
                discount <= regularPrice ||
                "Discount should not be greater than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
