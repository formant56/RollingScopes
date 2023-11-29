import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  name: string;
};

const ControlledForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input name="name" ref={register({ required: true })} />
      </label>
      {errors.name && <span>This field is required</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;